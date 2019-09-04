import React, { useState, useEffect } from 'react'
import { TextInput, NumberInput } from 'carbon-components-react'
import { Field as FormikField } from 'formik'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import SelectOne from '../SelectOne'
import SelectMulti from '../SelectMulti'
import SimpleDate from '../SimpleDate'
import AutoLocation from '../AutoLocation'

const AUTOTOUCH_DELAY_MILLIS = 3000

const defaultValidationByFieldType = {
  email: value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(value)) {
      return 'Invalid email address'
    }
    return undefined
  
  },
  'phone-number': value => {
    let parsed
  
    parsed = parsePhoneNumberFromString(value)
    if (parsed && parsed.isValid()) {
      console.log('parsing...', parsed)
      return undefined
    }
  
    // try with prepending '+'
    parsed = parsePhoneNumberFromString('+' + value)
    if (parsed && parsed.isValid()) {
       return undefined
    }
    return 'Invalid contact number: ' + value
  }
}

export const fieldTypes = [
  'email', 'password', 'date', 'select-location', 'number',
  'text', 'select-one', 'select-multi'
]

const AutoTouchField = props => {
  
  const { field, formikField, formikProps, formProps } = props
  const { values, errors, touched, handleChange, handleBlur, setTouched } = formikProps
  const { type, name, label, placeholder, disableAutoTouch } = field
  const { pluginFieldTypes } = formProps
  
  // we implement 'auto touch' to set a field touched after 3 secs of making
  // the first change. TODO: should use debounce
  const [ isChanged, setChanged ] = useState(false)
  useEffect(() => {
    if (isChanged && !disableAutoTouch) {
      const timer = setTimeout(() => {
        setTouched({ [name]: true })
      }, AUTOTOUCH_DELAY_MILLIS)
      return () => clearTimeout(timer)
    }
  }, [ isChanged, disableAutoTouch ])

  switch (type) {
    case 'email':
      return (
        <TextInput
          name={name}
          labelText={label}
          invalid={touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          type="email"
          value={values[name] || ''}
          onBlur={handleBlur}
          onChange={e => {
            e.stopPropagation()
            handleChange(e)
            setChanged(true)
          }}
          placeholder={placeholder}
        />
      )

    case 'password':
      return (
        <TextInput.PasswordInput
          name={name}
          labelText={label}
          invalid={touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          value={values[name] || ''}
          onBlur={handleBlur}
          onChange={e => {
            e.stopPropagation()
            handleChange(e)
          }}
          placeholder={placeholder}
        />
      )
    case 'date':
      return <SimpleDate {...props} />
    case 'select-location':
      return <AutoLocation {...props}/>
    case 'number':
      return (
        <NumberInput
          name={name}
          label={label}
          invalid={touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          value={values[name] || 0}
          onBlur={handleBlur}
          onChange={e => {
            e.stopPropagation()
            handleChange(e)}
          } 
          placeholder={field.placeholder}
        />
      )

    case 'text':
      return (
        <TextInput
          {...formikField}
          labelText={label}
          type="text"
          invalid={touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          onBlur={handleBlur}
          onChange={e => {
            handleChange(e)
            setChanged(true)
          }}
          placeholder={placeholder}
        />
      )
    case 'select-one':
      return (
        <SelectOne
          {...field}
          formikProps={formikProps}
          formProps={formProps}
        />
      )

    case 'select-multi':
      return (
        <SelectMulti
          {...field}
          formikProps={formikProps}
          formProps={formProps}
        />
      )
    case 'phone-number':
      return (
        <TextInput
          {...formikField}
          labelText={label}
          invalid={touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          onBlur={handleBlur}
          type='phone-number'
          onChange={e => {
            console.log('event',e);
            
            handleChange(e)
            setChanged(true)
          }}
          placeholder={placeholder}
        />

      )


    // case 'checkbox':
    //   return (
    //     <SelectionControl
    //       id={field.name}
    //       name={field.name}
    //       label={field.label}
    //       type="checkbox"
    //       defaultValue={field.value || false}
    //       value={values[field.name]}
    //       onChange={(val, e) => handleChange(e)}
    //     />
    //   )

    // case 'switch':
    //   return (
    //     <SelectionControl
    //       id={field.name}
    //       name={field.name}
    //       label={field.label}
    //       type="switch"
    //       defaultValue={field.value || false}
    //       value={values[field.name]}
    //       onChange={(val, e) => handleChange(e)}
    //     />
    //   )

    // case 'search-multi-select':
    //   return (
    //     <React.Fragment>
    //       <DropdownMenu
    //         id={field.name}
    //         style={{ width: '100%' }}
    //         anchor={{
    //           x: DropdownMenu.HorizontalAnchors.INNER_LEFT,
    //           y: DropdownMenu.VerticalAnchors.BOTTOM
    //         }}
    //         position={DropdownMenu.Positions.BELOW}
    //         menuItems={field.value
    //           .filter(f => {
    //             const searchFieldId = field.name + '-search-field'
    //             const searchTerm = (values[searchFieldId] || '').toUpperCase()
    //             if (!searchTerm) return true
    //             let itemFound = false
    //             if (f.name.toUpperCase().indexOf(searchTerm) >= 0) itemFound = true
    //             return itemFound
    //           })
    //           .concat(false) // Placeholder to prevent empty array
    //           .map(
    //             (item, i, arr) =>
    //               arr.length === 1 ? (
    //                 <ListItem key="nothing-found-in-search" primaryText="Nothing found!" />
    //               ) : item ? ( // And here the placeholder is used
    //                 <ListItemControl
    //                   key={'list-item-control-' + item.name}
    //                   id={'list-item-control-' + item.name}
    //                   label={item.label}
    //                   name={item.name}
    //                   secondaryText={item.description || ''}
    //                   leftIcon={<FontIcon style={{ marginLeft: '10px' }}>{field.icon}</FontIcon>}
    //                   primaryAction={
    //                     <Checkbox
    //                       id={'checkbox-' + item.name}
    //                       label={item.name || ''}
    //                       name={item.name || ''}
    //                       labelBefore
    //                       checked={values[field.name].selected}
    //                       onChange={val => {
    //                         values[field.name].forEach(v => {
    //                           if (v.name === item.name) values[field.name].selected = val
    //                         })
    //                       }}
    //                     />
    //                   }
    //                 />
    //               ) : null
    //           )
    //           .filter(_ => _)} // And here the placeholder is removed
    //       >
    //         <TextField
    //           autoComplete="off"
    //           id={field.name + '-search-field'}
    //           label="Search..."
    //           value={values[field.searchText]}
    //           onChange={(val, e) => handleChange(e)}
    //         />
    //       </DropdownMenu>
    //       <List>
    //         {[{ name: 1, label: '1' }, { name: 2, label: '2' }].map(item => (
    //           <ListItem
    //             key={item.name}
    //             leftIcon={<FontIcon>{field.icon}</FontIcon>}
    //             rightIcon={<FontIcon>delete</FontIcon>}
    //             primaryText={item.name}
    //             secondaryText={item.description || ''}
    //             onClick={() => alert('hi')}
    //           />
    //         ))}
    //       </List>
    //     </React.Fragment>
    //   )

    default:
      if (pluginFieldTypes && pluginFieldTypes[type]) {
        return pluginFieldTypes[type].render(props)
      }
      return <div>Unknown field type {type}</div>
  }
}

const Fields = ({ fields, formikProps, formProps }) => {
  return <>
    {
      fields.map(_field => (
        <FormikField
          key={_field.name}
          name={_field.name}
          validate={_field.validate || defaultValidationByFieldType[_field.type]}
        >
          {({ field }) => <AutoTouchField
            field={_field}
            formikField={field}
            formikProps={formikProps}
            formProps={formProps}
          />}
        </FormikField>
      ))
    }
  </>
}

export default Fields
