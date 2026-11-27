// =====================================================================
// Diário de Pesquisa — versao.js: NÚMERO DA VERSÃO E HISTÓRICO
// ---------------------------------------------------------------------
// ARQUIVOS DO APP (pasta js/), na ordem em que o index.html carrega.
// A ORDEM IMPORTA: cada arquivo pode usar o que veio antes dele.
//   versao.js      número da versão e este histórico
//   dados.js       base: listas fixas, ferramentas, dados salvos, salvar e
//                  desfazer, migração, janela de formulário, nomes científicos
//   atividades.js  atividades, subitens e diário de notas (todos os níveis)
//   grupos.js      aba Grupos: famílias, subgrupos, gêneros e busca
//   especie.js     espécie: seções, peças, habitus, material-tipo, molecular...
//   nomenclatura.js atos nomenclaturais, checklist da espécie nova e do gênero
//                  novo, cartão Novidades taxonômicas do Painel
//   emprestimos.js material da espécie (próprio/empréstimo) e tela Empréstimos
//   matrizes.js    tela Matrizes de caracteres (células codificadas)
//   painel.js      aba Painel: ‼, Hoje, Produção e prazos
//   agenda.js      abas Agenda e Contagem: calendário, repetições, escala, feriados
//   relatorio.js   Relatório do período
//   google.js      arquivos .ics e conta Google (Drive e Google Agenda)
//   menu.js        Configurações, Sobre, Backup, Modelos e Organizar
//   inicio.js      desenha a tela, abas, cliques, gestos, voltar, tema e início
// A cada versão nova mudam: este arquivo (número e histórico), o sw.js e só os
// arquivos das partes que mudaram.
//
// Cada trecho do código traz a etiqueta da versão em que entrou, ex.: [v1.2].
// Quando uma parte foi crescendo com o tempo, a etiqueta lista as etapas:
//   // [v1.0] tela do gênero · [v1.2] espécies · [v2.1] diário de notas
// Um "?" (ex.: [v2.0?]) indica que a versão exata é a mais provável, não certa.
//
// Como foi montado: as marcas [v2.1] e [v2.2] já existiam no código. As
// anteriores foram reconstruídas pela ordem dos seus pedidos nas conversas
// do projeto; a numeração 1.0 a 1.10 é uma reconstrução. Se você lembrar de
// outros números, troque aqui e nas etiquetas (Localizar e substituir).
//
// v1.0  (≈21–22/11/2026) PRIMEIRA VERSÃO
//       Família › Gênero › Atividades › Subatividades. Gênero com situação
//       (Potencial, Planejado, Em andamento, Pausado, Concluído), prioridade
//       e nº estimado de espécies. Atividades com categoria (dissecção,
//       ilustração, escrita...), situação (A fazer, Em execução, Concluída)
//       e subatividades. Barra de progresso, Painel e busca.
// v1.1  APP INDEPENDENTE do claude.ai: arquivos separados (index.html,
//       style.css, app.js), instalável na tela inicial (manifest.webmanifest
//       e ícones), funciona sem internet (sw.js), dados salvos no aparelho
//       (localStorage) e tela de Backup e restauração.
// v1.2  ESPÉCIES dentro do gênero: material disponível, dissecção completa ou
//       parcial, peças com etapas D L I F, imagens de habitus. Atividades que
//       só valem para espécie (dissecção) ou só para gênero (matriz, análise
//       filogenética). Modelos de 1 clique, editáveis na tela Modelos.
// v1.3  ATIVIDADES FORA DO GÊNERO: "Atividades gerais" (sem família: coleta,
//       triagem, montagem), atividades da família e de subfamília/tribo
//       (agrupamentos). Modelos de família (capítulo de livro, tese).
//       Escrita com seções/subitens nomeados por você.
// v1.4  Aba CONTAGEM REGRESSIVA (anos, meses e dias; horas só perto da data).
// v1.5  PRAZOS nas atividades e na preparação das espécies; CORES por
//       situação e prioridade (padrão comum: vermelho = alta etc.).
// v1.6  (23/11) Abrir/Fechar todas; abrir uma família fecha as outras;
//       espécies em abas dentro do gênero; nº de espécies na família e no
//       gênero (no app × estimado).
// v1.7  (23/11) Nº de espécies no app à direita da linha do gênero; divisão
//       mais visível entre gêneros; botões da família antes dos gêneros.
// v1.8  (23/11) Situação e prioridade nas espécies e nas atividades de
//       família; botões do gênero antes das espécies; aba AGENDA (calendário
//       com prazos, atividades próprias, cores e "Incluir no Painel?").
// v1.9  (23/11) Agenda: ESCALA de trabalho do museu (M/N/F no canto do dia),
//       FERIADOS (nacionais + 25/01, 09/07 e 20/11) e domingos destacados.
// v1.10 (23/11) Botões compactos numa linha; "Sobre o app" no menu; legenda
//       da agenda retrátil, sem lista de feriados do mês; "Gênero" automático
//       antes do nome; espécie abreviada (B. punctatus); Painel em subabas.
// v2.0  (23/11) NOVO VISUAL "gaveta entomológica" (quase tudo no style.css e
//       no index.html): barra com besouro, abas com ícones, botão + flutuante,
//       janelas que sobem de baixo, modo escuro automático, transições.
// v2.1  (23–24/11) Desfazer exclusões; autor e ano (entre parênteses se for
//       nova combinação); ordem da família com ícone; subgrupos um dentro do
//       outro; Organizar (arrastar e A–Z); tema claro/escuro; cartão Hoje;
//       Produção; diário de notas; Relatório do período; folgas até cada
//       prazo; busca sem acentos; confirmação dentro do app; botão voltar do
//       Android; datas de conclusão guardadas.
// v2.2  (≈24/11) GOOGLE AGENDA: trazer eventos (.ics/.zip exportado) e enviar
//       itens (botão "+ Google" e arquivo .ics com os prazos).
// v2.3  (27/11) CONTA GOOGLE: sincronização entre aparelhos pelo Google Drive
//       (arquivo escondido na pasta do app) e ligação direta com o Google
//       Agenda (agenda própria do app + eventos das agendas escolhidas).
//       MORFOLOGIA EXTERNA como tipo de estudo (gênero e espécie), com tabela
//       E I F de estruturas. Espécie sem nome (sp. 1, sp. nov.) fora do
//       itálico (gênero novo também). Terminália em subitens (♂ T8, S8,
//       cápsula genital; ♀ T8, S8). Concluídas ficam no calendário com ✓,
//       no dia em que foram feitas. Correção do ";" no arquivo .ics.
// v2.4  (27/11) ESPÉCIE EM SEÇÕES RETRÁTEIS: Material-tipo (Código: holótipo/
//       parátipos, lectótipo/paralectótipos, neótipo, síntipos; depositário,
//       imagem, examinado, fotografado, dissecado), Distribuição, Habitus,
//       Dissecção, Morfologia externa, DADOS MOLECULARES (amostra, extração e
//       marcadores; GenBank só alinhamento), Atividades e Notas. Caixinha de 3
//       estados (2º toque = "não será realizada", opaca). Distribuição do gênero.
//       SUBGRUPOS em tela própria e família "por subgrupos". AGENDA: repetições,
//       tarefas sem data, selo ‼ Extremamente importante com antecedência,
//       avisos pelo Google Agenda, etapas concluídas no calendário. RELATÓRIO:
//       corrigir datas e "Concluídas sem data". Tela de CONFIGURAÇÕES.
//       Arquivo .ics: repetição vai como um evento só (com a regra).
// v2.4.1 (27/11) O app.js foi dividido em 11 arquivos na pasta js/ (lista acima),
//       sem mudar nada no funcionamento.
// v2.5  (27/11) ATOS NOMENCLATURAIS na espécie e no gênero (sp. nov., gen. nov.,
//       comb. nov., syn. nov., stat. rev., stat. nov., nom. nov., espécie-tipo,
//       redescrição; lectótipo/neótipo "designado neste trabalho" no
//       Material-tipo). CHECKLIST da espécie nova e do gênero novo (itens do
//       Material-tipo e subitens das atividades marcam sozinhos; LSID do
//       ZooBank). MATERIAL da espécie em lotes próprios ou de empréstimo (o
//       antigo "Material disponível" virou material próprio) e tela
//       EMPRÉSTIMOS (situação, prazo na Agenda e no Google Agenda,
//       prorrogações, exemplares). Tela MATRIZES DE CARACTERES (uma por
//       análise; caracteres codificados por terminal). Painel: Novidades
//       taxonômicas e % das matrizes. Relatório: checklist e empréstimos.
//
// Obs.: manifest.webmanifest (v1.1, cores atualizadas na v2.0) não aceita
// comentários, por isso não tem etiquetas.
// =====================================================================

// [v1.10] número da versão (aparece em "Sobre o app")
const VERSAO="2.5";   // mude aqui quando atualizar o app
