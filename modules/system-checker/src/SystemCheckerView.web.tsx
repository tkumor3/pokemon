import * as React from 'react';

import { SystemCheckerViewProps } from './SystemChecker.types';

export default function SystemCheckerView(props: SystemCheckerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
