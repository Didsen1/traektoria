export interface Cards {
    id: number;
    color: string;
    model: string;
    name: string;
    price: number | string;
    year: number;
    onDelete: (id: number) => void;
    onUpdate: (id: number, data: { name: string, model: string, price: number | string }) => void;
}