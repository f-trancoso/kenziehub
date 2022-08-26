import { createContext, useState, ReactNode } from "react"
import axios from "axios"

export interface ITech {
  created_at?: string,
  id?: string,
  status: string,
  title: string,
  updated_at?: string,
}

export interface IUser {
  avatar_url?: string,
  bio: string,
  contact:string,
  course_module: string
  created_at: string,
  email: string,
  id: string,
  name: string,
  techs: ITech[],
  updated_at: string,
  works: object[]
}

export interface IUserState {
  token: string,
  user: IUser
}

export interface IUserContext {
  currentUser: IUser,
  setCurrentUser(value: IUser): void,
  validateUser(): Promise<void>,
}

interface IUserProviderProps {
  children: ReactNode,
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider = ({children}: IUserProviderProps) => {

    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser)

    const validateUser = async () => {

        const currentToken = JSON.parse(localStorage.getItem('currentUser') as string)['token']
        
        const userProfile = await axios.get<IUserState>('https://kenziehub.herokuapp.com/profile', {headers: {'Authorization': `Bearer ${currentToken}`}})

        console.log(userProfile.data)

        setCurrentUser(userProfile.data.user as IUser)
    }

  return (
    <UserContext.Provider value={ { currentUser, setCurrentUser, validateUser } }>
        {children}
    </UserContext.Provider>
  )
}