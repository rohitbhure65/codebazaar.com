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
          className="grid grid-cols-1 my-10 py-10 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8 max-w-5xl w-full mx-auto"
          {...props}
        >
          {children}

          {submitError && (
            <div
              role="alert"
              className="col-span-full text-red-500 text-sm bg-red-50 dark:bg-red-900/30 p-3 rounded-lg shadow-sm"
            >
              {submitError}
            </div>
          )}

          {submitText && (
            <div className="col-span-full flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg py-2.5 px-8 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
              >
                {submitText}
              </button>
            </div>
          )}
        </form>
      )}
    />
  )
}

export default Form
