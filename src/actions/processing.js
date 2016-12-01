/**
 * 在球场
 * zaiqiuchang.com
 */

export const RESET_PROCESSING = 'reset_processing';
export const PROCESSING_TASK = 'processing_task';

export function resetProcessing() {
  return {
    type: RESET_PROCESSING,
  };
}

export function processingTask(task) {
  return {
    type: PROCESSING_TASK,
    task,
  };
}
