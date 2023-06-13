import { writable } from 'svelte/store';
export const before = writable(5);
export const after = writable(5);