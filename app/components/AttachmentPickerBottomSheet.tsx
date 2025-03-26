import React from "react";
import { Icon, IconProps } from "./Icon";
import * as ImagePicker from "expo-image-picker";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

export type AttachmentAsset = {
  uri: string;
  type: string;
  size: number;
  name: string;
}

type Properties = {
  withDocuments?: boolean;
  allowsMultiple?: boolean;
  onPick(assets: AttachmentAsset[]): void;
}

type Reference = {
  show(): void;
  hide(): void;
}

export function useAttachmentPickerBottomSheet() {
  return React.useRef<Reference>(null);
}

export const AttachmentPickerBottomSheet = React.forwardRef((props: Properties, ref: React.Ref<Reference>) => {
  // Common hooks
  const insets = useSafeAreaInsets();

  // Reference hooks
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // Handlers
  function handleShowBottomSheet() {
    bottomSheetModalRef.current?.present();
  }

  function handleHideBottomSheet() {
    bottomSheetModalRef.current?.dismiss(); 
  }

  async function handlePickFromCamera() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if(permission.granted == false) {
      return Alert.alert("Permission required", "Permission to access camera is required!");
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsMultipleSelection: props.allowsMultiple,
    });

    if(result.canceled) {
      return false;
    }

    const assets: AttachmentAsset[] = result.assets.map((item) => ({ 
      uri: item.uri,
      size: item.fileSize!, 
      type: item.mimeType!, 
      name: item.fileName!,
    }));

    handleHideBottomSheet();
    setTimeout(() => props.onPick(assets), 300);
  }

  async function handlePickFromPhotos() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permission.granted == false) {
      return Alert.alert("Permission required", "Permission to access camera roll is required!");
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ["images"],
      allowsMultipleSelection: props.allowsMultiple,
    });

    if(result.canceled) {
      return false;
    }

    const assets: AttachmentAsset[] = result.assets.map((item) => ({ 
      uri: item.uri,
      size: item.fileSize!, 
      type: item.mimeType!, 
      name: item.fileName!,
    }));

    handleHideBottomSheet();
    setTimeout(() => props.onPick(assets), 300);
  }

  async function handlePickFromDocuments() {
    // TODO: Implement pick from documents function
  }

  // Extra components
  const renderBackdrop = React.useCallback((props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop 
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    />
  ), []);

  // Side effects
  React.useImperativeHandle(ref, () => ({
    show: handleShowBottomSheet,
    hide: handleHideBottomSheet,
  }));

  return (
    <BottomSheetModal
    topInset={insets.top}
    ref={bottomSheetModalRef}
    backdropComponent={renderBackdrop}>
      <BottomSheetView
      className="pt-3 gap-y-10"
      style={{ paddingBottom: insets.bottom }}>
        <View>
          <Text
          className="text-xl text-center">
            {"Type of attachment"}
          </Text>
        </View>
        <View
        className="flex-row items-center justify-evenly">
          <AttachmentOption 
          icon="camera"
          label={"Camera"}
          onPress={handlePickFromCamera}
          />
          <AttachmentOption 
          icon="image"
          label={"Photos"}
          onPress={handlePickFromPhotos}
          />
          {props.withDocuments && (
            <AttachmentOption
            icon="file"
            label={"Documents"}
            onPress={() => {}}
            />
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
});

type AttachmentOptionProps = {
  icon: IconProps["name"];
  label: string;
  onPress?(): void;
}

function AttachmentOption({ icon, label, onPress }: AttachmentOptionProps) {
  return (
    <TouchableOpacity
    onPress={onPress}
    className="items-center gap-y-3">
      <View
      className="w-16 h-16 rounded-full border-2 justify-center items-center border-slate-200">
        <Icon 
        size={23.5}
        name={icon}
        />
      </View>
      <Text>
        {label}
      </Text>
    </TouchableOpacity>
  );
}