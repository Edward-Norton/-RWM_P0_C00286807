import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ChecklistItem from './ChecklistItem.svelte';

describe('ChecklistItem', () => {
	it('renders with label and checkbox', async () => {
		render(ChecklistItem, {
			id: '1',
			label: 'Task 1',
			done: false
		});

		const checkbox = page.getByRole('checkbox');
		const label = page.getByText('Task 1');

		await expect.element(checkbox).toBeInTheDocument();
		await expect.element(label).toBeInTheDocument();
		await expect.element(checkbox).not.toBeChecked();
	});

	it('shows checked state when done is true', async () => {
		render(ChecklistItem, {
			id: '1',
			label: 'Task 1',
			done: true
		});

		const checkbox = page.getByRole('checkbox');
		await expect.element(checkbox).toBeChecked();
	});

	it('dispatches change event when toggled', async () => {
		let changeDetail: any = null;

		render(ChecklistItem, {
			id: '1',
			label: 'Task 1',
			done: false,
			onchange: (detail) => {
				changeDetail = detail;
			}
		});

		const checkbox = page.getByRole('checkbox');
		await checkbox.click();

		expect(changeDetail).toEqual({ id: '1', done: true });
	});
});