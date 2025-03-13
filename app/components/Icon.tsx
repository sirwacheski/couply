import Feather from "@expo/vector-icons/Feather";

type Properties = {
  size?: number;
  color?: string;
  name: keyof typeof Feather.glyphMap;
}

export function Icon({ name, size, color }: Properties) {
  return (
    <Feather
    name={name}
    size={size}
    color={color}
    />
  );
}