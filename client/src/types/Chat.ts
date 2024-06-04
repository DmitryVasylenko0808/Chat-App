type User = {
    _id: string;
    login: string;
    firstName: string;
    secondName: string;
    avatarUrl?: string;
}

export type Chat = {
    _id: string;
    members: User[];
}