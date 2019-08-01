
Build a form using a description of fields:

```js
const fields = [
  {
    label: 'Some Field',
    name: 'field1',
    type: 'text'
  },
  {
    label: 'Some number',
    name: 'number',
    type: 'number'
  },

];

const validate = values => {
  const errors = {}
  const { field1, number } = values

  // validate field1
  if (!field1 || field1.length < 3) {
    errors.field1 = 'Requires at least 3 characters'
  }

  // validate number
  if (number && number > 99) {
    errors.number = 'Number must be less than 100'
  }

  return errors
};

<FormBuilder
  config={{ fields, validate }}
  onSubmit={(values, actions) => {
    alert(`values: ${JSON.stringify(values)}`)
    actions.setSubmitting(false)
  }}
/>
```

## Form with initial values

```js
const fields = [
  {
    label: 'Some Field with initial value',
    name: 'field1',
    type: 'text'
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

## Form with email and password

```js
const fields = [
  {
    label: 'Some email',
    name: 'someEmail',
    type: 'email'
  },
  {
    label: 'Some password',
    name: 'somePassword',
    type: 'password'
  }
];

const validate = values => {
  const errors = {}
  const { someEmail, somePassword } = values

  // validate someEmail
  if (!someEmail) {
    errors.someEmail = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(someEmail)) {
    errors.someEmail = 'Invalid email address'
  }

  // validate somePassword
  if (!somePassword) {
    errors.somePassword = 'Required'
  } else if (somePassword.length < 2) {
    errors.somePassword = 'Password is too short'
  }

  return errors
};
<FormBuilder
  config={{ fields, validate }}
  onSubmit={(values, actions) => {
    alert(`values: ${JSON.stringify(values)}`)
    actions.setSubmitting(false);
  }}
/>
```
## Form with date 

```js
const fields = [
  {
    label: 'Some date',
    name: 'someDate',
    type: 'date'
  }
];
const validate = values => {
  const errors = {}
  const { date } = values

  // validate date
  if (!date) {
    errors.date = 'Required'
  } else if (!/^(0[1-9]|1[0-2])\/((0[1-9]|2\d)|3[0-1])\/(19\d\d|200[0-3])$/i.test(date)) {
    errors.date = 'Invalid date format'
  }
}
<FormBuilder
  config={{ fields,validate}}
  onSubmit={(values, actions) => {
    alert(`values: ${JSON.stringify(values)}`)
    actions.setSubmitting(false);
  }}
/> 

```
