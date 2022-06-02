import { FastField, FieldAttributes } from "formik";
import styled, { css } from "styled-components";

export type StyledFieldProps = FieldAttributes<any> & {
  formikField?: boolean;
};
export const StyledField = ({
  formikField = true,
  ...props
}: StyledFieldProps) => {
  if (formikField) {
    return <AppField {...props} />;
  } else {
    return <AppInput {...props} />;
  }
};

export const AppFieldStyles = css`
  width: 100%;
  background-color: transparent;
  border: ${(props) => `1px solid ${props.theme.colors.comp_outline}`};
  border-radius: 4px;
  padding: 1em;
  color: ${(props) => `${props.theme.colors.contrast_high}`};
  resize: vertical;
`;

const AppField = styled(FastField)`
  ${AppFieldStyles}
  ${(props) => {
    if (props.as === "textarea") {
      return `min-height: 150px;`;
    }
  }}
`;

const AppInput = styled.input`
  ${AppFieldStyles}
`;
