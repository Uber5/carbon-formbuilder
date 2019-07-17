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
    }

const fields = [
  {
    name: 'select1',
    label: 'Select one element...',
    type: 'select-one',
    options:options()
  }
];

<FormBuilder
  config={{ fields }}
  onSubmit={(values, actions) => {
    alert(`values: ${JSON.stringify(values)}`)
    actions.setSubmitting(false);
  }}
/>
```
