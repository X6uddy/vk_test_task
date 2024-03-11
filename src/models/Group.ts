import { User } from "./User";

export interface Group {
  "id": number,
  "name": string,
  "closed": boolean,
  "avatar_color"?: string,
  "members_count": number,
  "friends": User[]
}