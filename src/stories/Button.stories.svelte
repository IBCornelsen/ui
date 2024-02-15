<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import Button from "../components/Button.svelte";
</script>

<Meta title="Button" component={Button} />

<Template let:args>
	<Button {...args}>Button</Button>
</Template>

<Story
	name="Primary"
	args={{
		type: "button",

	}}
	
/>