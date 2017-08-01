/**
 * 在球场
 * zaiqiuchang.com
 */

export function resetPersist () {
  return {
    type: 'RESET_PERSIST'
  }
}

export function setPersistRehydrated (rehydrated) {
  return {
    type: 'SET_PERSIST_REHYDRATED',
    rehydrated
  }
}
