/**
 * @module expo-sim-state
 * @description
 * This module provides a DX-friendly interface to fetch Android SIM card state.
 * 
 * Features:
 * - Automatically requests required permissions (`READ_PHONE_STATE` and `READ_PHONE_NUMBERS`)
 * - Returns structured SIM data
 * - Throws clear, typed errors if permissions are denied, unsupported, or native call fails
 * 
 * Example usage:
 * ```ts
 * import { getSimState } from 'expo-sim-state';
 * 
 * try {
 *   const simState = await getSimState();
 *   console.log(simState);
 * } catch (err) {
 *   if (err instanceof SimStatePermissionError) {
 *     console.warn('User denied required SIM permissions');
 *   } else if (err instanceof SimStateUnsupportedError) {
 *     console.warn('This device does not support SIM APIs');
 *   } else if (err instanceof SimStateNativeError) {
 *     console.error('SIM state fetch failed', err);
 *   }
 * }
 * ```
 */

export {
  /**
   * Fetch the complete SIM state of the device.
   * Automatically handles Android permissions and platform checks.
   *
   * @throws {SimStatePermissionError} If required permissions were denied
   * @throws {SimStateUnsupportedError} If device is not Android
   * @throws {SimStateNativeError} If native module failed to fetch data
   * @returns {Promise<SimStateResult>} Structured SIM state result
   */
  getSimState as default
} from './ExpoSimStateModule';

export type {
  /**
   * Represents a single SIM card on the device.
   */
  SimCardInfo,

  /**
   * Aggregated SIM state containing all SIM cards and counts.
   */
  SimStateResult
} from './ExpoSimStateModule';
