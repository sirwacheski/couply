import React from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, TextInput, TextInputProps, TouchableOpacity } from "react-native";

type Properties = Pick<TextInputProps, "keyboardType" | "placeholder" | "autoComplete" |  "autoCapitalize" | "autoCorrect" | "onChangeText" | "value" | "defaultValue" | "maxLength" | "editable" | "multiline"> & {
  className?: string;
  isPassword?: boolean;
  icon?: React.ReactNode;
}

export function TextField({ className, icon, isPassword, multiline, ...rest }: Properties) {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(() => !!isPassword);

  return (
    <View
    className={`w-full ${multiline ? "h-32" : "h-16"} ${multiline ? "rounded-3xl" : "rounded-full"} border-white border-2 flex-row items-center ${multiline ? "px-7" : "pl-7"} overflow-hidden ${className}`}>
      <View 
      className={`flex-1 h-full flex-row gap-x-3 ${multiline ? "items-start" : "items-center"} ${multiline && "mt-5"}`}>
        {!multiline && icon}
        <TextInput
        {...rest}
        multiline={multiline}
        textAlignVertical="center"
        placeholderTextColor={"#fff"}
        secureTextEntry={secureTextEntry}
        className="flex-1 h-full text-md font-base color-white"
        />
      </View>
      {isPassword && 
        <TouchableOpacity
        className="w-20 h-full items-center justify-center rounded-full"
        onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <FontAwesome 
          size={23.5}
          color={"white"}
          name={secureTextEntry ? "eye" : "eye-slash"}
          />
        </TouchableOpacity>
      }
    </View>
  );
}