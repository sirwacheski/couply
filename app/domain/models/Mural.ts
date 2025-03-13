import { Profile } from "./Profile";

export class Mural {
  id!: string;
  owner_id!: string;
  partner_id?: string;
  title!: string;
  description?: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;
  owner?: Profile;
  partner?: Profile;

  constructor(init?: Partial<Mural>) {
    Object.assign(this, init);
  }
}