import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type Properties = {
  size?: number;
}

export function Logo({ size = 50 }: Properties) {
  const styles = useAnimatedStyle(() => ({
    width: size,
    height: size,
    aspectRatio: 1,
  }), [size]);

  return (
    <Animated.Image
    style={styles}
    resizeMode="contain"
    source={require('@assets/images/logo.png')}
    />
  )
}