import React from 'react'
import { SelectSkeleton, MultiSelect } from  'carbon-components-react'
import useOptions from  '../../lib/useOptions'
import useIsResetting from '../../lib/useIsResetting'

export default ({ formikProps, formProps, ...field }) => {
  const options = useOptions(field)
  // the value to do the reset check is a string, so that the equality
  // test of useIsResetting is effective
  const isResetting = useIsResetting({
    value: (formikProps.values[field.name] || []).map(e => e.toString()).join('-')
  })
  const { touched, errors, setFieldValue } = formikProps

  if (!options || isResetting) {
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
    initialSelectedItems={options.filter(o => (formikProps.values[field.name] || []).includes(o.value))}
    onChange={({ selectedItems }) => {
      setFieldValue(field.name, selectedItems.map(e => e.value))
    }}
  />
}
