import React, { useEffect, useState }  from 'react'
import { Select, SelectItem, SelectSkeleton, ComboBox } from 'carbon-components-react'
import useOptions from '../../lib/useOptions'

export default ({ name, label, options, searchable, useOptionsFn, optionsFn, formikProps, formProps }) => {

  const { handleChange, values, setFieldValue } = formikProps
  const _options = useOptions({ options, useOptionsFn, optionsFn, formProps })

  if (_options === null) {
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
