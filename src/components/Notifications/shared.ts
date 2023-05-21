import { Writable, writable } from "svelte/store";
import { v4 as uuid } from "uuid";
import type { Notification } from "./types";

export const notifications: Writable<Record<string, Notification>> = writable({});

const defaults = {
	message: "",
	dismissable: false,
	timeout: 4000,
	subtext: "",
	type: "error",
	onUserDismiss: () => {}
};



export function updateNotification(uid: string, updater: Partial<Notification>) {
	notifications.update((value) => {
		value[uid] = { ...defaults, ...value[uid], ...updater } as Notification;
		return value;
	})
}

export function addNotification(notification: Partial<Notification>): string {
	let uid = uuid();

	if (notification.uid) {
		uid = notification.uid;
	}
	
	const object: Notification = { ...defaults, ...notification } as Notification;

	notifications.update((value) => {
		value[uid] = object;
		return value;
	})

	if (object.timeout) {
		setTimeout(() => {
			deleteNotification(uid);
		}, object.timeout);
	}

	return uid;
}

export function deleteNotification(uid: string) {
	notifications.update((value) => {
		delete value[uid];
		return value;
	})
}