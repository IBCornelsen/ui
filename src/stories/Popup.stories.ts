import type { Meta, StoryObj } from '@storybook/svelte';

import {Popup} from '../components/Popups';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta: Meta<Popup> = {
  title: 'Popup',
  component: Popup,
  tags: ['autodocs'],
  argTypes: {
    heading: { type: 'string' },
		hidden: { type: 'boolean'},
		onUserDismiss: { type: 'function' }
  },
};

export default meta;
type Story = StoryObj<Popup>;

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary: Story = {
  args: {
    heading: "This is the Heading!",
		hidden: false
  },
};