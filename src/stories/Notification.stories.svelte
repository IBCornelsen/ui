<script>
	import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
	import {
		RawNotification,
		RawNotificationWrapper,
	} from "../components/Notifications";
</script>

<Meta title="Notification" component={RawNotification} />

<Template let:args>
	<RawNotificationWrapper>
		<RawNotification {...args} />
	</RawNotificationWrapper>
</Template>

<Story
	name="Warning/Dismissable"
	args={{
		notification: {
			message: "This is the message text.",
			dismissable: true,
			timeout: 0,
			subtext: "This is some text.",
			type: "warning",
		},
	}}
/>

<Story
	name="Error/Dismissable"
	args={{
		notification: {
			message: "This is some error text.",
			dismissable: true,
			timeout: 0,
			subtext: "This is some text.",
			type: "error",
		},
	}}
/>
