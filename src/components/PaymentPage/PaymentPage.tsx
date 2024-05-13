"use client";

import { useSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import _debounce from "lodash.debounce";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import PaymentPageRightSide from "../PaymentPageRightSide/PaymentPageRightSide";
import PaymentPageAboutFilmSection from "../PaymentPageAboutFilmSection/PaymentPageAboutFilmSection";
import PaymentForm from "../PaymentForm/PaymentForm";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateFilmViewFromStorage } from "@/redux/getFilmView/getFilmView";
import { addResponse } from "@/redux/cartResponsesSlice/cartResponsesSlice";

function PaymentPage() {
	const dispatch = useDispatch();
	const filmView = useSelector((state) => state.filmView);
	const cartResponses = useSelector((state) => state.cartResponses);
	const router = useRouter();

	useEffect(() => {
		if (!filmView.success) {
			const filmViewFromStorage = JSON.parse(localStorage.getItem("filmView")!);
			dispatch(updateFilmViewFromStorage(filmViewFromStorage));
		}
		if (!cartResponses.cart_items) {
			const cartResponsesFromStorage = JSON.parse(localStorage.getItem("cartResponses")!);
			dispatch(addResponse(cartResponsesFromStorage));
		}
	}, []);

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
			.test("phone", "Invalid phone number", (value) => {
				// Check if the value starts with '+380' and has a total length of 13 characters
				if (value) {
					return isValidPhoneNumber(value.toString());
				} else return false;
			})
			.required("Phone is required"),
		email: Yup.string().email("Invalid email").required("Email is required"),
	});

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			{() => (
				<Form>
					{filmView.success && (
						<div className="flex flex-col desktop:flex-row desktop:gap-[136px] gap-8 max-desktop:items-center px-[14px] desktop:px-[60px] max-desktop:mt-8 max-desktop:mb-10 desktop:mb-[104px]">
							<div className="w-full max-w-[348px] desktop:min-w-[760px] ">
								<PaymentPageAboutFilmSection />
								<div className="flex justify-end">
									<PaymentForm />
								</div>
							</div>

							<PaymentPageRightSide />
						</div>
					)}
				</Form>
			)}
		</Formik>
	);
}

export default PaymentPage;
