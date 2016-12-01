/**
 * 在球场
 * zaiqiuchang.com
 */

import {API_ORIGIN} from '../config';
import {getApi, postApi} from './';

export async function sendVerifyCode({by, mobile, email}) {
  return await getApi(`${API_ORIGIN}/security/sendVerifyCode`, {by, mobile, email});
}
