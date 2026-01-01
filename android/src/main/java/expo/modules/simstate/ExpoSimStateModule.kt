package expo.modules.simstate

import android.content.Context
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/**
 * Native module exposing Android SIM state to React Native / Expo.
 *
 * This module provides a single async function `getSimState` which fetches
 * the complete SIM state of the device using [SimStateProvider].
 *
 * Features:
 * - Returns structured SIM information including subscription ID, slot, carrier, country, phone number, and readiness
 * - Only works on Android
 * - Permissions should be handled on the JS side for a DX-friendly experience
 *
 * Example usage in TypeScript:
 * ```ts
 * import { getSimState } from 'expo-sim-state';
 *
 * try {
 *   const simState = await getSimState();
 *   console.log(simState.simCards);
 * } catch (err) {
 *   console.error(err);
 * }
 * ```
 */
class ExpoSimStateModule : Module() {

    /**
     * Defines the module name and exposed functions to React Native.
     *
     * Exports:
     * - `getSimState`: Async function that returns a [SimStateResult] object
     */
    override fun definition() = ModuleDefinition {

        // Name of the module as exposed to JS
        Name("ExpoSimState")

        /**
         * Asynchronously fetches the current SIM state of the device.
         *
         * Internally uses [SimStateProvider] to retrieve:
         * - Total SIM slots
         * - Number of active SIMs
         * - Array of [SimCardInfo] objects
         *
         * Notes:
         * - Requires READ_PHONE_STATE / READ_PHONE_NUMBERS permissions.
         * - Should be called from JS only on Android.
         *
         * @return [SimStateResult] containing all SIM information
         */
        AsyncFunction("getSimState") { ->

            // Retrieve the current Android application context
            val appContext: Context = requireNotNull(appContext.reactContext)

            // Instantiate provider to fetch SIM state
            val provider = SimStateProvider(appContext)

            // Return the structured SIM state
            return@AsyncFunction provider.getSimState()
        }
    }
}
