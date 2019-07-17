
```js
import FormBuilder from '../FormBuilder';
const options = async () => {
      await new Promise(res => setTimeout(res, 500))
      return [
        {
          name: 'someDate',
          value: 'date',
        }
      ]
    }

const fields = [
  {
    name: 'date',
    label: 'mm/dd/yyyy',
    type: 'date',
    options:options()
  }
];
const validate = values => {
  const errors = {}
  const { someDate } = values

  // validate someEmail
  if (!someDate) {
    errors.someDate = 'Required'
  } else if (!/^(0[1-9]|1[0-2])\/((0[1-9]|2\d)|3[0-1])\/(19\d\d|200[0-3])$/i.test(someDate)) {
    errors.someDate = 'Invalid date format'
  }
}
<FormBuilder
  config={{ fields, validate}}
  onSubmit={(values, actions) => {
    alert(`values: ${JSON.stringify(values)}`)
    actions.setSubmitting(false);
  }}
/>
```
