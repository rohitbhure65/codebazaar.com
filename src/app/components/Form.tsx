import { ReactNode, PropsWithoutRef } from "react"                   // React types for children & props
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form" // Final Form components & types
import { z } from "zod"                                              // Zod for schema validation
import { validateZodSchema } from "blitz"                            // Blitz helper to validate with Zod
export { FORM_ERROR } from "final-form"                              // Export Final Form's error constant

// Define FormProps interface, extending HTML <form> props except onSubmit
export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  children?: ReactNode                        // Child elements inside the form
  submitText?: string                         // Button text (e.g., "Submit")
  schema?: S                                  // Optional Zod schema for validation
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]  // Submit handler with inferred schema type
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"] // Default form values
}

// Reusable Form component with validation & styling
export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}           // Load default form values
      validate={validateZodSchema(schema)}    // Validate form data with Zod
      onSubmit={onSubmit}                     // Submit handler
      render={({ handleSubmit, submitting, submitError }) => (
        <form
          onSubmit={handleSubmit}             // Attach submit handler
          className="space-y-6 flex flex-col items-stretch justify-center bg-white max-w-md w-full dark:bg-gray-800 shadow-md rounded-lg p-6 sm:p-8"
          {...props}
        >
          {children}                          {/* Render all form fields passed as children */}

          {submitError && (                   // Show error if submission fails
            <div role="alert" className="text-red-500 text-sm">
              {submitError}
            </div>
          )}

          {submitText && (                    // Show submit button if text is provided
            <button
              type="submit"
              disabled={submitting}            // Disable button while submitting
              className="w-full py-3 px-5 font-semibold text-white rounded-xl 
                 bg-gradient-to-r from-red-500 to-red-600 
                 hover:from-red-600 hover:to-red-700
                 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800
                 shadow-lg transition-all duration-300 ease-in-out 
                 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitText}
            </button>
          )}
        </form>
      )}
    />
  )
}

export default Form                            // Default export of the Form component
