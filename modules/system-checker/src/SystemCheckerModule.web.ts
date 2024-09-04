import { EventEmitter } from "expo-modules-core";

const emitter = new EventEmitter({} as any);

export default {
  PI: Math.PI,
  async setValueAsync(value: string): Promise<void> {
    emitter.emit("onChange", { value });
  },
  getSystem() {
    return "Hello world! 👋321";
  },
};
