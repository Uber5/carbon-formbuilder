import React from "react"
import { ComboBox, DropdownSkeleton } from "carbon-components-react"
import PlacesAutocomplete, {
  // geocodeByPlaceId,
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete"

export default class LocationField extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: '', gmapsLoaded: false }
  }

  componentDidMount () {
    if (window.initMap !== undefined){
      this.setState({
        gmapsLoaded: true,
      })
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
    const { field } = this.props
    const { address, gmapsLoaded } = this.state
    if (!gmapsLoaded) {
      return <DropdownSkeleton />
    }
    return (
      <PlacesAutocomplete
        value={address}
        debounce={500}
        searchOptions={field.searchOptions}
        onChange={address => this.setState({ address })}
        onSelect={async address => {
          try {
            const results = await geocodeByAddress(address)
            const firstResult = results[0]
            const latLng = await getLatLng(firstResult)
            this.props.formikProps.setFieldValue(this.props.field.name, {
              address_components: firstResult.address_components,
              formatted_address: firstResult.formatted_address,
              ...latLng
            }, false)
          } catch (e) {
            alert(`Error while fetching address details: ${e.message}`)
          }
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <ComboBox
              items={suggestions || []}
              itemToString={item => {
                return item ? item.description : ''
              }}
              placeholder='Search address..'
              titleText={field.label || 'Address'}
              onChange={({ selectedItem }) => {
                if (selectedItem) {
                  getInputProps().onChange({ target: { value: selectedItem } })
                  getSuggestionItemProps(selectedItem).onClick({ target: { value: selectedItem }})
                } else {
                  this.props.formikProps.setFieldValue(this.props.field.name, null, false)
                }
              }}
              onInputChange={text => {
                getInputProps().onChange({ target: { value: text }})
              }}
            />
          )
        }}
      </PlacesAutocomplete>
    )
  }
}
