export type Policy = 'any' | 'closed' | 'open';
export type AvatarColor = 'any' | string;
export type HasFriends = null | boolean;
export default interface FilterOptions {
    policy : Policy,
    avatarColor: AvatarColor,
    hasFriends: HasFriends
}