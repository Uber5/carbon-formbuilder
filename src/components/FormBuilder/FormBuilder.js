import React from 'react'
import { Formik, Form } from 'formik'
import { Field, SubmitButton } from './fields'
import { FormItem, FormGroup } from 'carbon-components-react'
import { ok } from 'assert'

export default ({ config, initialValues, onSubmit, renderSubmitButton, formRef, ...props }) => {
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

  console.log('formRef', formRef)
  
  return (
    <Formik
      validateOnChange
      initialValues={_initialValues}
      validate={config.validate}
      ref={formRef}
      onSubmit={
        onSubmit ||
        (values => {
          alert('No "onSubmit" provided, values: ' + JSON.stringify(values))
        })
      }
    >
      {formikProps => {
        const submitButton = renderSubmitButton
          ? renderSubmitButton() // TODO: needs props (but which ones? how to programmatically submit?)
          : <SubmitButton
              disabled={
                Object.keys(formikProps.errors).length > 0 ||
                formikProps.isSubmitting
              }
              type="submit"
            />

        return (
          <Form>
            {config.fields.map(f => {
              ok(f.name && f.type, 'fields require a name and a type')
              return (
                <Field key={f.name} field={f} {...formikProps} formProps={props} />
              )
            })}
            {submitButton}
          </Form>
        )
      }}
    </Formik>
  )
}
