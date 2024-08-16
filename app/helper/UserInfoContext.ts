import { createContext, Dispatch, SetStateAction } from "react";


export interface IUserInfoContext {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    is_staff: boolean;
}

const UserInfoContext = createContext<{
    userInfo: IUserInfoContext,
    setUserInfo: Dispatch<SetStateAction<IUserInfoContext>>,
} | undefined>(undefined)


export default UserInfoContext