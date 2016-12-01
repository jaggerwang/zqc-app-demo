/**
 * 在球场
 * zaiqiuchang.com
 */

import valid from 'validate.js';

export function validate(attributes, constraints) {
  errors = valid.validate(attributes, constraints, {fullMessages: false});
  if (errors === undefined) {
    errors = {};
  }
  Object.keys(attributes).forEach(
    v => {
      if (!errors.hasOwnProperty(v)) {
        errors[v] = [];
      }
    }
  );
  return errors;
}

export function validateSingle(value, constraints) {
  errors = valid.single(value, constraints);
  if (errors === undefined) {
    errors = [];
  }
  return errors;
}
