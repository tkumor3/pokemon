import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to SystemChecker.web.ts
// and on native platforms to SystemChecker.ts
import SystemCheckerModule from "./src/SystemCheckerModule";
import SystemCheckerView from "./src/SystemCheckerView";
import {
  ChangeEventPayload,
  SystemCheckerViewProps,
} from "./src/SystemChecker.types";

// Get the native constant value.
export const PI = SystemCheckerModule.PI;

export function getSystem(): string {
  return SystemCheckerModule.getSystem();
}

export async function setValueAsync(value: string) {
  return await SystemCheckerModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  SystemCheckerModule ?? NativeModulesProxy.SystemChecker
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { SystemCheckerView, SystemCheckerViewProps, ChangeEventPayload };
