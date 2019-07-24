import React from 'react'
import useOptions from  '../../lib/useOptions'
import { SelectSkeleton, MultiSelect } from  'carbon-components-react'
export default ({ formikProps, formProps, ...field }) => {
  const options = useOptions(field)

  const { touched, errors, setFieldValue } = formikProps

  if (!options) {
    return <SelectSkeleton />
  }

  const Component = field.searchable ? MultiSelect.Filterable : MultiSelect

  return <Component
    {...field}
    name={field.name}
    label={field.label}
    titleText={field.label}
    invalid={touched[name] && errors[name] !== undefined}
    invalidText={touched[name] && errors[name]}
    items={options}
    itemToString={option => option.name}
    onChange={({ selectedItems }) => {
      console.log('MultiSelect onChange, e', selectedItems)
      setFieldValue(field.name, selectedItems.map(e => e.value))
    }}
  />
}
