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
          className="relative flex flex-col items-stretch justify-center w-full max-w-md p-8 space-y-6 
             bg-white/90 dark:bg-gray-800/90 backdrop-blur-md 
             rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 
             transition-all duration-300 hover:scale-[1.01]"
          {...props}
        >
          {children}

          {submitError && (
            <div
              role="alert"
              className="text-red-500 text-sm text-center animate-pulse"
            >
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
              {submitting ? "Processing..." : submitText}
            </button>
          )}

          <div className="absolute -top-3 -right-3 w-16 h-16 bg-red-500/20 dark:bg-red-500/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-red-500/20 dark:bg-red-500/20 rounded-full blur-2xl" />
        </form>

      )}
    />
  )
}

export default Form
