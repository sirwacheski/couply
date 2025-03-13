import React from "react";
import { Modal, Pressable, useWindowDimensions, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

type Reference = {
  show(): void;
  hide(): void;
}

type Properties = {
  children: React.ReactNode;
}

export const BottomSheet = React.forwardRef<Reference, Properties>((props, ref) => {
  // Common hooks
  const window = useWindowDimensions();

  // State hooks
  const [visible, setVisible] = React.useState(false);

  // Animation hooks
  const translateY = useSharedValue(window.height);

  const containerStyle = useAnimatedStyle(() => ({
    bottom: 0,
    width: "100%",
    position: "absolute",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#ffffff",
    transform: [{ translateY: translateY.value }],
  }), []);

  // Handlers
  function show() {
    setVisible(true);
    translateY.value = withSpring(0, { damping: 20 });
  }

  function hide() {
    translateY.value = withTiming(window.height, { duration: 100 }, () => {
      runOnJS(setVisible)(false);
    });
  }

  React.useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return (
    <Modal
    visible={visible}
    transparent={true}
    animationType="fade"
    onRequestClose={hide}>
      <Pressable
      onPress={hide}
      className="w-full h-full absolute bg-black/50"
      />
      <Animated.View
      style={containerStyle}>
        <Animated.View
        className="h-10 w-full justify-center items-center">
          <View className="h-1 w-10 bg-gray-300 rounded-full" />
        </Animated.View>
        <View
        className="flex-1">
          {props.children}
        </View>
      </Animated.View>
    </Modal>
  );
});

export function useBottomSheet() {
  return React.useRef<Reference | null>(null);
};