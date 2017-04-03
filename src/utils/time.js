/**
 * 在球场
 * zaiqiuchang.com
 */

export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function waitingFor({condition, cbOk, cbFail, cbFinish, 
  maxTimes = 10}) {
  let times = 0;
  let timer = setInterval(() => {
    if (++times > maxTimes * 10) {
      clearInterval(timer);
      if (cbFail) {
        cbFail();
      }
      if (cbFinish) {
        cbFinish();
      }
      return;
    }

    if (condition()) {
      clearInterval(timer);
      if (cbOk) {
        cbOk();
      }
      if (cbFinish) {
        cbFinish();
      }
    }
  }, 100);
}
