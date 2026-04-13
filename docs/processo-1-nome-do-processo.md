### 3.3.1 Processo 1 – Cadastro de Cliente



<img width="1379" height="697" alt="image" src="https://github.com/user-attachments/assets/2cb24020-9af0-4101-82ae-904b51edd716" />




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
| data cadastro     | Data e Hora    | automático           | atual        |


| Comandos  | Destino              | Tipo    |
|-----------|----------------------|---------|
| salvar    | Cadastro concluído   | default |
| cancelar  | Cadastro de Cliente  | cancel  |


## Cadastro Concluído

| Campo            | Tipo          | Valor default                     |
|------------------|---------------|-----------------------------------|
| mensagem         | Área de texto | Cadastro realizado com sucesso    |


| Comandos | Destino | Tipo    |
|----------|----------|---------|
| finalizar| Fim      | default |


## Fim

| Campo           | Tipo          | Valor default |
|-----------------|---------------|--------------|
| status final    | Área de texto | Concluído    |

| Comandos | Destino | Tipo    |
|----------|----------|---------|
| encerrar | —        | default |
