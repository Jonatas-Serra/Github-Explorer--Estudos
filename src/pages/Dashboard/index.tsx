import React from 'react'

import { Title, Form } from './style'

import logoImg from '../../assets/github_explorer.svg'

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explorer reositórios no Github</Title>
      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>
    </>
  )
}

export default Dashboard
