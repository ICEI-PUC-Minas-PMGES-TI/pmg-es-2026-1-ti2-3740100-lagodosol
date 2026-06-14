### 3.3.4 Processo 4 – processo de reserva de quarto

<img width="2411" height="930" alt="image" src="https://github.com/user-attachments/assets/57f98377-24a9-4bb6-a80f-3703daf5b996" />


## Informar dados da reserva  
Tela inicial onde o hóspede informa os dados básicos da estadia.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Data check-in | Data | Obrigatório | |
| Data check-out | Data | > check-in | |
| Hóspedes | Número | Obrigatório | 1 |
| Tipo de hospedagem | Seleção | Opcional | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Buscar quartos | Verificar disponibilidade | Default |
| Cancelar | Fim | Cancel |

---

## Verificar disponibilidade  
Sistema processa as informações e verifica disponibilidade.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Período | Texto | Automático | |
| Status | Seleção | disponível/não | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Verificar | Quarto disponível? | Default |

---

## Quarto disponível?  
Decisão do sistema com base na consulta.

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Sim | Exibir opções | Default |
| Não | Exibir indisponível | Cancel |

---

## Exibir indisponível  
Mensagem informando indisponibilidade.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Mensagem | Área de texto | | Quarto indisponível |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Voltar | Informar dados da reserva | Default |

---

## Exibir opções  
Lista de quartos disponíveis.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Lista de quartos | Tabela | Disponíveis | |
| Filtros | Seleção múltipla | Tipo, preço, capacidade | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Selecionar | Selecionar quarto | Default |

---

## Selecionar quarto  
Escolha do quarto desejado.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Quarto escolhido | Texto | Obrigatório | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Continuar | Exibir resumo da reserva | Default |
| Voltar | Exibir opções | Cancel |

---

## Exibir resumo da reserva  
Apresenta os dados consolidados antes da confirmação.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Resumo da reserva | Área de texto | | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Confirmar | Confirmar reserva | Default |
| Cancelar | Fim | Cancel |

---

## Confirmar reserva  
Decisão do usuário antes de prosseguir.

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Confirmar | Pagamento | Default |
| Cancelar | Fim | Cancel |

---

## Pagamento (Subprocesso)  
Processo responsável pela realização do pagamento.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Forma de pagamento | Seleção | Obrigatório | |
| Dados do pagamento | Texto | Obrigatório | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Pagar | Pagamento aprovado? | Default |
| Cancelar | Fim | Cancel |

---

## Pagamento aprovado?  
Validação do resultado do pagamento.

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Sim | Registrar reserva | Default |
| Não | Fim | Cancel |

---

## Registrar reserva  
Criação definitiva da reserva no sistema.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Status da reserva | Seleção | | Confirmada |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Registrar | Atualizar disponibilidade | Default |

---

## Atualizar disponibilidade  
Atualiza o status do quarto no sistema.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Status do quarto | Seleção | | Ocupado |
| Período reservado | Texto | | |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Atualizar | Enviar confirmação | Default |

---

## Enviar confirmação  
Envio de confirmação ao cliente.

| Campo | Tipo | Restrições | Valor default |
| :--- | :--- | :--- | :--- |
| Mensagem | Área de texto | | Reserva confirmada |

| Comandos | Destino | Tipo |
| :--- | :--- | :--- |
| Finalizar | Fim | Default |

---

## Fim
