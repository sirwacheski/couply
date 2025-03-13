export class InvitePartner {
  id!: string;
  inviter_id!: string;
  guest_id!: string;
  mural_id!: string;
  created_at?: Date;
  updated_at?: Date;
  disabled_at?: Date;

  constructor(init?: Partial<InvitePartner>) {
    Object.assign(this, init);
  }
}