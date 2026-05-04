### 3.3.1 Processo 1 – Gestão de Cliente


<img width="1827" height="861" alt="image" src="https://github.com/user-attachments/assets/1abf1486-4edc-40ab-a13d-89510fa897e6" />






## Cadastro de Cliente

| Campo               | Tipo              | Restrições                     | Valor default |
|---------------------|-------------------|--------------------------------|--------------|
| nome completo       | Caixa de texto    | obrigatório                    |              |
| email               | Caixa de texto    | obrigatório, formato e-mail    |              |
| senha               | Caixa de texto    | mínimo 8 caracteres            |              |
| confirmar senha     | Caixa de texto    | igual à senha                  |              |
| telefone            | Caixa de texto    | obrigatório                    |              |
| data de nascimento  | Data              | obrigatório                    |              |

| Comandos   | Destino               | Tipo    |
|------------|------------------------|---------|
| continuar  | Inserir dados         | default |



## Inserir Dados

| Campo         | Tipo              | Restrições                     | Valor default |
|---------------|-------------------|--------------------------------|--------------|
| cpf           | Caixa de texto    | obrigatório, único             |              |
| rg            | Caixa de texto    | opcional                       |              |
| endereço      | Área de texto     | obrigatório                    |              |
| cidade        | Caixa de texto    | obrigatório                    |              |
| estado        | Caixa de texto    | obrigatório                    |              |
| cep           | Caixa de texto    | obrigatório                    |              |

| Comandos   | Destino            | Tipo    |
|------------|--------------------|---------|
| continuar    | Inserir dados     | default |



## Dados válidos?

| Comandos | Destino            | Tipo    |
|----------|--------------------|---------|
| sim      | Salvar cadastro    | default |
| não      | Inserir dados      | cancel  |


## Salvar Cadastro

| Campo             | Tipo           | Restrições           | Valor default |
|-------------------|----------------|----------------------|--------------|
| id cliente        | Número         | gerado automaticamente | auto        |




## Cadastro Concluído

| Campo            | Tipo          | Valor default                     |
|------------------|---------------|-----------------------------------|
| mensagem         | Área de texto | Cadastro realizado com sucesso    |




## Fim

| Campo           | Tipo          | Valor default |
|-----------------|---------------|--------------|
| status final    | Área de texto | Concluído    |












