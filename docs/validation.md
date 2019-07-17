
Validation is leveraging [Formik's validation](https://jaredpalmer.com/formik/docs/guides/validation):

1. field level validation
2. form level validation


## Field Level Validation

Field level validation is enabled by passing a `validate` property (the example does email validation, but note that it's easier to use the field *type* `email` for that):

```js
import FormBuilder from '../src/components/FormBuilder';

const fields = [
  {
    label: 'Some Field with validation',
    name: 'field1',
    type: 'text',
    validate: value => {
      let err
      if (!value) {
        err = 'Required'
      } else {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))  {
          err = 'Invalid email address'
        }
      }
      return err
    }
  }
];

const initialValues = {
  field1: 'initial...'
};

<FormBuilder
  config={{ fields }}
  initialValues={initialValues}
  onSubmit={(values, actions) => {
    alert(`values: ${JSON.stringify(values)}`)
    actions.setSubmitting(false)
  }}
/>
```

## Form Level Validation

...

## Built-In Validation

### Email

```js
import FormBuilder from '../src/components/FormBuilder';

const fields = [
  {
    label: 'Email',
    name: 'email',
    type: 'email'
  }
];

<FormBuilder
  config={{ fields }}
  onSubmit={(values, actions) => {
    alert(`values: ${JSON.stringify(values)}`)
    actions.setSubmitting(false)
  }}
/>
```
