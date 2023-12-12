import React from "react";
import Select, { createFilter, Props, components } from "react-select";
import CreatableSelect from "react-select/creatable";
import theme from "styles/theme";

export type MultiSelectOptions = {
  label: string;
  value: string;
};

export type MultiSelectProps = {
  options: MultiSelectOptions[];
  name: string;
  allowCreate?: boolean;
  onChange: Props["onChange"];
  values?: MultiSelectOptions[];
};

const customStyles: Props["styles"] = {
  control: (provided, state) => {
    return {
      ...provided,
      backgroundColor: "transparent",
      border: `1px solid ${theme.colors.comp_outline}`,
      borderRadius: "4px",
      color: theme.colors.contrast_high,
      resize: "vertical",
    };
  },
  valueContainer: (provided, state) => {
    return {
      ...provided,
      padding: "0.5em",
    };
  },
  menu: (provided, state) => {
    return {
      ...provided,
      backgroundColor: theme.colors.bg_comp_1_light,
      zIndex: 999,
    };
  },
  option: (provided, state) => {
    return {
      ...provided,
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: theme.colors.accent_2_bg_light,
      },
    };
  },
  multiValue: (provided, state) => {
    return {
      ...provided,
      backgroundColor: theme.colors.accent_2_bg_light,
      border: `1px solid ${theme.colors.accent_2_600}`,
      color: theme.colors.contrast_high,
    };
  },
  multiValueLabel: (provided, state) => {
    return {
      ...provided,
      color: theme.colors.contrast_high,
    };
  },
  input: (provided, state) => {
    return {
      ...provided,
      color: theme.colors.contrast_high,
    };
  },
};

const Option: typeof components.Option = ({ children, ...props }) => {
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = Object.assign(props, { innerProps: rest });
  return <components.Option {...newProps}>{children}</components.Option>;
};

const MultiSelectComponent = ({
  options,
  name,
  allowCreate,
  onChange,
  values,
}: MultiSelectProps) => {
  if (allowCreate) {
    return (
      <CreatableSelect
        isMulti
        name={name}
        options={options}
        styles={customStyles}
        filterOption={createFilter({ ignoreAccents: false })}
        components={{ Option: Option }}
        onChange={onChange}
        value={values}
      />
    );
  }
  return (
    <Select
      isMulti
      name={name}
      options={options}
      styles={customStyles}
      filterOption={createFilter({ ignoreAccents: false })}
      components={{ Option: Option }}
      value={values}
    />
  );
};

export const MultiSelect = React.memo(MultiSelectComponent);
