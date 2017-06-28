/**
 * 在球场
 * zaiqiuchang.com
 */

import {getApi} from './'

export async function sendVerifyCode ({by, mobile, email}) {
  return getApi('/security/sendVerifyCode', {by, mobile, email})
}
