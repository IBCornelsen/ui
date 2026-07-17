export interface EnergyScaleClass {
	label: string;
	// Class bandwidth in the axis unit (e.g. kWh/(m²·a)).
	// Segment width is proportional: size / sum(all sizes). So a class with
	// size 60 renders exactly twice as wide as a class with size 30.
	size: number;
	// Segment CSS color, e.g. "var(--color-energy-a)".
	color: string;
}

export interface EnergyScaleMarker {
	// Absolute value on the linear axis (same unit as `size`).
	value: number;
	// Arrow above (top, default) or below (bottom) the scale.
	position?: "top" | "bottom";
}
