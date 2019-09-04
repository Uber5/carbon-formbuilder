## Intro

This package facilitates creating web forms, by using a small'ish configuration to define form fields, their types and other properties. It makes building forms faster and with  better quality, therefore it's a form builder :)

Forms created via this form builder work with [React](https://reactjs.org/).
The form builder uses [Formik](https://www.npmjs.com/package/formik) to manage form state; the user of the form builder (you) may remain oblivious to that.


### Installation

Let's assume you've installed React and its peer dependencies previously:

```bash static
npm install react react-dom
```

... then you can install formbuilder together with its peer dependencies:

```bash static
npm install u5-carbon-formbuilder carbon-components \
  carbon-components-react carbon-icons u5-carbon-components-react \
  formik
```

See also [the NPM package](https://www.npmjs.com/package/u5-carbon-formbuilder).

### Field Types

Below form demonstrates all field types.

The `select-location` type is excluded for now, as it won't work with a Google Maps API key.

```js
import FormBuilder from '../src/components/FormBuilder';
import { fieldTypes } from '../src/components/Fields';

const fields = fieldTypes.map(t => ({
  label: `Field of type "${t}"`,
  name: `field-${t}`,
  type: t,
  options: t === 'select-one' || t === 'select-multi' ? [
    { name: 'Option 1', value: 'one' },
    { name: 'Option 2', value: 'two' }
  ] : undefined
}));

<FormBuilder
  config={{ fields }}
  onSubmit={(values, actions) => {
    alert(`values: ${JSON.stringify(values)}`)
    actions.resetForm({})
  }}
/>

```
