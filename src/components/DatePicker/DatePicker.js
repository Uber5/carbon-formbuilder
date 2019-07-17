import React, { useEffect, useState }  from 'react'
import { DatePicker, DatePickerInput, DatePickerSkeleton } from 'carbon-components-react'
import { ok } from 'assert'

export default ({ name, label, options }) => {

  const [ _options, setOptions ] = useState(null)

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
    return <DatePickerSkeleton />
  } else {
    return <DatePicker> 
        {_options.map(option => 
        (
           <DatePickerInput value={option.val} text={option.name} > </DatePickerInput> 
        )
      )}  </DatePicker> 
  }
}