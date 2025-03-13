import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";

// Screen imports
import Greetings from "@features/authentication/greetings.view";
import SignIn from "@features/authentication/sign-in.view";
import SignUp from "@features/authentication/sign-up.view";
import ConfirmToken from "@features/authentication/confirm-token.view";
import ForgotPassword from "@features/authentication/forgot-password.view";

export type PublicRouteList = {
  Greetings: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ConfirmToken: { email?: string, code?: string };
  ForgotPassword: undefined;
}

const Stack = createNativeStackNavigator<PublicRouteList>();

export default function PublicRoutes() {
  const options: NativeStackNavigationOptions = {
    headerShown: false,
    animation: "slide_from_right",
  }

  return (
    <Stack.Navigator
    screenOptions={options}
    initialRouteName="Greetings">
      <Stack.Screen name="Greetings" component={Greetings} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ConfirmToken" component={ConfirmToken} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}