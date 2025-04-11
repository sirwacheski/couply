export class Note {
  public static readonly name = "notes";

  id!: string;
  mural_id!: string;
  owner_id!: string;
  title!: string;
  content?: string;
  created_at!: string;
  updated_at!: string;
  disabled_at?: string;

  constructor(init?: Partial<Note>) {
    Object.assign(this, init);
  }
}