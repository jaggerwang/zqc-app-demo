/**
 * 在球场
 * zaiqiuchang.com
 */

import {DEBUG} from './config';

export class Logger {
  constructor(level) {
    if (level === undefined) {
      level = DEBUG ? 'debug' : 'info';
    }
    this.level = level;
  }

  debug(...args) {
    if (this.level == 'debug') {
      console.debug(this.time(), ...args);
    }
  }

  info(...args) {
    if (this.level == 'debug' || this.level == 'info') {
      console.info(this.time(), ...args);
    }
  }

  warn(...args) {
    if (this.level == 'debug' || this.level == 'info' || this.level == 'warn') {
      console.warn(this.time(), ...args);
    }
  }
  
  error(...args) {
    console.error(this.time(), ...args);
  }

  time() {
    let d = new Date();
    return d.toTimeString().substring(0, 8) + '.' + d.getMilliseconds();
  }
};

export default new Logger();
