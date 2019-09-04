import { ok } from 'assert'
import React, { useState } from 'react'
import { DatePicker, DatePickerInput, DatePickerSkeleton } from 'carbon-components-react'
import useIsResetting from '../lib/useIsResetting'

const formatDateFromParts = parts => (
  `${parts.year}-${parts.month > 9 ? '' : '0'}${parts.month}-${parts.day > 9 ? '' : '0'}${parts.day}`
)

const pattern = /(\d{4})-(\d{1,2})-(\d{1,2})/

const parseDateString = value => {
  const maxDayPerMonth = {
    '1': 31, '2': 29, '3': 31, '4': 30, '5': 31, '6': 30,
    '7': 31, '8': 31, '9': 30, '10': 31, '11': 30, '12': 31
  }
  // const pattern = /(\d{4})-(\d{1,2})-(\d{1,2})/
  const match = value.match(pattern)
  console.log('parseDateString, value, match', value, match)
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

  ok(
    !values[name] || values[name].toString().match(pattern),
    `value must be a string and match ${pattern}, but it is: ${values[name]}`
  )
  const text = values[name] ? formatDateFromParts(parseDateString(values[name])) : ''
  console.log('SimpleDate, name, text', name, text)
  const [ localError, setLocalError ] = useState(null)
  const isResetting = useIsResetting({ value: text })

  if (isResetting) {
    return <DatePickerSkeleton />
  }

  return (
    <>
      <DatePicker name={name}
        datePickerType="single"
        dateFormat='Y-m-d'
        onChange={value => {
          const dateValue = value[0] // TODO: why do we get an array? Must check carbon react components more
          if (dateValue) {
            const dateParts = getPartsFromDate(dateValue)
            const formattedDate = formatDateFromParts(dateParts)
            // console.log('date from dateValue', formattedDate)
            setFieldValue(name, formattedDate, false) // TODO: validate or not?
            setLocalError(null)
          } else {
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
              setLocalError(null)
            } else {
              // try to parse
              const parsed = parseDateString(value)
              if (parsed) {
                setFieldValue(name, formatDateFromParts(parsed), true)
                setLocalError(null)
              } else {
                setLocalError('Invalid date')
                setFieldValue(name, null, true)
              }
            }
          }}
        />
      </DatePicker>
    </>
  )
}

function getPartsFromDate(dateValue) {
  return {
    year: dateValue.getFullYear(),
    month: dateValue.getMonth() + 1,
    day: dateValue.getDate()
  };
}
