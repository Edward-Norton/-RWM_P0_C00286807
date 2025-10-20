/**
 * Test Selector Strategy (Step 7):
 * - Use getByRole() for semantic elements (buttons, checkboxes)
 * - Use getByTestId() for specific UI elements
 * - Use getByText() for user-visible text
 * - Avoid CSS selectors, :nth-child, or class names
 * This ensures tests remain stable even when CSS classes change
 */
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

	// NEW TESTS FOR STEP 4
	it('handles repeat submissions after changing selection', async () => {
		render(ChecklistProgress, { items });

		const checkboxes = page.getByRole('checkbox').all();
		const submitBtn = page.getByRole('button', { name: /submit/i });
		const progress = page.getByTestId('progress-label');

		// First submission: check 2 boxes → 40%
		await checkboxes[0].click();
		await checkboxes[1].click();
		await submitBtn.click();
		await expect.element(progress).toHaveTextContent('2/5 (40%)');

		// Change selection: uncheck one (index 0), check two others (index 2, 3)
		await checkboxes[0].click(); // uncheck
		await checkboxes[2].click(); // check
		await checkboxes[3].click(); // check

		// Second submission → 60% (3 out of 5)
		await submitBtn.click();
		await expect.element(progress).toHaveTextContent('3/5 (60%)');
	});

	it('handles all items checked', async () => {
		render(ChecklistProgress, { items });

		const checkboxes = page.getByRole('checkbox').all();
		const submitBtn = page.getByRole('button', { name: /submit/i });
		const progress = page.getByTestId('progress-label');

		// Check all boxes
		for (let i = 0; i < 5; i++) {
			await checkboxes[i].click();
		}

		await submitBtn.click();
		await expect.element(progress).toHaveTextContent('5/5 (100%)');
	});

	it('handles no items checked', async () => {
		render(ChecklistProgress, { items });

		const submitBtn = page.getByRole('button', { name: /submit/i });
		const progress = page.getByTestId('progress-label');

		// Submit without checking anything
		await submitBtn.click();
		await expect.element(progress).toHaveTextContent('0/5 (0%)');
	});

	it('can toggle from all checked to none checked', async () => {
		render(ChecklistProgress, { items });

		const checkboxes = page.getByRole('checkbox').all();
		const submitBtn = page.getByRole('button', { name: /submit/i });
		const progress = page.getByTestId('progress-label');

		// Check all
		for (let i = 0; i < 5; i++) {
			await checkboxes[i].click();
		}
		await submitBtn.click();
		await expect.element(progress).toHaveTextContent('5/5 (100%)');

		// Uncheck all
		for (let i = 0; i < 5; i++) {
			await checkboxes[i].click();
		}
		await submitBtn.click();
		await expect.element(progress).toHaveTextContent('0/5 (0%)');
	});
});