/**
 * 在球场
 * zaiqiuchang.com
 */

export function basename(path) {
  let m = path.match(/[^/]+$/);
  return m ? m[0] : '';
}
