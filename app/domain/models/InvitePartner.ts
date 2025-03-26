import { Mural } from "./Mural";
import { Profile } from "./Profile";

export class InvitePartner {
  id!: string;
  inviter_id!: string;
  guest_id!: string;
  mural_id!: string;
  created_at?: Date;
  updated_at?: Date;
  disabled_at?: Date;
  inviter?: Partial<Profile>;
  guest?: Partial<Profile>;
  mural?: Partial<Mural>

  constructor(init?: Partial<InvitePartner>) {
    Object.assign(this, init);
  }
}