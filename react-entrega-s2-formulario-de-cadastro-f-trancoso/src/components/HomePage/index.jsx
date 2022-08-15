import axios from 'axios'
import { useEffect, useState } from 'react'

export const HomePage = () => {

    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        axios.get('https://kenziehub.herokuapp.com/profile', {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('currentUser'))['token']}`}})
            .then(response => setCurrentUser(response.data))
            .catch(err => console.error(err))
    })

    return (
        <main>
            <div>
                <h2>Olá, {currentUser['name']}</h2>
                <p>{currentUser['course_module']}</p>
            </div>
            <div>
                <h3>Que pena! Estamos em desenvolvimento {`:(`}</h3>
                <p>Nossa aplicação está em desenvolvimento, em breve teremos novidades</p>
            </div>
        </main>
    )
}