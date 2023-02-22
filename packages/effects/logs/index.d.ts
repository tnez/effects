/**
 * Emit a log
 * @param body String to be logged
 */
export function emit(body: string): Promise<void>

export type Logs = {
  emit: typeof emit
}

export default Logs
