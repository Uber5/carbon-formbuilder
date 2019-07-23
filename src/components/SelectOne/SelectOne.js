import React, { useEffect, useState }  from 'react'
import { Select, SelectItem, SelectSkeleton } from 'carbon-components-react'
import { ok } from 'assert'

const evalExports = (code, requireFn, globals = {}) => {
  const fn = Function.apply(null, [ 'exports', 'require', ...Object.keys(globals), code])
  console.log('fn', fn)
  const _exports = {}
  fn.apply(null, [ _exports, requireFn , ...Object.values(globals) ])
  console.log('_exports', _exports)
  return _exports
}

const applyWithProps = (
  code,
  props,
  _require = dep => { throw new Error(`_require not supported yet, dep=${dep}`) },
  globals = {}
) => {
  const _exports = evalExports(code, _require, globals)
  if (!_exports.default || typeof _exports.default !== 'function') {
    throw new Error('Invalid code, no default export or default is not a function.')
  }
  return _exports.default(props)
}

export default ({ name, label, options, useOptionsFn, optionsFn, formikProps, formProps }) => {

  const [ _options, setOptions ] = useState(null)
  const { handleChange, values } = formikProps
  

  useEffect(() => {
    if (useOptionsFn === true) {
      ok(
        optionsFn && optionsFn.code,
        `Field ${name}, no "optionsFn" with property "code" provided, but useOptionsFn === true.`
      )
      Promise.resolve(applyWithProps(optionsFn.code, formProps)).then(optionsViaFn => {
        ok(
          optionsViaFn instanceof Array,
          `Field ${name}, optionsFn must resolve to an array.`
        )
        setOptions(optionsViaFn)
      })
    } else { // use the options array
      ok(options instanceof Array, `Field ${name}, options must be an array.`)
      setOptions(options)
    }
  }, [ options, useOptionsFn, optionsFn ])

  if (_options === null) {
    return <SelectSkeleton />
  } else {
    return (
      <Select
        name={name}
        labelText={label}
        defaultValue={values[name] || "placeholder-item"}
        onChange={handleChange}
      >
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose one..."
        />
        {
          _options.map(option => (
              <SelectItem key={option.value} value={option.value} text={option.name} > </SelectItem>
          ))
        }  
      </Select>
    )
  }
}