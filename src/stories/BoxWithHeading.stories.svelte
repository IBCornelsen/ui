<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import {default as BoxWithHeading} from "../components/BoxWithHeading.svelte";
	import "../style/tailwind.css";
</script>

<Meta title="BoxWithHeading" component={BoxWithHeading} />

<Template let:args>
	<BoxWithHeading {...args}>
		
	</BoxWithHeading>
</Template>

<Story
	name="Without Children"
	args={{
		heading: "This is the box Heading."
	}}
/>

<Story
	name="With Children"
	args={{
		heading: "This is the box Heading."
	}}
	
/>
