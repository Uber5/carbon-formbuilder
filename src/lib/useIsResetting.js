import { useState, useEffect } from 'react'

export default ({ value, initialValue, resettingMillis }) => {

  const [ _initialValue, _setInitialValue ] = useState(initialValue || value)
  const [ previousValue, setPreviousValue ] = useState(value)
  const [ resetting, setResetting ] = useState(false)
  
  useEffect(() => {
    console.log('value, _initialValue, previousValue', value, _initialValue, previousValue)
    if (value === _initialValue && previousValue !== _initialValue) {
      setResetting(true)
      setTimeout(() => setResetting(false), resettingMillis || 200)
    }
    setPreviousValue(value)
  }, [ previousValue, value ])

  return resetting
}
