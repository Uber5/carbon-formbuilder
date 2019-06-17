
Minimal example of a modal form:

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

const onSubmit = async (values, actions) => {
  await new Promise(res => setTimeout(res, 1000)) // wait a bit, for the "submitting" effect
  alert(`values: ${JSON.stringify(values)}`)
  actions.setSubmitting(false)
}

;

<ModalForm
  config={{ fields, validate }}
  onSubmit={onSubmit}
/>
```

... and a more complete example, using more of the options:

```js
import { ButtonSet, IconButton } from 'u5-carbon-components-react'
import { iconAdd } from 'carbon-icons'

const fields = [
  {
    label: 'Name of the thing',
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

const onSubmit = async (values, actions) => {
  await new Promise(res => setTimeout(res, 1000))
  alert(`values: ${JSON.stringify(values)}`)
  actions.setSubmitting(false)
}

;

<ButtonSet>
  <ModalForm
    config={{ fields, validate }}
    onSubmit={onSubmit}
    modalHeaderProps={{
      label: 'Demonstrating Stuff',
      title: 'Adding a Thing'
    }}
    renderToggleButton={
      ({ onClick }) => <IconButton icon={iconAdd} onClick={onClick}>Add</IconButton>
    }
    modalProps={{
      danger: true
    }}
    modalFooterProps={{
      primaryButtonText: 'Add it now',
      secondaryButtonText: 'Cancel'
    }}
  />
  <IconButton>dummy button</IconButton>
</ButtonSet>
```

- `modelHeaderProps` allows anything that [`<ModalHeader>`](http://react.carbondesignsystem.com/?path=/story/composedmodal--using-header-footer-props) allows.
- `modalProps` allows anything [`ComposedModal`](http://react.carbondesignsystem.com/?path=/story/composedmodal--using-header-footer-props) allows.
- `modalFooterProps` ... ditto, but for `ModalFooter`.