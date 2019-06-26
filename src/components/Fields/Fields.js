import React from 'react'
import { Form, FormGroup, RadioButton, TextInput, NumberInput } from 'carbon-components-react'
import { IconButton } from 'u5-carbon-components-react'

import SelectOne from '../SelectOne'

const Field = ({ field, values, errors, touched, handleChange, handleBlur, formProps }) => {
  const { type, name, label, placeholder } = field

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

    case 'number':
      return (
        <NumberInput
          name={name}
          label={label}
          invalid={touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          value={values[name] || 0}
          onBlur={handleBlur}
          onChange={e => handleChange(e)}
          placeholder={field.placeholder}
        />
      )

    case 'text':
      return (
        <TextInput
          name={name}
          labelText={label}
          type="text"
          value={values[name] || ''}
          invalid={touched[name] && errors[name] !== undefined}
          invalidText={touched[name] && errors[name]}
          onBlur={handleBlur}
          onChange={e => handleChange(e)}
          placeholder={field.placeholder}
        />
      )

    case 'select-one':
      return (
        <SelectOne {...field} formikProps={{ values, errors, touched, handleChange, handleBlur }}/>
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

    // case 'date': // TODO: This doesn't update formik input
    //   return (
    //     <DatePicker
    //       id={field.name}
    //       name={field.name}
    //       label={field.label}
    //       value={values[field.name]}
    //       inline
    //       displayMode="portrait"
    //       fullWidth={false}
    //       onChange={(val, e) => handleChange(e)}
    //     />
    //   )

    default:
      return <div>Unknown field type {type}</div>
  }
}

const Fields = ({ fields, formikProps, formProps }) => {
  return <>
    {
      fields.map(f => (
        <Field key={f.name} field={f} {...formikProps} formProps={formProps} />
      ))
    }
  </>
}

export default Fields
