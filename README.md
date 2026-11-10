# DataExplorer AI

Assistente experimental de exploração de uma **amostra CSV** com Gemini. Autor: Waly Robert. Derivado do projeto no Google AI Studio, com interpretação correta do CSV, seleção de colunas, chave no servidor e limites explícitos.

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
- Relatório com hipóteses, qualidade visível, sugestões e possível código Python. O painel local calcula contagem de vazios, valores distintos e mínimo/média/máximo das colunas numéricas no arquivo inteiro; isso é separado do relatório Gemini sobre a amostra. Não calcula significância ou correlações comprovadas. Nenhum Python gerado é executado automaticamente: revise o script antes de usar.
- Relatório renderizado como texto, sem executar HTML da resposta. Download do primeiro bloco Python e cópia com tratamento de falha de permissão. URLs temporárias são liberadas e consultas podem ser canceladas.

## Verificação

`npm test`, `npm run test:server`, `npm run build`. Testes cobrem CSV multilinha, amostragem por registro, colunas excluídas, validação do servidor, chave no header, resposta inválida, limpeza e falha de clipboard. O CI repete instalação, testes e build. Integração Gemini validada com respostas simuladas; nenhuma chamada paga nos testes.

Esta edição adapta a interface para execução fora do Studio; o original no Studio permanece separado. Projeto de portfólio, sem certificação de qualidade estatística ou segurança de scripts gerados. Licença de redistribuição do código ainda não definida pelo autor; dependências mantêm suas licenças.


## Início e diagnóstico simplificados

Após `npm ci`, execute `npm run diagnostico` para verificar Node, dependências, build e presença de configuração sem revelar chaves ou consumir cota. Execute `npm run iniciar` para compilar a versão atual e abrir o servidor local em um único terminal. A faixa de estado da interface distingue configuração ausente e integração ainda não comprovada. Encontrar uma chave não confirma que ela é válida nem que existe cota gratuita. Nenhum teste de geração é iniciado automaticamente.

