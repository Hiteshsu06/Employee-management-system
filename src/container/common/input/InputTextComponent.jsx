import React from "react";
import { Grid, TextField } from "@mui/material";

const InputTextComponent = ({
  value,
  type,
  id,
  placeholder,
  onChange,
  name,
  className,
  required,
  error,
  helperText,
  disabled = false,
  onBlur,
  onFocus,
  InputProps,
  onInput,
  sx,
}) => {
  return (
    <Grid className="custom-input-design">
      <TextField
        name={name}
        type={type}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        required={required}
        error={error}
        helperText={helperText}
        disabled={disabled}
        size={"small"}
        onBlur={onBlur}
        onFocus={onFocus}
        InputProps={InputProps}
        onInput={onInput}
        sx={sx}
      />
    </Grid>
  );
};

export default InputTextComponent;
