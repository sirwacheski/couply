import { Image, ImageRequireSource, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type Properties = {
  size: number;
  title: string;
  icon: ImageRequireSource,
  onSelect(): void;
}

export function FeatureOption({ size, title, icon, onSelect }: Properties) {
  const containerStyles = useAnimatedStyle(() => ({
    width: size,
    height: size,
    padding: size * 0.125,
    borderRadius: size * 0.2,
    justifyContent: "space-between",
    backgroundColor: "#F01448",
  }), [size]);

  return (
    <TouchableOpacity
    onPress={onSelect}>
      <Animated.View
      style={containerStyles}>
        <View>
          <Image 
          source={icon}
          tintColor={"#B40D36"}
          resizeMode="contain"
          className="w-10 h-10"
          />
        </View>
        <View>
          <Text
          className="text-xl font-base font-bold color-[#B40D36]">
            {"Check your"}
          </Text>
          <Text
          className="text-xl font-base font-bold color-white">
            {title}.
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}