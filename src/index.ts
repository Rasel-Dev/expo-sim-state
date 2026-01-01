// Reexport the native module. On web, it will be resolved to ExpoSimStateModule.web.ts
// and on native platforms to ExpoSimStateModule.ts
export { default } from './ExpoSimStateModule';
export { default as ExpoSimStateView } from './ExpoSimStateView';
export * from  './ExpoSimState.types';
