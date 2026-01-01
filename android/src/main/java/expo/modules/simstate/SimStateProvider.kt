package expo.modules.simstate

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.telephony.SubscriptionInfo
import android.telephony.SubscriptionManager
import android.telephony.TelephonyManager
import androidx.core.app.ActivityCompat

/**
 * Provider class responsible for retrieving the SIM state of an Android device.
 *
 * This class abstracts the complexity of interacting with the Android Telephony and
 * SubscriptionManager APIs and returns a structured [SimStateResult] suitable for
 * consumption by higher-level modules (e.g., Expo React Native bridge).
 *
 * @property context The Android Context used to access system services.
 */
class SimStateProvider(private val context: Context) {

    /**
     * Fetches the complete SIM state of the device.
     *
     * This method internally uses the [TelephonyManager] to get the total number
     * of SIM slots (`phoneCount`) and [SubscriptionManager] to retrieve active
     * subscription information.
     *
     * Each active subscription is mapped to a [SimCardInfo] object, which contains
     * key metadata for that SIM, including subscription ID, slot index, carrier,
     * display name, country, phone number (if permissions allow), and active status.
     *
     * **Permissions Required**:
     * - `Manifest.permission.READ_PHONE_STATE` or
     * - `Manifest.permission.READ_PHONE_NUMBERS`
     *
     * @throws SecurityException if permissions are not granted when attempting to access phone numbers
     * @return [SimStateResult] containing:
     *   - total SIM slots (`simCount`)
     *   - number of active subscriptions (`activeSimCount`)
     *   - detailed list of [SimCardInfo] objects (`simCards`)
     */
    fun getSimState(): SimStateResult {
        // Retrieve system TelephonyManager for SIM count
        val telephonyManager: TelephonyManager =
            context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

        // Retrieve system SubscriptionManager for active SIM subscriptions
        val subscriptionManager: SubscriptionManager =
            context.getSystemService(Context.TELEPHONY_SUBSCRIPTION_SERVICE) as SubscriptionManager

        // Get list of active subscriptions; return empty list if none
        val subscriptionList: List<SubscriptionInfo> =
            subscriptionManager.activeSubscriptionInfoList ?: emptyList()

        // Total number of SIM slots on device
        val simCount: Int = telephonyManager.phoneCount

        // Number of active subscriptions detected
        val activeSimCount: Int = subscriptionList.size

        // Map each SubscriptionInfo to a structured SimCardInfo
        val simCards: List<SimCardInfo> = subscriptionList.map { subscription ->
            SimCardInfo(
                id = subscription.subscriptionId,
                slotIndex = subscription.simSlotIndex,
                carrierName = subscription.carrierName?.toString(),
                displayName = subscription.displayName?.toString(),
                countryIso = subscription.countryIso,
                phoneNumber = getPhoneNumber(subscription),
                isReady = subscriptionManager.isActiveSubscriptionId(subscription.subscriptionId)
            )
        }

        // Return the aggregated SIM state
        return SimStateResult(
            simCount = simCount,
            activeSimCount = activeSimCount,
            simCards = simCards
        )
    }

    /**
     * Safely retrieves the phone number associated with a given subscription.
     *
     * This method checks for the required permissions before attempting to access
     * the phone number. If permissions are missing, it returns `null` to avoid
     * throwing a SecurityException.
     *
     * @param subscription The [SubscriptionInfo] object representing the SIM to read
     * @return The phone number as a [String] if permissions allow; `null` otherwise
     */
    private fun getPhoneNumber(subscription: SubscriptionInfo): String? {
        // Check if either READ_PHONE_NUMBERS or READ_PHONE_STATE permission is granted
        val hasPermission: Boolean =
            ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_NUMBERS) ==
                PackageManager.PERMISSION_GRANTED ||
            ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) ==
                PackageManager.PERMISSION_GRANTED

        // If permissions are missing, safely return null
        if (!hasPermission) return null

        // Return the phone number from subscription
        return subscription.number
    }
}
