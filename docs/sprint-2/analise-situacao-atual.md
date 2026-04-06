# Análise da Situação Atual

Atualmente, o sistema contempla processos relacionados ao cadastro de usuários, gerenciamento de quartos, reservas e pagamentos, conforme representado nos diagramas BPMN.

O processo de cadastro de usuários inicia-se com a solicitação de cadastro, seguida do preenchimento dos dados. O sistema realiza a validação dessas informações e, caso estejam inválidas, o usuário deve corrigi-las. Quando os dados são validados com sucesso, o cadastro é persistido e armazenado no banco de dados.

No gerenciamento de quartos, o administrador é responsável por cadastrar novos quartos no sistema. Para isso, ele insere os dados necessários, que passam por um processo de validação. Caso os dados estejam corretos, o quarto é disponibilizado para reserva.

No processo de reserva, o fluxo inicia quando o hóspede acessa o sistema e informa as datas desejadas. O sistema então verifica a disponibilidade do quarto. Caso não haja disponibilidade, o sistema informa ao usuário. Caso haja, são exibidas as opções de quartos disponíveis.

Após selecionar um quarto, o usuário deve informar seus dados, que também passam por validação. Com os dados válidos, a reserva é confirmada e o sistema atualiza a disponibilidade do quarto.

No processo de pagamento, iniciado após a confirmação da reserva, o cliente seleciona a forma de pagamento e o sistema calcula o valor total. Um resumo é exibido para conferência e, após a confirmação, o sistema verifica se o pagamento foi aprovado. Em caso negativo, uma mensagem de erro é exibida. Em caso positivo, o pagamento é registrado, uma confirmação digital é gerada e o comprovante é enviado ao cliente.

De forma geral, os processos atuais apresentam um fluxo sequencial bem definido, com validações em etapas críticas, como verificação de dados e disponibilidade. No entanto, podem existir oportunidades de melhoria relacionadas à automação, integração entre etapas e aprimoramento da experiência do usuário.
