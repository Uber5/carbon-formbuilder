Use this to select one value from a finite list of values.

(more doc here...)

```js
import FormBuilder from '../FormBuilder';

const fields = [
  {
    name: 'select1',
    label: 'Select one element...',
    type: 'select-one',
    options: async () => {
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
  }
];

<FormBuilder config={{ fields }} />
```
