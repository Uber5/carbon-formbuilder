import React from "react"
import { ComboBox, DropdownSkeleton } from "carbon-components-react"
import PlacesAutocomplete, {
  geocodeByPlaceId,
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete"

export default class PlacesSearchField extends React.Component {
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
    const { address, gmapsLoaded } = this.state
    if (!gmapsLoaded) {
      return <DropdownSkeleton />
    }
    return (
      <PlacesAutocomplete
        value={address}
        onChange={address => this.setState({ address })}
        onSelect={address => {
          console.log('onSelect, address', address)
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <ComboBox
              items={suggestions || []}
              itemToString={item => {
                console.log('item', item)
                return item.description
              }}
              placeholder='placeholder...'
              titleText='Location title...'
              onChange={({ selectedItem }) => {
                console.log('onChange, selectedItem', selectedItem)
                this.props.setFieldValue(this.props.field.name, selectedItem, false)
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
