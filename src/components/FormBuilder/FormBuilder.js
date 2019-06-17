import React from 'react'
import { Formik, Form } from 'formik'
import { Field, SubmitButton } from './fields'
import { FormItem, FormGroup } from 'carbon-components-react'

export default ({ config, initialValues, onSubmit, ...props }) => {
  const _initialValues = Object.assign(
    {},
    config.fields
      .filter(f => f.value !== undefined)
      .reduce((obj, f) => {
        obj[f.name] = f.value
        return obj
      }, {}),
    initialValues || {}
  )
  console.log('initialValues', _initialValues)
  return (
    <Formik
      validateOnChange
      initialValues={_initialValues}
      validate={config.validate}
      onSubmit={
        onSubmit ||
        (values => {
          alert('No "onSubmit" provided, values: ' + JSON.stringify(values))
        })
      }
    >
      {formikProps => {
        return (
          <Form>
            <FormGroup legendText="Form fields">
              {config.fields.map(f => (
                <Field key={f.name} field={f} {...formikProps} formProps={props} />
              ))}
            </FormGroup>
            <FormGroup legendText="Form controls">
              <SubmitButton
                disabled={
                  Object.keys(formikProps.touched).length === 0 ||
                  Object.keys(formikProps.errors).length > 0 ||
                  formikProps.isSubmitting
                }
                type="submit"
              />
            </FormGroup>
          </Form>
        )
      }}
    </Formik>
  )
}
