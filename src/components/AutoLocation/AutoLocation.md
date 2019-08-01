Use this to select one value from a finite list of values.

(component not ready yet, also need more doc here...)

```js
import FormBuilder from '../FormBuilder';

const fields = [
  {
    name: 'select1',
    label: 'Select one element...',
    type: 'select-location',
    key: 'AIzaSyBNM-zWwvvpbql_--TOcI_qpbURllpu4aY'
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