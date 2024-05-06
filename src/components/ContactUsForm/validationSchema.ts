import { isValidPhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const validationSchema = Yup.object({
	name: Yup.string().required("Required field"),
	phone: Yup.string()
		.test("phone", "Invalid phone number", (value) => {
			// Check if the value starts with '+380' and has a total length of 13 characters
			if (value) {
				return isValidPhoneNumber(value.toString());
			} else return false;
		})
		.required("Phone is required"),
	email: Yup.string().email("Invalid email format"),
	question: Yup.string(),
});
