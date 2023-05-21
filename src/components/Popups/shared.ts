import { Writable, writable } from "svelte/store";
import { v4 as uuid } from "uuid";
import type { Popup } from "./types";

export const popups: Writable<Record<string, Popup>> = writable({});

const defaults = {
	message: "",
	dismissable: false,
	timeout: 4000,
	subtext: "",
	type: "error",
	onUserDismiss: () => {}
};



export function updatePopup(uid: string, updater: Partial<Popup>) {
	popups.update((value) => {
		value[uid] = { ...defaults, ...value[uid], ...updater } as Popup;
		return value;
	})
}

export function addPopup(popup: Partial<Popup>): string {
	let uid = uuid();

	if (popup.uid) {
		uid = popup.uid;
	}
	
	const object: Popup = { ...defaults, ...popup } as Popup;

	popups.update((value) => {
		value[uid] = object;
		return value;
	})

	if (object.timeout) {
		setTimeout(() => {
			deletePopup(uid);
		}, object.timeout);
	}

	return uid;
}

export function deletePopup(uid: string) {
	popups.update((value) => {
		delete value[uid];
		return value;
	})
}