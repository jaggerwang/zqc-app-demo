/**
 * 在球场
 * zaiqiuchang.com
 */

export function resetProcessing () {
  return {
    type: 'reset_processing'
  }
}

export function processingTask (task) {
  return {
    type: 'processing_task',
    task
  }
}
