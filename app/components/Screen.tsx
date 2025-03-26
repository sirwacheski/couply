import React from "react";
import { Platform, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

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
    paddingHorizontal: 20,
    paddingTop: withSafeAreaView ? Platform.OS == "ios" ? insets.top : (insets.top + 10) : 0,
    paddingBottom: withSafeAreaView ? Platform.OS == "ios" ? insets.bottom : (insets.bottom + 20) : 0,
  }), [withSafeAreaView, insets.top, insets.bottom]);
  
  return (
    <AnimateLinearGradient
    style={styles}
    end={{ x: 1, y: 1 }}
    locations={[0.1, 1]}
    start={{ x: 0, y: 0 }}
    colors={["#FF0054", "#F93A3A"]}>
      <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={20}>
        <ScrollView
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ height: "100%" }}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </AnimateLinearGradient>
  );
}

Screen.Padding = 20;
export { Screen }