package expo.modules.simstate

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

/**
 * Represents a single SIM card on the device.
 *
 * This class contains all the relevant metadata about a SIM card, including its
 * identifier, slot position, carrier info, phone number (if available), and readiness status.
 *
 * @property id Unique subscription ID for this SIM card (Android subscriptionId)
 * @property slotIndex Physical slot index of the SIM card (0 = SIM1, 1 = SIM2, etc.)
 * @property carrierName Human-readable carrier name (e.g., "Verizon"). Nullable if unavailable.
 * @property displayName Name displayed by Android UI for this SIM. Nullable if unavailable.
 * @property countryIso ISO 3166-1 country code of the SIM (e.g., "us", "bd"). Nullable if unavailable.
 * @property phoneNumber Phone number associated with the SIM. Nullable if permissions are missing or carrier does not provide it.
 * @property isReady Whether this SIM is active and ready for use
 */
data class SimCardInfo(
  @Field val id: Int,
  @Field val slotIndex: Int,
  @Field val carrierName: String?,
  @Field val displayName: String?,
  @Field val countryIso: String?,
  @Field val phoneNumber: String?,
  @Field val isReady: Boolean
) : Record

/**
 * Aggregated SIM state for the device.
 *
 * Represents the total number of SIM slots, the number of active SIMs, and detailed
 * information about each detected SIM card.
 *
 * @property simCount Total number of SIM slots available on the device
 * @property activeSimCount Number of active subscriptions currently detected
 * @property simCards List of [SimCardInfo] objects representing each active SIM
 */
data class SimStateResult(
  @Field val simCount: Int,
  @Field val activeSimCount: Int,
  @Field val simCards: List<SimCardInfo>
) : Record

