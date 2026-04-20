## 5. Indicadores de desempenho

_Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no modelo relacional. Defina no mínimo 3 indicadores de desempenho._

_Usar o seguinte modelo:_

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---                | ---                    |
| Taxa de ocupação dos quartos | Avaliar o nível de utilização dos quartos | Mede a porcentagem de quartos ocupados em um determinado período | Tabela QUARTO, RESERVA | (número de quartos ocupados / número total de quartos) * 100 |
| Taxa de cancelamento de reservas | Monitorar a quantidade de cancelamentos | Mede a porcentagem de reservas canceladas em relação ao total de reservas | Tabela RESERVA | (número de reservas canceladas / número total de reservas) * 100 |
| Média de reservas por cliente | Avaliar o comportamento dos clientes | Calcula a média de reservas realizadas por cliente | Tabela CLIENTE, RESERVA | número total de reservas / número total de clientes |
| Taxa de reservas realizadas por funcionário | Avaliar o desempenho dos funcionários | Mede a quantidade média de reservas registradas por funcionário | Tabela FUNCIONARIO, RESERVA | número total de reservas / número total de funcionários |

_Obs.: todas as informações para gerar os indicadores devem estar no modelo relacional._
