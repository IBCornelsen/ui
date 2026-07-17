export type StepState = "done" | "current" | "upcoming";
export type StepSeverity = "none" | "warning" | "error";

export interface StepMessage {
	id: string;
	severity: "info" | "warning" | "error";
	// Message body. May contain anchor tags, rendered with {@html}.
	html: string;
	dismissible: boolean;
	onDismiss?: () => void;
}

export interface StepInfo {
	label: string;
	state: StepState;
	severity: StepSeverity;
	messages: StepMessage[];
	// Scroll to and open the step's section. Omitted for steps on later routes.
	onNavigate?: () => void;
}
