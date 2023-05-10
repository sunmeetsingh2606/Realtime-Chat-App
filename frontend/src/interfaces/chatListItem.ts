export interface IChatListItem {
    _id: string;
    name: string;
    lastMessage: string;
    isActive?: boolean;
    isOnline?: boolean;
}
