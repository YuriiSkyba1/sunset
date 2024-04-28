export interface InputInterfaces {
	name: string;
	label: string;
	type: "text" | "email" | "tel" | "radio" | "checkbox";
	placeholder: string;
	value: string;
	error: string;
	values?: Record<string, string>;
}
