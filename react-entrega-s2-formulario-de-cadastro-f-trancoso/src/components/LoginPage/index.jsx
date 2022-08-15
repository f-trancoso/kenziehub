import './styles.css'
import { GlobalButton } from '../GlobalButton/styles'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const LoginPage = ({changePage}) => {

    let navigate = useNavigate()

    const { register, handleSubmit } = useForm()

    const logIn = (data) => {
        console.log(data)
        axios.post('https://kenziehub.herokuapp.com/sessions', data)
            .then(response => {
                console.log(response.data)
                localStorage.setItem('currentUser', JSON.stringify(response.data))
            })
            .catch(err => console.error(err))

        //navigate('/')
    }

    return(
        <>
            <main>
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
            </main>
        </>
        
    )
}

export { LoginPage }