### 3.3.5 Processo 5 – Processo de Cadastro de Quarto

<img width="848" height="295" alt="Cadastro-Quarto Diagrama" src="https://github.com/user-attachments/assets/ecff25a6-7713-454b-a699-a2e63882de13" />



**Preencher informações (Admin/Gerente inicia)**
| Campo            | Tipo          | Restrições                   | Valor default |
| ---------------- | ------------- | ---------------------------- | ------------- |
| Número do quarto | Número        | obrigatório                  |               |
| Tipo do quarto   | Seleção única | obrigatório                  |   standard    |
| Capacidade       | Número        | obrigatório                  |      2        |
| Valor da diária  | Decimal       | obrigatório                  |               |
| Status do quarto | Seleção única | (ativo, inativo, manutenção) |     ativo     |
| Descrição        | Área de texto | opcional                     |               |


**Confirma dados (Sistema/Admin)**

| Campo            | Tipo          | Restrições  | Valor default |
| ---------------- | ------------- | ----------- | ------------- |
| Número do quarto | Número        | obrigatório |               |
| Tipo do quarto   | Seleção única | obrigatório |               |
| Capacidade       | Número        | obrigatório |               |
| Valor da diária  | Decimal       | obrigatório |               |
| Status do quarto | Seleção única | obrigatório | ativo         |
| Descrição        | Área de texto | opcional    |               |
| Data do cadastro | Data e Hora   | automático  |               |



**Quarto cadastrado(Fim)**

| Campo             | Tipo          | Valor default |
| ----------------- | ------------- | ------------- |
| Status            | Seleção única | cadastrado    |
| Data de conclusão | Data e Hora   | automático    |
