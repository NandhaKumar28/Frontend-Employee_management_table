import * as yup from "yup";

let passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//min 5 characters 1 uppercase 1 lowercase 1 number
let emailRules =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];
const validationSchema = yup.object().shape({
  firstName: yup.string().required("This field is required*"),
  lastName: yup.string().required("This field is required*"),
  email: yup
    .string()
    .matches(emailRules, { message: "Email should contain @ and ." })
    .required("This field is required*"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("This field is required*"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match*")
    .required("This field is required*"),
    image: yup
    .mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File too large",
      value => value && value.size 
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => value && SUPPORTED_FORMATS.includes(value.type)
    ) 
});

export default validationSchema;
