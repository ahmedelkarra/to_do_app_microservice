import { createContext, Dispatch, SetStateAction } from "react";



const IsChangeContext = createContext<{
    isChange: boolean,
    setIsChange: Dispatch<SetStateAction<boolean>>
} | undefined>(undefined)


export default IsChangeContext