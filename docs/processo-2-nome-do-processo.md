### 3.3.2 Processo 2 – processo de pagamento

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/aeaeb0b9-5197-45a7-a5a8-414e0ce543e9" />



Selecionar Forma de Pagamento
Campo	Tipo	Restrições	Valor default
forma de pagamento	Seleção única	obrigatório (cartão, pix, boleto)	
número do cartão	Caixa de texto	obrigatório se cartão, 16 dígitos	
nome no cartão	Caixa de texto	obrigatório se cartão	
validade	Data	obrigatório se cartão	
cvv	Número	obrigatório se cartão, 3 dígitos	
Comandos	Destino	Tipo
continuar	Calcular Valor Total da Reserva	default
cancelar	Fim do Processo	cancel
Calcular Valor Total da Reserva
Campo	Tipo	Restrições	Valor default
valor da reserva	Número	obrigatório	
taxas	Número	calculado automaticamente	0
descontos	Número	opcional	0
valor total	Número	calculado automaticamente	
Comandos	Destino	Tipo
avançar	Exibir Resumo de Pagamento	default
Exibir Resumo de Pagamento
Campo	Tipo	Restrições	Valor default
forma de pagamento	Caixa de texto	somente leitura	
valor total	Número	somente leitura	
descrição da reserva	Área de texto	somente leitura	
Comandos	Destino	Tipo
confirmar	Confirmar Pagamento	default
voltar	Selecionar Forma	cancel
Confirmar Pagamento
Campo	Tipo	Restrições	Valor default
confirmação	Seleção única	sim/não	não
data da confirmação	Data e Hora	automático	atual
Comandos	Destino	Tipo
processar	Pagamento Aprovado?	default
cancelar	Exibir Resumo	cancel
Pagamento Aprovado? (Decisão do Sistema)

(Atividade automática — não possui campos editáveis)

Comandos	Destino	Tipo
sim	Registrar Pagamento	default
não	Exibir Mensagem de Erro	cancel
Exibir Mensagem de Erro
Campo	Tipo	Restrições	Valor default
mensagem de erro	Área de texto	obrigatório	Pagamento não aprovado
código do erro	Caixa de texto	gerado pelo sistema	
Comandos	Destino	Tipo
tentar novamente	Exibir Resumo de Pagamento	default
cancelar	Fim do Processo	cancel
Registrar Pagamento
Campo	Tipo	Restrições	Valor default
id do pagamento	Número	gerado automaticamente	auto
valor pago	Número	obrigatório	
forma de pagamento	Caixa de texto	obrigatório	
data do pagamento	Data e Hora	automático	atual
status	Seleção única	aprovado/rejeitado	aprovado
Comandos	Destino	Tipo
confirmar registro	Gerar Confirmação Digital	default
Gerar Confirmação Digital
Campo	Tipo	Restrições	Valor default
comprovante	Arquivo	gerado automaticamente	
código de confirmação	Caixa de texto	único	
data de geração	Data e Hora	automático	atual
Comandos	Destino	Tipo
enviar comprovante	Enviar Comprovante ao Cliente	default
Enviar Comprovante ao Cliente
Campo	Tipo	Restrições	Valor default
email do cliente	Caixa de texto	formato de e-mail	
comprovante	Arquivo	obrigatório	
mensagem	Área de texto	opcional	
Comandos	Destino	Tipo
enviar	Pagamento Confirmado	default
Pagamento Confirmado (Fim)
Campo	Tipo	Restrições	Valor default
mensagem final	Área de texto	informativa	Pagamento realizado com sucesso
data final	Data e Hora	automático	atual
Comandos	Destino	Tipo
finalizar	Fim do Processo	default               |                   |
