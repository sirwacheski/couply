import React from "react";
import { Icon } from "./Icon";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type Properties = {
  uri: string | null | undefined;
  size?: number;
  username?: string;
  withChangeButton?: boolean;
  onPressChangeButton?(): void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function Avatar({ uri, size = 50, username, withChangeButton = false, onPressChangeButton }: Properties) {
  const getFallbackText = React.useCallback((text: string) => {
    const [firstname, lastname] = text.split(" ");
    let fallback = firstname?.at(0) ?? "";

    if(lastname != undefined) {
      fallback += lastname?.at(0);
    } else {
      fallback += firstname?.at(1);
    }

    return fallback;
  }, []);

  const containerAnimStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "#F01448",
  }), [size]);

  const changeButtonAnimStyle = useAnimatedStyle(() => ({
    width: size * 0.4,
    height: size * 0.4,
    borderRadius: size * 0.4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  }), [size]);

  return (
    <Animated.View
    style={containerAnimStyle}>
      {uri && (
        <Image 
        source={{ uri }}
        resizeMode="cover"
        className="w-full h-full z-20 rounded-full"
        />
      )}
      <View
      className="w-full h-full justify-center items-center absolute z-10">
        <Text
        className="text-white text-center"
        style={{ fontSize: size ? size * 0.2 : 18 }}>
          {username ? getFallbackText(username) : "-"}
        </Text>
      </View>
      {withChangeButton && (
        <AnimatedTouchableOpacity
        onPress={onPressChangeButton}
        style={changeButtonAnimStyle}
        className="absolute bottom-0 right-0 z-30">
          <Icon name="camera" color="black" size={size * 0.2} />
        </AnimatedTouchableOpacity>
      )}
    </Animated.View>
  )
}