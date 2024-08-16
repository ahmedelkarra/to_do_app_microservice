import { createContext, Dispatch, SetStateAction } from "react";



const IsUserContext = createContext<{
    isUser: boolean,
    setIsUser: Dispatch<SetStateAction<boolean>>
} | undefined>(undefined)


export default IsUserContext