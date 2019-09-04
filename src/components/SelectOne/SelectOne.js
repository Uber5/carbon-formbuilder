import React, { useEffect, useState }  from 'react'
import { Select, SelectItem, SelectSkeleton, ComboBox } from 'carbon-components-react'
import useOptions from '../../lib/useOptions'

export default ({ name, label, options, searchable, useOptionsFn, optionsFn, formikProps, formProps }) => {

  const { handleChange, values, setFieldValue } = formikProps
  const _options = useOptions({ options, useOptionsFn, optionsFn, formProps })

  const [ previousValue, setPreviousValue ] = useState(values[name])
  const [ resetting, setResetting ] = useState(false)

  useEffect(() => {
    if (!values[name] && previousValue) {
      setResetting(true)
      setTimeout(() => setResetting(false), 200)
    }
    setPreviousValue(values[name])
  }, [ previousValue, values ])

  if (_options === null || resetting) {
    return <SelectSkeleton />
  } else if (searchable) {
    return (
      <ComboBox
        name={name}
        titleText={label}
        items={_options}
        itemToString={item => item ? item.name : ''}
        shouldFilterItem={() => true}
        onChange={({ selectedItem }) => {
          setFieldValue(name, selectedItem ? selectedItem.value : null)
        }}
      />
    )
  } else {
    return (
      <Select
        name={name}
        labelText={label}
        defaultValue={values[name] || "placeholder-item"}
        value={values[name]}
        onChange={handleChange}
      >
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose one..."
        />
        {
          _options.map(option => (
              <SelectItem key={option.value} value={option.value} text={option.name} > </SelectItem>
          ))
        }  
      </Select>
    )
  }
}
