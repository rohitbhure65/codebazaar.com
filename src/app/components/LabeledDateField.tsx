"use client"
import React from "react"
import { useField, UseFieldConfig } from "react-final-form"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { Box, BoxProps } from "@mui/material"

export interface LabeledDateFieldProps {
  name: string
  label: string
  outerProps?: BoxProps
  fieldProps?: UseFieldConfig<string>
}

export const LabeledDateField = ({
  name,
  label,
  outerProps,
  fieldProps,
}: LabeledDateFieldProps) => {
  const {
    input,
    meta: { touched, error, submitError, submitting },
  } = useField(name, {
    parse: (value) => {
      if (!value) return null
      // Convert date to ISO string format for form submission
      return value instanceof Date ? value.toISOString().split('T')[0] : value
    },
    ...fieldProps,
  })

  const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        {...outerProps}
        sx={{
          width: "100%",
          mb: 1,
          ...(outerProps?.sx as object),
        }}
      >
        <DatePicker
          label={label}
          value={input.value ? new Date(input.value) : null}
          onChange={(date) => {
            input.onChange(date)
          }}
          disabled={submitting}
          slotProps={{
            textField: {
              fullWidth: true,
              error: touched && !!normalizedError,
              helperText: touched && normalizedError ? normalizedError : undefined,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  )
}

LabeledDateField.displayName = "LabeledDateField"

export default LabeledDateField
