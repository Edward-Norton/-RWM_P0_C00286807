import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ChecklistProgress from './ChecklistProgress.svelte';

describe('ChecklistProgress', () => {
	const items = [
		{ id: '1', label: 'Task 1', done: false },
		{ id: '2', label: 'Task 2', done: false },
		{ id: '3', label: 'Task 3', done: false },
		{ id: '4', label: 'Task 4', done: false },
		{ id: '5', label: 'Task 5', done: false }
	];

	it('initially shows 0/5 (0%)', async () => {
		render(ChecklistProgress, { items });

		const progress = page.getByTestId('progress-label');
		await expect.element(progress).toHaveTextContent('0/5 (0%)');
	});

	it('still shows 0% after ticking boxes but before submit', async () => {
		render(ChecklistProgress, { items });

		const checkboxes = page.getByRole('checkbox').all();
		await checkboxes[0].click();
		await checkboxes[1].click();

		const progress = page.getByTestId('progress-label');
		await expect.element(progress).toHaveTextContent('0/5 (0%)');
	});

	it('shows 2/5 (40%) after ticking 2 boxes and submitting', async () => {
		render(ChecklistProgress, { items });

		const checkboxes = page.getByRole('checkbox').all();
		await checkboxes[0].click();
		await checkboxes[1].click();

		const submitBtn = page.getByRole('button', { name: /submit/i });
		await submitBtn.click();

		const progress = page.getByTestId('progress-label');
		await expect.element(progress).toHaveTextContent('2/5 (40%)');
	});
});