import { Formik, Form, Field, ErrorMessage } from "formik";
import TextErrorMessage from "../TextErrorMessage/TextErrorMessage";
import * as Yup from "yup";

function SubscriptionForm() {
	const initialValues = {
		email: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email format").required("Required"),
	});

	const onSubmit = (email: { email: string }) => {};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{(formik) => {
				return (
					<Form>
						<div className="max-desktop:flex ">
							<Field
								type="email"
								id="email"
								name="email"
								className="max-desktop:h-[34px] max-desktop:2/3 w-full pl-3 py-3 border border-grey_medium mr-2"
								placeholder="E-mail"
							></Field>
							<div className="hidden desktop:block">
								<ErrorMessage name="email" component={TextErrorMessage} />
							</div>
							<button
								type="submit"
								disabled={!formik.isValid}
								className="w-1/3 text-[10px] leading-[10px] py-3 desktop:w-full desktop:h-[44px]  desktop:mt-4 bg-primary text-black_main font-bold"
							>
								SUBSCRIPTION
							</button>
						</div>
						<div className="desktop:hidden">
							<ErrorMessage name="email" component={TextErrorMessage} />
						</div>
					</Form>
				);
			}}
		</Formik>
	);
}

export default SubscriptionForm;
