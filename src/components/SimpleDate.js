import React, { useState } from 'react'
import { DatePicker, DatePickerInput } from 'carbon-components-react'

const formatDateFromParts = parts => (
  `${parts.year}-${parts.month > 9 ? '' : '0'}${parts.month}-${parts.day > 9 ? '' : '0'}${parts.day}`
)

const parseDateString = value => {
  const maxDayPerMonth = {
    '1': 31, '2': 29, '3': 31, '4': 30, '5': 31, '6': 30,
    '7': 31, '8': 31, '9': 30, '10': 31, '11': 30, '12': 31
  }
  const pattern = /(\d{4})-(\d{1,2})-(\d{1,2})/
  const match = value.match(pattern)
  console.log('parseDateString, match', match)
  if (!match || match.length !== 4) {
    return null
  }
  const parsed = {
    year: new Number(match[1]),
    month: new Number(match[2]),
    day: new Number(match[3])
  }
  const { year, month, day } = parsed
  if (month > 12 || month < 1 || day < 1 || day > maxDayPerMonth[month]) {
    return null
  }
  return parsed
}

export default ({ field, formikProps }) => {
  const { values, errors, touched, handleBlur, setFieldValue } = formikProps
  const { name, label, placeholder } = field

  const [ text, setText ] = useState(values[name] ? values[name] : '')
  const [ localError, setLocalError ] = useState(null)

  return (
    <>
      <DatePicker name={name}
        datePickerType="single"
        onChange={value => {
          const dateValue = value[0] // TODO: why do we get an array? Must check carbon react components more
          if (dateValue) {
            const dateParts = {
              year: dateValue.getFullYear(),
              month: dateValue.getMonth() + 1,
              day: dateValue.getDate() 
            }
            const formattedDate = formatDateFromParts(dateParts)
            // console.log('date from dateValue', formattedDate)
            setFieldValue(name, formattedDate, false) // TODO: validate or not?
            setLocalError(null)
            setText(formattedDate)  
          } else {
            setText('')
            setLocalError(null)
            setFieldValue(name, null, false)
          }
        }}
      >
        <DatePickerInput
          name={name}
          invalid={!!localError || touched[name] && errors[name] !== undefined}
          value={text}
          type='text'
          fullWidth={false}
          labelText={label}
          handleBlur={handleBlur}
          pattern='\d{4}-\d{1,2}-\d{1,2}'
          // placeholder="yyyy-mm-dd"
          onChange={e => {
            const { value } = e.target
            // console.log('DatePickerInput, onChange, value', value)
            if (!value || value.length === 0) {
              setFieldValue(name, null, true)
              setText('')
              setLocalError(null)
            } else {
              // try to parse
              const parsed = parseDateString(value)
              if (parsed) {
                setFieldValue(name, formatDateFromParts(parsed), true)
                setLocalError(null)
                setText(formatDateFromParts(parsed))
              } else {
                setLocalError('Invalid date')
                setFieldValue(name, null, true)
                setText(value)
              }
            }
          }}
        />
      </DatePicker>
    </>
  )
}