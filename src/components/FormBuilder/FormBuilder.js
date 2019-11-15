import React from 'react'
import { Formik, Form } from 'formik'
import Fields from '../Fields'
import { IconButton } from 'u5-carbon-components-react'
import { ok } from 'assert'
import { Loading } from 'carbon-components-react';

const SubmitButton = props => <IconButton {...props}>Submit</IconButton>

export default props => {
  const { config, initialValues, onSubmit, renderSubmitButton, renderForm, ...remainingProps } = props
  ok(config && config.fields, 'requires "config" prop with fields')

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

  const _renderForm = renderForm
    ? renderForm
    : formikProps => {
      const submitButton = renderSubmitButton
        ? renderSubmitButton(formikProps)
        : <SubmitButton
            disabled={
              Object.keys(formikProps.errors).length > 0 ||
              formikProps.isSubmitting
            }
            type="submit"
          />

      return (
        <Form>
          <Fields fields={config.fields} formikProps={formikProps} formProps={remainingProps} />
          { formikProps.isSubmitting && <Loading /> }
          {submitButton}
        </Form>
      )
    }

  return (
    <Formik
      // validateOnChange
      initialValues={_initialValues}
      validate={config.validate}
      onSubmit={
        onSubmit ||
        (values => {
          alert('No "onSubmit" provided, values: ' + JSON.stringify(values))
        })
      }
      {...remainingProps}
    >
      {_renderForm}
    </Formik>
  )
}
