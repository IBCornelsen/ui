<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import Checkbox from "../../components/Ausweis/Checkbox.svelte";
</script>

<Meta title="Ausweis/Checkbox" component={Checkbox} />

<Template let:args>
	<Checkbox {...args}></Checkbox>
</Template>

<Story
	name="Default"
	args={{
		name: "checkbox",
		cypress: "checkbox",
		label: "This is a checkbox",
		id: "checkbox",
		value: "value"
	}}
	
/>