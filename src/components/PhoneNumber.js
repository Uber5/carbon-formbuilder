import React, { useState } from 'react'
import { NumberInput } from 'carbon-components-react'

export default props => {
    const { field, values, errors, touched, handleBlur,handleChange } = props
    const { name, label } = field
    const [ localError ] = useState(null)

    return (
        <NumberInput
          name={name}
          label={label}
          invalid={!!localError ||touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          value={values[name] || 0}
          onBlur={handleBlur}
          min={0}
          max={99999999999}
          onChange={e => handleChange(e)}
          placeholder={field.placeholder}
        />
      )
}
