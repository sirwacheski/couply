import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen imports
import { BottomRoutes } from "./bottom.routes";
import CreateMural from "@features/mural/create.view";
import CreateProfile from "@features/profile/create.view";
import NotFoundMural from "@features/mural/not-found.view";
import { InvitePartner } from "@features/mural/invite.view";

export type PrivateRouteList = {
  Home: undefined;
  CreateProfile: undefined;
  CreateMural: undefined;
  NotFoundMural: undefined;
  InvitePartner: {
    muralId: string;
    inviterId: string;
  };
}

const PrivateRoutes = createNativeStackNavigator<PrivateRouteList>({
  screens: {
    Home: BottomRoutes,
    CreateMural: CreateMural,
    NotFoundMural: NotFoundMural,
    CreateProfile: CreateProfile,
    InvitePartner: InvitePartner,
  },
  screenOptions: {
    headerShown: false,
  },
});

export default PrivateRoutes;