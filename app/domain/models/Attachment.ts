export class Attachment {
  id!: number;
  name!: string;
  size!: number;
  url!: string;
  mimetype!: string;
  created_at!: Date;

  constructor(init?: Partial<Attachment>) {
    Object.assign(this, init);
  }
}