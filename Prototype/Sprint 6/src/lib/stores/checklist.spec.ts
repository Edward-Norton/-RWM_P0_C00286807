// Step 5: Wanted to add testing for the store comp
import { describe, expect, it } from 'vitest';
import { get } from 'svelte/store';
import { itemsStore, completedStore, percentStore } from './checklist';

describe('Checklist Stores', () => {
	it('completedStore returns count of done items', () => {
		itemsStore.set([
			{ id: '1', label: 'Task 1', done: true },
			{ id: '2', label: 'Task 2', done: false },
			{ id: '3', label: 'Task 3', done: true }
		]);

		expect(get(completedStore)).toBe(2);
	});

	it('percentStore calculates correct percentage', () => {
		itemsStore.set([
			{ id: '1', label: 'Task 1', done: true },
			{ id: '2', label: 'Task 2', done: true },
			{ id: '3', label: 'Task 3', done: false },
			{ id: '4', label: 'Task 4', done: false },
			{ id: '5', label: 'Task 5', done: false }
		]);

		expect(get(percentStore)).toBe(40);
	});

	it('percentStore returns 0 for empty list', () => {
		itemsStore.set([]);
		expect(get(percentStore)).toBe(0);
	});
});