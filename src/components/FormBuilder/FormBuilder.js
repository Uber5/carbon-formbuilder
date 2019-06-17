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
            {config.fields.map(f => (
              <Field key={f.name} field={f} {...formikProps} formProps={props} />
            ))}
            <SubmitButton
              disabled={
                Object.keys(formikProps.errors).length > 0 ||
                formikProps.isSubmitting
              }
              type="submit"
            />
          </Form>
        )
      }}
    </Formik>
  )
}
