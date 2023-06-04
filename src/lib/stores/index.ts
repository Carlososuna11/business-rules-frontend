import { writable } from 'svelte/store';
import type { Alert } from '../types';

export const alertStore = writable<Alert>({
  message: '',
  color: 'default',
  visible: false,
});
