import React, { useState } from 'react'
import { Button, ComposedModal, ModalHeader, ModalBody, ModalFooter } from 'carbon-components-react'

import FormBuilder from '../FormBuilder'
import Fields from '../Fields/Fields';
import Loading from 'carbon-components-react/lib/components/Loading';

export default ({
  renderToggleButton, config, initialValues, onSubmit,
  modalProps,
  modalHeaderProps, modalFooterProps,
  ...props
}) => {
  const [ isOpen, setOpen ] = useState(false)

  const onToggle = () => {
    setOpen(!isOpen)
  }

  const toggleButton = renderToggleButton
    ? renderToggleButton({ onClick: onToggle })
    : <Button onClick={onToggle}>Open form dialog</Button>

  let form = React.createRef()

  return <>
    {toggleButton}
    <FormBuilder
      config={config}
      initialValues={initialValues}
      renderSubmitButton={() => null}
      renderForm={formikProps => {
        return (
          <ComposedModal
            open={isOpen}
            onClose={() => setOpen(false)}
            {...modalProps}
          >
            <ModalHeader title='Modal form' {...modalHeaderProps} />
            <ModalBody>
              <Fields fields={config.fields} formikProps={formikProps} formProps={props} />
              {formikProps.isSubmitting && <Loading small />}
            </ModalBody>
            <ModalFooter
              primaryButtonText='Submit'
              primaryButtonDisabled={
                Object.keys(formikProps.errors).length > 0 || // TODO: not DRY, same logic as in ../FormBuilder
                formikProps.isSubmitting  
              }
              onRequestClose={() => setOpen(false)}
              onRequestSubmit={formikProps.submitForm}
              {...modalFooterProps}
            />
          </ComposedModal>
        )
      }}
      onSubmit={async (values, actions) => {
        try {
          await onSubmit(values, actions)
          actions.setSubmitting(false)
          setOpen(false)
        } catch (e) {
          alert('Submit failed: ' + e.message) // TODO: better error handling
        }
      }}
    />
  </>
}
