import React, { forwardRef, ComponentPropsWithoutRef } from "react" // React + types
import { useField, UseFieldConfig } from "react-final-form" // react-final-form field hook

import TextField from "@mui/material/TextField" // MUI text input
import Box, { BoxProps } from "@mui/material/Box" // Layout container
import InputLabel from "@mui/material/InputLabel" // Label for select
import MenuItem from "@mui/material/MenuItem" // Dropdown item
import FormControl from "@mui/material/FormControl" // Wrapper for form elements
import Select from "@mui/material/Select" // Dropdown select
import FormControlLabel from "@mui/material/FormControlLabel" // Checkbox label
import Checkbox from "@mui/material/Checkbox" // Checkbox
import TextareaAutosize from "@mui/material/TextareaAutosize" // Multi-line textarea

// Define props for the custom field
export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<"input"> {
  name: string // field name
  label: string // field label
  type?: "text" | "password" | "email" | "number" | "checkbox" | "textarea" // field type
  isSelect?: boolean // flag if it's a dropdown
  multiple?: boolean // flag for multiple selection
  options?: { value: any; label: any }[] // options for select dropdown
  outerProps?: BoxProps // props for outer Box
  labelProps?: Omit<ComponentPropsWithoutRef<typeof FormControlLabel>, "label" | "control"> // props for label
  fieldProps?: UseFieldConfig<string> // props for react-final-form
}

// Create custom input field with forwardRef
export const LabeledTextField = forwardRef<
  HTMLInputElement | HTMLSelectElement | HTMLButtonElement | HTMLTextAreaElement,
  LabeledTextFieldProps
>(
  (
    { name, label, isSelect, multiple, options, outerProps, fieldProps, labelProps, type, ...props },
    ref
  ) => {
    const {
      input, // field input props (value, onChange, etc.)
      meta: { touched, error, submitError, submitting }, // field meta state
    } = useField(name, {
      parse:
        type === "number" // if number type, parse value
          ? (v) => (v === "" ? null : Number(v))
          : multiple // if multiple selection, ensure array
          ? (v) => (Array.isArray(v) ? v : v ? [v] : [])
          : (v) => (v === "" ? null : v),
      ...fieldProps, // merge extra field props
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError // normalize error

    return (
      <Box
        {...outerProps} // pass outer props
        sx={{
          width: "100%", // full width
          mb: 1, // margin bottom
          ...(outerProps?.sx as object), // merge styles
        }}
      >
        {type === "checkbox" ? ( // Render checkbox
          <FormControlLabel
            control={
              <Checkbox
                {...input} // bind input
                checked={!!input.value} // boolean check
                disabled={submitting} // disable on submit
                ref={ref as React.Ref<HTMLButtonElement>} // forward ref
                color="primary" // primary color
              />
            }
            label={label} // checkbox label
            {...labelProps} // extra label props
          />
        ) : isSelect ? ( // Render select dropdown
          <FormControl fullWidth error={touched && !!normalizedError}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel> {/* dropdown label */}
            <Select
              {...input} // bind input
              disabled={props.disabled || submitting} // disable if needed
              labelId={`${name}-label`} // label id
              id={name} // element id
              label={label} // field label
              multiple={multiple} // enable multiple selection
              value={multiple ? (input.value || []) : (input.value || "")} // handle multiple values
              ref={ref as React.Ref<any>} // forward ref
              renderValue={multiple ? (selected: any) => {
                if (!selected || selected.length === 0) return "";
                const selectedLabels = selected.map((value: any) => {
                  const option = options?.find(opt => opt.value === value);
                  return option?.label || value;
                });
                return selectedLabels.join(", ");
              } : undefined}
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}> {/* option */}
                  {multiple && <Checkbox checked={(input.value || []).indexOf(option.value) > -1} />}
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : type === "textarea" ? ( // Render textarea
          <TextareaAutosize
            {...input} // bind input
            aria-label={label} // accessibility label
            minRows={3} // min rows
            placeholder={label} // placeholder
            style={{
              width: "100%", // full width
              fontSize: "1rem", // font size
              padding: "8.5px 14px", // padding
              borderRadius: 4, // rounded border
              borderColor:
                touched && !!normalizedError // error color
                  ? "#d32f2f"
                  : "rgba(0, 0, 0, 0.23)",
              borderStyle: "solid", // border style
              borderWidth: 1, // border width
              boxSizing: "border-box", // box sizing
            }}
            disabled={submitting} // disable on submit
            ref={ref as React.Ref<HTMLTextAreaElement>} // forward ref
          />
        ) : (
          // Render normal text field
          <TextField
            {...input} // bind input
            disabled={submitting} // disable when submitting
            type={type} // input type
            id={name} // field id
            label={label} // label
            variant="outlined" // outlined variant
            fullWidth // full width
            ref={ref as React.Ref<HTMLInputElement>} // forward ref
            error={touched && !!normalizedError} // show error
          />
        )}

        {touched && normalizedError && ( // show error message
          <Box
            role="alert"
            sx={{
              color: "error.main", // error color
              fontSize: "0.75rem", // small text
              mt: 0.5, // margin top
              ml: 2, // margin left
            }}
          >
            {normalizedError}
          </Box>
        )}
      </Box>
    )
  }
)

LabeledTextField.displayName = "LabeledTextField" // component display name

export default LabeledTextField // default export
