<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import Select from "../../components/Ausweis/Select.svelte";
</script>

<Meta title="Ausweis/Select" component={Select} />

<Template let:args>
	<Select {...args}>
		<option disabled selected>Bitte Auswählen</option>
		<option value="option1">Option 1</option>
		<option value="option2">Option 2</option>
		<option value="option3">Option 3</option>
		<option value="option4">Option 4</option>
	</Select>
</Template>

<Story
	name="Default"
	args={{
		placeholder: "Bitte Auswählen",
		name: "select",
		cypress: "select"
	}}
/>