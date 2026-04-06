### 3.3.3 Processo 3 – processo de reserva de quarto

<img width="319" height="1600" alt="image" src="https://github.com/user-attachments/assets/1ec5b26b-b692-4034-8df3-80151637314c" />


Cadastrar Quarto
Campo	Tipo	Restrições	Valor default
nome do quarto	Caixa de texto	obrigatório	
número do quarto	Número	obrigatório, único	
Comandos	Destino	Tipo
continuar	Inserir dados do quarto	default
cancelar	Fim	cancel
Inserir Dados do Quarto
Campo	Tipo	Restrições	Valor default
tipo de quarto	Seleção única	solteiro, casal, suíte	
capacidade	Número	obrigatório	
preço por noite	Número	obrigatório	
descrição	Área de texto	opcional	
fotos	Imagem	opcional	
status	Seleção única	disponível/indisponível	disponível
Comandos	Destino	Tipo
validar	Dados válidos?	default
cancelar	Cadastrar quarto	cancel
Dados válidos? (Quarto)

(Validação do sistema)

Comandos	Destino	Tipo
sim	Disponibilizar quarto	default
não	Inserir dados do quarto	cancel
Disponibilizar Quarto
Campo	Tipo	Restrições	Valor default
status	Seleção única	disponível	disponível
data liberação	Data e Hora	automático	atual
Comandos	Destino	Tipo
confirmar	Hóspede acessa sistema	default
Hóspede acessa sistema

(Início da interação do cliente — sem campos)

Comandos	Destino	Tipo
iniciar	Informar datas	default
Informar Datas
Campo	Tipo	Restrições	Valor default
data check-in	Data	obrigatório	
data check-out	Data	obrigatório, > check-in	
Comandos	Destino	Tipo
buscar	Verificar disponibilidade	default
cancelar	Fim	cancel
Verificar Disponibilidade
Campo	Tipo	Restrições	Valor default
período	Caixa de texto	automático	
status	Seleção única	disponível/não	
Comandos	Destino	Tipo
verificar	Quarto disponível?	default
Quarto disponível?
Comandos	Destino	Tipo
sim	Exibir opções	default
não	Exibir indisponível	cancel
Exibir indisponível
Campo	Tipo	Restrições	Valor default
mensagem	Área de texto	informativa	Quarto indisponível
Comandos	Destino	Tipo
voltar	Informar datas	default
Exibir Opções
Campo	Tipo	Restrições	Valor default
lista de quartos	Tabela	quartos disponíveis	
filtros	Seleção múltipla	tipo, preço, capacidade	
Comandos	Destino	Tipo
selecionar	Selecionar quarto	default
Selecionar Quarto
Campo	Tipo	Restrições	Valor default
quarto escolhido	Caixa de texto	obrigatório	
Comandos	Destino	Tipo
continuar	Informar dados	default
Informar Dados (Hóspede)
Campo	Tipo	Restrições	Valor default
nome	Caixa de texto	obrigatório	
email	Caixa de texto	formato de e-mail	
telefone	Caixa de texto	obrigatório	
documento	Caixa de texto	obrigatório	
Comandos	Destino	Tipo
validar	Dados válidos?	default
voltar	Selecionar quarto	cancel
Dados válidos? (Hóspede)
Comandos	Destino	Tipo
sim	Confirmar reserva	default
não	Informar dados	cancel
Confirmar Reserva
Campo	Tipo	Restrições	Valor default
resumo da reserva	Área de texto	somente leitura	
confirmação	Seleção única	sim/não	não
Comandos	Destino	Tipo
confirmar	Atualizar disponibilidade	default
cancelar	Fim	cancel
Atualizar Disponibilidade
Campo	Tipo	Restrições	Valor default
status do quarto	Seleção única	ocupado	ocupado
período reservado	Caixa de texto	obrigatório	
Comandos	Destino	Tipo
finalizar	Fim	default
Fim
Campo	Tipo	Restrições	Valor default
mensagem final	Área de texto	informativa	Reserva concluída
Comandos	Destino	Tipo
encerrar	—	default
