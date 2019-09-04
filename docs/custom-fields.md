Demonstrates how a custom field type can be used (via a simple plugin mechanism):

1. Include the required dependencies into your project, in this example `react-draft-wysiwyg` etc:

  ```bash
  npm install react-draft-wysiwyg draft-js draftjs-to-html
  ```

2. Define plugins: It is a JavaScript object, where each property key represents a type, in our case 
we add a type `para` (for "paragraph of text").

3. Define your `config`, where you can now use the types defined in the plugins. In the example below,
we define a field `someField` of type `para`.

4. Render the form using the `FormBuilder` component, where you pass the plugins in
a prop `pluginFieldTypes`.

## Custom Field Type: Formatted Text

```js
import { useState } from 'react';
import { FormBuilder } from '../src';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const plugins = {
  para: {
    render: ({ field, formikProps: { setFieldValue } }) => {
      const [ editorState, editorStateChanged ] = useState(null)
      return <>
        <em>{field.label}</em>
        <Editor editorState={editorState} onEditorStateChange={e => {
          console.log('plain text', e.getCurrentContent().getPlainText())
          const rawContentState = convertToRaw(e.getCurrentContent());
          const markup = draftToHtml(
            rawContentState, 
            /* hashtagConfig, 
            directional, 
            customEntityTransform */
          );
          console.log('markup', markup);
          editorStateChanged(e);
          setFieldValue(field.name, markup);
        }}/>
      </>
    }
  }
};

const config = {
  fields: [
    {
      name: 'someField',
      label: 'Some Field',
      type: 'para'
    }
  ]
};

<FormBuilder config={config} pluginFieldTypes={plugins} onSubmit={(values, actions) => {
  alert(`values: ${JSON.stringify(values)}`)
  actions.setSubmitting(false)
}}/>
```

## Custom Field Type: Phonenumber

```js
import { useState, useEffect } from 'react';
import { TextInput, TextInputSkeleton } from 'carbon-components-react';
import { FormBuilder, useIsResetting } from '../src';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';

const plugins = {
  phone: {
    render: ({ field, formikProps, formikField }) => {
      const { values, errors, touched, handleChange, handleBlur, setTouched, setFieldValue } = formikProps
      const { type, name, label, placeholder, disableAutoTouch } = field
      const [ asYouType, _ ] = useState(new AsYouType())
      const [ asTyped, setAsTyped ] = useState(values[name] || '')
      const [ isValid, setIsValid ] = useState(false)
      const [ displayValue, setDisplayValue ] = useState(values[name] || '')
      
      const isResetting = useIsResetting({ value: values[name] })

      useEffect(() => {
        if (isResetting) {
          setAsTyped(values[name] || '')
          setDisplayValue(values[name] || '')
        } else {
          const parsed = parsePhoneNumberFromString(asTyped)
          if (parsed && parsed.isValid()) {
            setFieldValue(name, parsed.number)
            setDisplayValue(parsed.formatInternational())
          } else {
            setDisplayValue(asTyped)
          }
        }
      }, [ asTyped, isResetting ])

      if (isResetting) {
        return <>
          <TextInputSkeleton labelText={label} />
        </>
      }

      return <>
        <TextInput name={name} 
          {...formikField}
          labelText={label}
          type="text"
          value={displayValue}
          invalid={touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          onBlur={handleBlur}
          onChange={e => {
            setAsTyped(e.target.value)
          }}
          placeholder={placeholder}
        />
      </>
    }
  }
};

const config = {
  fields: [
    {
      name: 'somePhonenumberField',
      label: 'Some Phone Number',
      type: 'phone'
    }
  ]
};

<FormBuilder config={config} pluginFieldTypes={plugins} onSubmit={(values, actions) => {
  alert(`values: ${JSON.stringify(values)}`)
  actions.resetForm()
}}/>
```
