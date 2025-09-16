import { forwardRef, ComponentPropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<"input"> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Can include checkbox now */
  type?: "text" | "password" | "email" | "number" | "checkbox"
  /** Flag to determine if the field is a select dropdown */
  isSelect?: boolean
  /** Options for select dropdown (if applicable) */
  options?: { value: string; label: string }[]
  outerProps?: ComponentPropsWithoutRef<"div">
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<
  HTMLInputElement | HTMLSelectElement,
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
    <Box {...outerProps} className="flex flex-col" component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off">
      {type === "checkbox" ? (
        <div className="flex items-center mt-2" {...outerProps}>
          <input
            type="checkbox"
            {...input}
            disabled={submitting}
            ref={ref as React.Ref<HTMLInputElement>}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            id={name}
          />
          <label
            htmlFor={name}
            {...labelProps}
            className="ml-2 text-sm cursor-pointer"
          >
            {label}
          </label>
        </div>
      ) : isSelect ? (
        <div {...outerProps} className="flex flex-col">
          <label htmlFor={name} {...labelProps} className="text-sm mb-2">
            {label}
          </label>
          <select
            {...input}
            disabled={submitting}
            ref={ref as React.Ref<HTMLSelectElement>}
            id={name}
            className="mt-2 rounded p-2 text-sm border border-gray-300"
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div {...outerProps}>
          <TextField
            {...input}
            disabled={submitting}
            type={type}
            id="outlined-basic"
            label={label}
            variant="outlined"
            ref={ref as React.Ref<HTMLInputElement>}
          />
        </div>
      )}

      {touched && normalizedError && (
        <div role="alert" className="text-red-500 text-sm mt-1">
          {normalizedError}
        </div>
      )}
    </Box>
  )
})

LabeledTextField.displayName = "LabeledTextField"

export default LabeledTextField
