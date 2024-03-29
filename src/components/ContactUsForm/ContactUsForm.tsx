import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import TextErrorMessage from "../TextErrorMessage/TextErrorMessage";
import { useSelector, useDispatch } from "@/hooks";
import { submitContactForm } from "@/redux/contactForm/contactFormSlice";
import { initialValues } from "./initialValues";
import { validationSchema } from "./validationSchema";
import { useEffect } from "react";
import { getAllData } from "@/redux/getData/getDataSlice";

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

function ContactUsForm() {
	const dispatch = useDispatch();

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
			}
		} catch (error) {
			throw error;
		}
	};

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
								className=" w-full border p-3 border-black_main"
								placeholder="Name*"
							></Field>
							<ErrorMessage name="name" component={TextErrorMessage} />
						</div>
						<div className="flex flex-col desktop:flex-row gap-6">
							<div className="">
								<Field
									component="input"
									id="phone"
									name="phone"
									className="w-[300px] desktop:w-[312px] p-3 py-3 border border-black_main"
									placeholder="Phone number*"
								></Field>
								<ErrorMessage name="phone" component={TextErrorMessage} />
							</div>
							<div>
								<Field
									component="input"
									type="email"
									id="email"
									name="email"
									className="w-[300px] desktop:w-[312px] p-3 border border-black_main"
									placeholder="E-mail"
								></Field>
								<ErrorMessage name="email" component={TextErrorMessage} />
							</div>
						</div>
						<Field
							component="textarea"
							type="message"
							id="message"
							name="message"
							className="w-[300px] desktop:w-[648px] border p-3 pb-7 border-black_main resize-none desktop:pb-20"
							placeholder="Text your message"
						></Field>
						<ErrorMessage name="message" component={TextErrorMessage} />
						<button
							type="submit"
							disabled={!formik.isValid}
							className="bg-primary text-black_main font-bold py-4 
							max-desktop:w-[300px]
							desktop:px-24 desktop:mt-2 "
						>
							<div className="hidden desktop:block uppercase">{button}</div>
							<div className="desktop:hidden">{button}</div>
						</button>
					</Form>
				);
			}}
		</Formik>
	);
}

export default ContactUsForm;
