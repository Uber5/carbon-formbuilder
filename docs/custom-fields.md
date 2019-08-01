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

```js
import { useState } from 'react';
import { FormBuilder } from '../src';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const plugins = {
  para: {
    render: ({ field, setFieldValue }) => {
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
