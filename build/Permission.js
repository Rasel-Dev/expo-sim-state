import { PermissionsAndroid } from 'react-native';
/**
 * Error thrown when a required SIM-related permission is denied by the user.
 *
 * This usually occurs if the user refuses to grant `READ_PHONE_STATE` or `READ_PHONE_NUMBERS`
 * while calling the SIM state API.
 */
export class SimStatePermissionError extends Error {
    /** Error code identifying the type of error */
    code = 'PERMISSION_DENIED';
    /**
     * Constructs a new SimStatePermissionError
     * @param message Optional human-readable message describing the error
     */
    constructor(message) {
        super(message ?? 'Required SIM permissions were denied by the user');
        Object.setPrototypeOf(this, SimStatePermissionError.prototype);
    }
}
/**
 * Error thrown when the SIM module is used on an unsupported platform.
 *
 * Currently, this module only supports Android devices.
 */
export class SimStateUnsupportedError extends Error {
    /** Error code identifying the type of error */
    code = 'UNSUPPORTED_PLATFORM';
    /**
     * Constructs a new SimStateUnsupportedError
     * @param message Optional human-readable message describing the error
     */
    constructor(message) {
        super(message ?? 'SIM state is only available on Android devices');
        Object.setPrototypeOf(this, SimStateUnsupportedError.prototype);
    }
}
/**
 * Error thrown when the native SIM module fails to fetch data.
 *
 * This wraps unexpected native exceptions and provides a consistent error
 * object for the JS side.
 */
export class SimStateNativeError extends Error {
    /** Error code identifying the type of error */
    code = 'NATIVE_MODULE_ERROR';
    /**
     * Constructs a new SimStateNativeError
     * @param message Human-readable message describing the failure
     */
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, SimStateNativeError.prototype);
    }
}
/**
 * Requests a specific Android permission and returns whether it was granted.
 *
 * Automatically handles the Android permission prompt. Returns `true` if the user
 * granted the permission, `false` otherwise.
 *
 * @param permission The permission to request, e.g., `PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE`
 * @param rationale Optional rationale object to show a user-friendly explanation for why the permission is needed.
 *                  Includes:
 *                  - title: string — Dialog title
 *                  - message: string — Dialog message explaining the need
 *                  - buttonPositive: string — Positive button label
 *                  - buttonNegative?: string — Negative button label
 *                  - buttonNeutral?: string — Neutral button label
 * @returns {Promise<boolean>} `true` if permission granted, `false` otherwise
 *
 * @example
 * ```ts
 * const granted = await requestPermission(PermissionsAndroid.PERMISSIONS.READ_PHONE_NUMBERS, {
 *   title: "Phone Number Access",
 *   message: "We need your phone number to identify your SIM card",
 *   buttonPositive: "OK",
 *   buttonNegative: "Cancel"
 * });
 * if (!granted) {
 *   throw new SimStatePermissionError();
 * }
 * ```
 */
export async function requestPermission(permission, rationale) {
    const status = await PermissionsAndroid.request(permission, rationale);
    return status === PermissionsAndroid.RESULTS.GRANTED;
}
//# sourceMappingURL=Permission.js.map