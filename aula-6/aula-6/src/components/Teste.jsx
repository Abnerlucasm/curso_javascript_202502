import React, { useState } from 'react'

const Teste = () => {

    const [nome, setNome] = useState('')
    const [usuarios, setUsuarios] = useState([])

     const handleSubmit = (e) => {
        e.preventDefault()

        //add nome na lista
        setUsuarios([...usuarios, nome])
        //limpar o form
        setNome('')
     }
   
    return (
        <div>
            <h1>add user</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setNome(e.target.value)} value={nome}/>
            <button>adicionar</button>
            </form>

               <ul>
            {usuarios.map((item) => (
                <li>{item}</li>
            ))}
        </ul>

        </div>
    )
}

export default Teste
