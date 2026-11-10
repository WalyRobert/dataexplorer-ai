# Segurança e dados

Não publique `.env`, chaves ou datasets reais como exemplos. A consulta opcional envia ao provedor selecionado os registros e colunas exibidos na prévia; use exemplos sintéticos ou autorizados. O código sugerido pela IA é texto não confiável e deve ser revisado antes de execução externa.

O servidor de demonstração escuta em loopback. Antes de exposição pública, implemente autenticação, quotas e controle de custos. Relate problemas com amostras sintéticas mínimas e sem credenciais em issues públicas.


A chave pessoal da interface é mantida apenas em memória da aba, sem armazenamento persistente pelo aplicativo. É encaminhada em header ao servidor local e ao provedor escolhido, sem entrar no prompt, URL ou logs. A operação de apagar não desfaz solicitações já enviadas. Não registre headers de autenticação no proxy. As opções de provedor usam destinos fixos; não há fallback para outra chave ou serviço no fluxo da interface.

