/**
 * 在球场
 * zaiqiuchang.com
 */

// common
export const ERROR_CODE_OK = 0
export const ERROR_CODE_FAIL = 1
export const ERROR_CODE_HTTP = 2
export const ERROR_CODE_SYSTEM = 3
export const ERROR_CODE_NOT_FOUND = 4
export const ERROR_CODE_DUPLICATED = 5
export const ERROR_CODE_NO_PERMISSION = 6
export const ERROR_CODE_INVALID_PARAMS = 7
export const ERROR_CODE_INVALID_VERIFY_CODE = 8

// Account
export const ERROR_CODE_WRONG_PASSWORD = 1000

// Storage
export const ERROR_CODE_UPLOAD_FILE_TO_CLOUD_STORAGE = 2000

export class InputError {
  constructor (screenId, error) {
    this.screenId = screenId
    this.error = error || {}

    this.code = this.screenId
    this.message = Array.from(
      Object.entries(this.error),
      ([k, v]) => `${k}: ${v.join('; ')}`
    ).join(' | ')
  }

  toString () {
    return `${this.code} ${this.message}`
  }
}

export class ApiHttpError {
  constructor (code, message) {
    this.code = code
    this.message = message
  }

  toString () {
    return `${this.code} ${this.message}`
  }
}

export class ApiResultError {
  constructor (code, message, data) {
    this.code = code
    this.message = message
    this.data = data
  }

  toString () {
    return `${this.code} ${this.message}`
  }
}
