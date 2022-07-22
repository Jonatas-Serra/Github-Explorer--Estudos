import React, { useState, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

import logoImg from '../../assets/github_explorer.svg'

import { Title, Form, Repositories, Error } from './style'
import Repository from '../Repository'

// eslint-disable-next-line no-redeclare
interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')
  const [repositories, setrepositories] = useState<Repository[]>([])

  async function handleAddRepositorie(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório')
      return
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`)

      const repository = response.data

      setrepositories([...repositories, repository])
      setNewRepo('')
      setInputError('')
    } catch (err) {
      setInputError('Erro na busca por esse repositório')
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explorer reositórios no Github</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepositorie}>
        <input
          placeholder="Digite o nome do repositório"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard
