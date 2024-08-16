import { createContext, Dispatch, SetStateAction } from "react";


export interface IToDoInfoContext {
    _id: string;
    title: string;
    body: string;
    author: number;
    isDone: boolean;
    createdAt: string;
}

const ToDoInfoContext = createContext<{
    toDoInfo: IToDoInfoContext[],
    setToDoInfo: Dispatch<SetStateAction<IToDoInfoContext[]>>,
} | undefined>(undefined)


export default ToDoInfoContext