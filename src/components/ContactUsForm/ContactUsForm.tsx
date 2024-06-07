import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import TextErrorMessage from "../TextErrorMessage/TextErrorMessage";
import { useSelector, useDispatch } from "@/hooks";
import { submitContactForm } from "@/redux/contactForm/contactFormSlice";
import { initialValues } from "./initialValues";
import { validationSchema } from "./validationSchema";
import PhoneInput from "react-phone-number-input";
import { useCallback, useState } from "react";
import _debounce from "lodash.debounce";
import React from "react";
import "react-phone-number-input/style.css";
import { escape } from "querystring";

export interface SendData {
	name: string;
	phone: string;
	email: string;
	message: string;
}

export interface ErrorResponse {
	message: string;
	errors: {
		name?: string[];
		phone?: string[];
		email?: string[];
		question?: string[];
	};
}

interface ContactUsFormInterface {
	activeContactUsModal: boolean;
	setActiveContactUsModal: React.Dispatch<React.SetStateAction<boolean>>;
	activeThank: boolean;
	setActiveThank: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContactUsForm({
	activeContactUsModal,
	setActiveContactUsModal,
	activeThank,
	setActiveThank,
}: ContactUsFormInterface) {
	const dispatch = useDispatch();
	const [phoneInputValue, setPhoneInputValue] = useState("");

	const button = useSelector((state) => state.data.success?.contact_us_form.translations.submit);

	const handleSubmit = async (values: SendData, { setErrors }: FormikHelpers<SendData>) => {
		try {
			const response = await dispatch(submitContactForm(values));

			if (response.payload !== undefined) {
				const errorPayload = response.payload as ErrorResponse;

				const formattedErrors = Object.fromEntries(
					Object.entries(errorPayload.errors).map(([key, value]) => [key, value?.[0]])
				);
				setErrors(formattedErrors);
			} else {
				setActiveContactUsModal(false);
				setActiveThank(true);
			}
		} catch (error) {
			throw error;
		}
	};

	interface CustomPhoneInputProps {
		field: {
			name: string;
			value: string;
			onChange: (value: string) => void;
			onBlur: () => void;
		};
		form: {
			setFieldValue: (field: string, value: string) => void;
			touched: { [key: string]: boolean };
			errors: { [key: string]: string };
		};
		label: string;
		placeholder: string;
	}

	const CustomPhoneInput: React.FC<CustomPhoneInputProps> = React.memo(
		({ field, form: { setFieldValue, touched, errors }, label, placeholder }) => {
			const handleChange = useCallback(
				_debounce((value) => {
					setPhoneInputValue(value);
					setFieldValue(field.name, value);
				}, 6000),
				[field.name, setFieldValue]
			);

			return (
				<div className="relative">
					<PhoneInput
						{...field}
						international={true}
						value={phoneInputValue}
						onChange={handleChange}
						placeholder={placeholder}
						className="w-[300px] desktop:w-[312px] p-3 border border-gray-300 rounded-md placeholder-gray-500 font-gotham_pro_regular"
					/>
				</div>
			);
		},
		(prevProps, nextProps) => {
			return (
				prevProps.field.value === nextProps.field.value &&
				prevProps.form.touched[prevProps.field.name] === nextProps.form.touched[prevProps.field.name] &&
				prevProps.form.errors[prevProps.field.name] === nextProps.form.errors[prevProps.field.name]
			);
		}
	);

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{(formik) => {
				return (
					<Form className="w-[300px] desktop:w-[648px] flex flex-col items-center gap-6">
						<div className="w-[300px] desktop:w-full">
							<Field
								component="input"
								id="name"
								name="name"
								className="w-full border p-3 border-gray-300 rounded-md placeholder-gray-500 font-gotham_pro_regular"
								placeholder="Name*"
							/>
							<ErrorMessage name="name" component={TextErrorMessage} />
						</div>
						<div className="flex flex-col desktop:flex-row gap-6">
							<div className="">
							<Field
									component={CustomPhoneInput}
									id="phone"
									name="phone"
									className="w-[300px] desktop:w-[312px] p-3 border border-gray-300 rounded-md placeholder-gray-500 font-gotham_pro_regular"
									placeholder="Phone (include country code)*"
								/>
								<ErrorMessage name="phone" component={TextErrorMessage} />
							</div>
							<div>
								<Field
									component="input"
									type="email"
									id="email"
									name="email"
									className="w-[300px] desktop:w-[312px] p-3 border border-gray-300 rounded-md placeholder-gray-500 font-gotham_pro_regular"
									placeholder="E-mail"
								/>
								<ErrorMessage name="email" component={TextErrorMessage} />
							</div>
						</div>
						<Field
							component="textarea"
							type="message"
							id="message"
							name="message"
							className="w-[300px] desktop:w-[648px] border p-3 pb-7 border-gray-300 rounded-md resize-none placeholder-gray-500 font-gotham_pro_regular"
							placeholder="Text your message"
						/>
						<ErrorMessage name="message" component={TextErrorMessage} />
						<button
							type="submit"
							disabled={!formik.isValid}
							className="bg-primary text-black_main font-bold py-4 
              max-desktop:w-[300px]
              desktop:px-24 desktop:mt-2 "
						>
							<div className="hidden desktop:block uppercase font-druk_wide">{button}</div>
							<div className="desktop:hidden font-druk_wide">{button}</div>
						</button>
					</Form>
				);
			}}
		</Formik>
	);
}

export default ContactUsForm;
