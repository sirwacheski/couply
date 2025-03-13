import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";

export function GoBackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
    onPress={() => navigation.goBack()}
    className="flex-row gap-x-3 items-center">
      <Image 
      tintColor={"white"}
      className="w-10 h-10"
      resizeMode="contain"
      source={require("@assets/icons/arrow-small-left.png")}
      />
    </TouchableOpacity>
  );
}