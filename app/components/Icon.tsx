import Feather from "@expo/vector-icons/Feather";

export type IconProps = {
  size?: number;
  color?: string;
  name: keyof typeof Feather.glyphMap;
}

export function Icon({ name, size, color }: IconProps) {
  return (
    <Feather
    name={name}
    size={size}
    color={color}
    />
  );
}