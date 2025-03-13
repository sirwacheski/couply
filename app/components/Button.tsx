import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Properties = Omit<TouchableOpacityProps, "style" | "children" | "className"> & {
  children: string
  className?: string
  isSubmiting?: boolean
  style?: "filled" | "outlined"
}

export function Button({ children, className, isSubmiting, style = "filled", ...options }: Properties) {
  const filledClassName = "bg-white rounded-full p-3 h-16 justify-center items-center";
  const outlinedClassName = "border-2 border-white rounded-full p-3 h-16 justify-center items-center";

  return (
    <TouchableOpacity
    {...options}
    disabled={isSubmiting || options.disabled}
    className={`${style == "filled" ? filledClassName : outlinedClassName} ${className}`}>
      {isSubmiting ? (
        <ActivityIndicator
        size={"small"}
        color="#000000"
        />
      ) : (
        <Text
        className={`text-lg text-center font-base font-semibold tracking-widest ${style == "filled" ? "text-black" : "text-white"}`}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  )
}