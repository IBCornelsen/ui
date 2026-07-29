
export const notifications: Record<string, Notification> = $state({});

const defaults = {
	message: "",
	dismissible: false,
	timeout: 4000,
	subtext: "",
	type: "error",
	onUserDismiss: () => {}
};

export interface Notification {
	message: string;
	dismissible: boolean;
	timeout: number;
	subtext: string;
	type: "error" | "success" | "info" | "warning";
	onUserDismiss: () => any;
	uid?: string;
	selector?: string;
}

export function updateNotification(uid: string, updater: Partial<Notification>) {
	notifications[uid] = { ...defaults, ...notifications[uid], ...updater };

	if (updater.timeout) {
		setTimeout(() => {
			deleteNotification(uid);
		}, updater.timeout);
	}
}

export function addNotification(notification: Partial<Notification>): string {
	let uid: string = crypto.randomUUID();

	if (notification.uid) {
		uid = notification.uid;
	}

	const object: Notification = { ...defaults, ...notification } as Notification;

	notifications[uid] = object;

	if (object.timeout) {
		setTimeout(() => {
			deleteNotification(uid);
		}, object.timeout);
	}

	return uid;
}

export function deleteNotification(uid: string) {
	delete notifications[uid];
}

export function showLinkedElement(query: string) {
	const element = document.querySelector(query);

	if (!element) {
		return;
	}

	element.classList.add("linked");
}

export function hideLinkedElement(query: string) {
	const element = document.querySelector(query);

	if (!element) {
		return;
	}

	element.classList.remove("linked");
}
