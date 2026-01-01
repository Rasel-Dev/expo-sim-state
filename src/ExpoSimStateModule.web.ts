import { registerWebModule, NativeModule } from 'expo';

import { ExpoSimStateModuleEvents } from './ExpoSimState.types';

class ExpoSimStateModule extends NativeModule<ExpoSimStateModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoSimStateModule, 'ExpoSimStateModule');
