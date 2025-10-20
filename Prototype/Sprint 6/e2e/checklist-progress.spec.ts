import { expect, test } from '@playwright/test';

test.describe('ChecklistProgress - Animated Progress Bar', () => {
	test('progress bar animates after submit', async ({ page }) => {
		await page.goto('/lab/checklist');

		// Check 3 out of 5 boxes (60%)
		const checkboxes = page.getByRole('checkbox');
		await checkboxes.nth(0).check();
		await checkboxes.nth(1).check();
		await checkboxes.nth(2).check();

		// Submit
		const submitBtn = page.getByRole('button', { name: /submit/i });
		await submitBtn.click();

		// Target bar should snap immediately to 60%
		const targetBar = page.getByTestId('progress-target');
		await expect(targetBar).toHaveAttribute('data-percent', '60');

		// Animated bar should reach 60% within ~1 second
		const animatedBar = page.getByTestId('progress-animated');
		
		// Wait for animation to complete
		await expect(animatedBar).toHaveAttribute('data-percent', '60', { timeout: 2000 });

		// Verify the text shows correct percentage
		const progressLabel = page.getByTestId('progress-label');
		await expect(progressLabel).toHaveText('3/5 (60%)');
	});

	test('progress bar handles multiple submissions', async ({ page }) => {
		await page.goto('/lab/checklist');

		const checkboxes = page.getByRole('checkbox');
		const submitBtn = page.getByRole('button', { name: /submit/i });
		const animatedBar = page.getByTestId('progress-animated');
		const progressLabel = page.getByTestId('progress-label');

		// First submission: 40%
		await checkboxes.nth(0).check();
		await checkboxes.nth(1).check();
		await submitBtn.click();
		await expect(animatedBar).toHaveAttribute('data-percent', '40', { timeout: 2000 });
		await expect(progressLabel).toHaveText('2/5 (40%)');

		// Second submission: 80%
		await checkboxes.nth(2).check();
		await checkboxes.nth(3).check();
		await submitBtn.click();
		await expect(animatedBar).toHaveAttribute('data-percent', '80', { timeout: 2000 });
		await expect(progressLabel).toHaveText('4/5 (80%)');
	});

	test('progress bar handles 0% and 100%', async ({ page }) => {
		await page.goto('/lab/checklist');

		const checkboxes = page.getByRole('checkbox');
		const submitBtn = page.getByRole('button', { name: /submit/i });
		const animatedBar = page.getByTestId('progress-animated');
		const progressLabel = page.getByTestId('progress-label');

		// Submit with 0%
		await submitBtn.click();
		await expect(animatedBar).toHaveAttribute('data-percent', '0');
		await expect(progressLabel).toHaveText('0/5 (0%)');

		// Check all and submit for 100%
		const count = await checkboxes.count();
		for (let i = 0; i < count; i++) {
			await checkboxes.nth(i).check();
		}
		await submitBtn.click();
		await expect(animatedBar).toHaveAttribute('data-percent', '100', { timeout: 2000 });
		await expect(progressLabel).toHaveText('5/5 (100%)');
	});

	test('target bar snaps immediately while animated bar transitions', async ({ page }) => {
		await page.goto('/lab/checklist');

		const checkboxes = page.getByRole('checkbox');
		const submitBtn = page.getByRole('button', { name: /submit/i });
		const targetBar = page.getByTestId('progress-target');
		const animatedBar = page.getByTestId('progress-animated');

		// Check 3 boxes
		await checkboxes.nth(0).check();
		await checkboxes.nth(1).check();
		await checkboxes.nth(2).check();

		// Submit and verify target snaps immediately
		await submitBtn.click();
		
		// Target should be at 60% immediately
		await expect(targetBar).toHaveAttribute('data-percent', '60');
		
		// Animated bar will reach 60% within 1 second
		await expect(animatedBar).toHaveAttribute('data-percent', '60', { timeout: 2000 });
	});
});