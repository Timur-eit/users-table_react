import React from "react";
import { FieldAttributes, FormikTouched, FormikErrors } from "formik";
import "./style.scss";

type FormikField = FieldAttributes<any>;
interface ITextInputProps {
  inputName: string;
  labelName:
    | string
    | React.ReactElement<string, string | React.JSXElementConstructor<any>>;
  required: boolean;
  inputPlaceholder?: string;
  FormikConnectorTag: FormikField;
  touched?: FormikTouched<any>;
  errors?: FormikErrors<any>;
}

function TextInput(props: ITextInputProps) {
  const {
    inputName,
    labelName,
    inputPlaceholder,
    required,
    FormikConnectorTag,
    touched,
    errors,
  } = props;

  return (
    <label className="text-input">
      <div className="label-name">{labelName}</div>
      <FormikConnectorTag name={inputName} placeholder={inputPlaceholder} />
      {required &&
        touched &&
        touched[inputName] &&
        errors &&
        errors[inputName] && (
          <p className="error-message">{errors[inputName]}</p>
        )}
    </label>
  );
}

export default TextInput;
