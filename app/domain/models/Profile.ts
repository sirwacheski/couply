import { Attachment } from "./Attachment";

export class Profile {
  id!: string;
  user_id!: string;
  gender_id?: string;
  avatar_id?: string;
  name!: string;
  username!: string;
  birthdate!: Date;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;
  avatar?: Attachment;

  constructor(init?: Partial<Profile>) {
    Object.assign(this, init);
  }
}