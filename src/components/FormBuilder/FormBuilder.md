
Build a form using a description of fields:

```js
const fields = [
  {
    name: 'field1',
    type: 'text'
  }
];

<FormBuilder
  config={{fields}}
  onSubmit={values => alert(`values: ${JSON.stringify(values)}`)}
/>
```
