/**
 * 在球场
 * zaiqiuchang.com
 */

import * as utils from '../../utils';

export const WEEK_DAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export function dateText(date) {
  if (typeof date == 'string') {
    date = new Date(date);
  }
  now = new Date();
  interval = (now - date) / 1000 / 60;
  if (interval < 1) {
    return '刚刚';
  } else if (1 <= interval && interval < 60) {
    return Math.floor(interval) + '分钟前';
  } else if (60 <= interval && interval < 1440) {
    return Math.floor(interval / 60) + '小时前';
  } else {
    return date.toISOString().substring(0, 10);
  }
}

export function weekDayText(date) {
  if (typeof date == 'string') {
    date = new Date(date);
  }
  return WEEK_DAYS[date.getDay()];
}

export function dayTimeText(date) {
  if (typeof date == 'string') {
    date = new Date(date);
  }
  let hour = date.getHours();
  let minute = date.getMinutes();
  return utils.lpad((hour), 2, '0') + ':' + utils.lpad(minute, 2, '0');
}

export function isNeedRefresh({screenId, network, minInterval=600, objectId=''}) {
  let lastRefreshTime = network.lastRefreshTime[screenId] || {};
  return (!lastRefreshTime[objectId] || (new Date() - new Date(lastRefreshTime[objectId]) > minInterval * 1000));
}
