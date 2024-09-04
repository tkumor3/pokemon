// Import the native module. On web, it will be resolved to SystemChecker.web.ts
// and on native platforms to SystemChecker.ts
import SystemCheckerModule from "./src/SystemCheckerModule";
import { SystemCheckerViewProps } from "./src/SystemChecker.types";

export function getSystem(): string {
  return SystemCheckerModule.getSystem();
}

export { SystemCheckerViewProps };
