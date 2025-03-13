import React from "react";
import DatetimePicker from "react-native-date-picker";
import { Text, TouchableOpacity, View } from "react-native";

type Properties = {
  date: Date;
  min?: Date;
  max?: Date;
  className?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  mode?: "date" | "time" | "datetime";
  onChange(date: Date): void;
}

export function DateField({
  min,
  max,
  date,
  icon,
  onChange,
  className,
  placeholder,
  mode = "date",
}: Properties) {
  // State hooks
  const [visible, setVisible] = React.useState<boolean>(false);

  // Handlers
  function handleSubmit(date: Date) {
    setVisible(false);
    onChange?.(date);
  }

  function handleCancel() {
    setVisible(false);
  }

  return (
    <React.Fragment>
      <TouchableOpacity
      onPress={() => setVisible(true)}
      className={`w-full h-16 rounded-full border-white border-2 flex-row items-center pl-7 overflow-hidden ${className}`}>
        {icon}
        <View className="flex-1 ml-3">
          <Text
          className="text-md font-base text-white">
            {date != null ? date.toDateString() : placeholder}
          </Text>
        </View>
      </TouchableOpacity>
      <DatetimePicker 
      mode={mode}
      modal={true}
      open={visible}
      minimumDate={min}
      maximumDate={max}
      title={placeholder}
      onCancel={handleCancel}
      onConfirm={handleSubmit}
      date={date ?? new Date()}
      />
    </React.Fragment>
  );
}