### 3.3.2 Processo 2 – processo de pagamento

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/aeaeb0b9-5197-45a7-a5a8-414e0ce543e9" />



## Cadastrar Quarto

| Campo              | Tipo            | Restrições        | Valor default |
|--------------------|-----------------|-------------------|--------------|
| nome do quarto     | Caixa de texto  | obrigatório       |              |
| número do quarto   | Número          | obrigatório, único|              |

| Comandos  | Destino                 | Tipo    |
|-----------|--------------------------|---------|
| continuar | Inserir dados do quarto  | default |
| cancelar  | Fim                      | cancel  |


## Inserir Dados do Quarto

| Campo              | Tipo              | Restrições              | Valor default |
|--------------------|-------------------|--------------------------|--------------|
| tipo de quarto     | Seleção única     | solteiro, casal, suíte   |              |
| capacidade         | Número            | obrigatório              |              |
| preço por noite    | Número            | obrigatório              |              |
| descrição          | Área de texto     | opcional                 |              |
| fotos              | Imagem            | opcional                 |              |
| status             | Seleção única     | disponível/indisponível  | disponível   |

| Comandos  | Destino                 | Tipo    |
|-----------|--------------------------|---------|
| validar   | Dados válidos?          | default |
| cancelar  | Cadastrar quarto        | cancel  |


## Dados válidos? (Quarto)

| Comandos | Destino                | Tipo    |
|----------|------------------------|---------|
| sim      | Disponibilizar quarto  | default |
| não      | Inserir dados do quarto| cancel  |


## Disponibilizar Quarto

| Campo            | Tipo          | Restrições | Valor default |
|------------------|---------------|------------|--------------|
| status           | Seleção única | disponível | disponível   |
| data liberação   | Data e Hora   | automático | atual        |

| Comandos  | Destino                  | Tipo    |
|-----------|---------------------------|---------|
| confirmar | Hóspede acessa sistema    | default |


## Hóspede acessa sistema

| Comandos | Destino        | Tipo    |
|----------|----------------|---------|
| iniciar  | Informar datas | default |


## Informar Datas

| Campo           | Tipo | Restrições              | Valor default |
|-----------------|------|--------------------------|--------------|
| data check-in   | Data | obrigatório             |              |
| data check-out  | Data | > check-in              |              |

| Comandos | Destino                   | Tipo    |
|----------|---------------------------|---------|
| buscar   | Verificar disponibilidade | default |
| cancelar | Fim                       | cancel  |


## Verificar Disponibilidade

| Campo   | Tipo           | Restrições | Valor default |
|---------|----------------|------------|--------------|
| período | Caixa de texto | automático |              |
| status  | Seleção única  | disponível/não |          |

| Comandos  | Destino               | Tipo    |
|-----------|------------------------|---------|
| verificar | Quarto disponível?     | default |


## Quarto disponível?

| Comandos | Destino             | Tipo    |
|----------|---------------------|---------|
| sim      | Exibir opções       | default |
| não      | Exibir indisponível | cancel  |


## Exibir indisponível

| Campo     | Tipo          | Valor default        |
|-----------|---------------|----------------------|
| mensagem  | Área de texto | Quarto indisponível  |

| Comandos | Destino        | Tipo    |
|----------|----------------|---------|
| voltar   | Informar datas | default |


## Exibir Opções

| Campo             | Tipo             | Restrições              | Valor default |
|-------------------|------------------|--------------------------|--------------|
| lista de quartos  | Tabela           | disponíveis              |              |
| filtros           | Seleção múltipla | tipo, preço, capacidade  |              |

| Comandos   | Destino            | Tipo    |
|------------|--------------------|---------|
| selecionar | Selecionar quarto  | default |


## Selecionar Quarto

| Campo            | Tipo           | Restrições | Valor default |
|------------------|----------------|------------|--------------|
| quarto escolhido | Caixa de texto | obrigatório|              |

| Comandos  | Destino        | Tipo    |
|-----------|----------------|---------|
| continuar | Informar dados | default |


## Informar Dados (Hóspede)

| Campo     | Tipo           | Restrições        | Valor default |
|-----------|----------------|-------------------|--------------|
| nome      | Caixa de texto | obrigatório       |              |
| email     | Caixa de texto | formato e-mail    |              |
| telefone  | Caixa de texto | obrigatório       |              |
| documento | Caixa de texto | obrigatório       |              |

| Comandos | Destino            | Tipo    |
|----------|--------------------|---------|
| validar  | Dados válidos?     | default |
| voltar   | Selecionar quarto  | cancel  |


## Dados válidos? (Hóspede)

| Comandos | Destino           | Tipo    |
|----------|-------------------|---------|
| sim      | Confirmar reserva | default |
| não      | Informar dados    | cancel  |


## Confirmar Reserva

| Campo               | Tipo          | Valor default |
|---------------------|---------------|--------------|
| resumo da reserva   | Área de texto |              |
| confirmação         | Seleção única | não          |

| Comandos  | Destino                   | Tipo    |
|-----------|---------------------------|---------|
| confirmar | Atualizar disponibilidade | default |
| cancelar  | Fim                       | cancel  |


## Atualizar Disponibilidade

| Campo               | Tipo           | Valor default |
|---------------------|----------------|--------------|
| status do quarto    | Seleção única  | ocupado      |
| período reservado   | Caixa de texto |              |

| Comandos  | Destino | Tipo    |
|-----------|----------|---------|
| finalizar | Fim      | default |


## Fim

| Campo           | Tipo          | Valor default       |
|-----------------|---------------|---------------------|
| mensagem final  | Área de texto | Reserva concluída   |

| Comandos | Destino | Tipo    |
|----------|----------|---------|
| encerrar | —        | default |
