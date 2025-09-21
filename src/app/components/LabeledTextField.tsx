import React, { forwardRef, ComponentPropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import TextField from '@mui/material/TextField';
import Box, { BoxProps } from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<"input"> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Can include checkbox and textarea now */
  type?: "text" | "password" | "email" | "number" | "checkbox" | "textarea"
  /** Flag to determine if the field is a select dropdown */
  isSelect?: boolean
  /** Options for select dropdown (if applicable) */
  options?: { value: any; label: any }[]
  outerProps?: BoxProps
  labelProps?: Omit<ComponentPropsWithoutRef<typeof FormControlLabel>, 'label' | 'control'>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<
  HTMLInputElement | HTMLSelectElement | HTMLButtonElement | HTMLTextAreaElement,
  LabeledTextFieldProps
>(({ name, label, isSelect, options, outerProps, fieldProps, labelProps, type, ...props }, ref) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField(name, {
    parse: type === "number"
      ? (v) => (v === "" ? null : Number(v))
      : (v) => (v === "" ? null : v),
    ...fieldProps,
  })

  const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

  return (
    <Box
      {...outerProps}
      sx={{
        width: '100%',
        mb: 1,
        ...(outerProps?.sx as object)
      }}
    >
      {type === "checkbox" ? (
        <FormControlLabel
          control={
            <Checkbox
              {...input}
              checked={!!input.value}
              disabled={submitting}
              ref={ref as React.Ref<HTMLButtonElement>}
              color="primary"
            />
          }
          label={label}
          {...labelProps}
        />
      ) : isSelect ? (
        <FormControl fullWidth error={touched && !!normalizedError}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            {...input}
            disabled={props.disabled || submitting}
            labelId={`${name}-label`}
            id={name}
            label={label}
            value={input.value || ''}
            ref={ref as React.Ref<any>}
          >
            {options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : type === "textarea" ? (
        <TextareaAutosize
          {...input}
          aria-label={label}
          minRows={3}
          placeholder={label}
          style={{ width: '100%', fontSize: '1rem', padding: '8.5px 14px', borderRadius: 4, borderColor: touched && !!normalizedError ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)', borderStyle: 'solid', borderWidth: 1, boxSizing: 'border-box' }}
          disabled={submitting}
          ref={ref as React.Ref<HTMLTextAreaElement>}
        />
      ) : (
        <TextField
          {...input}
          disabled={submitting}
          type={type}
          id={name}
          label={label}
          variant="outlined"
          fullWidth
          ref={ref as React.Ref<HTMLInputElement>}
          error={touched && !!normalizedError}
        />
      )}

      {touched && normalizedError && (
        <Box
          role="alert"
          sx={{
            color: 'error.main',
            fontSize: '0.75rem',
            mt: 0.5,
            ml: 2
          }}
        >
          {normalizedError}
        </Box>
      )}
    </Box>
  )
})

LabeledTextField.displayName = "LabeledTextField"

export default LabeledTextField