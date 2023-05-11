export interface IChatListItem {
    uid: string;
    photoURL?: string,
    displayName: string;
    lastMessage: string;
    isActive?: boolean;
    isOnline?: boolean;
}
