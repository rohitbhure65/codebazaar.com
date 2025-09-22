import { forwardRef } from "react"                          // To forward refs in React components
import { useField } from "react-final-form"                 // Hook to connect field with Final Form
import FormControlLabel from "@mui/material/FormControlLabel" // MUI wrapper for checkbox + label
import Checkbox from "@mui/material/Checkbox"               // MUI Checkbox component
import FormHelperText from "@mui/material/FormHelperText"   // MUI error/helper text
import FormControl from "@mui/material/FormControl"         // MUI form control wrapper

export interface LabeledCheckboxProps {
  name: string       // Field name (for Final Form)
  label: string      // Checkbox label text
  [key: string]: any // Allow additional props
}

// ForwardRef allows parent components to get ref of checkbox
export const LabeledCheckbox = forwardRef<HTMLButtonElement, LabeledCheckboxProps>(
  ({ name, label, ...props }, ref) => {
    const {
      input,                                             // input handlers from react-final-form
      meta: { touched, error, submitError },             // meta state (validation + submission)
    } = useField(name, {
      type: "checkbox", // Important: defines this field as a checkbox type
    })

    // Normalize error: join arrays or fallback to submitError
    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <FormControl error={touched && !!normalizedError} component="div"> {/* Wrapper for validation state */}
        <FormControlLabel
          control={
            <Checkbox
              {...input}                // Spread input props (value, onChange, etc.)
              {...props}                // Spread additional props
              ref={ref}                 // Forwarded ref
              checked={!!input.checked} // Ensure boolean checked state
              color="primary"           // Primary color style
            />
          }
          label={label}                 // Show checkbox label
        />
        {touched && normalizedError && ( // Show error only if touched + has error
          <FormHelperText role="alert" error>
            {normalizedError}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
)

LabeledCheckbox.displayName = "LabeledCheckbox" // Helpful for React DevTools

export default LabeledCheckbox // Default export for usage in forms
