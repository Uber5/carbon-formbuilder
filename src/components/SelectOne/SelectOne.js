import React, { useEffect, useState }  from 'react'
import { Select, SelectItem, SelectSkeleton } from 'carbon-components-react'
import { useField } from 'formik'
import { ok } from 'assert'

export default ({ name, label, options, formikProps }) => {

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
  if (_options === null) {
    return <SelectSkeleton />
  } else {
    return <div>
      <div >
        {name}
      </div>
    <Select
      name={name}
      hideLabel
      defaultValue={values[name]}
      onChange={handleChange}
      >
      {_options.map(option =>
        (
          <SelectItem key={option.value} value={option.value} text={option.name} > </SelectItem>
        )
      )}  
      </Select>
      </div>
  }
}