import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { GlobalButton } from "../GlobalButton/styles"
import { useNavigate } from "react-router-dom"
import axios from 'axios'


const SignUpPage = () => {

    let navigate = useNavigate()

    const formSchema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório').email('Email inválido'), 
        password: Yup.string().required('Senha obrigatória'),
        name: Yup.string().required('Nome obrigatório'),
        bio: Yup.string().required('Bio obrigatória'),
        contact: Yup.string().required('Contato obrigatório'),
        course_module: Yup.string().required('Módulo obrigatório'),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    })

    const registerUser = (data) => {
        console.log(data)
        axios.post('https://kenziehub.herokuapp.com/users', data)
            .then(response => console.log(response.data))
            .catch(err => console.error(err))
    }

    return (
        <main>
            <h2>Crie sua conta</h2>
            <p>Rápido e grátis, vamo nessa!</p>
            <form onSubmit={handleSubmit(registerUser)}>
                <label htmlFor="name">Nome</label>
                <input id='name' type="text" placeholder="Seu nome" {...register('name')}/>
                {errors.name?.message}

                <label htmlFor="email">Email</label>
                <input id='email' type="text" placeholder="Seu Email" {...register('email')}/>
                {errors.email?.message}
                

                <label htmlFor="password">Senha</label>
                <input id='password' type="password" placeholder="Sua senha" {...register('password')}/>
                {errors.password?.message}
                

                <label htmlFor="passwordConfirm">Confirmar senha</label>
                <input id='passwordConfirm' type="password" placeholder="Confirme sua senha" />

                <label htmlFor="bio">Bio</label>
                <input id='bio' type="text" placeholder="fale sobre você" {...register('bio')}/>
                {errors.bio?.message}
                

                <label htmlFor="contact">Contato</label>
                <input id='contact' type="text" placeholder="Opção de contato" {...register('contact')}/>
                {errors.contact?.message}
                

                <label htmlFor="selectModule" >Selecionar módulo</label>
                <select id='selectModule' {...register('course_module')}>
                    <option value="Primeiro módulo (Introdução ao Frontend)">Módulo I</option>
                    <option value="Segundo módulo (Frontend Avançado)">Módulo II</option>
                    <option value="Terceiro módulo (Introdução ao Backend)">Módulo III</option>
                    <option value="Quarto módulo (Backend Avançado)">Módulo IV</option>
                </select> 

                <GlobalButton colorHex={'FF577F'} width={'100%'} type="submit">Cadastrar</GlobalButton>
            </form>
            <p>Já esta cadastrado?</p>
            <GlobalButton myWidth={'100%'} className='registerButton' onClick={() => navigate(`/login`)}>Fazer Login</GlobalButton>
        </main>
    )
}

export { SignUpPage }