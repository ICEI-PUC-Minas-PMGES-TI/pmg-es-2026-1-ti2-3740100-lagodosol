### 3.3.4 Processo 4 – processo de gestao de facilites(camareira)

<img width="1216" height="662" alt="image" src="https://github.com/user-attachments/assets/7a4f10d8-f7d2-4898-bdfd-6f1e77705070" />





**Atualizar status: necessita limpeza**

| Campo                 | Tipo            | Restrições                  | Valor default       |
|----------------------|-----------------|-----------------------------|---------------------|
| Número do quarto     | Número          | obrigatório                 |                     |
| Tipo de problema     | Seleção única   | obrigatório                 | necessita limpeza   |
| Descrição            | Área de texto   | obrigatório                 |                     |
| Prioridade           | Seleção única   | (baixa, média, alta)        | média               |
| Data do pedido       | Data e hora     | automático                  |                     |

| Comandos   | Destino                 | Tipo    |
|------------|-------------------------|---------|
| confirmar  | Notificar camareira     | default |


**Notificar camareira**

| Campo                 | Tipo            | Restrições                  | Valor default       |
|----------------------|-----------------|-----------------------------|---------------------|
| Camareira            | Seleção única   | obrigatório                 |                     |
| Número do quarto     | Número          | obrigatório                 |                     |
| Mensagem             | Área de texto   |                             | Limpeza solicitada  |

| Comandos             | Destino               | Tipo    |
|----------------------|------------------------|---------|
| enviar notificação   | Receber notificação    | default |


**Receber notificação**

| Campo                 | Tipo            | Restrições                  | Valor default       |
|----------------------|-----------------|-----------------------------|---------------------|
| Camareira            | Seleção única   | automático                  |                     |
| Quarto               | Número          | obrigatório                 |                     |
| Data recebimento     | Data e Hora     | automático                  |                     |

| Comandos         | Destino        | Tipo    |
|------------------|----------------|---------|
| iniciar limpeza  | Limpar quarto  | default |


**Limpar quarto**

| Campo                 | Tipo            | Restrições                  | Valor default |
|----------------------|-----------------|-----------------------------|---------------|
| Número do quarto     | Número          | obrigatório                 |               |
| Observações          | Área de texto   |                             |               |
| Tempo de limpeza     | Número          | em minutos                  |               |

| Comandos            | Destino                      | Tipo    |
|---------------------|------------------------------|---------|
| finalizar limpeza   | Verificar problema no quarto | default |


**Decisão: Problema no quarto?**

| Comandos | Destino                    | Tipo    |
|----------|----------------------------|---------|
| sim      | Reportar problema          | default |
| não      | Atualizar status: limpo    | default |


**Reportar problema**

| Campo                 | Tipo            | Restrições                  | Valor default |
|----------------------|-----------------|-----------------------------|---------------|
| Número do quarto     | Número          | obrigatório                 |               |
| Tipo de problema     | Seleção única   | obrigatório                 |               |
| Descrição            | Área de texto   | obrigatório                 |               |
| Foto do problema     | Imagem          | opcional                    |               |

| Comandos | Destino                        | Tipo    |
|----------|--------------------------------|---------|
| enviar   | Atualizar status: manutenção   | default |


**Atualizar status: manutenção**

| Campo                 | Tipo            | Restrições          | Valor default |
|----------------------|-----------------|---------------------|---------------|
| Número do quarto     | Número          | obrigatório         |               |
| Status               | Seleção única   | "manutenção"        | manutenção    |
| Data atualização     | Data e Hora     | automático          |               |

| Comandos  | Destino | Tipo    |
|-----------|---------|---------|
| finalizar | Fim     | default |


**Atualizar status: limpo**

| Campo                 | Tipo            | Restrições          | Valor default |
|----------------------|-----------------|---------------------|---------------|
| Número do quarto     | Número          | obrigatório         |               |
| Status               | Seleção única   | "limpo"             | limpo         |
| Data atualização     | Data e Hora     | automático          |               |

| Comandos  | Destino              | Tipo    |
|-----------|----------------------|---------|
| confirmar | Notificar recepção   | default |


**Notificar recepção**

| Campo                 | Tipo            | Restrições | Valor default |
|----------------------|-----------------|------------|---------------|
| Quarto               | Número          | obrigatório|               |
| Mensagem             | Área de texto   |            | Quarto limpo  |

| Comandos | Destino         | Tipo    |
|----------|-----------------|---------|
| enviar   | Liberar quarto  | default |


**Liberar quarto**

| Campo                 | Tipo            | Restrições      | Valor default |
|----------------------|-----------------|-----------------|---------------|
| Número do quarto     | Número          | obrigatório     |               |
| Status               | Seleção única   | "disponível"    | disponível    |

| Comandos  | Destino | Tipo    |
|-----------|---------|---------|
| finalizar | Fim     | default |
