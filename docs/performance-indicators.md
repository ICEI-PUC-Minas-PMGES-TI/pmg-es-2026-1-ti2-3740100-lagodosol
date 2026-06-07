## 5. Indicadores de desempenho



| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---                | ---                    |
| Taxa de ocupação dos quartos | Avaliar o nível de utilização dos quartos | Mede a porcentagem de quartos ocupados em um determinado período | Tabela QUARTO, RESERVA | (número de quartos ocupados / número total de quartos) * 100 |
| Taxa de cancelamento de reservas | Monitorar a quantidade de cancelamentos | Mede a porcentagem de reservas canceladas em relação ao total de reservas | Tabela RESERVA | (número de reservas canceladas / número total de reservas) * 100 |
| Média de reservas por cliente | Avaliar o comportamento dos clientes | Calcula a média de reservas realizadas por cliente | Tabela CLIENTE, RESERVA | número total de reservas / número total de clientes |
| Frequência de reservas por cliente | Avaliar a recorrência dos clientes | Mede quantas reservas cada cliente realiza em média durante um período | Tabela CLIENTE, RESERVA | número total de reservas / número de reservas do cliente / período analisado |

_Obs.: todas as informações para gerar os indicadores devem estar no modelo relacional._
