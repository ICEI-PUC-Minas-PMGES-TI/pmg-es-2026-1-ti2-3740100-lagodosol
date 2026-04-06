### 3.3.1 Processo 1 – Cadastro de Cliente



<img width="739" height="233" alt="image" src="https://github.com/user-attachments/assets/028da01f-fd62-4c30-933b-f62822170ee5" />



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
| cancelar   | Fim                   | cancel  |


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
| validar    | Dados válidos?     | default |
| voltar     | Cadastro de Cliente| cancel  |


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
| status            | Seleção única  | ativo/inativo        | ativo        |

| Comandos  | Destino              | Tipo    |
|-----------|----------------------|---------|
| salvar    | Cadastro concluído   | default |
| cancelar  | Cadastro de Cliente  | cancel  |


## Cadastro Concluído

| Campo            | Tipo          | Valor default                     |
|------------------|---------------|-----------------------------------|
| mensagem         | Área de texto | Cadastro realizado com sucesso    |
| data conclusão   | Data e Hora   | atual                             |

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
