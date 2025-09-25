"use client"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { LabeledDateField } from "src/app/components/LabeledDateField"
import { Form, FORM_ERROR } from "@/src/app/components/SignupForm"
import signup from "../mutations/signup"
import { Signup } from "../validations"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useFormState } from "react-final-form"
import axios from "axios"
import { X_CSCAPI_KEY } from "@/lib/constants"

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
          <SignupFormFields />
        </Form>
      </div>
    </section>
  )
}

const SignupFormFields = () => {
  const [countries, setCountries] = useState<{ name: string; iso2: string }[]>([])
  const [states, setStates] = useState<{ name: string; iso2: string }[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedCountryIso2, setSelectedCountryIso2] = useState<string | null>(null)
  const [selectedStateIso2, setSelectedStateIso2] = useState<string | null>(null)

  const { values } = useFormState()

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://api.countrystatecity.in/v1/countries", {
          headers: {
            "X-CSCAPI-KEY": `${X_CSCAPI_KEY}`
          }
        })
        setCountries(response.data.map((c: any) => ({ name: c.name, iso2: c.iso2 })))
      } catch (error) {
        console.error("Error fetching countries:", error)
      }
    }
    fetchCountries()
  }, [])

  // Fetch states when country changes
  useEffect(() => {
    if (values.country) {
      const country = countries.find(c => c.name === values.country)
      if (country) {
        setSelectedCountryIso2(country.iso2)
        const fetchStates = async () => {
          try {
            const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country.iso2}/states`, {
              headers: {
                "X-CSCAPI-KEY": "UEFFSWFlSVVmMGFWZ3ZqVGRBZXJndGVLSXZpdUhTR01rVEdvUU1MZw=="
              }
            })
            setStates(response.data.map((s: any) => ({ name: s.name, iso2: s.iso2 })))
          } catch (error) {
            console.error("Error fetching states:", error)
          }
        }
        fetchStates()
      }
    } else {
      setSelectedCountryIso2(null)
      setStates([])
      setCities([])
      setSelectedStateIso2(null)
    }
  }, [values.country, countries])

  // Fetch cities when state changes
  useEffect(() => {
    if (values.state && selectedCountryIso2) {
      const state = states.find(s => s.name === values.state)
      if (state) {
        setSelectedStateIso2(state.iso2)
        const fetchCities = async () => {
          try {
            const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${selectedCountryIso2}/states/${state.iso2}/cities`, {
              headers: {
                "X-CSCAPI-KEY": "UEFFSWFlSVVmMGFWZ3ZqVGRBZXJndGVLSXZpdUhTR01rVEdvUU1MZw=="
              }
            })
            setCities(response.data.map((c: any) => c.name))
          } catch (error) {
            console.error("Error fetching cities:", error)
          }
        }
        fetchCities()
      }
    } else {
      setSelectedStateIso2(null)
      setCities([])
    }
  }, [values.state, selectedCountryIso2, states])

  const countryOptions = countries.map(c => ({ value: c.name, label: c.name }))
  const stateOptions = states.map(s => ({ value: s.name, label: s.name }))
  const cityOptions = cities.map(c => ({ value: c, label: c }))

  return (
    <>
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledTextField
        name="password"
        label="Password"
        placeholder="Password"
        type="password"
      />
      <LabeledTextField name="name" label="Full Name" placeholder="Full Name" />
      <LabeledTextField name="phone" label="Phone Number" placeholder="Phone Number" />
      <LabeledDateField name="dateOfBirth" label="Date of Birth" />
      <LabeledTextField name="age" label="Age" placeholder="Age" type="number" />
      <LabeledTextField name="address" label="Address" placeholder="Street Address" />
      <LabeledTextField name="country" label="Country" placeholder="Country" isSelect options={countryOptions} />
      <LabeledTextField name="state" label="State" placeholder="State" isSelect options={stateOptions} disabled={!selectedCountryIso2} />
      <LabeledTextField name="city" label="City" placeholder="City" isSelect options={cityOptions} disabled={!selectedStateIso2} />
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
    </>
  )
}
