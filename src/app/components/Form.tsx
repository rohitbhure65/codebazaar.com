import { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import { z } from "zod"
import { validateZodSchema } from "blitz"
export { FORM_ERROR } from "final-form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  children?: ReactNode
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
}

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
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 flex flex-col items-stretch justify-center bg-white max-w-md w-full dark:bg-gray-800 shadow-md rounded-lg p-6 sm:p-8"
          {...props}
        >
          {children}

          {submitError && (
            <div role="alert" className="text-red-500 text-sm">
              {submitError}
            </div>
          )}

          {submitText && (
            <button
              type="submit"
              disabled={submitting}
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

export default Form
