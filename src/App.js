import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }).then(response => {
      setRepositories([
        ...repositories,
        response.data
      ]);
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      setRepositories(response.data);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories?.length > 0 && repositories.map(repository => (
          <li key={repository.id}>
            <p>{repository.title}</p>
            <p>{repository.url}</p>
            <p>{repository.techs}</p>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
