/**
 * 在球场
 * zaiqiuchang.com
 */

import {getApi} from './';

export async function sendVerifyCode({by, mobile, email}) {
  return await getApi('/security/sendVerifyCode', {by, mobile, email});
}
