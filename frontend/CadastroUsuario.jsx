import React, { useState } from 'react';

const CadastroUsuario = () => {
  // Estado para armazenar os valores do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  // Função para atualizar os campos conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função disparada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    alert(`Usuário ${formData.nome} cadastrado com sucesso!`);
    
    // Aqui você integraria com sua API ou Banco de Dados
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer' 
          }}
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroUsuario;