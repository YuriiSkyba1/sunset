import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Required field"),
  phone: Yup.string()
    .matches(
      /^\+?(\d{1,4})\s?(\d{1,3})\s?(\d{1,3})\s?(\d{1,4})\s?(\d{1,4})$/,
      "Invalid phone number format"
    )
    .required("Required field"),
  email: Yup.string().email("Invalid email format").required("Required field"),
  message: Yup.string(),
});
