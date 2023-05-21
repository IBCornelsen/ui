export interface Notification {
	message: string;
	dismissable: boolean;
	timeout: number;
	subtext: string;
	type: "error" | "success" | "info" | "warning";
	onUserDismiss: () => any;
	uid?: string;
}