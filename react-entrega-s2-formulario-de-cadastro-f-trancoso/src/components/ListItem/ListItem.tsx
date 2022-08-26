import axios from 'axios'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { StyledListItem } from './styles'
import { useContext } from 'react'
import { ITech, UserContext } from '../../contexts/UserContext'

export const ListItem = ({title, status}: ITech) => {

    const { currentUser, validateUser } = useContext(UserContext)

    const deleteTech = (tech: string) => {

        const currentToken = JSON.parse(localStorage.getItem('currentUser') as string)['token']

        currentUser.techs.forEach((elem: ITech) => {
            if (elem.title === tech){
                axios.delete(`https://kenziehub.herokuapp.com/users/techs/${elem.id}`, {headers: {'Authorization': `Bearer ${currentToken}`}})  
                    .then(() => {
                        validateUser()
                            .catch((err) => console.error(err))
                    })
                    .catch((err) => console.error(err))      
            }
        })
    }

    return (
        <StyledListItem>
            <h4>
                {title}
            </h4>

            <div>
                <span>
                    {status}
                </span>

                <RiDeleteBin5Fill onClick={() => deleteTech(title)}/>
            </div>
        </StyledListItem>
    )
}