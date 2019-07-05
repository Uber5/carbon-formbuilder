Use this to select one value from a finite list of values.

The `options` can be supplied in a function (with may resolve / be async), or as an array, see the example below.

Groups of options are not supported yet, but may be added in a later release.

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
    type: 'select-one',
    options:options()
  },
  {
    name: 'continent',
    label: 'Select (2) (with default value)',
    type: 'select-one',
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
