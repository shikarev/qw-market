export interface ISelector {
    data?: any[];
    size: number;
    current: string;
    onChange: (id: string) => void;
    loading?: boolean;
    title?: string;
}

export interface ISelectorThumb {
    data: any;
    selectedId: string;
    onSelect: (id: string) => void;
    size: number;
}
