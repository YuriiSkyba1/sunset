export interface Language {
	name: string;
	iso_code: string;
	is_default: boolean;
	is_current: boolean;
}

interface Country {
	name: string;
	iso_code: string;
}

interface Translations {
	title: string;
	subtitle: string;
	submit: string;
}

interface Input {
	name: string;
	label: string;
	type: string;
	placeholder: string;
	value: string;
	error: string;
}

export interface IGetState {
	languages: Language[];
	countries: Country[];
	contact_us_form: {
		translations: Translations;
		inputs: Input[];
	};
	translates: {
		select_language_popup: {
			title: string;
			subtitle: string;
		};
	};
}
