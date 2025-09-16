import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
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
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
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
    parse: type === "number" ? (Number as any) : (v) => (v === "" ? null : v),
    ...fieldProps,
  })

  const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

  return (
    <Box {...outerProps} className="flex flex-col" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <label {...labelProps} className="flex flex-col text-sm mb-2">
        {type === "checkbox" ? (
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              {...input}
              disabled={submitting}
              ref={ref as React.Ref<HTMLInputElement>}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm">{label}</span>
          </div>
        ) : isSelect ? (
          <select
            {...(input as any)}
            disabled={submitting}
            ref={ref as React.Ref<HTMLSelectElement>}
            {...props}
            className="mt-2 rounded p-2 text-sm"
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <TextField
            {...input}
            disabled={submitting}
            {...props}
            id={name}
            label={label}
            variant="outlined"
            ref={ref as React.Ref<HTMLInputElement>}
            sx={{ mt: 1 }}
          />
        )}
      </label>

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
