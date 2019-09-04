import { useState, useEffect } from 'react'
import { ok } from 'assert'

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

const evalExports = (code, requireFn, globals = {}) => {
  const fn = Function.apply(null, [ 'exports', 'require', ...Object.keys(globals), code])
  // console.log('fn', fn)
  const _exports = {}
  fn.apply(null, [ _exports, requireFn , ...Object.values(globals) ])
  // console.log('_exports', _exports)
  return _exports
}

/**
 * Given the inputs, determines the effective array of options
 * to be used.
 * 
 * An option is an object with properties `name` and `value`.
 * TODO: `label` would be cleaner than `value`
 */
export default ({ options, useOptionsFn, optionsFn, formProps }) => {

  const [ effectiveOptions, setOptions ] = useState(null)

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
    } else if (typeof options === 'function') {
      Promise.resolve(applyWithProps(options, formProps)).then(resolvedOptions => {
        ok(
          resolvedOptions instanceof Array,
          `Field ${name}, options (if function) must resolve to an array. (legacy)`
        )
        setOptions(resolvedOptions)
      })
    } else {
      ok(options instanceof Array, `Field ${name}, options must be an array.`)
      setOptions(options)
    }
  }, [ options, useOptionsFn, optionsFn ])

  return effectiveOptions
}