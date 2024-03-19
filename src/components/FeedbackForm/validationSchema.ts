import * as Yup from "yup";

export const validationSchema = Yup.object({
	name: Yup.string().required("Required field"),
	phone: Yup.string().required("Required field"),
	email: Yup.string().email("Invalid email format"),
	message: Yup.string(),
});
