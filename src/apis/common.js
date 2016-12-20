/**
 * 在球场
 * zaiqiuchang.com
 */

import URL from 'url';

import logger from '../logger';
import {store} from '../setup';
import {loadingStart, loadingEnd} from '../actions';
import {HttpError, ResultError} from './error';
import {HTTP_STATUS} from './httpStatus';
import {fetchUrl as fetch} from '../utils';

export function getApi(url, query={}, {method='GET', headers={}, timeout=5000, 
  background=false}={}) {
  let urlParts = URL.parse(url, true);
  urlParts.query = query;
  url = URL.format(urlParts);
  return fetchApi({url, method, headers, timeout, background});
}

export function postApi(url, data={}, {method='POST', headers={}, timeout=10000, 
  background=false}={}) {
  if (Object.keys(data).length == 0) {
    data._ = 'fix android empty body bug';
  }
  let body = new FormData();
  for (let [k, v] of Object.entries(data)) {
    body.append(k, v);
  }
  return fetchApi({url, method, headers, body, timeout, background});
}

export async function fetchApi({url, method, headers, body, timeout=5000, 
  background=false}) {
  let responseJson = null;
  try {
    if (!background) {
      store.dispatch(loadingStart());
    }

    logger.debug(method, url);
    let request = new Request(url, {method, headers, body});
    let response = await fetch(request, {timeout});
    if (!response.ok) {
      throw new HttpError(response.status, HTTP_STATUS[response.status]);
    }

    responseJson = await response.json();
    logger.debug(responseJson);
    let {code, message, data} = responseJson;
    if (code != 0) {
      throw new ResultError(code, message, data);
    }
  } catch (error) {
    if (error === undefined) {
      error = new HttpError(504, HTTP_STATUS[504]);
    } else if (error instanceof TypeError) {
      error = new HttpError(503, "网络不通");
    }
    return Promise.reject(error);
  } finally {
    if (!background) {
      store.dispatch(loadingEnd());
    }
  }
  return responseJson;
}
