import { Field } from "formik";
import styled from "styled-components";

export const StyledField = styled(Field)`
  width: 100%;
  background-color: transparent;
  border: ${props => `1px solid ${props.theme.colors.comp_outline}`};
  border-radius: 4px;
  padding: 1em;
  color: ${props => `${props.theme.colors.contrast_high}`};
  resize: vertical
`