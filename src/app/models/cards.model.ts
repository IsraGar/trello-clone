import { List } from "./list.model";

export interface Card {
    id: string;
    title: string;
    description: string;
    position: number;
    card: List;
}

export interface UpdateCardDto{
    title?: string;
    description?: string;
    position?: number;
    listId?: string | number;
    boardId?: string;
}