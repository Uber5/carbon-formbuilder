Use this to select an address, including latitude and longitude, using Google Places search.

After successfully selecting a location, the value will be an object with the
following properties:

- `address_components`: The components of the address (e.g. country, street number, etc.), as per [Google Places](https://developers.google.com/places/web-service/details#PlaceDetailsResults)
- `formatted_address`: A string with the formatted address, for display purposes.
- `lat` and `lng`: Latitude and longitude of the address

:warning: TODO: Currently experimenting with not passing the key in the way
described here.

In the code snippet below, replace the key with your own key for testing. The key below is probably disabled.

In the field config, `searchOptions` can be used to e.g. limit locations to a country.

:warning: TODO: The Google key needs (at least) the following APIs enabled:
- Geocoding API
- Maps Javascript API
- Places API

```js
import FormBuilder from '../FormBuilder';

const fields = [
  {
    name: 'address',
    label: 'Business address',
    type: 'select-location',
    key: 'AIzaSyBNM-zWwvvpbql_--TOcI_qpbURllpu4aY',
    searchOptions: {
      types: ['geocode'],
      componentRestrictions: { country: 'za' }
    }
  }
];

<FormBuilder
  config={{ fields }}
  initialValues={{ continent: 'a' }}
  onSubmit={(values, actions) => {
    alert('submitted, values: ' + JSON.stringify(values))
    actions.setSubmitting(false)
  }}
/>
```
