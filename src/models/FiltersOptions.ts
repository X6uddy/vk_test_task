export type Policy = 'any' | 'closed' | 'open';
export type AvatarColor = 'any' | string;
export type HasFriends = 'any' | 'true' | 'false';
export default interface FilterOptions {
    policy : Policy,
    avatarColor: AvatarColor,
    hasFriends: HasFriends
}