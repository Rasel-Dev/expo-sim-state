import * as React from 'react';

import { ExpoSimStateViewProps } from './ExpoSimState.types';

export default function ExpoSimStateView(props: ExpoSimStateViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
