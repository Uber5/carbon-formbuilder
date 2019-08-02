import React, { useState } from 'react'
import { NumberInput ,TextInput} from 'carbon-components-react'

export default props => {
    const { field, values, errors, touched, handleBlur,handleChange } = props
    const { name, label } = field
    const [ localError ] = useState(null)

    return (
        <TextInput
          name={name}
          label={label}
          invalid={!!localError ||touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          value={values[name] || ""}
          onBlur={handleBlur}
          onChange={e => handleChange(e)}
          placeholder={field.placeholder}
        />
      )
}
