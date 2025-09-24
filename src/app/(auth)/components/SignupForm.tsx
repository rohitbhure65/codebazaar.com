"use client"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { Form, FORM_ERROR } from "@/src/app/components/SignupForm"
import signup from "../mutations/signup"
import { Signup } from "../validations"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const router = useRouter()

  return (
   <section className="flex items-center justify-center h-screen">
      <div className="w-full max-w-7xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create An Account</h1>

        <Form
          submitText="Create Account"
          schema={Signup}
          initialValues={{
            email: "",
            password: "",
            name: "",
            dateOfBirth: "",
            address: "",
            age: undefined,
            city: "",
            state: "",
            phone: "",
            gender: "",
            country: "",
            postalCode: "",
            profilePic: "",
            bio: ""
          }}
          onSubmit={async (values) => {
            try {
              await signupMutation({
                email: values.email,
                password: values.password,
                name: values.name,
                dateOfBirth: values.dateOfBirth,
                address: values.address,
                age: values.age,
                city: values.city,
                state: values.state,
                phone: values.phone,
                gender: values.gender,
                country: values.country,
                postalCode: values.postalCode,
                profilePic: values.profilePic,
                bio: values.bio
              })

              // Call the onSuccess callback if provided
              if (props.onSuccess) {
                props.onSuccess()
              } else {
                // Default behavior: refresh and redirect to home
                router.refresh()
                router.push("/")
              }
            } catch (error: any) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
              } else if (error.code === "P2002" && error.meta?.target?.includes("phone")) {
                return { phone: "This phone number is already being used" }
              } else {
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <LabeledTextField name="name" label="Full Name" placeholder="Full Name" />
          <LabeledTextField name="phone" label="Phone Number" placeholder="Phone Number" />
          <LabeledTextField name="dateOfBirth" label="Date of Birth" placeholder="YYYY-MM-DD" />
          <LabeledTextField name="age" label="Age" placeholder="Age" type="number" />
          <LabeledTextField name="address" label="Address" placeholder="Street Address" />
          <LabeledTextField name="city" label="City" placeholder="City" />
          <LabeledTextField name="state" label="State" placeholder="State" />
          <LabeledTextField name="country" label="Country" placeholder="Country" />
          <LabeledTextField name="postalCode" label="Postal Code" placeholder="Postal Code" />
          <LabeledTextField name="profilePic" label="Profile Picture URL" placeholder="https://..." />
          <LabeledTextField name="bio" label="Bio" placeholder="Tell us about yourself" type="textarea" />

          <LabeledTextField
            name="gender"
            label="Gender"
            isSelect
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
              { value: "OTHER", label: "Other" }
            ]}
          />
        </Form>
      </div>
    </section>
  )
}