import * as Yup from "yup";

export const validationSchema = {
	name: Yup.string().required("Name is required"),
	phone: Yup.string().required("Phone is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
};
