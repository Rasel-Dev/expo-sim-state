import { requireNativeModule } from 'expo';
import { PermissionsAndroid, Platform } from 'react-native';
import { requestPermission, SimStateNativeError, SimStatePermissionError, SimStateUnsupportedError } from './Permission';
/** Reference to the native Expo module for SIM state access */
const ExpoSimState = requireNativeModule('ExpoSimState');
/**
 * Fetches the complete SIM state of the device in a DX-friendly manner.
 *
 * This function automatically handles:
 * - Android platform detection
 * - Required permissions checking and requesting
 * - Error handling with descriptive, typed errors
 *
 * Usage example:
 * ```ts
 * try {
 *   const simState = await getSimState();
 *   console.log(simState);
 * } catch (err) {
 *   if (err instanceof SimStatePermissionError) {
 *     // Handle missing permissions
 *   }
 * }
 * ```
 *
 * @throws {SimStateUnsupportedError} If the device is not running Android.
 * @throws {SimStatePermissionError} If the required permissions were denied by the user.
 * @throws {SimStateNativeError} If the native module failed to fetch SIM data.
 * @returns {Promise<SimStateResult>} Promise resolving to the device's SIM state.
 */
export async function getSimState() {
    // Ensure the function is only called on Android
    if (Platform.OS !== 'android') {
        throw new SimStateUnsupportedError('SIM state is only available on Android devices');
    }
    // Request READ_PHONE_STATE permission to access SIM metadata
    const phoneStateGranted = await requestPermission(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
    // Request READ_PHONE_NUMBERS permission for phone number access
    const phoneNumberGranted = await requestPermission(PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS, {
        title: 'Phone Numbers Permission',
        message: 'Your app needs access to your phone number for identification purposes.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK'
    });
    // If any of the permissions are denied, throw a DX-friendly error
    if (!phoneStateGranted || !phoneNumberGranted) {
        throw new SimStatePermissionError('Required SIM permissions were not granted by the user');
    }
    // Call the native module to fetch SIM state
    try {
        const data = await ExpoSimState.getSimState();
        return data;
    }
    catch (err) {
        // Wrap any native errors in a DX-friendly error with descriptive message
        throw new SimStateNativeError(`Native SIM state access failed: ${String(err?.message ?? err)}`);
    }
}
//# sourceMappingURL=ExpoSimStateModule.js.map