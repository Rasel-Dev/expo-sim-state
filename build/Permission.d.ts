import { Permission, Rationale } from 'react-native';
/**
 * Error thrown when a required SIM-related permission is denied by the user.
 *
 * This usually occurs if the user refuses to grant `READ_PHONE_STATE` or `READ_PHONE_NUMBERS`
 * while calling the SIM state API.
 */
export declare class SimStatePermissionError extends Error {
    /** Error code identifying the type of error */
    code: string;
    /**
     * Constructs a new SimStatePermissionError
     * @param message Optional human-readable message describing the error
     */
    constructor(message?: string);
}
/**
 * Error thrown when the SIM module is used on an unsupported platform.
 *
 * Currently, this module only supports Android devices.
 */
export declare class SimStateUnsupportedError extends Error {
    /** Error code identifying the type of error */
    code: string;
    /**
     * Constructs a new SimStateUnsupportedError
     * @param message Optional human-readable message describing the error
     */
    constructor(message?: string);
}
/**
 * Error thrown when the native SIM module fails to fetch data.
 *
 * This wraps unexpected native exceptions and provides a consistent error
 * object for the JS side.
 */
export declare class SimStateNativeError extends Error {
    /** Error code identifying the type of error */
    code: string;
    /**
     * Constructs a new SimStateNativeError
     * @param message Human-readable message describing the failure
     */
    constructor(message: string);
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
export declare function requestPermission(permission: Permission, rationale?: Rationale): Promise<boolean>;
//# sourceMappingURL=Permission.d.ts.map