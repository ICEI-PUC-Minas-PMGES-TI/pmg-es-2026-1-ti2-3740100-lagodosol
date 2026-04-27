### 3.3.3 Processo 3 – Cadastro de Quarto

![alt text](image-6.png)

## Cadastrar Quarto

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| nome do quarto | Caixa de texto | obrigatório | |
| número do quarto | Número | obrigatório, único | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| continuar | Inserir dados do quarto | default |
| cancelar | Fim | cancel |

## Inserir Dados do Quarto

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| tipo de quarto | Seleção única | solteiro, casal, suíte | |
| capacidade | Número | obrigatório | |
| preço por noite | Número | obrigatório | |
| descrição | Área de texto | opcional | |
| fotos | Imagem | opcional | |
| status | Seleção única | disponível/indisponível | disponível |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| validar | Dados válidos? | default |
| cancelar | Cadastrar quarto | cancel |

## Dados válidos? (Validação do Sistema)

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| sim | Disponibilizar quarto | default |
| não | Inserir dados do quarto | cancel |

## Disponibilizar Quarto

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| status | Seleção única | disponível | disponível |
| data liberação | Data e Hora | automático | atual |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| confirmar | Hóspede acessa sistema | default |