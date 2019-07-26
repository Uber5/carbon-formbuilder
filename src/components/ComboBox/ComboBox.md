Use this to select one value from a finite list of values.

(component not ready yet, also need more doc here...)

```js
import FormBuilder from '../FormBuilder';

const fields = [
  {
    label:"something",
    type:'combo-box',
    name:'grade',
    items:[
    { text: 'Europe', id: 'e' },
    { text: 'Africa', id: 'a' }
  ]
  },
  {
    type:'combo-box',
    name:'name',
    label:"something",
    items: [
      { text: 'Europe', id: 'e' },
      { text: 'Africa', id: 'a' }
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
