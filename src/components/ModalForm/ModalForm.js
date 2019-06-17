import React, { useState } from 'react'
import { Button, ComposedModal, ModalHeader, ModalBody, ModalFooter } from 'carbon-components-react'

import FormBuilder from '../FormBuilder'

export default ({
  renderToggleButton, config, initialValues, onSubmit,
  modalProps,
  modalHeaderProps, modalFooterProps
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
    isOpen={isOpen ? 'true' : 'false'}
    <ComposedModal
      open={isOpen}
      onClose={() => setOpen(false)}
      {...modalProps}
    >
      <ModalHeader title='Modal form' {...modalHeaderProps} />
      <ModalBody>
        <FormBuilder
          config={config}
          initialValues={initialValues}
          renderSubmitButton={() => null}
          formRef={form}
          onSubmit={async (values, actions) => {
            try {
              await Promise.resolve(onSubmit(values, actions))
              actions.setSubmitting(false)
              setOpen(false)
            } catch (e) {
              alert('Submit failed: ' + e.message) // TODO: better error handling
            }
          }}
        />
        errors={form.current ? JSON.stringify(form.current.state.errors) : null}
      </ModalBody>
      <ModalFooter
        primaryButtonText='Submit' 
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => alert('submit')}
        {...modalFooterProps}
      />
    </ComposedModal>
  </>
}
