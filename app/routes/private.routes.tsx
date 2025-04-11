import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen imports
import { BottomRoutes } from "./bottom.routes";
import CreateMural from "@features/mural/create.view";
import CreateProfile from "@features/profile/create.view";
import NotFoundMural from "@features/mural/not-found.view";
import { InvitePartner } from "@features/mural/invite.view";
import { NoteList } from "@features/notes/list.view";
import { CreateNote } from "@features/notes/create.view";
import { Note } from "app/domain/models/Note";

export type PrivateRouteList = {
  Home: undefined;
  CreateProfile: undefined;
  CreateMural: undefined;
  NotFoundMural: undefined;
  InvitePartner: {
    muralId: string;
    inviterId: string;
  }
  Notes: undefined,
  CreateOrEditNote: Note | undefined,
}

const PrivateRoutes = createNativeStackNavigator<PrivateRouteList>({
  screens: {
    Home: BottomRoutes,
    CreateMural: CreateMural,
    NotFoundMural: NotFoundMural,
    CreateProfile: CreateProfile,
    InvitePartner: InvitePartner,
    Notes: NoteList,
    CreateOrEditNote: CreateNote,
  },
  screenOptions: {
    headerShown: false,
    animationDuration: 150,
    animation: "slide_from_right",
  },
});

export default PrivateRoutes;