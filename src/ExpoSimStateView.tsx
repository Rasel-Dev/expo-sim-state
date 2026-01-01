import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoSimStateViewProps } from './ExpoSimState.types';

const NativeView: React.ComponentType<ExpoSimStateViewProps> =
  requireNativeView('ExpoSimState');

export default function ExpoSimStateView(props: ExpoSimStateViewProps) {
  return <NativeView {...props} />;
}
