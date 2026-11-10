# DataExplorer AI


## Escolher provedor e usar sua chave

Esta edição integra **Google Gemini, DeepSeek e OpenAI para texto**. Execute `npm ci` e `npm run iniciar`; abra o endereço exibido e use **Configurações de IA**:

1. Escolha o provedor e um modelo de texto disponível na sua conta. Para DeepSeek/OpenAI, o modelo deve aceitar Chat Completions. Os nomes iniciais são exemplos editáveis, sem garantia de disponibilidade ou cota.
2. Selecione **Minha chave, apenas nesta aba**, cole a chave e clique em **Usar nesta aba**. O campo fica vazio depois de aplicar; a chave permanece somente na memória da página, sem localStorage, sessionStorage ou arquivo.
3. Opcionalmente clique em **Verificar configuração sem gerar**. Essa operação verifica formato, destino e presença de chave no servidor local. Não contata o provedor, não valida acesso ao modelo e não confirma saldo/cota gratuita.
4. Confira os dados que serão enviados e solicite a análise. Somente nessa ação o servidor encaminha o conteúdo ao provedor selecionado. A chave pessoal segue em header ao servidor local e no header de autenticação do respectivo provedor, nunca no prompt, URL ou resposta da aplicação.
5. **Apagar chave e configuração** remove a configuração da página. Recarregar/fechar a aba exige configurar novamente. Alterar provedor invalida a configuração anterior e exige a chave correspondente; não há fallback nem repetição automática.

Para uso com chave administrada pelo dono da instalação, escolha explicitamente **Chave deste provedor no servidor** e configure apenas as variáveis correspondentes: `GEMINI_API_KEY`, `DEEPSEEK_API_KEY` ou `OPENAI_API_KEY` no `.env`. O modelo continua escolhido na interface. `GEMINI_MODEL` é mantido para clientes antigos da API que não enviam seleção de provedor. Ausência de chave pessoal não aciona a chave do dono automaticamente pelo fluxo da interface.

As chamadas externas são feitas pelo backend, com destinos HTTPS fixos, limites e timeout. URLs arbitrárias de provedores não são aceitas. O aplicativo não grava chaves nem dados de análise em logs; proxies/serviços de hospedagem devem evitar registrar headers sensíveis. Em hospedagem compartilhada, use HTTPS e autenticação de usuários; este servidor padrão escuta somente em loopback.

**Ter uma chave não garante gratuidade.** Geração pode consumir créditos; verifique sua conta no provedor. `store: false` nas chamadas OpenAI desativa o armazenamento opcional de Chat Completions, sem representar uma garantia de retenção zero pelo provedor. Cada serviço mantém suas próprias políticas. Não há geração externa nos testes automatizados desta entrega.

### API local

`POST /api/analyze`: conteúdo do aplicativo mais `ai: {provider, model, credential}`. `credential` aceita `user` ou `server`. No modo `user`, envie `X-AI-Key` em header. Nunca inclua a chave no JSON. `POST /api/ai/config` recebe os mesmos metadados e verifica configuração sem chamar o provedor; devolve `verified: false`. Clientes antigos sem `ai` mantêm o caminho Gemini configurado pelo servidor.

Referências: [DeepSeek](https://api-docs.deepseek.com/), [OpenAI Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create), [Gemini](https://ai.google.dev/gemini-api/docs/text-generation).



Assistente experimental de exploração de uma **amostra CSV** com Gemini, DeepSeek ou OpenAI. Autor: Waly Robert. Derivado do projeto no Google AI Studio, com interpretação correta do CSV, seleção de colunas, chave no servidor e limites explícitos.

## Executar

Requer Node.js 22.16 ou superior.

```bash
npm ci
npm run dev
```

Carregar arquivo, revisar colunas e visualizar a amostra funcionam sem chave. Para consultar Gemini, copie `.env.example` para `.env`, configure `GEMINI_API_KEY` somente no servidor e execute `npm run server` em outro terminal. Modelo configurável por `GEMINI_MODEL`.

Produção local: `npm run build`, depois `npm start`, em `http://127.0.0.1:3001`. O servidor de demonstração usa loopback, valida origem e tamanho, limita a uma chamada simultânea e aplica timeout. Exposição pública requer autenticação, quotas e controle de custos numa etapa de implantação.

## Dados e funcionalidades

- CSV de até 1 MB, 5000 registros e 50 colunas; cabeçalhos únicos de até 100 caracteres e células até 2000. Separadores vírgula, ponto e vírgula ou tabulação. Aspas escapadas e quebras de linha dentro de células são preservadas.
- O arquivo é interpretado localmente. A IA recebe **somente os primeiros 50 registros**, das colunas marcadas, após clicar no botão. A prévia mostra esses registros; retire dados privados antes de enviar. A amostra tem limite de 60 mil caracteres; se exceder, reduza as colunas.
- Nome do arquivo e restante dos registros não são enviados pelo fluxo de análise. Uma amostra inicial pode não representar o dataset completo, e também pode conter dados pessoais.
- Relatório com hipóteses, qualidade visível, sugestões e possível código Python. O painel local calcula contagem de vazios, valores distintos e mínimo/média/máximo das colunas numéricas no arquivo inteiro; isso é separado do relatório de IA sobre a amostra. Não calcula significância ou correlações comprovadas. Nenhum Python gerado é executado automaticamente: revise o script antes de usar.
- Relatório renderizado como texto, sem executar HTML da resposta. Download do primeiro bloco Python e cópia com tratamento de falha de permissão. URLs temporárias são liberadas e consultas podem ser canceladas.

## Verificação

`npm test`, `npm run test:server`, `npm run build`. Testes cobrem CSV multilinha, amostragem por registro, colunas excluídas, validação do servidor, chave no header, resposta inválida, limpeza e falha de clipboard. O CI repete instalação, testes e build. Integrações Gemini, DeepSeek e OpenAI validadas com respostas simuladas; nenhuma chamada paga nos testes.

Esta edição adapta a interface para execução fora do Studio; o original no Studio permanece separado. Projeto de portfólio, sem certificação de qualidade estatística ou segurança de scripts gerados. Licença de redistribuição do código ainda não definida pelo autor; dependências mantêm suas licenças.


## Início e diagnóstico simplificados

Após `npm ci`, execute `npm run diagnostico` para verificar Node, dependências, build e presença de configuração sem revelar chaves ou consumir cota. Execute `npm run iniciar` para compilar a versão atual e abrir o servidor local em um único terminal. A faixa de estado da interface distingue configuração ausente e integração ainda não comprovada. Encontrar uma chave não confirma que ela é válida nem que existe cota gratuita. Nenhum teste de geração é iniciado automaticamente.

