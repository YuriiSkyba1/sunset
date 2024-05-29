import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import TextErrorMessage from "../TextErrorMessage/TextErrorMessage";
import { initialValues } from "./initialValues";
import { validationSchema } from "./validationSchema";
import { useDispatch } from "@/hooks";
import { postFeedback } from "@/redux/feedbackForm/feedbackForm";

export interface IFeedbackData {
	name: string;
	phone: string;
	email: string;
	feedback_url: string;
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

function FeedbackForm() {
	const dispatch = useDispatch();

	const handleSubmit = async (values: IFeedbackData, { setErrors }: FormikHelpers<IFeedbackData>) => {
		try {
			const response = await dispatch(postFeedback(values));
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
					<Form className="w-full flex flex-col items-center gap-3 desktop:gap-6 ">
						<div className="w-full">
							<Field
								component="input"
								id="name"
								name="name"
								className="w-full border p-3 py-[11px] border-black_main leading-5 font-gotham_pro_medium"
								placeholder="Name*"
							></Field>
							<ErrorMessage name="name" component={TextErrorMessage} />
						</div>
						<div className="w-full flex flex-col gap-3 desktop:justify-between desktop:gap-6">
							<div className="flex-1">
								<Field
									component="input"
									id="phone"
									name="phone"
									className="w-full p-3 py-[11px] border border-black_main leading-5 font-gotham_pro_medium"
									placeholder="Phone number*"
								></Field>
								<ErrorMessage name="phone" component={TextErrorMessage} />
							</div>
							<div className="flex-1">
								<Field
									component="input"
									type="email"
									id="email"
									name="email"
									className="w-full p-3 py-[11px] border border-black_main leading-5 font-gotham_pro_medium"
									placeholder="E-mail"
								></Field>
								<ErrorMessage name="email" component={TextErrorMessage} />
							</div>
						</div>
						<div className="w-full">
							<Field
								component="textarea"
								type="message"
								id="message"
								name="message"
								className="w-full border p-3 pb-7 leading-5 border-black_main resize-none desktop:pb-16 font-gotham_pro_medium"
								placeholder="Text your message"
							></Field>
							<ErrorMessage name="message" component={TextErrorMessage} />
						</div>
						<button
							type="submit"
							disabled={!formik.isValid}
							className="w-full desktop:max-w-[200px] bg-primary text-black_main font-bold leading-5 py-[14px]  uppercase desktop:leading-[18px] self-start"
						>
							send
						</button>
					</Form>
				);
			}}
		</Formik>
	);
}

export default FeedbackForm;
