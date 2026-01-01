# expo-sim-state

> A React Native Expo module to fetch Android SIM card information.  
> Fully typed, production-ready, and DX-friendly. **Android only**.

---

## Table of Contents

- [Overview](#overview)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API](#api)  
  - [getSimState](#getsimstate)  
- [Returned Data](#returned-data)  
- [Permissions](#permissions)  
- [Errors](#errors)  
- [Example](#example)  
- [Notes](#notes)  

---

## Overview

`expo-sim-state` is a small but sophisticated native module that exposes the **complete SIM state** of an Android device to your React Native / Expo app.  

It provides:

- Total number of SIM slots (`simCount`)  
- Number of active SIMs (`activeSimCount`)  
- Detailed SIM metadata (`SimCardInfo`) including:  
  - Subscription ID  
  - Slot index  
  - Carrier name and display name  
  - Country code  
  - Phone number (if permissions allow)  
  - Active readiness  

> ⚠️ This module is **Android only**. iOS is not supported yet.

---

## Installation

Install via your preferred package manager:

```bash
npm install expo-sim-state
# or
yarn add expo-sim-state
````

If using Expo managed workflow, make sure you are on a **bare workflow** or custom dev client, as this is a native Android module.

---

## Usage

```ts
import getSimState, { SimCardInfo, SimStateResult } from 'expo-sim-state';

async function fetchSims() {
  try {
    const simState: SimStateResult = await getSimState();
    console.log(`Total SIM slots: ${simState.simCount}`);
    console.log(`Active SIMs: ${simState.activeSimCount}`);
    simState.simCards.forEach((sim: SimCardInfo) => {
      console.log(`SIM #${sim.slotIndex + 1} - Carrier: ${sim.carrierName}, Number: ${sim.phoneNumber}`);
    });
  } catch (err) {
    console.error(err);
  }
}
```

---

## API

### `getSimState(): Promise<SimStateResult>`

Fetches the complete SIM state of the device asynchronously.

* **Returns:** A `Promise` resolving to a `SimStateResult` object.
* **Throws:**

  * `SimStatePermissionError` – if required permissions are denied
  * `SimStateUnsupportedError` – if called on a non-Android device
  * `SimStateNativeError` – if the native module fails

---

## Returned Data

### `SimStateResult`:

| Field            | Type            | Description                             |
| ---------------- | --------------- | --------------------------------------- |
| `simCount`       | `number`        | Total number of SIM slots on the device |
| `activeSimCount` | `number`        | Number of active SIMs                   |
| `simCards`       | `SimCardInfo[]` | Array of detailed SIM information       |


### `SimCardInfo`:

| Field         | Type      | Description                                     |
| ------------- | --------- | ----------------------------------------------- |
| `id`          | `number`  | Subscription ID (Android subscriptionId)        |
| `slotIndex`   | `number`  | Physical SIM slot index (0 = SIM1)              |
| `carrierName` | `string?` | Carrier name (may be null)                      |
| `displayName` | `string?` | Display name for UI (may be null)               |
| `countryIso`  | `string?` | ISO 3166-1 country code (may be null)           |
| `phoneNumber` | `string?` | Phone number (requires permission, may be null) |
| `isReady`     | `boolean` | Whether the SIM is active                       |

---

## Permissions

This module automatically handles the Android permissions required:

* `READ_PHONE_STATE`
* `READ_PHONE_NUMBERS`

No additional manual permission checks are required in your JS code. If the user denies the permissions, a `SimStatePermissionError` will be thrown.

---

## Errors

The module throws **typed, DX-friendly errors**:

| Error                      | Description                               |
| -------------------------- | ----------------------------------------- |
| `SimStatePermissionError`  | User denied required SIM permissions      |
| `SimStateUnsupportedError` | Module was called on a non-Android device |
| `SimStateNativeError`      | Native module failed to fetch SIM data    |

---

## Example

```ts
import getSimState from 'expo-sim-state';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function App() {
  const [simState, setSimState] = useState(null);

  useEffect(() => {
    async function fetchSims() {
      try {
        const data = await getSimState();
        setSimState(data);
      } catch (err) {
        console.error('Failed to fetch SIM state:', err);
      }
    }
    fetchSims();
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(simState, null, 2)}</Text>
    </View>
  );
}
```

---

## Notes

* Works **Android only**. iOS is not supported.
* Compatible with **Expo bare workflow** and React Native projects with native Android support.
* Returns **safe nulls** for phone numbers if permissions are not granted.

---