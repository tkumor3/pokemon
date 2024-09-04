import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { SystemCheckerViewProps } from './SystemChecker.types';

const NativeView: React.ComponentType<SystemCheckerViewProps> =
  requireNativeViewManager('SystemChecker');

export default function SystemCheckerView(props: SystemCheckerViewProps) {
  return <NativeView {...props} />;
}
