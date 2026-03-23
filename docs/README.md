LAGO DO SOL
Artur de Figueiredo Neves - arturfneves17@gmail.com
Guilherme Pereira Bittencourt - guilhermebittencourt.p@gmail.com
Mateus de Moura Armani - mateusmarmani@gmail.com
Matheus Figueiredo - matheus.figueiredo15m@gmail.com
Raphael Thierry Coelho - raphaeltierry08@gmail.com


Professores:

Lucca Soares de Paiva Lacerda

Luiz Carlos da Silva 

Michelle Hanne Soares de Andrade

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

Este trabalho apresenta o desenvolvimento de uma plataforma digital integrada para a gestão de reservas e operações de um empreendimento hoteleiro. O objetivo é substituir processos manuais e sistemas desconectados por uma solução automatizada que une o fluxo de vendas online ao controle interno de facilities e recepção. Através da otimização da jornada do usuário e da sincronização de dados em tempo real, o projeto visa reduzir erros operacionais e elevar as taxas de conversão de clientes. Como resultado esperado, a implementação da proposta permite um controle gerencial preciso e uma comunicação ágil entre os setores, tornando o hotel mais competitivo no cenário digital atual.

---


## 1. Introdução

Este documento detalha o planejamento, a análise e a proposta de solução tecnológica para a automação dos processos de reserva e gestão interna de uma unidade hoteleira.
### 1.1 Contextualização

O setor de turismo e hotelaria passou por uma transformação digital profunda na última década. Segundo dados do setor, mais de 70% dos viajantes preferem realizar suas reservas de forma direta e online, buscando agilidade e confirmação imediata. Nesse cenário, o site de um hotel deixou de ser uma vitrine estática para se tornar o principal motor de receita e o primeiro ponto de contato na experiência do hóspede. A eficiência desse canal digital está diretamente ligada à capacidade do estabelecimento em converter visitantes em clientes pagantes de forma autônoma e segura.

### 1.2 Problema

Atualmente, o hotel enfrenta dificuldades com um processo de reserva pouco intuitivo e fragmentado. A falta de integração entre o site e os sistemas internos gera um fluxo de trabalho manual, onde a recepção precisa confirmar disponibilidades de forma analógica, aumentando o risco de overbooking. Além disso, há um gargalo na comunicação com a equipe de camareiras, que depende de avisos verbais ou planilhas físicas para a liberação de quartos, resultando em demora no check-in e possíveis falhas no controle gerencial e financeiro.

### 1.3 Objetivo geral

O objetivo deste trabalho é desenvolver e implementar um sistema integrado de automação de processos para a gestão de reservas e serviços hoteleiros, otimizando a interface de venda direta e a comunicação operacional interna.

#### 1.3.1 Objetivos específicos

Implementar um motor de reservas online com atualização de disponibilidade em tempo real.

Automatizar o processo de cadastro de clientes e validação de pagamentos digitais.

Desenvolver um painel de controle para a gestão de facilities (limpeza e manutenção) integrado à recepção.

Estruturar relatórios gerenciais automatizados para monitoramento de taxas de ocupação e faturamento.

### 1.4 Justificativas

A modernização do sistema justifica-se pela necessidade de aumentar a receita direta do hotel, reduzindo as comissões pagas a intermediários. Operacionalmente, a solução reduz erros humanos e retrabalho na recepção. Estratégicamente, o sistema provê dados precisos para a gerência, permitindo tomadas de decisão baseadas em evidências e melhorando a percepção de valor e profissionalismo por parte do hóspede.

## 2. Participantes do processo

Cliente: Indivíduos de diversas faixas etárias, com nível de educação médio/superior e familiaridade com tecnologia. Papel: Realizar o autoatendimento (cadastro, busca e pagamento da reserva).

Recepção: Colaboradores operacionais. Papel: Realizar o atendimento presencial, validar check-ins e check-outs e monitorar as reservas vindas do sistema.

Camareiras (Facilities): Equipe operacional interna. Papel: Atualizar o status de higienização e manutenção dos quartos no sistema para liberação imediata.

Gerência: Perfil administrativo. Papel: Acompanhar métricas de desempenho, ocupação e resultados financeiros através de relatórios.

Equipe de TI: Profissionais técnicos. Papel: Manutenção preventiva, suporte e evolução das funcionalidades da plataforma.

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

Atualmente, as tarefas são executadas de forma híbrida e descentralizada. O site funciona apenas como um formulário de contato ou exibe informações estáticas, obrigando o cliente a aguardar um retorno por e-mail ou telefone para confirmar a reserva. Internamente, a comunicação entre a recepção e o setor de limpeza é feita via rádio ou planilhas de papel, o que gera atrasos na atualização do inventário de quartos disponíveis. O processamento de pagamentos é manual, realizado no momento do check-in, o que gera filas e insegurança financeira para o hotel em caso de desistências não comunicadas.

### 3.2. Descrição geral da proposta de solução

A solução proposta consiste em uma plataforma end-to-end que conecta o cliente final diretamente ao ecossistema operacional do hotel. A proposta elimina o delay de comunicação ao automatizar quatro pilares:

Venda Direta: Motor de reserva com cálculo automático de tarifas e gateway de pagamento.

Sincronização de Inventário: Bloqueio imediato de quartos no banco de dados após a confirmação da reserva.

Gestão de Fluxo Interno: Interface simplificada para camareiras sinalizarem a prontidão dos quartos via dispositivos móveis.

Inteligência de Negócio: Painel gerencial com indicadores de desempenho (KPIs).

Esta abordagem resolve os limites da situação atual ao transformar o site em uma ferramenta de eficiência operacional, alinhando a tecnologia à estratégia de crescimento e competitividade do negócio.

### 3.3. Modelagem dos processos

[PROCESSO 1 - Nome do Processo](processo-1-nome-do-processo.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Nome do Processo](processo-2-nome-do-processo.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Nome do Processo](processo-3-nome-do-processo.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Nome do Processo](processo-4-nome-do-processo.md "Detalhamento do Processo 4.")

## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

_Apresente aqui a conclusão do seu trabalho. Deve ser apresentada aqui uma discussão dos resultados obtidos no trabalho, local em que se verifica as observações pessoais de cada aluno. Essa seção poderá também apresentar sugestões de novas linhas de estudo._

# REFERÊNCIAS

_Como um projeto de software não requer revisão bibliográfica, a inclusão das referências não é obrigatória. No entanto, caso você deseje incluir referências relacionadas às tecnologias, padrões, ou metodologias que serão usadas no seu trabalho, relacione-as de acordo com a ABNT._

_Verifique no link abaixo como devem ser as referências no padrão ABNT:_

http://portal.pucminas.br/imagedb/documento/DOC_DSC_NOME_ARQUI20160217102425.pdf

**[1.1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[1.2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[1.3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[1.4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[1.5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._



# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






