### 3.3.2 Processo 2 – processo de pagamento

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/aeaeb0b9-5197-45a7-a5a8-414e0ce543e9" />



## Selecionar Forma de Pagamento

| Campo                | Tipo           | Restrições                              | Valor default |
|----------------------|----------------|------------------------------------------|--------------|
| forma de pagamento   | Seleção única  | obrigatório (cartão, pix, boleto)        |              |
| número do cartão     | Caixa de texto | obrigatório se cartão, 16 dígitos        |              |
| nome no cartão       | Caixa de texto | obrigatório se cartão                    |              |
| validade             | Data           | obrigatório se cartão                    |              |
| cvv                  | Número         | obrigatório se cartão, 3 dígitos         |              |

| Comandos   | Destino                         | Tipo    |
|------------|----------------------------------|---------|
| continuar  | Calcular valor total            | default |
| cancelar   | Fim                             | cancel  |


## Calcular Valor Total

| Campo              | Tipo   | Restrições              | Valor default |
|--------------------|--------|--------------------------|--------------|
| valor da reserva   | Número | obrigatório              |              |
| taxas              | Número | automático               | 0            |
| descontos          | Número | opcional                 | 0            |
| valor total        | Número | calculado automaticamente|              |

| Comandos | Destino                     | Tipo    |
|----------|-----------------------------|---------|
| avançar  | Exibir resumo              | default |


## Exibir Resumo

| Campo                | Tipo           | Restrições        | Valor default |
|----------------------|----------------|--------------------|--------------|
| forma de pagamento   | Caixa de texto | somente leitura    |              |
| valor total          | Número         | somente leitura    |              |
| descrição            | Área de texto  | somente leitura    |              |

| Comandos | Destino             | Tipo    |
|----------|---------------------|---------|
| confirmar| Confirmar pagamento | default |
| voltar   | Selecionar forma    | cancel  |


## Confirmar Pagamento

| Campo               | Tipo          | Restrições | Valor default |
|---------------------|---------------|------------|--------------|
| confirmação         | Seleção única | sim/não    | não          |
| data confirmação    | Data e Hora   | automático | atual        |

| Comandos  | Destino              | Tipo    |
|-----------|----------------------|---------|
| processar | Pagamento aprovado?  | default |
| cancelar  | Exibir resumo        | cancel  |


## Pagamento aprovado?

| Comandos | Destino                 | Tipo    |
|----------|-------------------------|---------|
| sim      | Registrar pagamento     | default |
| não      | Exibir erro             | cancel  |


## Exibir Erro

| Campo        | Tipo          | Valor default            |
|--------------|---------------|---------------------------|
| mensagem     | Área de texto | Pagamento não aprovado    |
| código erro  | Caixa de texto|                           |

| Comandos | Destino        | Tipo    |
|----------|----------------|---------|
| tentar   | Exibir resumo  | default |
| cancelar | Fim            | cancel  |


## Registrar Pagamento

| Campo              | Tipo           | Restrições            | Valor default |
|--------------------|----------------|------------------------|--------------|
| id pagamento       | Número         | automático             | auto         |
| valor pago         | Número         | obrigatório            |              |
| forma pagamento    | Caixa de texto | obrigatório            |              |
| data pagamento     | Data e Hora    | automático             | atual        |
| status             | Seleção única  | aprovado/rejeitado     | aprovado     |

| Comandos  | Destino                   | Tipo    |
|-----------|---------------------------|---------|
| confirmar | Gerar confirmação digital | default |


## Gerar Confirmação Digital

| Campo                  | Tipo           | Restrições | Valor default |
|------------------------|----------------|------------|--------------|
| comprovante            | Arquivo        | automático |              |
| código confirmação     | Caixa de texto | único      |              |
| data geração           | Data e Hora    | automático | atual        |

| Comandos | Destino                        | Tipo    |
|----------|--------------------------------|---------|
| enviar   | Enviar comprovante ao cliente  | default |


## Enviar Comprovante ao Cliente

| Campo              | Tipo           | Restrições        | Valor default |
|--------------------|----------------|--------------------|--------------|
| email cliente      | Caixa de texto | formato de e-mail  |              |
| comprovante        | Arquivo        | obrigatório        |              |
| mensagem           | Área de texto  | opcional           |              |

| Comandos | Destino               | Tipo    |
|----------|-----------------------|---------|
| enviar   | Pagamento confirmado  | default |


## Pagamento Confirmado

| Campo            | Tipo          | Valor default                     |
|------------------|---------------|-----------------------------------|
| mensagem final   | Área de texto | Pagamento realizado com sucesso   |
| data final       | Data e Hora   | atual                             |

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
