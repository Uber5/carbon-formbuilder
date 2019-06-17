
```js
const fields = [
  {
    label: 'Some text',
    name: 'someText',
    type: 'text'
  }
]

const validate = ({ someText }) => {
  const errors = {}
  if (!someText || someText.length < 3) {
    errors.someText = 'Requires 3 or more characters'
  }
  return errors
}

const onSubmit = (values, actions) => {
  alert(`values: ${JSON.stringify(values)}`)
  actions.setSubmitting(false)
}

;

<ModalForm
  config={{ fields, validate, onSubmit }}
  modalHeaderProps={{
    title: 'My Modal Form'
  }}
/>
```
