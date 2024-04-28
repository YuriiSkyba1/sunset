import React, { useEffect, useState } from "react";
import Stripe from "../../assets/payment/stripe-logo.svg";
import * as Yup from "yup";
import Image from "next/image";
import { ErrorMessage, Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { InputInterfaces } from "../PaymentPage/InputsInterface";
import { useRouter } from "next/navigation";

interface InputProps {
	field: any;
	form: any;
	label: string;
	placeholder: string;
}

interface CustomRadioProps {
	image: string;
	label: string;
	value: string;
}

const CustomInput: React.FC<InputProps> = ({ field, form: { touched, errors }, label, placeholder }) => (
	<div className="relative">
		<label
			className="absolute left-3 top-3 font-gotham_pro_regular text-[12px] leading-[16px] text-[#5B5C64]"
			htmlFor={field.name}
		>
			{label}
		</label>
		<input
			{...field}
			placeholder={placeholder}
			className=" font-gotham_pro_bold text-[16px] leading-6 border border-[#DFDDE3] pt-7 pl-3 pb-3 w-full"
		/>
		{touched[field.name] && errors[field.name] && <div style={{ color: "red" }}>{errors[field.name]}</div>}
	</div>
);

const CustomRadio: React.FC<FieldProps & CustomRadioProps> = ({ field, form, ...props }) => (
	<div style={{ display: "inline-block", marginRight: "10px", maxWidth: "160px", width: "160px" }}>
		<div
			style={{
				border: `1px solid ${field.value === props.value ? "#79B100" : "#D5D6DF"}`,
				padding: "10px",
				textAlign: "center",
				cursor: "pointer",
			}}
			onClick={() => form.setFieldValue(field.name, props.value)}
		>
			<Image
				src={props.value === "stripe" ? Stripe : ""}
				width={100}
				height={50}
				alt={props.value[0]}
				style={{ maxWidth: "100px", margin: "0 auto" }}
			/>
			<div className=" font-druk_wide text-[12px] leading-[18px]">{props.label}</div>
		</div>
	</div>
);

interface FormData {
	payment_method: string;
	name: string;
	phone: string;
	email: string;
	accept_newsletter: boolean;
}

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	phone: Yup.string()
		.matches(/^\+[0-9]{12}$/, "Phone number must be in the format: +380731234567")
		.required("Phone is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
});

const initialValues: FormData = {
	payment_method: "stripe",
	name: "",
	phone: "",
	email: "",
	accept_newsletter: false,
};

const PaymentForm: React.FC = () => {
	const [formFields, setFormFields] = useState<InputInterfaces[]>();
	const router = useRouter();

	useEffect(() => {
		handleCheckoutShow();
	}, []);

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

	const handleCheckoutShow = async () => {
		const url = `/api/showCheckout`;
		console.log("Attempting to fetch:", url); // Check the URL is correct
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", // Ensures cookies are included with the request
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			} else {
				const data = await response.json();
				console.log("Response data222 of showing checkout:", data);
				if (data && data.checkoutForm) {
					// Update formFields state with checkoutForm from the response
					setFormFields(data.checkoutForm.inputs);
				} else {
					console.error("No checkoutForm found in response.");
				}
			}
		} catch (error) {
			console.error("Error handling show cart:", error);
			return false;
		}
	};

	return (
		<div className="desktop:max-w-[536px] w-full">
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				{() => (
					<Form>
						<div role="group" aria-labelledby="my-radio-group" className="mb-[56px]">
							<h3 className="font-druk_wide text-[18px] leading-6 mb-6 uppercase">
								Choose Payment Method
							</h3>
							{formFields &&
								Object.entries(formFields.find((field) => field.type === "radio")?.values || {}).map(
									([key, value]) => (
										<Field
											component={CustomRadio}
											name="payment_method"
											value={key}
											image=""
											label={value}
										/>
									)
								)}
						</div>
						<div className="flex flex-col gap-6 mb-6">
							<h3 className="font-druk_wide text-[18px] leading-6 uppercase">Personal information</h3>
							<Field name="name" label="Name" component={CustomInput} placeholder="Name" />
							<Field name="phone" label="Phone" component={CustomInput} placeholder="Phone" />
							<Field name="email" label="Email" component={CustomInput} placeholder="Email" />
							<div>
								<label htmlFor="accept_newsletter">
									<Field type="checkbox" name="accept_newsletter" />
									<span className="ml-2">Accept newsletter</span>
								</label>
							</div>
						</div>

						<button
							className="w-[348px] desktop:w-[424px] py-[14px] font-druk_wide text-[12px] leading-[18px] bg-primary uppercase"
							type="submit"
						>
							buy a ticket
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default PaymentForm;
