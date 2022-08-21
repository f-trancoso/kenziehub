import './styles.css'
import { GlobalButton } from '../../components/GlobalButton/styles'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const LoginPage = ({changePage}) => {

    const { setCurrentUser } = useContext(UserContext)

    let navigate = useNavigate()

    const { register, handleSubmit } = useForm()

    const logIn = (data) => {
        console.log(data)
        axios.post('https://kenziehub.herokuapp.com/sessions', data)
            .then(response => {
                console.log(response.data)
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

                    <GlobalButton colorHex={'FF577F'} width={'100%'} type='submit'>Entrar</GlobalButton>

                </form>
                <p>Ainda não possui uma conta?</p>
                <GlobalButton className='registerButton' onClick={() => navigate('/register')}>Cadastre-se</GlobalButton>
            </div>
        </>
        
    )
}

export { LoginPage }