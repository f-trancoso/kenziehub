import './styles.css'
import { GlobalButton } from '../../components/GlobalButton/styles'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { IUserState } from '../../contexts/UserContext'

const LoginPage = () => {

    const { setCurrentUser } = useContext(UserContext)

    let navigate = useNavigate()

    const { register, handleSubmit } = useForm<ILoginRequisition>()

    interface ILoginRequisition {
        email: string, 
        password: string
    }
    

    const logIn = (logInData: ILoginRequisition):void => {
        axios.post<IUserState>('https://kenziehub.herokuapp.com/sessions', logInData)
            .then(response => {
                localStorage.setItem('currentUser', JSON.stringify(response.data))
                setCurrentUser(response.data.user)
            })
            .catch(err => console.error(err))

        navigate('/')
    }

    return(
        <>
            <div className='mainDisplay'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(logIn)}>

                    <label htmlFor="email">Email</label>
                    <input id='email' type="text" placeholder="exemplo@email.com" {...register('email')}/>

                    <label htmlFor="senha">Senha</label>
                    <input id='senha' type="password" {...register('password')}/>

                    <GlobalButton myColor={'FF577F'} width={'100%'} type='submit'>Entrar</GlobalButton>

                </form>
                <p>Ainda não possui uma conta?</p>
                <GlobalButton className='registerButton' onClick={() => navigate('/register')}>Cadastre-se</GlobalButton>
            </div>
        </>
        
    )
}

export { LoginPage }