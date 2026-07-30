export const FAQ_ACCORDION_CONTEXT = "faq-accordion";

export interface FaqAccordionContext {
	isOpen: (title: string) => boolean;
	toggle: (title: string) => void;
}
