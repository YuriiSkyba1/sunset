import React, { useEffect, useState, useCallback } from "react";
import Stripe from "../../assets/payment/stripe-logo.svg";
import Image from "next/image";
import { Field, FieldProps, useFormikContext, FieldInputProps, FormikProps } from "formik";
import PhoneInput from "react-phone-number-input";
import _debounce from "lodash.debounce";
import "react-phone-number-input/style.css";

import { InputInterfaces } from "../PaymentPage/InputsInterface";

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
			className=" font-gotham_pro_bold text-[16px] leading-6 border border-[#DFDDE3] pt-7 pl-3 pb-3 w-full "
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

const PaymentForm: React.FC = () => {
	const [formFields, setFormFields] = useState<InputInterfaces[]>();
	const [phoneInputValue, setPhoneInputValue] = useState("");

	useEffect(() => {
		handleCheckoutShow();
	}, []);

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
				}, 1000),
				[field.name, setFieldValue]
			);

			return (
				<div className="relative">
					<label
						className="absolute left-3 top-3 font-gotham_pro_regular text-[12px] leading-[16px] text-[#5B5C64]"
						htmlFor={field.name}
					>
						{label}
					</label>
					<PhoneInput
						{...field}
						international
						value={phoneInputValue}
						onChange={handleChange}
						className="font-gotham_pro_bold text-[16px] leading-6 border border-[#DFDDE3] pt-7 pl-3 pb-3 w-full"
					/>
					{touched[field.name] && errors[field.name] && (
						<div style={{ color: "red" }}>{errors[field.name]}</div>
					)}
				</div>
			);
		},
		(prevProps, nextProps) => {
			return (
				prevProps.field.value === nextProps.field.value &&
				prevProps.form.touched[prevProps.field.name] === nextProps.form.touched[nextProps.field.name] &&
				prevProps.form.errors[prevProps.field.name] === nextProps.form.errors[nextProps.field.name]
			);
		}
	);

	return (
		<div className="desktop:max-w-[536px] w-full">
			<div role="group" aria-labelledby="my-radio-group" className="mb-[56px]">
				<h3 className="font-druk_wide text-[18px] leading-6 mb-6 uppercase">Choose Payment Method</h3>
				{formFields &&
					Object.entries(formFields.find((field) => field.type === "radio")?.values || {}).map(
						([key, value]) => (
							<Field component={CustomRadio} name="payment_method" value={key} image="" label={value} />
						)
					)}
			</div>
			<div className="flex flex-col gap-6 mb-6">
				<h3 className="font-druk_wide text-[18px] leading-6 uppercase">Personal information</h3>
				<Field name="name" label="Name" component={CustomInput} placeholder="Name" />
				<Field name="phone" label="Phone" component={CustomPhoneInput} placeholder="Phone" />
				<Field name="email" label="Email" component={CustomInput} placeholder="Email" />
				<div>
					<label htmlFor="accept_newsletter">
						<Field type="checkbox" name="accept_newsletter" />
						<span className="ml-2">Accept newsletter</span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default PaymentForm;
