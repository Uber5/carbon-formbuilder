import React from "react"
import { ComboBox } from "carbon-components-react"
import PlacesAutocomplete, {
  geocodeByPlaceId,
  geocodeByAddress
  // getLatLng
} from "react-places-autocomplete"

const googlePlaceToFields = googlePlace => {
  const componentMap = {
    street_number: { fieldName: "streetno", variant: "short_name" },
    route: { fieldName: "streetname", variant: "long_name" },
    locality: { fieldName: "city", variant: "long_name" },
    administrative_area_level_1: {
      fieldName: "province",
      variant: "short_name",
      valueMap: v => (v === "GP" ? "GT" : v)
    },
    sublocality_level_1: { fieldName: "suburb", variant: "long_name" },
    sublocality_level_2: { fieldName: "suburb", variant: "long_name" },
    postal_code: { fieldName: "postalcode", variant: "short_name" }
  }

  // reset all relevant form controls
  let result = {}
  for (let ctype in componentMap) {
    result[componentMap[ctype].fieldName] = ""
  }

  for (let component of googlePlace.address_components) {
    for (let ctype of component.types) {
      const mapInfo = componentMap[ctype]
      if (mapInfo) {
        let val = component[mapInfo.variant]
        if (mapInfo.valueMap) val = mapInfo.valueMap(val)
        // suburb must only be set to sublocality_level_1 if it is not otherwise set
        if (!(ctype === "sublocality_level_1" && result.suburb)) {
          result[mapInfo.fieldName] = val
        }
      }
    }
  }

  if (result.suburb === result.city) {
    result.suburb = ""
  }

  if (googlePlace.geometry && googlePlace.geometry.location) {
    result.lat = googlePlace.geometry.location.lat()
    result.lng = googlePlace.geometry.location.lng()
  }

  return result
}

export default class PlacesSearchField extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: "" , gmapsLoaded: false , location: '(no location chosen)'}
  }

  componentDidMount () {
    if (window.initMap !== undefined){
      return
    }
    window.initMap = () => {
      this.setState({
        gmapsLoaded: true,
      })
    }
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.field.key}&libraries=places&callback=initMap`
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)
  }

  render() {
    const { onNotFound, ...others } = this.props
    const { address } = this.state

    const handleGeocodeResults = results => {
        const { onPlaceSelect } = this.props
        if (results.length > 0 && onPlaceSelect) {
          onPlaceSelect(googlePlaceToFields(results[0]))
        }
    }
    const handleChange = address => {
        this.setState({ address })
        }

        const handleSelect = (address, placeId) => {
        console.log(`handleSelect, address=${address}, placeId=${placeId}`)
        this.setState({ address })

        if (placeId) {
            geocodeByPlaceId(placeId)
            .then(this.handleGeocodeResults)
            .catch(err => {
                console.error("Google Maps error", err)
            })
        } else if (address) {
            geocodeByAddress(address)
            .then(this.handleGeocodeResults)
            .catch(err => {
                console.error("Google Maps error", err)
            })
        }
    }
    const {gmapsLoaded} = this.state
    return (
      <div>
      { gmapsLoaded && (
      
      <PlacesAutocomplete
        value={address}
        debounce={500}
        searchOptions={{ types: ["geocode"], componentRestrictions: { country: "za" } }}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          // There's a bit of horrible hackery to make react-places-autocomplete work with react-md
          const inputProps = getInputProps()
          const clickHandlers = [
            ...suggestions.map(s => getSuggestionItemProps(s).onClick),
            onNotFound
          ]
          const suggestionsData = onNotFound
            ? [...suggestions, { id: "not-found", description: "Not found, enter manually" }]
            : suggestions
          console.log("suggestions", suggestions)

          return (
            <ComboBox
              {...others}
              {...inputProps}
              // onChange={(_, e) => inputProps.onChange(e)}
              // following is a particularly naughty hack the effect of which is to make an "Enter"
              // keypress in the text field equivalent to selecting the first autocomplete option.
              onInputChange={e => {
                if (e.key === "Enter" && suggestions.length > 0) {
                  clickHandlers[0]()
                } else {
                  inputProps.onInputChange(e)
                }
              }}
              items={[
              ]}
              placeholder="Filter..."
              // onAutocomplete={(_, idx) => clickHandlers[idx]()}
              onChange={place => {
                console.log('place', place)
                this.setState({ location: JSON.stringify(place)})
              }}
              dataLabel="description"
              data={suggestionsData}
              filter={null}
            />
          )
        }}
      </PlacesAutocomplete>
      )}
      </div>
    )
  }
}
