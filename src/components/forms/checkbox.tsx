import { useField } from "formik";
import React from "react";
import {
  AuFormGroup,
  AuFieldset,
  AuLabel,
  AuHintText,
  AuErrorText,
  AuCheckbox,
  AuLegend,
} from "../helpers/auds";

interface CheckBoxFieldProps {
  className?: string;
  defaultValue?: string;
  hint?: string;
  id: string;
  label: string;
  legend: string;
  onChange?: (e: any) => void;
  required?: boolean;
}

const CheckBoxField: React.FC<CheckBoxFieldProps> = (
  props: CheckBoxFieldProps
) => {
  const [field, meta] = useField({ name: props.id, ...props });
  const error = meta.touched && meta.error ? true: false;

  return (
    <AuFormGroup status={error ? "invalid" : "valid"}>
      <AuFieldset>
        <AuLegend>
          <AuLabel
            htmlFor={props.id}
            dangerouslySetInnerHTML={{ __html: props.legend }}
          ></AuLabel>
          {props.hint && <AuHintText text={props.hint} />}
          {error && <AuErrorText text={meta.error} id={`${props.id}--error`} />}
        </AuLegend>
        <AuCheckbox {...props} {...field} />
      </AuFieldset>
    </AuFormGroup>
  );
};

export default CheckBoxField;
