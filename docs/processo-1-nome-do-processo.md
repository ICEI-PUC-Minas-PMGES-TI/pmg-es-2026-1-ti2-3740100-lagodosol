### 3.3.1 Processo 1 – Cadastro de Cliente



<img width="739" height="233" alt="image" src="https://github.com/user-attachments/assets/028da01f-fd62-4c30-933b-f62822170ee5" />



Preencher Dados
Campo	Tipo	Restrições	Valor default
nome completo	Caixa de texto	obrigatório, mínimo 3 caracteres	
email	Caixa de texto	obrigatório, formato de e-mail	
senha	Caixa de texto	obrigatório, mínimo 8 caracteres	
confirmar senha	Caixa de texto	deve ser igual à senha	
data de nascimento	Data	obrigatório	
telefone	Caixa de texto	formato numérico (com DDD)	
endereço	Área de texto	opcional	
gênero	Seleção única	opções: masculino, feminino, outro	
aceitar termos	Seleção múltipla	obrigatório	não marcado
Comandos	Destino	Tipo
enviar	Persistir Cadastro	default
cancelar	Fim do Processo	cancel
Persistir Cadastro
Campo	Tipo	Restrições	Valor default
id do usuário	Número	gerado automaticamente	auto
nome completo	Caixa de texto	obrigatório	
email	Caixa de texto	único, obrigatório	
senha criptografada	Caixa de texto	obrigatório	
data de cadastro	Data e Hora	preenchido automaticamente	atual
status	Seleção única	ativo/inativo	ativo
Comandos	Destino	Tipo
confirmar	Salvar no Banco de Dados	default
cancelar	Preencher Dados	cancel
Salvar no Banco de Dados (SQL)
Campo	Tipo	Restrições	Valor default
comando SQL	Área de texto	instrução válida (INSERT)	gerado automático
tabela	Caixa de texto	obrigatório	usuários
data execução	Data e Hora	automático	atual
resultado	Caixa de texto	sucesso/erro	
Comandos	Destino	Tipo
concluir	Cadastro Concluído	default
erro	Preencher Dados	cancel
Cadastro Concluído
Campo	Tipo	Restrições	Valor default
mensagem	Área de texto	informativa	Cadastro realizado com sucesso
data conclusão	Data e Hora	automático	atual
Comandos	Destino	Tipo
finalizar	Fim do Processo	default
