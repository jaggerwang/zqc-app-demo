/**
 * 在球场
 * zaiqiuchang.com
 */

import {getApi, postApi} from './';

export async function sendVerifyCode({by, mobile, email}) {
  return await getApi('/security/sendVerifyCode', {by, mobile, email});
}
