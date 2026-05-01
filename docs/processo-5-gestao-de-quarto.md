### 3.3.5 Processo 5 – processo de gestão de quarto(camareira)

<img width="1216" height="662" alt="image" src="https://github.com/user-attachments/assets/7a4f10d8-f7d2-4898-bdfd-6f1e77705070" />





**Pedido de manutenção (Cliente inicia)**

| Campo                 | Tipo            | Restrições                  | Valor default       |
|----------------------|-----------------|-----------------------------|---------------------|
| Número do quarto     | Número          | obrigatório                 |                     |
| Tipo de problema     | Seleção única   | obrigatório                 | necessita limpeza   |
| Descrição            | Área de texto   | obrigatório                 |                     |
| Prioridade           | Seleção única   | (baixa, média, alta)        | média               |
| Data do pedido       | Data e hora     | automático                  |                     |

| Comandos   | Destino                 | Tipo    |
|------------|-------------------------|---------|
| enviar pedido  | Receber pedido de manutenção  | default |


**Receber pedido de manutenção (Sistema/Equipe)**

| Campo                 | Tipo            | Restrições                  | Valor default       |
|----------------------|-----------------|-----------------------------|---------------------|
| Tipo de probleme     | Seleção única   | obrigatório                 |                     |
| Número do quarto     | Número          | obrigatório                 |                     |
| Descrição            | Área de texto   | obrigatório                 |                     |
| Data recebimento     | Data e Hora     | automático                  |                     |

| Comandos             | Destino               | Tipo    |
|----------------------|------------------------|---------|
| analisar             | Analisar pedido de manutenção   | default |


**Analisar pedido de manutenção**

| Campo                 | Tipo            | Restrições                  | Valor default       |
|----------------------|-----------------|-----------------------------|---------------------|
| Tipo de problema     | Seleção única   | obrigatório                 |                     |
| Número do quarto     | Número          | obrigatório                 |                     |
| Descrição            | Área de texto   | obrigatório                 |                     |


| Comandos         | Destino        | Tipo    |
|------------------|----------------|---------|
| validar pedido   | Decisão: Pedido válido? | default |


**Decisão: Pedido válido?**

| Comandos            | Destino                      | Tipo    |
|---------------------|------------------------------|---------|
|       não           |   Informar cliente           | default |
|       sim           |   Realizar manutenção        | default |





**Informar cliente (pedido inválido)**

| Campo                 | Tipo            | Restrições                  | Valor default |
|----------------------|-----------------|-----------------------------|---------------|
| Número do quarto     | Número          | obrigatório                 |               |
| Mensagem             | Área de texto   | obrigatório                 | Pedido não aprovado |


| Comandos | Destino                        | Tipo    |
|----------|--------------------------------|---------|
| enviar   |     Pedido cancelado           | default |



**Pedido cancelado (Fim)**

| Campo                 | Tipo            | Valor default |
|----------------------|-----------------|---------------|
| Status               | Seleção única   | cancelado     |     



**Realizar manutenção**

| Campo                 | Tipo            | Restrições | Valor default |
|----------------------|-----------------|------------|---------------|
| Quarto               | Número          | obrigatório|               |
| Ação realizada       | Área de texto   |            |               |
| Técnico responsável  | Seleção única   | obrigatório|               |

| Comandos | Destino         | Tipo    |
|----------|-----------------|---------|
| finalizar manutenção | Serviço finalizado  | default |


**Serviço finalizado (Fim)**

| Campo                 | Tipo            | Valor default |
|----------------------|-----------------|---------------|
| Data conclusão       | Data e Hora     | automático    |   
| Status               | Seleção única   | finalizado    |



![alt text](image-3.png)

