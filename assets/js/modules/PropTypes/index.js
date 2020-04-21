/**
 * Globally available via ~/nuxt-config/_build.js
 * 
 * Usage:
 * 1. Define prop shape in ./types.js
 * 2. In component:
*     props: {
*       yourProp: {
*        validator: $propTypes.yourProp
*       }
*     }
*/

import propTypes from './types'

function createPropsValidator () {
  const validators = Object.entries(propTypes).reduce((result, [key, structureShape]) => {
    result[key] = propValue => validate(propValue, structureShape)
    return result
  }, {})

  return Object.freeze(validators)
}

function validate (propValue, structureShape) {
  if (propValue === null) {
    return true
  } else if (typeof propValue === 'object') {
    for (const propKey in propValue) {
      // key existence
      if (!(propKey in structureShape)) {
        return false
      }

      // recursive check for objects
      if (typeof propValue[propKey] === 'object') {
        const deepValidation = validate(propValue[propKey], structureShape[propKey])
        if (!deepValidation) {
          return false
        }
      }

      // key type
      if (typeof propValue[propKey] !== typeof structureShape[propKey]) {
        return false
      }
    }
    return true
  } else {
    return true
  }
}

export default createPropsValidator()
