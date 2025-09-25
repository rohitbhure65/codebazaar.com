"use client"
import { LabeledTextField } from "src/app/components/LabeledTextField"
import { LabeledDateField } from "src/app/components/LabeledDateField"
import { Form, FORM_ERROR } from "@/src/app/components/SignupForm"
import signup from "../mutations/signup"
import { Signup } from "../validations"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import { useFormState } from "react-final-form"
import axios from "axios"
import { X_CSCAPI_KEY } from "@/lib/constants"

type SignupFormProps = {
  onSuccess?: () => void
}

type ApiResponseItem = { name: string; iso2: string }
type Country = ApiResponseItem
type State = ApiResponseItem
type City = { name: string }

const API_BASE_URL = "https://api.countrystatecity.in/v1"

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

              if (props.onSuccess) {
                props.onSuccess()
              } else {
                router.refresh()
                router.push("/")
              }
            } catch (error: any) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
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

// Custom hooks for API fetching to improve separation of concerns and reusability
const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(`${API_BASE_URL}/countries`, {
          headers: { "X-CSCAPI-KEY": X_CSCAPI_KEY }
        })
        setCountries(response.data.map((c: any) => ({ name: c.name, iso2: c.iso2 })))
      } catch (err) {
        console.error("Error fetching countries:", err)
        setError("Failed to load countries")
      } finally {
        setLoading(false)
      }
    }
    fetchCountries()
  }, [])

  return { countries, loading, error }
}

const useStates = (countryIso2: string | null) => {
  const [states, setStates] = useState<State[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!countryIso2) {
      setStates([])
      setError(null)
      return
    }

    const fetchStates = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(`${API_BASE_URL}/countries/${countryIso2}/states`, {
          headers: { "X-CSCAPI-KEY": X_CSCAPI_KEY }
        })
        setStates(response.data.map((s: any) => ({ name: s.name, iso2: s.iso2 })))
      } catch (err) {
        console.error("Error fetching states:", err)
        setError("Failed to load states")
      } finally {
        setLoading(false)
      }
    }
    fetchStates()
  }, [countryIso2])

  return { states, loading, error }
}

const useCities = (countryIso2: string | null, stateIso2: string | null) => {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!countryIso2 || !stateIso2) {
      setCities([])
      setError(null)
      return
    }

    const fetchCities = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get(`${API_BASE_URL}/countries/${countryIso2}/states/${stateIso2}/cities`, {
          headers: { "X-CSCAPI-KEY": X_CSCAPI_KEY }
        })
        const fetchedCities = response.data.map((c: any) => ({ name: c.name }))
        setCities(fetchedCities)
        // If no cities are returned, set a specific error
        if (fetchedCities.length === 0) {
          setError("No cities available for this state")
        }
      } catch (err) {
        console.error("Error fetching cities:", err)
        setError("Failed to load cities")
      } finally {
        setLoading(false)
      }
    }
    fetchCities()
  }, [countryIso2, stateIso2])

  return { cities, loading, error }
}

const SignupFormFields = () => {
  const { values } = useFormState()

  // Fetch countries
  const { countries, loading: countriesLoading, error: countriesError } = useCountries()

  // Find selected country ISO
  const selectedCountryIso2 = useMemo(() => {
    return values.country ? countries.find(c => c.name === values.country)?.iso2 || null : null
  }, [values.country, countries])

  // Fetch states based on selected country
  const { states, loading: statesLoading, error: statesError } = useStates(selectedCountryIso2)

  // Find selected state ISO
  const selectedStateIso2 = useMemo(() => {
    return values.state ? states.find(s => s.name === values.state)?.iso2 || null : null
  }, [values.state, states])

  // Fetch cities based on selected state
  const { cities, loading: citiesLoading, error: citiesError } = useCities(selectedCountryIso2, selectedStateIso2)

  // Memoize options to prevent unnecessary re-renders
  const countryOptions = useMemo(
    () => countries.map(c => ({ value: c.name, label: c.name })),
    [countries]
  )
  const stateOptions = useMemo(
    () => states.map(s => ({ value: s.name, label: s.name })),
    [states]
  )
  const cityOptions = useMemo(
    () => cities.map(c => ({ value: c.name, label: c.name })),
    [cities]
  )

  // Combined loading and error states for UX (simplified; could be more granular)
  const isLocationLoading = countriesLoading || statesLoading || citiesLoading
  const locationError = countriesError || statesError || citiesError

  // City-specific validation: Check if selected city exists in fetched cities
  const cityValidationError = useMemo(() => {
    if (values.city && selectedStateIso2 && cities.length > 0) {
      const isValidCity = cities.some(c => c.name === values.city)
      if (!isValidCity) {
        return "Selected city is not available in this state. Please choose from the list."
      }
    }
    return null
  }, [values.city, selectedStateIso2, cities])

  if (locationError) {
    // Optionally render an error message; for now, log and proceed with empty options
    console.error("Location API error:", locationError)
  }

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
      <LabeledTextField
        name="country"
        label="Country"
        placeholder="Country"
        isSelect
        options={countryOptions}
        disabled={countriesLoading}
      />
      <LabeledTextField
        name="state"
        label="State"
        placeholder="State"
        isSelect
        options={stateOptions}
        disabled={!selectedCountryIso2 || statesLoading}
      />
      <LabeledTextField
        name="city"
        label="City"
        placeholder="City"
        isSelect
        options={cityOptions}
        disabled={!selectedStateIso2 || citiesLoading}
      />
      {cityValidationError && (
        <p className="text-sm text-red-500 mt-1">{cityValidationError}</p>
      )}
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
      {isLocationLoading && <p className="text-sm text-gray-500">Loading location data...</p>}
      {locationError && <p className="text-sm text-red-500">Error loading locations. Please try again.</p>}
      {citiesError && !isLocationLoading && (
        <p className="text-sm text-red-500">City data unavailable: {citiesError}</p>
      )}
    </>
  )
}
