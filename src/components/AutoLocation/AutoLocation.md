Use this to select one value from a finite list of values.

(component not ready yet, also need more doc here...)

```js
import FormBuilder from '../FormBuilder';

const options = async () => {
  await new Promise(res => setTimeout(res, 500))
  return [
    {
      name: 'Option 1',
      value: 'val1'
    },
    {
      name: 'Option 2',
      value: 'val2'
    },
  ]
};

const fields = [
  {
    name: 'select1',
    label: 'Select one element...',
    type: 'select-location',
    options:options()
  },
  {
    name: 'continent',
    label: 'Select (2) (with default value)',
    type: 'select-location',
    options: [
      { name: 'Europe', value: 'e' },
      { name: 'Africa', value: 'a' }
    ]
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
