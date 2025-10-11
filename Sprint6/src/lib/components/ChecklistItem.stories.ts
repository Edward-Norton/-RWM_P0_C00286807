import type { Meta, StoryObj } from '@storybook/svelte';
import ChecklistItem from './ChecklistItem.svelte';

const meta = {
	title: 'Components/ChecklistItem',
	component: ChecklistItem,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
# ChecklistItem

A simple checkbox item component that manages its own state and emits change events.

**Props:**
- \`id\`: Unique identifier for the item
- \`label\`: Display text for the checkbox
- \`done\`: Current checked state (bindable)
- \`onchange\`: Callback function called when checkbox state changes

**Events:**
- Emits change events with \`{ id, done }\` payload when toggled
				`
			}
		}
	},
	argTypes: {
		done: { control: 'boolean' },
		label: { control: 'text' }
	}
} satisfies Meta<ChecklistItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: '1',
		label: 'Task item',
		done: false
	}
};

export const Checked: Story = {
	args: {
		id: '1',
		label: 'Completed task',
		done: true
	}
};

export const LongLabel: Story = {
	args: {
		id: '1',
		label: 'This is a very long task label that demonstrates how the component handles text wrapping and layout with extended content',
		done: false
	}
};

export const NoCallback: Story = {
	args: {
		id: '1',
		label: 'Task without callback',
		done: false,
		onchange: undefined
	}
};