import React, { useEffect, useState }  from 'react'
import { ComboBox } from 'carbon-components-react'
import { useField } from 'formik'
import { ok } from 'assert'

export default ({ name, label, options, formikProps }) => {

  console.log('see options=====>', name)

  const [ _options, setOptions ] = useState(null)
  const { handleChange, values } = formikProps
  
  ok(options, `Missing options for field ${name}`)

  useEffect(() => {
    Promise.resolve(typeof options === 'function' ? options() : options).then(options => {
      ok(
        options instanceof Array,
        `Field ${name}, options must be an array, or a function resolving to an array.`
      )
      setOptions(options)
    })
  })
  if (options === null) {
    return {}
  } else {
    return <div>
      <div >
        {name}
      </div>
    <ComboBox
      id="carbon-combobox-example"
      name="name"
      placeholder="Filter..."
      defaultValue={values[name]}
      onChange={handleChange}
      items={options.map(option=>({
        id:option.value, text:option.name
      })
      )} 
      />
      </div>
  }
}