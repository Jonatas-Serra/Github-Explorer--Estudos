import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

import logoImg from '../../assets/github_explorer.svg'

import { Header, RepositoryInfo, Issues } from './styles'

interface Repository {
  full_name: string
  description: string
  repository_url: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

interface Issue {
  title: string
  id: number
  html_url: string
  user: {
    login: string
  }
}

// eslint-disable-next-line no-redeclare
const Repository: React.FC = () => {
  const [repo, setRepo] = useState<Repository | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])
  const { '*': repository } = useParams()

  useEffect(() => {
    ;(async () => {
      const { data } = await api.get(`/repos/${repository}`)
      setRepo(data)
    })()
  }, [repository])

  useEffect(() => {
    ;(async () => {
      const { data } = await api.get(`/repos/${repository}/issues`)
      setIssues(data)
    })()
  }, [repository])

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repo && (
        <RepositoryInfo>
          <header>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repo.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repo.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repo.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login} </p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  )
}

export default Repository
