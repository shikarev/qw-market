export interface IUser {
    user_id: string,
    name: string,
}

export interface IUserActivity {
    orders: number;
    favorites: number;
    wishes: number;
    cart: number;
}