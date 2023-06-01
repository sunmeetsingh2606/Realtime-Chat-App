export interface IChatListItem {
    _id: string;
    photoURL?: string,
    displayName: string;
    lastMessage: string;
    isActive?: boolean;
    isOnline?: boolean;
}
