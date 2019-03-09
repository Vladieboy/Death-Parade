import * as Yup from "yup";

const getAddressSchema = () =>
  Yup.object().shape({
    lineOne: Yup.string()
      .required("Please enter a valid address.")
      .test("len", "Address must be between 8-128 characters.", val =>
        val ? val.length >= 8 && val.length <= 128 : ""
      ),

    city: Yup.string()
      .required("Please enter a valid city name.")
      .test("len", "City name must be between 3-50 characters.", val =>
        val ? val.length >= 3 && val.length <= 50 : ""
      ),

    state: Yup.string().required("State field is required"),

    postalCode: Yup.string()
      .required("Please enter a valid postal code")
      .test("len", "Zip must be between 5-9 characters.", val =>
        val ? val.length >= 5 && val.length <= 9 : ""
      )
  });

getAddressSchema.initialValues = {
  lineOne: "",
  lineTwo: "",
  city: "",
  state: "",
  postalCode: "",
  title: ""
};

export { getAddressSchema };
