"use client";

import { useSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import _debounce from "lodash.debounce";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import PaymentPageRightSide from "../PaymentPageRightSide/PaymentPageRightSide";
import PaymentPageAboutFilmSection from "../PaymentPageAboutFilmSection/PaymentPageAboutFilmSection";
import PaymentForm from "../PaymentForm/PaymentForm";

function PaymentPage() {
	const filmView = useSelector((state) => state.filmView);
	const router = useRouter();

	const initialValues: FormData = {
		payment_method: "stripe",
		name: "",
		phone: "",
		email: "",
		accept_newsletter: false,
	};

	interface FormData {
		payment_method: string;
		name: string;
		phone: string;
		email: string;
		accept_newsletter: boolean;
	}

	const handleSubmit = async (values: FormData) => {
		const url = "/api/createOrder";
		console.log("Attempting to fetch:", url); // Check the URL is correct
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...values }),
				credentials: "include", // Ensures cookies are included with the request
			});

			if (!response.ok) {
				return false;
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				console.log("Response data222: redirect url:", data.redirect_url);
				router.push(data.redirect_url);
				return data;
			}
		} catch (error) {
			console.error("Error handling snack item action:", error);
			return false;
		}
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		phone: Yup.string()
			.matches(/^\+[0-9]{12}$/, "Phone number must be in the format: +380731234567")
			.required("Phone is required"),
		email: Yup.string().email("Invalid email").required("Email is required"),
	});

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{() => (
				<Form>
					<div className="flex flex-col desktop:flex-row desktop:gap-[136px] gap-8 max-desktop:items-center px-[14px] desktop:px-[60px] max-desktop:mt-8 max-desktop:mb-10 desktop:mb-[104px]">
						{filmView.success && (
							<div className="w-full max-w-[348px] desktop:min-w-[760px] ">
								<PaymentPageAboutFilmSection />
								<div className="flex justify-end">
									<PaymentForm />
									{/* <div className="desktop:max-w-[536px] w-full">
										<div role="group" aria-labelledby="my-radio-group" className="mb-[56px]">
											<h3 className="font-druk_wide text-[18px] leading-6 mb-6 uppercase">
												Choose Payment Method
											</h3>
											{formFields &&
												Object.entries(
													formFields.find((field) => field.type === "radio")?.values || {}
												).map(([key, value]) => (
													<Field
														component={CustomRadio}
														name="payment_method"
														value={key}
														image=""
														label={value}
													/>
												))}
										</div>
										<div className="flex flex-col gap-6 mb-6">
											<h3 className="font-druk_wide text-[18px] leading-6 uppercase">
												Personal information
											</h3>
											<Field
												name="name"
												label="Name"
												component={CustomInput}
												placeholder="Name"
											/>
											<Field
												name="phone"
												label="Phone"
												component={CustomInput}
												placeholder="Phone"
											/>
											<Field
												name="email"
												label="Email"
												component={CustomInput}
												placeholder="Email"
											/>
											<div>
												<label htmlFor="accept_newsletter">
													<Field type="checkbox" name="accept_newsletter" />
													<span className="ml-2">Accept newsletter</span>
												</label>
											</div>
										</div>
									</div> */}
								</div>
							</div>
						)}
						<PaymentPageRightSide />
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default PaymentPage;
