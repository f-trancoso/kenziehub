import { GlobalButton } from '../../components/GlobalButton/styles'
import {MdOutlinePlaylistAdd} from 'react-icons/md'
import { FormEvent, useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { ListItem } from '../../components/ListItem/ListItem'
import './styles.css'
import Modal from 'react-modal'
import axios from 'axios'
import { ITech } from '../../contexts/UserContext'

export const HomePage = () => {

    const [newTechTitle, setNewTechTitle] = useState('')
    const [newTechStatus, setNewTechStatus] = useState('')
    const [modal, setModal] = useState(false)

    const { currentUser, validateUser } = useContext(UserContext)

    useEffect(() => {
        validateUser()
            .catch(err => console.error(err))
    })

    const createNewTech = async () => {

        const currentToken = JSON.parse(localStorage.getItem('currentUser') as string)['token']

        const createdTech = await axios.post<ITech>(
            'https://kenziehub.herokuapp.com/users/techs',
            {
                'title': newTechTitle,
                'status': newTechStatus
            },
            {headers: {'Authorization': `Bearer ${currentToken}`}}
        )

        if(createdTech.status === 201){
            validateUser()
                .catch((err) => console.error(err))
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        createNewTech()
            .catch((err) => {
                console.error(err)
            })
    }

    Modal.setAppElement('#root')

    const openModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    return (
        <div className='homePageContainer'>
            <div className='userWelcome'>
                <h2>Olá, {currentUser?.name}</h2>
                <p>{currentUser?.course_module}</p>
            </div>
            
            <main>
                <div className='listHead'>
                    <h3>Tecnologias</h3>
                    <GlobalButton myColor={'212529'} myWidth={'50px'} onClick={openModal}>
                        <MdOutlinePlaylistAdd size={25}/> 
                    </GlobalButton>

                    <Modal
                        isOpen={modal}
                        onRequestClose={closeModal}
                        overlayClassName='modalOverlay'
                        className='modalContent'   
                    >
                        <div className='modalHead'>
                            <h3>Cadastrar Tecnologia</h3>
                        </div>
                        <form onSubmit={(e) => {
                            handleSubmit(e)
                            closeModal()
                        }}>
                            <label htmlFor="techTitle">Title</label>
                            <input 
                                id='techTitle' 
                                type="text"
                                onChange={(e) => setNewTechTitle(e.target.value)} 
                            />
                            <label htmlFor="techStatus">Status</label>
                            <select 
                                name="techStatus" 
                                id="techStatus"
                                onChange={(e) => setNewTechStatus(e.target.value)}
                            >
                                <option value="Iniciante">Iniciante</option>
                                <option value="Intermediário">Intermediário</option>
                                <option value="Avançado">Avançado</option>
                            </select>
                            
                            <GlobalButton type='submit' myColor={'FF577F'}>Criar</GlobalButton>
                        </form>

                        <GlobalButton onClick={closeModal} myColor={'868E96'}>Cancelar</GlobalButton>
                    </Modal>

                </div>
                <ul>
                    {currentUser?.techs?.map((elem) => {
                        return <ListItem title={elem['title']} status={elem['status']} key={elem['id']}/>
                    })}
                </ul>
            </main>
        </div>
        
    )
}