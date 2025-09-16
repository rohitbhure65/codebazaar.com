import { forwardRef } from "react"
import { useField } from "react-final-form"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"

export interface LabeledCheckboxProps {
  /** Field name. */
  name: string
  /** Checkbox label. */
  label: string
  /** Additional props */
  [key: string]: any
}

export const LabeledCheckbox = forwardRef<HTMLButtonElement, LabeledCheckboxProps>(
  ({ name, label, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError },
    } = useField(name, {
      type: "checkbox", // This is important for checkboxes
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <FormControl error={touched && !!normalizedError} component="div">
        <FormControlLabel
          control={
            <Checkbox
              {...input}
              {...props}
              ref={ref}
              checked={!!input.checked}
              color="primary"
            />
          }
          label={label}
        />
        {touched && normalizedError && (
          <FormHelperText role="alert" error>
            {normalizedError}
          </FormHelperText>
        )}
      </FormControl>
    )
  }
)

LabeledCheckbox.displayName = "LabeledCheckbox"

export default LabeledCheckbox