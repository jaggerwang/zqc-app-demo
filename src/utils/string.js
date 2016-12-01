/**
 * 在球场
 * zaiqiuchang.com
 */

export function lpad(str, len, pad=' ') {
  str = str + '';
  while (str.length < len) {
    str = pad + str;
  }
  return str;
}
