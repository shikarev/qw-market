const userActionTypes = [
    'orders',
    'favorites',
    'wishes',
    'cart',
] as const;

export interface UserAction {
    icon: string;
    activeIcon: string;
    title: string;
    count: number;
    className?: any;
    url: string;
    id: typeof userActionTypes[number];
}
