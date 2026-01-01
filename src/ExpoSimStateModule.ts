import { NativeModule, requireNativeModule } from 'expo';

import { ExpoSimStateModuleEvents } from './ExpoSimState.types';

declare class ExpoSimStateModule extends NativeModule<ExpoSimStateModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSimStateModule>('ExpoSimState');
