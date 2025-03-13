import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

type ScreenProps = {
  children?: React.ReactNode;
  withSafeAreaView?: boolean;
}

const AnimateLinearGradient = Animated.createAnimatedComponent(LinearGradient);

function Screen({ withSafeAreaView, children }: ScreenProps) {
  // Common hooks
  const insets = useSafeAreaInsets();

  // Animated syles
  const styles = useAnimatedStyle(() => ({
    width: "100%",
    height: "100%",
    paddingHorizontal: Screen.Padding,
    paddingTop: withSafeAreaView ? insets.top : 0,
    paddingBottom: withSafeAreaView ? insets.bottom : 0,
  }), [withSafeAreaView, insets]);
  
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "position" : "padding"}>
      <AnimateLinearGradient
      style={styles}
      end={{ x: 1, y: 1 }}
      locations={[0.1, 1]}
      start={{ x: 0, y: 0 }}
      colors={["#FF0054", "#F93A3A"]}>
        {children}
      </AnimateLinearGradient>
    </KeyboardAvoidingView>
  );
}

Screen.Padding = 20;
export { Screen }