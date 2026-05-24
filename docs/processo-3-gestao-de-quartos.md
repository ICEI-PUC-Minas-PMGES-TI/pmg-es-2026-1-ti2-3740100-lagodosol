### 3.3.3 Processo 3 – Cadastro de Quarto

<img width="969" height="365" alt="Gestão de Quarto Diagrama" src="https://github.com/user-attachments/assets/01980a85-c683-48c1-bba2-7b2381f43311" />



## Consulta de Quartos
Ação inicial realizada pelo Admin/Gerente para visualizar os quartos existentes antes de decidir a próxima ação.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Busca/Filtro | Texto | Opcional | |
| Listagem de Quartos | Grid/Tabela | Visualização | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Selecionar Editar | Editar cadastro | Link |
| Selecionar Novo | Cadastrar novo | Botão |
| Selecionar Excluir | Excluir | Botão |

---

## Editar cadastro
Permite a modificação de informações de um quarto já existente no sistema.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Nome/Número | Texto | Obrigatório | Valor atual |
| Preço/Tipo | Seleção/Número | Obrigatório | Valor atual |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Salvar Alterações | Fim | Default |
| Cancelar | Consulta de Quartos | Cancel |

---

## Cadastrar novo
Etapa para inclusão de uma nova unidade habitacional no inventário.

| Campo            | Tipo              | Restrições                     | Valor default |
|------------------|-------------------|--------------------------------|---------------|
| Numero do quarto | Caixa de texto    | obrigatório, único             |               |
| Tipo             | Caixa de texto    | obrigatório                    |               |
| Capacidade       | Campo numérico    | obrigatório                    |               |
| Preço            | Campo numérico    | obrigatório                    |               |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Confirmar Cadastro | Fim | Default |
| Cancelar | Consulta de Quartos | Cancel |

---

## Excluir
Remoção do registro de quarto selecionado.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Confirmação | Alerta/Modal | Obrigatório | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Confirmar Exclusão | Fim | Danger |
| Voltar | Consulta de Quartos | Cancel |
