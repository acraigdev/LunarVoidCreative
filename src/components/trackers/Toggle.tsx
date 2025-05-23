import React from 'react';
import { Switch } from '@heroui/switch';
import type { ToggleQuestion } from '../../lib/utils/types/Questions';

interface ToggleProps extends ToggleQuestion {
  label: string;
}

export function Toggle({ label, data }: ToggleProps) {
  return <Switch {...data}>{label}</Switch>;
}
