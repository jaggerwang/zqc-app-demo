/**
 * 在球场
 * zaiqiuchang.com
 */

export function fetchUrl(input, opts) {
  return new Promise((resolve, reject) => {
    setTimeout(reject, opts.timeout);
    fetch(input, opts).then(resolve, reject);
  });
}

export function isUrl(url) {
  let u;
  try {
    u = new URL(url);
  } catch (error) {
    return false;
  }
  return u.protocol == 'http:' || u.protocol == 'https:';
}
