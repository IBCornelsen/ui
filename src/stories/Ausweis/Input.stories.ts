import type { Meta, StoryObj } from "@storybook/svelte";

import Input from "../../components/Ausweis/Input.svelte"
// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction
const meta: Meta<Input> = {
	title: "Ausweis/Input",
	component: Input,
	tags: ["autodocs"]
};

export default meta;
type Story = StoryObj<Input>;

// More on writing stories with args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Email: Story = {
	args: {
		cypress: "email",
		placeholder: "Email",
		type: "email",
		value: ""
	},
};

export const Password: Story = {
	args: {
		cypress: "password",
		placeholder: "********",
		type: "password",
		value: ""
	},
};

export const Number: Story = {
	args: {
		cypress: "number",
		placeholder: "42.4",
		type: "number",
		value: ""
	},
};