
// =====================================================================
// HISTÓRICO DE VERSÕES DO DIÁRIO DE PESQUISA
// ---------------------------------------------------------------------
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
//
// Obs.: manifest.webmanifest (v1.1, cores atualizadas na v2.0) não aceita
// comentários, por isso não tem etiquetas.
// =====================================================================

// ===== 1. CONSTANTES (listas fixas: situações, categorias, modelo de tarefas) =====
// Trechos marcados com [v2.1] e [v2.2] são novidades dessas versões.
// [v1.1] nome do espaço onde os dados ficam salvos no aparelho
const KEY="diario-pesquisa-v1";
const THK="diario-tema";   // [v2.1] tema escolhido no menu (guardado à parte, fora do backup)
// [v1.0] situações das atividades (STAT), situações do gênero (GST) e prioridades (PRIO)
const STAT=["A fazer","Em execução","Concluída"];
const GST=["Potencial","Planejado","Em andamento","Pausado","Concluído"];
const PRIO=["Alta","Média","Baixa"];
// [v1.0] categorias de atividades · [v1.3?] Coleta e Montagem de espécimes (atividades sem família) · [v2.3] Morfologia externa
const CATS=["Revisão bibliográfica","Material / empréstimos","Coleta","Triagem e identificação","Montagem de espécimes","Morfologia externa","Dissecção","Genitália / preparação","Fotografia / montagem","Ilustração","Morfometria","Matriz de caracteres","Molecular","Análise filogenética","Descrição / redescrição","Mapas e distribuição","Escrita","Revisão e submissão","Outra"];
// [v1.2] etapas de cada peça dissecada e categorias que só valem para um nível
const STEPS = [["d","D","Dissecada"],["l","L","Lâmina montada"],["i","I","Ilustrada"],["f","F","Fotografada"]];
const ONLY_S = ["Dissecção","Genitália / preparação","Fotografia / montagem"];   // só espécie
const ONLY_G = ["Matriz de caracteres","Análise filogenética"];                 // só gênero
// [v2.3] MORFOLOGIA EXTERNA: estudo sem dissecção. Etapas de cada estrutura externa:
const STEPS_ME=[["e","E","Examinada"],["i","I","Ilustrada"],["f","F","Fotografada"]];
// [v2.3] tipo de estudo da espécie (e padrão do gênero): [valor guardado, texto no formulário]
const ME="Morfologia externa";
const TPO=[["Não definida","Não definido"],["Completa","Dissecção completa"],["Parcial","Dissecção parcial"],[ME,"Só morfologia externa (sem dissecção)"]];
const tpL=v=>{const o=TPO.find(x=>x[0]===v);return o?o[1]:TPO[0][1]};    // valor → texto
const tpV=l=>{const o=TPO.find(x=>x[1]===l);return o?o[0]:TPO[0][0]};    // texto → valor
// [v2.3] nomes que indicam espécie ainda sem nome (sp. 1, sp. nov. A, morfoespécie 3)
const SPUN=/^(sp(\.|\s|$|\d)|morfoesp)/i;
const tpChip=v=>v===ME?ME:v==="Completa"||v==="Parcial"?"Dissecção "+v.toLowerCase():"Estudo não definido";
// [v2.4] MATERIAL-TIPO (Código Internacional de Nomenclatura Zoológica): tipo primário e, quando existe, a série secundária
const TYP=["Holótipo","Lectótipo","Neótipo","Síntipos"];
const TYS={"Holótipo":"Parátipos","Lectótipo":"Paralectótipos"};   // neótipo e síntipos não têm tipos secundários
const TYST=[["img","Img","Imagem disponível"],["ex","Ex","Examinado"],["f","F","Fotografado"],["d","D","Dissecado"]];
const SEXO=["Não informado","♂","♀","♂ e ♀"];
// [v2.4] DADOS MOLECULARES: amostra e extração (uma vez por espécie) e, para cada marcador, amplificação, sequenciamento e alinhamento
const MOLA=[["a","Tecido (amostra)"],["e","Extração de DNA"]];
const MOLST=[["p","P","Amplificação"],["s","S","Sequenciamento"],["l","L","Alinhamento"]];
const LAB="Sequenciado por mim (laboratório)",GBK="Baixado do GenBank",OUTRO="Outro (digitar abaixo)";
// [v2.4] REPETIÇÃO de atividades da agenda: [código, texto]
const RPT=[["","Não repete"],["d","Todo dia"],["w","Toda semana"],["m","Todo mês"],["y","Todo ano"]];
// [v2.4] AVISOS pelo Google Agenda: minutos antes do início (00:00) do dia do prazo
const REM=[["","Não avisar"],["360","Na véspera, às 18h"],["900","Na véspera, às 9h"],["2340","2 dias antes, às 9h"],["9540","1 semana antes, às 9h"]];
// [v2.4] seções da espécie, na ordem em que aparecem (cada uma pode ser desligada nas Configurações)
const SECS=[["ty","Material-tipo"],["di","Distribuição geográfica"],["hb","Imagens de habitus"],["dp","Dissecção e preparação das peças"],["me","Morfologia externa"],["mo","Dados moleculares"],["ta","Atividades da espécie"],["nt","Diário de notas"]];
// [v2.4] CONFIGURAÇÕES padrão: s.. = seções da espécie · sug = sugestões do modelo · na = etapa "não será realizada"
//        grpv = exibição dos subgrupos · hoje/prod = cartões do Painel · xi = antecedência dos ‼ · fer = feriados
//        reg = etapas concluídas no calendário · rem = aviso do Google Agenda
const DCFG={sty:1,sdi:1,shb:1,sdp:1,sme:1,smo:1,sta:1,snt:1,sug:1,na:1,grpv:"lista",hoje:1,prod:1,xi:30,fer:1,reg:1,rem:"900"};
// [v1.2] níveis dos modelos · [v1.3] "Família / geral" e "Todos os níveis"
const LV = {g:"Só gênero", s:"Só espécie", gs:"Gênero e espécie", f:"Família / geral", gsf:"Todos os níveis"};
// [v1.5] cores por situação e por prioridade
const GCOL=["gray","purple","blue","orange","green"],PCOL=["red","yellow","green"];   // cores: situação do gênero e prioridade
const gc=v=>GCOL[GST.indexOf(v)],pc=v=>PCOL[PRIO.indexOf(v)];
// [v1.3] categorias de escrita: aceitam seções/subitens com nome
const WR=["Escrita","Revisão e submissão"];
// [v2.1] combinação do nome da espécie (Código Internacional de Nomenclatura Zoológica, art. 51.3):
// se a espécie está hoje em outro gênero que não o original, autor e ano vão entre parênteses
const CBO=["Original","Nova combinação (autor e ano entre parênteses)"];
// [v2.1] ordens de insetos da família e seus ícones (para incluir outra ordem: acrescente aqui e em ICO)
const ORD=[["Coleoptera","col"],["Lepidoptera","lep"],["Diptera","dip"],["Hymenoptera","hym"],["Hemiptera","hem"]];
const OUTRA="Outra / não informada";
// [v2.1] desenhos (SVG) dos ícones das ordens e da alça de arrastar (GRIP)
const SV=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
const ICO={
 col:SV('<path d="M11.1 4.8 9.4 2.7M12.9 4.8l1.7-2.1"/><ellipse cx="12" cy="6" rx="1.9" ry="1.4"/><rect x="8.3" y="7.9" width="7.4" height="2.8" rx="1.1"/><path d="M12 11.3c-3.3 0-4.5 1.7-4.5 4.4 0 3.3 2 5.6 4.5 5.6s4.5-2.3 4.5-5.6c0-2.7-1.2-4.4-4.5-4.4zM12 11.3v10M8.4 9.4 6 8.3l-.8-1.7M15.6 9.4 18 8.3l.8-1.7M7.6 13.5l-2.8-.4-1 1.6M16.4 13.5l2.8-.4 1 1.6M8 17.6l-2.4 1.1-.3 2M16 17.6l2.4 1.1.3 2"/>'),
 lep:SV('<path d="M12 7.6v10.6M11.5 5.5 10 2.8M12.5 5.5 14 2.8"/><circle cx="12" cy="6.4" r="1"/><path d="M11.3 9C9.6 5.6 6.2 3.7 4.3 4.6c-1.6.8-.9 4.8 2.1 6.6 1.6.9 3.4 1 4.9.4M12.7 9c1.7-3.4 5.1-5.3 7-4.4 1.6.8.9 4.8-2.1 6.6-1.6.9-3.4 1-4.9.4M11.3 12.8c-2.4-.4-5.2.6-5.8 2.7-.6 2.2 1.4 3.6 3.2 2.8 1.4-.6 2.4-2.4 2.6-3.6M12.7 12.8c2.4-.4 5.2.6 5.8 2.7.6 2.2-1.4 3.6-3.2 2.8-1.4-.6-2.4-2.4-2.6-3.6"/>'),
 dip:SV('<circle cx="12" cy="5.9" r="1.7"/><ellipse cx="12" cy="9.9" rx="2.3" ry="2.1"/><ellipse cx="12" cy="15.6" rx="1.8" ry="3.3"/><ellipse cx="15.9" cy="13.4" rx="1.7" ry="4.5" transform="rotate(-38 15.9 13.4)"/><ellipse cx="8.1" cy="13.4" rx="1.7" ry="4.5" transform="rotate(38 8.1 13.4)"/><path d="M10 9.2 7.4 7.8 6.8 5.9M14 9.2l2.6-1.4.6-1.9"/>'),
 hym:SV('<path d="M11.2 4 9.4 2.2M12.8 4l1.8-1.8"/><circle cx="12" cy="5.3" r="1.5"/><ellipse cx="12" cy="9" rx="1.8" ry="1.9"/><path d="M12 10.9v1.1"/><ellipse cx="12" cy="16.3" rx="2.4" ry="4.1"/><path d="M9.8 15.1h4.4M9.9 17.7h4.2"/><ellipse cx="16.3" cy="9.6" rx="4.2" ry="1.5" transform="rotate(-20 16.3 9.6)"/><ellipse cx="7.7" cy="9.6" rx="4.2" ry="1.5" transform="rotate(20 7.7 9.6)"/>'),
 hem:SV('<path d="M11.3 5.2 9.7 2.6M12.7 5.2l1.6-2.6M10.9 6.9l.4-1.8h1.4l.4 1.8"/><path d="M12 6.9c-2.6 0-5.3.6-6.2 1.8l1 7.3L12 21l5.2-5 1-7.3c-.9-1.2-3.6-1.8-6.2-1.8z"/><path d="M6 10.4c3.9-.8 8.1-.8 12 0M9.4 10.4l2.6 6 2.6-6M6.2 12 3.9 13.2M17.8 12l2.3 1.2M6.6 14.8l-2 2M17.4 14.8l2 2"/>'),
 oth:SV('<circle cx="12" cy="4.6" r="2.1" fill="currentColor"/><path d="M12 6.7V13M12 17.6v4"/><rect x="7.2" y="13" width="9.6" height="4.6" rx=".8"/>')
};
const GRIP='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>';
// Modelos padrão (editáveis na aba Modelos): peças, posições de habitus e atividades
// [v1.2] peças da dissecção completa, posições de habitus e atividades padrão
// [v1.3] últimas 5 atividades (lv:"f"): coleta, triagem, montagem, capítulo de livro e tese
// [v2.3] terminália em subitens: "Grupo › subitem" (ex.: "Terminália ♂ › T8"); estruturas de morfologia externa (me)
const defTpl = () => ({
  parts: ["Antena","Labro","Mandíbulas","Maxilas","Lábio","Perna protorácica","Perna mesotorácica","Perna metatorácica","Asa metatorácica","Metaendosternito","Terminália ♂ › T8","Terminália ♂ › S8","Terminália ♂ › Cápsula genital (T9, S9 e T10)","Edeago ♂ (tegmen e lobo médio)","Terminália ♀ › T8","Terminália ♀ › S8","Ovipositor ♀","Espermateca ♀"],
  hab: ["Dorsal","Lateral","Frontal","Ventral"],
  me: ["Cabeça","Antenas","Olhos","Peças bucais (vista externa)","Pronoto","Prosterno e processo prosternal","Escutelo","Élitros","Mesoventrito","Metaventrito","Pernas","Abdômen (ventritos)"],
  // [v2.4] marcadores moleculares mais usados em filogenias de besouros (mitocondriais, nucleares e genômicos)
  mk: ["COI","COII","16S rRNA","12S rRNA","cytb","18S rRNA","28S rRNA","CAD","wingless (wg)","EF-1α","ArgK","PEPCK","H3","Mitogenoma","Genoma","Transcriptoma","UCEs"],
  tk: [
    {c:"Revisão bibliográfica", t:"Levantar descrições originais e literatura", lv:"gs", b:[]},
    {c:"Material / empréstimos", t:"Solicitar empréstimos de material e tipos", lv:"gs", b:["Listar coleções","Enviar pedidos","Registrar recebimento"]},
    {c:"Triagem e identificação", t:"Triagem e morfoespécies", lv:"g", b:[]},
    {c:"Morfologia externa", t:"Estudo da morfologia externa", lv:"gs", b:[]},
    {c:"Matriz de caracteres", t:"Matriz de caracteres morfológicos", lv:"g", b:[]},
    {c:"Análise filogenética", t:"Análises filogenéticas", lv:"g", b:[]},
    {c:"Mapas e distribuição", t:"Mapas de distribuição", lv:"gs", b:[]},
    {c:"Descrição / redescrição", t:"Descrição e diagnose", lv:"gs", b:["Diagnose","Descrição","Material examinado","Etimologia"]},
    {c:"Escrita", t:"Redação do manuscrito", lv:"gs", b:["Introdução","Material e métodos","Resultados","Discussão"]},
    {c:"Coleta", t:"Coleta de campo", lv:"f", b:[]},
    {c:"Triagem e identificação", t:"Triagem de material (várias famílias)", lv:"f", b:[]},
    {c:"Montagem de espécimes", t:"Montagem de espécimes", lv:"f", b:[]},
    {c:"Escrita", t:"Capítulo de livro", lv:"f", b:[]},
    {c:"Escrita", t:"Redação da tese", lv:"f", b:[]}
  ]
});

// ===== 2. FUNÇÕES AUXILIARES (pequenas ferramentas reutilizáveis) =====
// [v1.0] ferramentas básicas: achar elemento, proteger texto, criar código, data de hoje, formatar data
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const uid=()=>Math.random().toString(36).slice(2,9);
const today=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
const fmt=d=>d.split("-").reverse().join("/");
// [v1.0] cria uma atividade · [v1.5] prioridade (p)
const mk=(t,c,s,d,nt,b,p)=>({id:uid(),t,c,s:s||STAT[0],d:d||"",nt:nt||"",p:p||"",b:(b||[]).map(x=>({id:uid(),t:x,x:0}))});
// [v2.1] soma n dias a uma data "AAAA-MM-DD"
const addD=(ds,n)=>{const d=new Date(ds+"T12:00:00");d.setDate(d.getDate()+n);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
// [v2.1] texto sem acentos e em minúsculas (para a busca achar "especie" e "espécie")
const nz=s=>String(s==null?"":s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
// [v2.1] autor e ano: "Sharp, 1900" ou "(Sharp, 1900)" se for nova combinação · [v2.3] táxon sem nome não tem autor
const auth=o=>{if(o.un)return"";const a=[o.au,o.an].map(x=>String(x||"").trim()).filter(Boolean).join(", ");return a?(o.cn?"("+a+")":a):""};
const authH=o=>{const a=auth(o);return a?` <span class="au">${esc(a)}</span>`:""};
// [v2.3] peças com subitens: "Terminália ♂ › T8" = grupo "Terminália ♂" + subitem "T8" (também aceita ">")
const pSplit=n=>{const m=String(n).split(/\s*[›>]\s*/);return m.length>1?[m[0],m.slice(1).join(" › ")]:["",String(n)]};
const pNorm=n=>String(n).split(/\s*[›>]\s*/).map(x=>x.trim()).filter(Boolean).join(" › ");
// [v2.3] acrescenta a peça logo depois das outras do mesmo grupo (para o grupo ficar junto na tabela)
function pAdd(list,n){const g=pSplit(n)[0];let k=-1;if(g)list.forEach((p,i)=>{if(pSplit(p.n)[0]===g)k=i});if(k<0)list.push({n});else list.splice(k+1,0,{n})}
// [v2.3] data e hora de um registro: "hoje às 10:32" ou "25/11/2026 às 08:10"
// [v2.4] estado de uma etapa: data = feita · "na" = não será realizada · vazio = a fazer
const isNA=v=>v==="na";
const isD=v=>!!v&&v!=="na";                                          // feita (com ou sem data)
const isDate=v=>typeof v==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(v);  // tem data guardada?
// [v2.4] próximo estado ao tocar na caixinha: vazio → feita (hoje) → não será realizada (opaca) → vazio
const nxt=v=>!v?today():isNA(v)?0:(S.cfg.na?"na":0);
// [v2.4] caixinha de 3 estados (é um botão): a = ação, i = linha, k = etapa, v = valor, lab = nome da etapa
const tcB=(a,i,k,v,lab)=>`<button class="tc${isNA(v)?" na":isD(v)?" on":""}" data-a="${a}" data-i="${i}|${k}" title="${esc(lab)}${isNA(v)?": não será realizada":isD(v)?": feita"+(isDate(v)?" em "+fmt(v):""):""}" aria-label="${esc(lab)}"></button>`;
// [v2.4] conta [feitas, que valem]: as "não será realizada" saem da conta
function cntDN(L,ST){let d=0,n=0;L.forEach(p=>ST.forEach(x=>{const v=p[x[0]];if(!isNA(v)){n++;if(isD(v))d++}}));return[d,n]}
// [v2.4] distribuição: áreas separadas por ";" ou por linha (ex.: Brasil: SP, RJ; Argentina: Misiones)
const areas=t=>String(t||"").split(/[;\n]+/).map(x=>x.trim()).filter(Boolean);
function uniqA(L){const r=[],k=new Set();L.forEach(x=>{const z=nz(x);if(!k.has(z)){k.add(z);r.push(x)}});return r}
const quando=ts=>{const d=new Date(+ts);if(!+ts||isNaN(d))return"—";const ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");return(ds===today()?"hoje":fmt(ds))+" às "+String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")};

// ===== 3. ESTADO (todos os dados vivem em S; a tela atual em V) =====
// [v1.0] dados de exemplo da primeira abertura (depois ganhou: modelos v1.2, ordem e notas v2.1)
function seed(){return{t:0,tpl:defTpl(),f:[{id:uid(),n:"Biphyllidae",ord:"Coleoptera",nt:"Exemplo: edite ou apague.",o:1,g:[{id:uid(),n:"Gênero exemplo",st:"Potencial",p:"Média",sp:"",nt:"Abra o gênero, toque em + Espécie e use os modelos de 1 clique.",tasks:[],spp:[]}]}]}}
// [v1.1] carrega os dados salvos no aparelho (ou usa o exemplo)
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.f))S=seed();
fix();
// [v1.0] tela atual (aba, família, gênero, busca) · [v1.3] u = atividades da família/gerais
let V={tab:"g",f:null,g:null,s:null,u:null,q:""},cb=null;
V.cal={y:+today().slice(0,4),m:+today().slice(5,7)-1,d:today()};   // [v1.8] mês e dia escolhidos na Agenda
V.pt="x";   // [v1.10] subaba aberta do Painel
V.rp={k:"7",a:addD(today(),-6),b:today()};   // [v2.1] período do relatório
V.oF=null;V.oG=null;V.ret=null;               // [v2.1] tela Organizar: família/gênero abertos e tela de retorno
V.kf={from:today(),col:"blue",rm:1};V.kres=null; // [v2.2] opções e resultado da importação do Google Agenda
V.hs=[];   // [v2.4] caminho percorrido na aba Grupos (família › subgrupo › gênero), para o "voltar"
// [v1.0] achar família e gênero · [v1.2] achar espécie · [v2.1] gênero só pelo código (gById)
const fam=id=>S.f.find(f=>f.id===id),gen=(f,g)=>{const F=fam(f);return F&&F.g.find(x=>x.id===g)};
const spc=(f,g,s)=>{const G=gen(f,g);return G&&G.spp.find(x=>x.id===s)};
const gById=id=>{for(const f of S.f){const g=f.g.find(x=>x.id===id);if(g)return g}};
// [v1.2] "dono" das atividades na tela · [v1.3] família/gerais (V.u) · [v1.6] espécie da aba tocada (V.ow)
const own=()=>V.u?supOwn():V.ow?spc(V.f,V.g,V.ow):gen(V.f,V.g);

// ===== 4. SALVAR (localStorage), AVISOS E "DESFAZER" =====
let UNDO=null,TT=0;   // [v2.1] UNDO = cópia dos dados antes da última exclusão
// [v1.1] salvar no aparelho · [v1.1?] aviso rápido (toast) · [v2.1] botão "Desfazer" no aviso
function persist(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast("Não foi possível salvar!")}}
function save(){S.t=Date.now();persist();if(UNDO){UNDO=null;$("#toast").style.display="none"}if(SY.on)syncLater()}   // outra mudança cancela o "Desfazer" · [v2.3] e agenda a sincronização
// [v2.3] guarda sem marcar como "mudança" (abrir/fechar abas não precisa ir para o outro aparelho)
const saveUI=()=>persist();
function toast(m,u){const t=$("#toast");t.innerHTML=`<span>${esc(m)}</span>`+(u?'<button data-a="undo">Desfazer</button>':"");t.style.display="flex";clearTimeout(TT);TT=setTimeout(()=>{t.style.display="none";if(u)UNDO=null},u?6000:2200)}
// [v2.1] excluir com "Desfazer": guarda uma cópia de tudo, exclui e mostra o aviso por 6 segundos
function rm(msg,fn){const snap=JSON.stringify(S);fn();fix();S.t=Date.now();persist();closeM();render();UNDO=snap;toast(typeof msg==="function"?msg():msg,1);if(SY.on)syncLater()}
// [v2.1] pergunta de confirmação dentro do app (no lugar da janelinha do navegador)
function conf(msg,lab,fn){$("#modal").innerHTML=`<div class="sheet"><h3>Tem certeza?</h3><p>${esc(msg)}</p><div class="r"><button class="dng" data-a="ok">${esc(lab)}</button><button class="sec" data-a="cancel">Cancelar</button></div></div>`;$("#modal").classList.add("on");cb={ok:fn};syncHist()}
// [v2.1] copiar texto (relatório) para a área de transferência
function copyText(s,msg){const ok=()=>toast(msg||"Copiado"),fb=()=>{const t=document.createElement("textarea");t.value=s;t.style.cssText="position:fixed;opacity:0";document.body.appendChild(t);t.select();try{document.execCommand("copy")?ok():toast("Não foi possível copiar")}catch(e){toast("Não foi possível copiar")}t.remove()};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(s).then(ok,fb);else fb()}

// ===== 5. FORMULÁRIOS E TELAS (funções que devolvem HTML) =====
// [v1.0] barra de progresso (atividades concluídas) · [v1.2] conta também peças, habitus e espécies
function units(o){let d=0,n=o.tasks.length;d+=o.tasks.filter(t=>t.s===STAT[2]).length;
 const add=([a,b])=>{d+=a;n+=b};   // [v2.4] etapas "não será realizada" não contam
 if(o.parts){add(cntDN(o.parts,STEPS));add(cntDN(o.hab,[["x"]]))}
 if(o.me)add(cntDN(o.me,STEPS_ME));   // [v2.3] estruturas da morfologia externa
 if(o.mol&&S.cfg.smo&&(o.mol.ms.length||o.mol.a||o.mol.e)){add(cntDN([o.mol],MOLA));o.mol.ms.forEach(m=>add(cntDN([m],m.g?[["l"]]:MOLST)))}   // [v2.4] dados moleculares (só quando começaram a ser usados)
 if(o.spp)o.spp.forEach(s=>{const u=units(s);d+=u[0];n+=u[1]});return[d,n]}
function prog(o){const[d,n]=units(o);return`<div class="bar"><span style="width:${n?d/n*100:0}%"></span></div><small>${d}/${n} itens concluídos</small>`}
// [v1.0] janela de formulário (Salvar / Cancelar / Excluir) · [v2.0] passa a subir de baixo (visual no CSS) · [v2.3] campo caixinha (t:"chk")
function form(title,fields,vals,ok,del,dl,ex){   // [v2.4] ex = botões extras [{l:texto,f:função}]
 $("#modal").innerHTML=`<div class="sheet"><h3>${title}</h3>${fields.map(f=>f.t==="chk"?`<label class="ck"><input type="checkbox" name="${f.k}"${vals[f.k]?" checked":""}><span>${f.l}</span></label>`:`<label>${f.l}${f.t==="area"?`<textarea name="${f.k}">${esc(vals[f.k])}</textarea>`:f.t==="sel"?`<select name="${f.k}">${f.o.map(o=>`<option${o===vals[f.k]?" selected":""}>${esc(o)}</option>`).join("")}</select>`:`<input name="${f.k}" type="${f.t||"text"}" value="${esc(vals[f.k])}">`}</label>`).join("")}<div class="r"><button class="pri" data-a="ok">Salvar</button><button class="sec" data-a="cancel">Cancelar</button>${del?`<button class="dng" data-a="del">${dl||"Excluir"}</button>`:""}${(ex||[]).map((x,j)=>`<button class="sec" data-a="fx" data-i="${j}">${esc(x.l)}</button>`).join("")}</div></div>`;
 $("#modal").classList.add("on");cb={ok,del,fx:ex};syncHist();
}
const closeM=()=>{$("#modal").classList.remove("on");cb=null;syncHist()};
const vals=()=>{const o={};document.querySelectorAll("#modal [name]").forEach(e=>o[e.name]=e.type==="checkbox"?(e.checked?"1":""):e.value.trim());return o};   // [v2.3] caixinha marcada = "1"
// [v1.0] campos do gênero (nome, situação, prioridade, nº de espécies, notas) · [v1.3] agrupamento · [v2.1] autor, ano e agrupamento aninhado
// [v2.3] caixinha "gênero sem nome" e tipo de estudo das espécies
const gForm=f=>[{k:"n",l:"Nome do gênero"},{k:"un",l:"Gênero ainda sem nome (gen. nov., gênero A): o nome não fica em itálico",t:"chk"},{k:"au",l:"Autor (opcional)"},{k:"an",l:"Ano (opcional)"}].concat(f.grp.length?[{k:"gr",l:"Agrupamento (opcional)",t:"sel",o:["(nenhum)"].concat(grAll(f).map(x=>grPath(f,x)))}]:[],[{k:"st",l:"Situação",t:"sel",o:GST},{k:"p",l:"Prioridade",t:"sel",o:PRIO},{k:"est",l:"Tipo de estudo das espécies (usado nas espécies novas e nas que estão sem tipo definido)",t:"sel",o:TPO.map(x=>x[1])},{k:"sp",l:"Nº de espécies (aprox.)"},{k:"dist",l:"Distribuição do gênero (áreas separadas por ; — opcional)",t:"area"},{k:"dsp",l:"Somar também a distribuição das espécies",t:"chk"},{k:"nt",l:"Notas",t:"area"}]);   // [v2.4] distribuição
// [v1.0] campos da atividade · [v1.2] categorias conforme o nível · [v1.3] seções/subitens · [v1.5] prioridade e prazo · [v2.1] data de conclusão · [v2.4] ‼ e antecedência
const tForm=(c,nw,o)=>[{k:"t",l:"Atividade"},{k:"c",l:"Categoria",t:"sel",o:!c||catsFor(o).includes(c)?catsFor(o):[c,...catsFor(o)]},{k:"s",l:"Situação",t:"sel",o:STAT},{k:"p",l:"Prioridade",t:"sel",o:["Sem prioridade",...PRIO]},{k:"d",l:"Prazo",t:"date"},{k:"xi",l:"‼ Extremamente importante",t:"chk"},{k:"av",l:"Mostrar no Painel com antecedência de (dias)",t:"number"}].concat(nw?[]:[{k:"dc",l:"Data de conclusão (preenchida sozinha ao concluir)",t:"date"}],[{k:"nt",l:"Notas",t:"area"}]).concat(nw?[{k:"b",l:"Seções / subitens (separados por vírgula, opcional)"}]:[]);

// [v1.0] tela Grupos: busca e lista · [v1.3] cartão "Atividades gerais" · [v1.6] botão Abrir/Fechar todas
function vGroups(){return`<div class="tools"><input id="q" type="search" placeholder="Buscar família, gênero ou espécie" value="${esc(V.q)}" style="flex:1;min-width:0"><button class="sec" data-a="tgf" style="white-space:nowrap">${S.f.some(f=>f.o)?"Fechar todas":"Abrir todas"}</button></div><div class="card gen" id="gecard" style="border-top:0" data-a="ou" data-i="*"><b>📌 Atividades gerais</b> <small>sem família</small><div><span class="chip">${S.ge.tasks.filter(t=>t.s!==STAT[2]).length} em aberto</span></div>${prog(S.ge)}</div><div id="list"></div>`}
// [v1.0] cartão da atividade com subatividades · [v1.3] "+ seção ou subitem" na escrita · [v1.5] chips de prioridade e prazo (vermelho se atrasado) · [v2.1] chip ✓ com a data de conclusão
function taskH(t){
 const k=STAT.indexOf(t.s),over=t.d&&t.d<today()&&k<2,sd=t.b.filter(x=>x.x).length;
 return`<div class="task s${k}${t.xi&&k<2?" xi":""}"><div class="r"><button class="st k${k}" data-a="cy" data-i="${t.id}" title="Alternar situação">${["○","◐","●"][k]}</button><div class="g1"><b>${esc(t.t)}</b><div>${t.xi?'<span class="chip xi">‼ Extremamente importante</span>':""}<span class="chip">${esc(t.c)}</span>${t.p?`<span class="chip ${pc(t.p)}">Prioridade ${esc(t.p.toLowerCase())}</span>`:""}<button class="chip ${t.d?(over?"red":"blue"):""}" data-a="dd" data-i="${t.id}">📅 ${t.d?fmt(t.d):"+ prazo"}</button>${k===2&&t.dc?`<span class="chip green">✓ ${fmt(t.dc)}</span>`:""}${t.b.length?`<span class="chip">${sd}/${t.b.length}</span>`:""}</div></div><button class="ic" data-a="et" data-i="${t.id}">✎</button></div>${t.nt?`<div class="note" style="margin:4px 0 0 46px">${esc(t.nt)}</div>`:""}<ul>${t.b.map(x=>`<li><label><input type="checkbox" data-a="sb" data-i="${t.id}|${x.id}"${x.x?" checked":""}><span class="${x.x?"dn":""}">${esc(x.t)}</span></label><span><button class="ic" data-a="es" data-i="${t.id}|${x.id}">✎</button><button class="ic" data-a="ds" data-i="${t.id}|${x.id}">✕</button></span></li>`).join("")}</ul><input class="addsub" data-sub="${t.id}" placeholder="${WR.includes(t.c)?"+ seção ou subitem (Enter)":"+ subatividade (Enter)"}"></div>`;
}
// [v1.8] chips da espécie: situação e prioridade · resumo da espécie fechada: material e dissecção [v1.2], prazo [v1.5]
const spSt=s=>`<span class="chip ${gc(s.st)}">${esc(s.st)}</span><span class="chip ${pc(s.p)}">Prioridade ${esc((s.p||"").toLowerCase())}</span>`;
const spChips=s=>`${spSt(s)}${s.ex?`<span class="chip">${esc(s.ex)}</span>`:""}<span class="chip blue">${esc(tpChip(s.tp))}</span>${s.d?`<span class="chip ${s.d<today()?"red":"blue"}">📅 ${fmt(s.d)}</span>`:""}`;
// [v1.0] tela do gênero · [v1.2] lista de espécies · [v1.6] espécies em abas + Abrir/Fechar todas
// [v1.8] botões + Espécie / Editar gênero antes da lista · [v1.10] "Gênero" automático e espécie abreviada
// [v2.1] autor e ano, chip do agrupamento, botão Ordenar e diário de notas
// [v2.3] chip do tipo de estudo do gênero; espécie sem nome fora do itálico (spH) · [v2.4] distribuição do gênero
function vGen(){
 const F=fam(V.f),g=gen(V.f,V.g);if(!g){V.g=null;return vGroups()}
 const x=grById(F,g.gr);
 let h=`<h2>${gl(g)}${authH(g)}</h2><div>${x?`<span class="chip">${esc(grl(x))}</span>`:""}<span class="chip ${gc(g.st)}">${esc(g.st)}</span><span class="chip ${pc(g.p)}">Prioridade ${esc(g.p.toLowerCase())}</span>${g.est&&g.est!==TPO[0][0]?`<span class="chip blue">${esc(tpChip(g.est))}</span>`:""}${g.sp?`<span class="chip">${esc(g.sp)} spp. (estimado)</span>`:""}</div>${gDist(g).length?`<div class="gdist"><small>Distribuição</small>${distChips(gDist(g))}</div>`:""}${g.nt?`<p class="note">${esc(g.nt)}</p>`:""}${prog(g)}`;
 h+=`<div class="tools"><button class="sec" data-a="addSp">+ Espécie</button><button class="sec" data-a="editGen">Editar gênero</button></div>`;
 h+=`<div class="r" style="justify-content:space-between"><div class="grp">Espécies (${g.spp.length})</div>${g.spp.length>1?`<button class="lnk" data-a="ordG">Ordenar</button>`:""}${g.spp.length?`<button class="lnk" data-a="tgs">${g.spp.some(s=>s.o)?"Fechar todas":"Abrir todas"}</button>`:""}</div>`+(g.spp.map(s=>`<section class="card"><div class="fh" data-a="os" data-i="${s.id}"><b>${spH(g,s)}${authH(s)}</b><span>${s.o?"▾":"▸"}</span></div>${s.o?`<div class="spb" data-sp="${s.id}">${vSp(s)}</div>`:`<div class="gen" style="border-top:0;padding-top:0" data-a="os" data-i="${s.id}">${spChips(s)}${prog(s)}</div>`}</section>`).join("")||'<div class="empty">Nenhuma espécie ainda. Toque no + para adicionar.</div>');
 return h+`<div class="grp">Atividades do gênero</div>`+tasksH(g)+notesH(g);
}
// [v1.0] todas as atividades (para Painel/Agenda): gêneros · [v1.2] espécies · [v1.3] gerais, família e subgrupos
const allT=()=>{const r=[];S.ge.tasks.forEach(t=>r.push({u:"*",o:S.ge,t}));S.f.forEach(f=>{f.tasks.forEach(t=>r.push({f,u:f.id,o:f,t}));f.grp.forEach(x=>x.tasks.forEach(t=>r.push({f,u:f.id+"|"+x.id,o:x,t})));f.g.forEach(g=>{g.tasks.forEach(t=>r.push({f,g,t}));g.spp.forEach(s=>s.tasks.forEach(t=>r.push({f,g,s,t})))})});return r};
// [v1.0] "onde está" cada atividade · [v1.3] gerais/família/subgrupo · [v1.8] itens da Agenda
const where=x=>x.ag?"Atividade da agenda":x.u?(x.u==="*"?"Atividades gerais":(x.o.r?esc(grl(x.o))+" · ":"")+esc(x.f.n)):(x.s?spH(x.g,x.s):gnH(x.g))+" · "+esc(x.f.n);   // [v2.3] nomes sem itálico quando não nomeados
// [v2.1] linha de prazo: "em 12 dias · 5 folgas" (ou "atrasado 3 dias")
const dlH=(d,dn)=>{if(!d||dn)return"";const fg=folgas(d);return`<div class="dl${d<today()?" late":""}">${rel(d)}${fg!=null?" · "+pl(fg,"folga","folgas"):""}</div>`};
// [v1.0] cartão de atividade no Painel · [v1.5] prioridade e prazo · [v1.8] itens da Agenda · [v2.1] linha de prazo e folgas
const item=x=>`<div class="card gen" style="border-top:0" data-a="${x.ag?"eag":x.u?"ou":"og"}" data-i="${x.ag?x.ag.id:x.u||x.f.id+"|"+x.g.id+"|"+(x.s?x.s.id:"")}"><b>${x.t.xi?'<span class="xib">‼</span> ':""}${esc(x.t.t)}</b><div><span class="chip">${esc(x.t.c)}</span>${x.t.p?`<span class="chip ${pc(x.t.p)}">Prioridade ${esc(x.t.p.toLowerCase())}</span>`:""}${x.t.d?`<span class="chip ${x.t.d<today()?"red":"blue"}">📅 ${fmt(x.t.d)}</span>`:""}</div>${dlH(x.t.d,x.t.s===STAT[2])}<small>${where(x)}</small></div>`;
// nomes: "Gênero X" automático e espécie abreviada (B. punctatus)
// [v1.10] "Gênero" antes do nome (gl) e gênero abreviado na espécie (abbr)
// [v2.3] gl recebe o gênero inteiro: gênero sem nome (un) fica sem itálico; gnH = só o nome, sem "Gênero"
const gnH=g=>{const n=typeof g==="string"?g:g.n;return g.un?esc(n):"<em>"+esc(n)+"</em>"};
const gl=g=>"Gênero "+gnH(g);
const abbr=(g,n)=>{const G=(g.n||"").trim(),w=(n||"").trim();if(!G||!w)return w;if(g.un)return nz(w).startsWith(nz(G)+" ")?w:G+" "+w;const a=G[0].toUpperCase()+".";if(w.startsWith(a))return w;if(w.toLowerCase().startsWith(G.toLowerCase()+" "))return a+" "+w.slice(G.length+1);return a+" "+w};
// [v2.1] nome completo da espécie, para o relatório (Biphyllus punctatus)
const fullSp=(g,s)=>{const G=(g.n||"").trim(),w=(s.n||"").trim();if(!G||!w)return w;if(nz(w).startsWith(nz(G)+" "))return w;if(w.startsWith(G[0].toUpperCase()+". "))return G+w.slice(2);return G+" "+w};
// [v2.3] nome da espécie em HTML: gênero (abreviado ou completo) e epíteto em itálico;
// espécie sem nome (s.un: "sp. 1", "sp. nov. A") fica em letra normal: <em>B.</em> sp. 1
const spH=(g,s,full)=>{const G=(g.n||"").trim(),w=(s.n||"").trim(),gp=!G?"":full||g.un?G:G[0].toUpperCase()+".";let ep=w;
 if(G&&nz(w).startsWith(nz(G)+" "))ep=w.slice(G.length+1);else if(G&&w.startsWith(G[0].toUpperCase()+". "))ep=w.slice(3);
 return(gp?(g.un?esc(gp):"<em>"+esc(gp)+"</em>")+" ":"")+(s.un?esc(ep):"<em>"+esc(ep)+"</em>")};
// [v1.10] subabas do Painel
const PT=[["x","Em execução"],["p","Prazos"],["g","Potenciais"]];
// [v1.0] Painel: gêneros por situação, em execução e potenciais · [v1.5] prazos em ordem cronológica + prazo de preparação das espécies
// [v1.8] atividades da Agenda marcadas "Incluir no Painel" · [v1.10] subabas · [v2.1] cartão Hoje e Produção no topo
// [v2.4] cartão ‼ Extremamente importantes; Hoje e Produção podem ser desligados nas Configurações
function vDash(){
 const T=allT(),G=[];S.f.forEach(f=>f.g.forEach(g=>G.push({f,g})));
 const rp=e=>e.rp&&e.rp.f,ag=S.ag.filter(e=>e.pn).map(e=>({ag:e,t:{t:e.t,c:"Agenda",d:rp(e)?nextOcc(e):e.d,s:rp(e)?STAT[0]:e.s,p:e.p,xi:e.xi}})),prep=[];   // [v2.4] repetição: próxima data
 G.forEach(x=>x.g.spp.forEach(s=>{if(s.d&&prepPend(s))prep.push({f:x.f,g:x.g,s,t:{t:prepName(s),c:s.tp===ME?ME:"Dissecção",d:s.d,s:STAT[0]}})}));   // [v2.3] nome conforme o tipo de estudo
 const L={
  x:T.concat(ag).filter(x=>x.t.s===STAT[1]),
  p:T.concat(prep,ag).filter(x=>x.t.d&&x.t.s!==STAT[2]).sort((a,b)=>a.t.d.localeCompare(b.t.d)),
  g:G.filter(x=>x.g.st==="Potencial").sort((a,b)=>PRIO.indexOf(a.g.p)-PRIO.indexOf(b.g.p))
 };
 const pg=x=>`<div class="card gen" style="border-top:0" data-a="og" data-i="${x.f.id}|${x.g.id}"><b>${gl(x.g)}</b> <small>${esc(x.f.n)}</small><div><span class="chip ${pc(x.g.p)}">Prioridade ${esc(x.g.p.toLowerCase())}</span></div></div>`;
 const k=PT.some(a=>a[0]===V.pt)?V.pt:"x",vazio={x:"Nada em execução.",p:"Nenhum prazo definido.",g:"Nenhum gênero potencial."};
 return xiH()+(S.cfg.hoje?hojeH():"")+(S.cfg.prod?prodH():"")+`<div class="grp">Gêneros e atividades</div><div>${GST.map(s=>`<span class="chip ${gc(s)}">${s}: ${G.filter(x=>x.g.st===s).length}</span>`).join("")}</div><div class="seg">${PT.map(([i,l])=>`<button class="${i===k?"on":""}" data-a="ptab" data-i="${i}">${l} (${L[i].length})</button>`).join("")}</div>`
 +(L[k].map(k==="g"?pg:item).join("")||`<div class="empty">${vazio[k]}</div>`);
}
// [v2.1] cartão "Hoje" no topo do Painel: escala, feriado, atrasados e próximos 7 dias
let HJL=[];
function hojeH(){
 const td=today(),lim=addD(td,7),hd=S.cfg.fer?feriados(+td.slice(0,4))[td]:null,le=escL(td);   // [v2.4] feriados podem ser desligados
 // [v2.4] dias passados de repetições e eventos trazidos do Google não viram "atrasados"
 const L=agItems().filter(i=>!i.dn&&i.d<=lim&&!(i.d<td&&(i.k==="c"||i.oc||(i.k==="a"&&i.x.gk)))).sort((a,b)=>a.d.localeCompare(b.d)||(a.h||"").localeCompare(b.h||""));
 const late=L.filter(i=>i.d<td),up=L.filter(i=>i.d>=td),mais=Math.max(0,late.length-5)+Math.max(0,up.length-7);
 HJL=late.slice(0,5).concat(up.slice(0,7));
 const dia=new Date(td+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
 return`<div class="card hoje"><div class="hj-h"><b>${esc(dia)}</b>${le?`<span class="chip ${ESC[le]||"gray"}">Escala: ${esc(ESN[le]||le)}</span>`:""}${hd?`<span class="chip orange">🎉 ${esc(hn(hd))}</span>`:""}${late.length?`<span class="chip red">${pl(late.length,"atrasada","atrasadas")}</span>`:""}</div>`
 +(HJL.map((i,n)=>`<div class="hj${i.d<td?" late":""}" data-a="hji" data-i="${n}"><i class="dot ${i.col}"></i><span class="g1">${i.xi?'<span class="xib">‼</span> ':""}${esc(i.t)}</span><small>${rel(i.d)}${i.h?" "+esc(i.h):""}</small></div>`).join("")||'<div class="note" style="padding:4px 0 8px">Nada atrasado nem com prazo nos próximos 7 dias.</div>')
 +`<div class="hj-f">${mais?`<small>+${mais} na aba Prazos ou na Agenda</small>`:"<span></span>"}<button class="lnk" data-a="tab" data-i="r">Relatório do período ›</button></div></div>`;
}
// [v2.4] cartão "‼ Extremamente importantes" no topo do Painel: cada item aparece com a antecedência escolhida nele
let XIL=[];
function xiH(){const td=today(),L=[];
 allT().forEach(x=>{if(x.t.xi&&x.t.s!==STAT[2])L.push({t:x.t.t,d:x.t.d||"",av:x.t.av,x})});
 S.ag.forEach(e=>{if(!e.xi)return;if(e.rp&&e.rp.f){const d=nextOcc(e);if(d)L.push({t:e.t,d,av:e.av,e,oc:d})}else if(e.s!==STAT[2])L.push({t:e.t,d:e.d||"",av:e.av,e})});
 XIL=L.filter(i=>!i.d||D8(i.d)-D8(td)<=(+i.av||S.cfg.xi)).sort((a,b)=>(a.d||"9999").localeCompare(b.d||"9999"));
 return XIL.length?`<div class="card xic"><div class="xic-h">‼ Extremamente importantes</div>${XIL.map((i,n)=>`<div class="hj${i.d&&i.d<td?" late":""}" data-a="xii" data-i="${n}"><span class="g1">${esc(i.t)}</span><small>${i.d?rel(i.d)+" · "+fmt(i.d):"sem data"}</small></div>`).join("")}</div>`:""}
// [v2.1] números de produção (peças, habitus, espécies prontas e atividades) · [v2.4] sem as etapas "não será realizada"; marcadores
function prodH(){
 const c={d:0,l:0,i:0,f:0},N={d:0,l:0,i:0,f:0},PL=["Peças dissecadas","Em lâmina","Ilustradas","Fotografadas"];let hb=0,hn=0,sp=0,sok=0,ma=0,mt=0;
 S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{if(s.parts.length||s.hab.length||s.me.length){sp++;if(!prepPend(s))sok++}
  s.parts.forEach(p=>STEPS.forEach(x=>{const v=p[x[0]];if(!isNA(v)){N[x[0]]++;if(isD(v))c[x[0]]++}}));
  s.hab.forEach(h=>{if(!isNA(h.x)){hn++;if(isD(h.x))hb++}});
  s.mol.ms.forEach(m=>{if(!isNA(m.l)){mt++;if(isD(m.l))ma++}})})));
 const T=allT(),td=T.filter(x=>x.t.s===STAT[2]).length,tile=(v,t,l)=>`<div><b>${v}<small>/${t}</small></b><span>${l}</span></div>`;
 return`<div class="grp">Produção</div><div class="stats">${STEPS.map((x,i)=>tile(c[x[0]],N[x[0]],PL[i])).join("")}</div><div class="stats${mt?"":" s3"}">${tile(hb,hn,"Habitus fotografados")}${tile(sok,sp,"Espécies com preparação completa")}${mt?tile(ma,mt,"Marcadores alinhados"):""}${tile(td,T.length,"Atividades concluídas")}</div>`;
}
// [v2.4] CONFIGURAÇÕES: liga e desliga partes do app (ficam nos dados, então valem também no outro aparelho)
function vCfg(){const c=S.cfg,sw=(k,l,d,on,a)=>`<label class="sw"><span><b>${l}</b>${d?`<small>${d}</small>`:""}</span><input type="checkbox" data-a="${a||"cfg"}" data-i="${k}"${(on===undefined?c[k]:on)?" checked":""}><i></i></label>`;
 const sel=(k,l,O)=>`<label class="kl">${l}<select data-c="cfg" data-i="${k}">${O.map(([v,t])=>`<option value="${v}"${String(c[k])===v?" selected":""}>${t}</option>`).join("")}</select></label>`;
 return`<p class="note">Escolha o que aparece no app. As escolhas vão junto na sincronização, então valem também no outro aparelho.</p>`
 +`<div class="grp">Seções da espécie</div><div class="card kbox">${SECS.map(([k,l])=>sw("s"+k,l)).join("")}</div>`
 +`<div class="grp">Preparação e modelos</div><div class="card kbox">${sw("sug","Sugestões do modelo","botões de 1 clique para atividades, peças, estruturas, habitus e marcadores")}${sw("na","Etapa “não será realizada”","o 2º toque numa caixinha deixa a etapa opaca: ela sai da contagem")}</div>`
 +`<div class="grp">Famílias</div><div class="card kbox">${sel("grpv","Exibição dos subgrupos (cada família pode mudar no botão Ver tudo / Ver por subgrupo)",[["lista","Lista completa (tudo numa tela)"],["nav","Por subgrupos (cada um abre em nova tela)"]])}</div>`
 +`<div class="grp">Painel</div><div class="card kbox">${sw("hoje","Cartão Hoje")}${sw("prod","Produção")}<label class="kl">Antecedência padrão dos itens ‼ Extremamente importantes (dias)<input type="number" min="0" data-c="cfgn" data-i="xi" value="${esc(c.xi)}"></label></div>`
 +`<div class="grp">Calendário</div><div class="card kbox">${sw("esc","Escala de trabalho","letras M/N/F no canto de cada dia",S.sc.on,"cfgesc")}${sw("fer","Feriados")}${sw("reg","Etapas concluídas no calendário","peças, estruturas, habitus, molecular e tipos aparecem como ✓ no dia em que foram feitos")}</div>`
 +`<div class="grp">Notificações</div><div class="card kbox">${sel("rem","Avisar sobre prazos (pelo app Google Agenda)",REM)}<p class="note">Os avisos chegam pelo Google Agenda do celular. Para isso, conecte a conta (menu ⋮ › Google), deixe ligado “Enviar para o Google” e, no app Google Agenda, deixe visível a agenda “${CALN}”. Itens ‼ Extremamente importantes ganham também um aviso com a antecedência deles (às 9h; o Google aceita até 4 semanas antes).</p></div>`;
}
// [v1.10] número da versão e tela "Sobre o app" (texto atualizado na v2.1, na v2.2 e na v2.4)
const VERSAO="2.4";   // mude aqui quando atualizar o app
function vAbout(){
 let nG=0,nS=0;S.f.forEach(f=>{nG+=f.g.length;f.g.forEach(g=>nS+=g.spp.length)});
 return`<h2>Diário de Pesquisa</h2><p class="note">Sistemática e taxonomia · versão ${VERSAO}</p><p>Aplicativo pessoal para organizar o doutorado: famílias, gêneros e espécies, atividades e subatividades, prazos, escala de trabalho, agenda e diário de notas.</p><div class="grp">Seus dados</div><p>${S.f.length} famílias · ${nG} gêneros · ${nS} espécies.<br>${SY.on?"Ficam salvos neste aparelho e numa cópia no seu Google Drive ("+esc(SY.email||"conta conectada")+"), sincronizada entre os aparelhos.":"Ficam salvos apenas neste aparelho. Para usar no celular e no computador, conecte sua conta em menu ⋮ › Google."} Faça backups de vez em quando (menu ⋮ › Backup e restauração).</p><div class="grp">Abas</div><p><b>Grupos</b>: famílias, subgrupos, gêneros e espécies (material-tipo, distribuição, habitus, dissecção, morfologia externa, dados moleculares, atividades e notas).<br><b>Painel</b>: hoje, produção, em execução, prazos e gêneros potenciais.<br><b>Agenda</b>: calendário com prazos, escala e feriados.<br><b>Contagem</b>: contagens regressivas.</p><div class="grp">Menu ⋮</div><p><b>Relatório</b>: o que foi concluído num período (para copiar ou compartilhar).<br><b>Organizar</b>: arrastar famílias, gêneros e espécies ou pôr em ordem alfabética.<br><b>Google</b>: sincronização entre aparelhos (Google Drive) e ligação com o Google Agenda.<br><b>Modelos</b>: atividades, peças, estruturas e marcadores de 1 clique.<br><b>Configurações</b>: seções da espécie, sugestões, Painel, calendário e avisos.<br><b>Tema</b>: automático, claro ou escuro.</p><div class="grp">Uso offline</div><p>Depois da primeira abertura funciona sem internet e pode ser instalado na tela inicial. Com internet, atualiza sozinho para a versão mais nova.</p>`;
}
// [v1.1] tela de backup (copiar) e restauração (colar)
function vBackup(){return`<p class="note">Seus dados ficam salvos só neste aparelho, dentro do navegador. Copie o backup abaixo de vez em quando e guarde em lugar seguro (e-mail, Drive...).</p><textarea id="bkp" readonly style="min-height:160px">${esc(JSON.stringify(S,null,1))}</textarea><div class="tools" style="margin-top:8px"><button class="sec" data-a="copy">Copiar backup</button></div><div class="grp">Restaurar</div><textarea id="imp" placeholder="Cole aqui um backup (substitui tudo)"></textarea><div class="tools" style="margin-top:8px"><button class="dng" data-a="imp">Restaurar backup</button></div>`+outraH()}   // [v2.3] + versão guardada na sincronização

// [v1.2] fix() nasceu quando os dados ganharam campos novos; a cada versão ganhou uma linha
function fix(){ // completa dados antigos com os campos novos
 // tpl [v1.2] · ge [v1.3] · cd [v1.4] · ag [v1.8] · sc = escala [v1.9] · nts das gerais [v2.1]
 S.tpl=S.tpl||defTpl();S.tpl.me=S.tpl.me||defTpl().me;   // [v2.3] estruturas de morfologia externa
 S.gg=Object.assign({push:1,src:[],cal:"",cals:[],col:"blue",ini:0},S.gg||{});   // [v2.3] opções do Google Agenda (iguais nos dois aparelhos)
 S.cfg=Object.assign({},DCFG,S.cfg||{});S.tpl.mk=S.tpl.mk||defTpl().mk;   // [v2.4] configurações e marcadores moleculares
 S.ge=S.ge||{tasks:[]};S.ge.tasks=S.ge.tasks||[];S.ge.nts=S.ge.nts||[];S.cd=S.cd||[];S.ag=S.ag||[];S.sc=S.sc||{on:1,pat:"MMMMNNFFFF",ref:"2026-11-23",pos:7};
 S.ag.forEach(e=>{e.dd=e.dd||[];e.ex=e.ex||[];   // [v2.4] repetições: dias concluídos (dd) e dias pulados (ex)
  if(e.s===STAT[2]&&!isDate(e.dc)&&isDate(e.d)&&e.d<=today())e.dc=e.d});   // [v2.4] concluída antes de existir a data de conclusão: vale o dia dela
 // família: grp e tasks [v1.3] · nts, ord e pa (subgrupo dentro de subgrupo) [v2.1]
 S.f.forEach(f=>{f.grp=f.grp||[];f.tasks=f.tasks||[];f.nts=f.nts||[];f.vw=f.vw||"";if(f.ord===undefined)f.ord="Coleoptera";
  f.grp.forEach(x=>{x.tasks=x.tasks||[];x.nts=x.nts||[];x.pa=x.pa||"";if(x.pa&&!f.grp.some(y=>y.id===x.pa))x.pa=""});
  f.grp.forEach(x=>{let y=x,k=0;while(y&&y.pa&&k++<12){y=f.grp.find(z=>z.id===y.pa);if(y===x){x.pa="";break}}});   // [v2.1] evita subgrupo dentro de si mesmo
 });
 // [v1.2] migração 3: "Levantar descrições" e "Redação do manuscrito" passam a valer para gênero e espécie
 if((S.v||0)<3){S.tpl.tk.forEach(k=>{if(k.lv==="g"&&(k.t==="Levantar descrições originais e literatura"||k.t==="Redação do manuscrito"))k.lv="gs"});S.v=3}
 // [v1.3] migração 4: acrescenta aos modelos as atividades de família/gerais
 if(S.v<4){defTpl().tk.filter(k=>k.lv==="f").forEach(k=>{if(!S.tpl.tk.some(y=>y.t===k.t))S.tpl.tk.push(k)});S.v=4}
 // [v2.3] migração 5: terminália em subitens, atividade de morfologia externa e espécies "sp." marcadas como sem nome
 if(S.v<5){const OLD="Terminália (esternitos VIII–X, tergitos VIII–XI)",TM=["Terminália ♂ › T8","Terminália ♂ › S8","Terminália ♂ › Cápsula genital (T9, S9 e T10)"],TF=["Terminália ♀ › T8","Terminália ♀ › S8"],P=S.tpl.parts,i=P.indexOf(OLD);
  if(i>=0){P.splice(i,1,...TM.filter(n=>!P.includes(n)));const j=P.findIndex(n=>n.includes("♀"));P.splice(j<0?P.length:j,0,...TF.filter(n=>!P.includes(n)))}
  if(!S.tpl.tk.some(k=>k.c===ME))S.tpl.tk.push(defTpl().tk.find(k=>k.c===ME));
  S.f.forEach(f=>(f.g||[]).forEach(g=>(g.spp||[]).forEach(s=>{if(SPUN.test((s.n||"").trim()))s.un=1;
   const L=s.parts||[],k=L.findIndex(x=>x.n===OLD);if(k<0||STEPS.some(x=>L[k][x[0]]))return;   // só troca a peça antiga se nada foi marcado nela
   const m=L.some(x=>x.n.includes("♂")),fe=L.some(x=>x.n.includes("♀"));if(!m&&!fe)return;
   L.splice(k,1,...(m?TM:[]).filter(n=>!L.some(x=>x.n===n)).map(n=>({n})));
   if(fe){const j=L.findIndex(x=>x.n.includes("♀")&&!x.n.startsWith("Terminália"));L.splice(j<0?L.length:j,0,...TF.filter(n=>!L.some(x=>x.n===n)).map(n=>({n})))}})));
  S.v=5}
 // gênero e espécies [v1.2] · situação e prioridade da espécie [v1.8] · nts [v2.1] · est, me [v2.3]
 // [v2.4] dist/dsp (distribuição do gênero), ty (material-tipo), dist, mol (molecular) e op (seções abertas) da espécie
 S.f.forEach(f=>f.g.forEach(g=>{g.tasks=g.tasks||[];g.spp=g.spp||[];g.nts=g.nts||[];g.est=g.est||"";g.dist=g.dist||"";if(g.dsp===undefined)g.dsp=1;g.spp.forEach(s=>{s.parts=s.parts||[];s.me=s.me||[];s.hab=s.hab||[];s.tasks=s.tasks||[];s.nts=s.nts||[];s.st=s.st||GST[0];s.p=s.p||PRIO[1];s.ty=s.ty||{pr:"",L:[],lt:"",nt:""};s.dist=s.dist||"";s.mol=s.mol||{a:0,e:0,v:"",ms:[]};s.op=s.op||{ta:1}})}));
}
// [v1.2] nível de quem tem a atividade (espécie, gênero) e categorias permitidas · [v1.3] nível família/geral
const lvOf=o=>o.parts?"s":o.spp?"g":"f";
const catsFor=o=>{const l=lvOf(o||own());return l==="f"?CATS:CATS.filter(c=>!(l==="s"?ONLY_G:ONLY_S).includes(c))};
// [v1.2] botões de 1 clique (modelos)
const chip=(a,i,t)=>`<button class="chip" data-a="${a}" data-i="${esc(i)}">+ ${esc(t==null?i:t)}</button>`;
function qadd(o){ // atividades do modelo que ainda não estão em o (1 clique)
 if(!S.cfg.sug)return"";   // [v2.4] sugestões desligadas nas Configurações
 const lv=lvOf(o),have=o.tasks.map(t=>t.t);
 const c=S.tpl.tk.filter(k=>k.lv.includes(lv)&&!have.includes(k.t));
 return c.length?`<div class="grp">Adicionar do modelo (1 clique)</div><div>${c.map(k=>chip("tq",S.tpl.tk.indexOf(k),k.t)).join("")}</div>`:"";
}
// [v1.0] atividades agrupadas por situação · [v1.2] + modelos de 1 clique
function tasksH(o){
 let h="";[1,0,2].forEach(k=>{const ts=o.tasks.filter(t=>t.s===STAT[k]);if(ts.length)h+=`<div class="grp">${STAT[k]} (${ts.length})</div>`+ts.map(taskH).join("")});
 return h+qadd(o)+`<div class="tools" style="margin-top:8px"><button class="sec" data-a="addTask">+ Atividade própria</button></div>`;
}
// [v2.1] diário de notas datadas (gênero, espécie, família, subgrupo e atividades gerais)
const ntForm=[{k:"d",l:"Data",t:"date"},{k:"tx",l:"Nota",t:"area"}];
function notesH(o,bare){   // [v2.4] bare = sem o título (quando já está dentro de uma seção)
 const L=(o.nts||[]).slice().sort((a,b)=>b.d.localeCompare(a.d));
 return(bare?`<div class="r" style="justify-content:flex-end"><button class="lnk" data-a="addNt">+ Nota</button></div>`:`<div class="r" style="justify-content:space-between"><div class="grp">Diário de notas (${L.length})</div><button class="lnk" data-a="addNt">+ Nota</button></div>`)
 +(L.map(n=>`<div class="nt" data-a="eNt" data-i="${n.id}"><small>${fmt(n.d)}</small><div>${esc(n.tx).replace(/\n/g,"<br>")}</div></div>`).join("")||'<div class="note" style="margin:0 2px 8px">Anotações com data: observações, decisões, dúvidas...</div>');
}
// [v1.2] espécie: material, dissecção completa/parcial, peças (D L I F), + Completa ♂/♀ e habitus
// [v1.5] prazo da preparação · [v1.6] passa a abrir como aba dentro do gênero · [v1.8] situação e prioridade · [v2.1] diário de notas
// [v2.3] tipo de estudo (dissecção ou só morfologia externa), peças em subitens e seção Morfologia externa
// [v2.3] tabela de peças (dissecção) ou de estruturas (morfologia externa), com grupos e subitens
// a = ação da caixinha, d = ação de remover, leg = legenda das colunas · [v2.4] caixinha de 3 estados (tcB)
function pTab(L,ST,a,d,leg){
 const cols=`grid-template-columns:1fr repeat(${ST.length},38px) 36px`;let last="";
 let h=`<div class="card"><div class="pg note" style="${cols}"><span></span>${ST.map(x=>`<span style="text-align:center">${x[1]}</span>`).join("")}<span></span></div>`;
 L.forEach((p,i)=>{const[g,sb]=pSplit(p.n);if(g&&g!==last)h+=`<div class="pg pgh">${esc(g)}</div>`;last=g;
  h+=`<div class="pg${g?" psub":""}" style="${cols}"><span>${esc(g?sb:p.n)}</span>${ST.map(x=>tcB(a,i,x[0],p[x[0]],x[2])).join("")}<button class="ic" data-a="${d}" data-i="${i}">✕</button></div>`});
 return h+`<div class="note" style="padding:6px 10px">${leg}</div></div>`;
}
// [v2.4] SEÇÃO RETRÁTIL da espécie: cabeçalho com resumo; aberta/fechada fica guardado na própria espécie (s.op)
function accH(s,k,title,sum,body){if(!S.cfg["s"+k])return"";const op=!!(s.op&&s.op[k]);
 return`<div class="acc${op?" open":""}"><button class="acc-h" data-a="sec" data-i="${s.id}|${k}"><b>${title}</b><small>${sum}</small><span>${op?"▾":"▸"}</span></button>${op?`<div class="acc-b">${body()}</div>`:""}</div>`}
const sumDN=(L,ST)=>{const[d,n]=cntDN(L,ST);return n?d+"/"+n+" feitas":L.length?"nada a fazer":"vazio"};
const naLeg=()=>S.cfg.na?" · 2º toque: não será realizada":"";
// [v2.4] espécie: Material-tipo › Distribuição › Habitus › Dissecção › Morfologia externa › Molecular › Atividades › Notas
function vSp(s){
 const isME=s.tp===ME,sug=S.cfg.sug,hp=s.parts.map(p=>p.n),hh=s.hab.map(x=>x.n),hm=s.me.map(x=>x.n),hk=s.mol.ms.map(m=>m.m);
 const fp=S.tpl.parts.filter(n=>!hp.includes(n)),fh=S.tpl.hab.filter(n=>!hh.includes(n)),fm=S.tpl.me.filter(n=>!hm.includes(n)),fk=S.tpl.mk.filter(n=>!hk.includes(n));
 let h=`<div>${spSt(s)}${s.ex?`<span class="chip">Material: ${esc(s.ex)}</span>`:""}<span class="chip blue">${esc(tpChip(s.tp))}</span>${s.d?`<span class="chip ${s.d<today()?"red":"blue"}">📅 ${isME?"Prazo do estudo":"Prazo da preparação"}: ${fmt(s.d)}</span>`:""}</div>${s.nt?`<p class="note">${esc(s.nt)}</p>`:""}${prog(s)}<div class="tools" style="margin-top:10px"><button class="sec" data-a="editSp">Editar / excluir espécie</button></div>`;
 h+=accH(s,"ty","Material-tipo",tySum(s),()=>tyH(s));
 h+=accH(s,"di","Distribuição geográfica",esc(areas(s.dist).join("; "))||"não informada",()=>distH(s));
 h+=accH(s,"hb","Imagens de habitus",sumDN(s.hab,[["x"]]),()=>habH(s,fh,sug));
 if(!isME||s.parts.length)h+=accH(s,"dp","Dissecção e preparação das peças",sumDN(s.parts,STEPS),()=>dpH(s,fp,sug,isME));   // [v2.3] escondida na espécie só de morfologia externa
 if(isME||s.me.length)h+=accH(s,"me","Morfologia externa",sumDN(s.me,STEPS_ME),()=>meH(s,fm,sug,isME));
 h+=accH(s,"mo","Dados moleculares",molSum(s),()=>molH(s,fk,sug));
 h+=accH(s,"ta","Atividades da espécie",pl(s.tasks.filter(t=>t.s!==STAT[2]).length,"em aberto","em aberto"),()=>tasksH(s));
 h+=accH(s,"nt","Diário de notas",pl(s.nts.length,"nota","notas"),()=>notesH(s,1));
 return h;
}
// [v1.2] imagens de habitus · [v2.4] caixinha de 3 estados
function habH(s,fh,sug){return s.hab.map((x,i)=>`<div class="r hbr">${tcB("hb",i,"x",x.x,"Fotografada")}<span class="g1${isNA(x.x)?" mut":""}">${esc(x.n)}</span><button class="ic" data-a="dh" data-i="${i}">✕</button></div>`).join("")
 +(sug&&fh.length?`<div>${fh.map(n=>chip("ah",n)).join("")}</div>`:"")+`<input class="addsub" style="margin:6px 0;width:100%" data-hab="1" placeholder="+ outra posição de habitus (Enter)">`+(s.hab.length?`<div class="note" style="padding:4px 2px">Toque na caixinha quando fotografar${naLeg()}</div>`:"")}
// [v1.2] dissecção: peças (D L I F), + Completa ♂/♀ · [v2.3] subitens · [v2.4] dentro da seção retrátil
function dpH(s,fp,sug,isME){let h="";
 if(s.tp==="Parcial")h+=`<div class="note">Dissecção parcial: adicione só as peças que vai retirar.</div>`;
 if(s.parts.length)h+=pTab(s.parts,STEPS,"pt","dp","D dissecada · L lâmina montada · I ilustrada · F fotografada"+naLeg());
 if(!isME){h+=`<div class="tools" style="margin-top:8px;flex-wrap:wrap"><button class="sec" data-a="apall" data-i="M">+ Completa ♂</button><button class="sec" data-a="apall" data-i="F">+ Completa ♀</button></div>`;
  if(sug&&fp.length)h+=`<div>${fp.map(n=>chip("ap",n)).join("")}</div>`;
  h+=`<input class="addsub" style="margin:6px 0;width:100%" data-pa="1" placeholder="+ outra peça (Enter) · subitem: Grupo > peça">`}
 return h}
// [v2.3] morfologia externa (E I F) · [v2.4] dentro da seção retrátil
function meH(s,fm,sug,isME){let h="";
 if(isME&&!s.me.length)h+=`<div class="note">Estudo sem dissecção: adicione as estruturas externas que vai examinar, ilustrar e fotografar.</div>`;
 if(s.me.length)h+=pTab(s.me,STEPS_ME,"mt","dm","E examinada · I ilustrada · F fotografada"+naLeg());
 if(fm.length)h+=`<div class="tools" style="margin-top:8px"><button class="sec" data-a="amall">+ Todas as estruturas</button></div>`+(sug?`<div>${fm.map(n=>chip("am",n)).join("")}</div>`:"");
 return h+`<input class="addsub" style="margin:6px 0;width:100%" data-me="1" placeholder="+ outra estrutura (Enter)">`}
// [v2.4] MATERIAL-TIPO: nome de cada linha conforme o tipo primário (Holótipo/Parátipos, Lectótipo/Paralectótipos...)
const tyK=(s,r)=>r.r==="s"?(TYS[s.ty.pr]||"Outros exemplares da série"):(s.ty.pr||"Tipo");
function tySum(s){const t=s.ty;if(!t.pr)return t.lt?"localidade-tipo: "+esc(t.lt):"não informado";const P=t.L.filter(r=>r.r==="p"),Q=t.L.filter(r=>r.r==="s");
 return esc(t.pr+(P.some(r=>r.dep)?" ("+P.map(r=>r.dep).filter(Boolean).join(", ")+")":"")+(Q.length?" + "+tyK(s,Q[0]).toLowerCase():""))}
const tyDesc=r=>[r.n&&r.n!=="1"?r.n+" ex.":"",r.sx&&r.sx!==SEXO[0]?r.sx:"",r.dep].filter(Boolean).join(" · ");
function tyH(s){const t=s.ty,sec=TYS[t.pr],cols=`grid-template-columns:1fr repeat(${TYST.length},38px) 36px`;
 let h=`<label class="kl">Tipo primário<select data-c="typr" data-s="${s.id}"><option value=""${t.pr?"":" selected"}>Não informado / não localizado</option>${TYP.map(x=>`<option${x===t.pr?" selected":""}>${x}</option>`).join("")}</select></label>`;
 if(t.pr){
  h+=`<div class="card"><div class="pg note" style="${cols}"><span></span>${TYST.map(x=>`<span style="text-align:center">${x[1]}</span>`).join("")}<span></span></div>`
  +t.L.map((r,i)=>`<div class="pg" style="${cols}"><button class="tyl" data-a="tye" data-i="${i}"><b>${esc(tyK(s,r))}</b><small>${esc(tyDesc(r))||"toque para informar quantidade, sexo e depositário"}</small></button>${TYST.map(x=>tcB("tyc",i,x[0],r[x[0]],x[2])).join("")}<button class="ic" data-a="tyd" data-i="${i}">✕</button></div>`).join("")
  +`<div class="note" style="padding:6px 10px">Img imagem disponível · Ex examinado · F fotografado · D dissecado${naLeg()}</div></div>`;
  h+=`<div class="tools" style="flex-wrap:wrap">${t.pr==="Síntipos"?`<button class="sec" data-a="tya" data-i="p">+ Síntipos (outro depositário)</button>`:""}${sec?`<button class="sec" data-a="tya" data-i="s">+ ${sec}</button>`:""}</div>`;
  if(!sec)h+=`<p class="note">${t.pr==="Neótipo"?"O neótipo não tem tipos secundários.":"Síntipos são todos tipos primários. Se um lectótipo for designado, mude para Lectótipo: os demais passam a paralectótipos."}</p>`;
 }
 return h+`<div class="tyx" data-a="tyi"><div><small>Localidade-tipo</small><span>${esc(t.lt)||"—"}</span></div><div><small>Observações</small><span>${esc(t.nt)||"—"}</span></div><b>✎</b></div>`}
// [v2.4] muda o tipo primário: garante a linha do primário e ajusta as outras (sem apagar nada)
function setPr(s,v){const t=s.ty;t.pr=v;if(v){
 if(!t.L.some(r=>r.r==="p"))t.L.unshift({id:uid(),r:"p",n:v==="Síntipos"?"":"1",sx:SEXO[0],dep:""});
 if(v==="Síntipos")t.L.forEach(r=>r.r="p");                       // síntipos: todos são primários
 else t.L.filter(r=>r.r==="p").slice(1).forEach(r=>r.r="s")}      // só um holótipo, lectótipo ou neótipo
 save();render()}
function tyForm(s,r,nv){   // nv = linha nova: só entra na lista ao salvar
 form(tyK(s,r),[{k:"n",l:"Quantidade de exemplares"},{k:"sx",l:"Sexo",t:"sel",o:SEXO},{k:"dep",l:"Depositário (sigla da coleção, ex.: MZSP, NHMUK, MNHN)"},{k:"nt",l:"Observação (ex.: designado por..., etiquetas, condição)",t:"area"}],{n:r.n,sx:r.sx||SEXO[0],dep:r.dep,nt:r.nt},v=>{Object.assign(r,{n:v.n,sx:v.sx,dep:v.dep,nt:v.nt});if(nv)s.ty.L.push(r);done()},nv?null:()=>rm("Linha do material-tipo removida",()=>{s.ty.L=s.ty.L.filter(y=>y!==r)}))}
// [v2.4] DISTRIBUIÇÃO GEOGRÁFICA da espécie; a do gênero junta a manual e (se marcado) a das espécies
const gDist=g=>uniqA(areas(g.dist).concat(g.dsp?[].concat(...g.spp.map(s=>areas(s.dist))):[]));
const distChips=L=>L.map(a=>`<span class="chip dist">${esc(a)}</span>`).join("");
function distH(s){const L=areas(s.dist);return(L.length?`<div>${distChips(L)}</div>`:`<p class="note">Ainda não informada.</p>`)+`<div class="tools"><button class="sec" data-a="edi">${L.length?"Editar distribuição":"+ Informar distribuição"}</button></div>`}
// [v2.4] DADOS MOLECULARES: amostra/extração, voucher e marcadores (os baixados do GenBank só têm alinhamento)
function molSum(s){const m=s.mol;if(!m.ms.length)return isD(m.e)?"DNA extraído":isD(m.a)?"amostra separada":"nenhum marcador";
 return esc(m.ms.map(x=>x.m+(isD(x.l)?" ✓":"")).join(", "))}
function molH(s,fk,sug){const m=s.mol,cols=`grid-template-columns:1fr repeat(3,38px) 36px`;
 let h=`<div class="card molc">${MOLA.map(([k,l])=>`<div class="r molr">${tcB("moa",0,k,m[k],l)}<span class="g1">${l}</span><small>${isDate(m[k])?fmt(m[k]):""}</small></div>`).join("")}<div class="r molr" data-a="mov"><span class="g1"><small>Voucher / código do extrato</small><br>${esc(m.v)||"—"}</span><b class="note">✎</b></div></div>`;
 if(m.ms.length)h+=`<div class="card"><div class="pg note" style="${cols}"><span>Marcador</span>${MOLST.map(x=>`<span style="text-align:center">${x[1]}</span>`).join("")}<span></span></div>`
  +m.ms.map((x,i)=>`<div class="pg" style="${cols}"><button class="tyl" data-a="mke" data-i="${i}"><b>${esc(x.m)}</b><small>${x.g?"GenBank"+(x.acc?" "+esc(x.acc):""):x.acc?"depositado: "+esc(x.acc):"laboratório"}</small></button>${x.g?'<span class="tc gb">GB</span><span class="tc gb">GB</span>':MOLST.slice(0,2).map(y=>tcB("mkc",i,y[0],x[y[0]],y[2])).join("")}${tcB("mkc",i,"l",x.l,"Alinhamento")}<button class="ic" data-a="mkd" data-i="${i}">✕</button></div>`).join("")
  +`<div class="note" style="padding:6px 10px">P amplificação (PCR; em genoma: biblioteca) · S sequenciamento · L alinhamento · GB baixado do GenBank${naLeg()}</div></div>`;
 if(sug&&fk.length)h+=`<div>${fk.map(n=>chip("mka",n)).join("")}</div>`;
 return h+`<div class="tools"><button class="sec" data-a="mkf">+ Marcador (outro ou do GenBank)</button></div>`}
const mkForm=()=>[{k:"m",l:"Marcador",t:"sel",o:S.tpl.mk.concat([OUTRO])},{k:"mo",l:"Outro marcador (se escolheu “Outro”)"},{k:"src",l:"Origem",t:"sel",o:[LAB,GBK]},{k:"acc",l:"Nº de acesso no GenBank (opcional)"}];
// ----- atividades gerais / de categorias superiores e contagens regressivas -----
// [v1.3] atividades gerais (*), da família ou de um subgrupo; seções separadas por vírgula
const supOwn=()=>{if(V.u==="*")return S.ge;const[f,r]=V.u.split("|"),F=fam(f);return F&&(r?grById(F,r):F)};
const sp=s=>s?s.split(",").map(x=>x.trim()).filter(Boolean):[];
// [v1.5] a preparação da espécie ainda tem peça ou habitus pendente?
const prepPend=s=>!(s.parts.length+s.hab.length+(s.me||[]).length)||s.parts.some(p=>STEPS.some(x=>!p[x[0]]))||(s.me||[]).some(p=>STEPS_ME.some(x=>!p[x[0]]))||s.hab.some(h=>!h.x);   // [v2.3] inclui morfologia externa
// [v2.3] nome do prazo da espécie conforme o tipo de estudo
const prepName=s=>s.tp===ME?"Estudo da morfologia externa":"Dissecção e preparação das peças";
// [v2.4] SUBGRUPO EM TELA PRÓPRIA (como o gênero): caminho, gêneros, subgrupos de dentro, atividades e notas
const crumb=(f,x)=>{const p=[];let y=x.pa?grById(f,x.pa):null,k=0;while(y&&k++<9){p.unshift(esc(grl(y)));y=y.pa?grById(f,y.pa):null}return[esc(f.n)].concat(p).join(" › ")};
const grStat=(f,x)=>{const ids=grDesc(f,x),G=f.g.filter(g=>ids.includes(g.gr));return{ng:G.length,ns:G.reduce((n,g)=>n+g.spp.length,0),nk:grKids(f,x.id).length}};
const grCard=(f,x)=>{const c=grStat(f,x);return`<div class="grpc" data-a="ou" data-i="${f.id}|${x.id}"><span class="chip blue">${esc(x.r)}</span><b>${esc(x.n)}</b><span class="oc">›</span><small>${c.nk?pl(c.nk,"subgrupo","subgrupos")+" · ":""}${pl(c.ng,"gênero","gêneros")} · ${pl(c.ns,"espécie","espécies")}</small></div>`};
const navMode=f=>(f.vw||S.cfg.grpv)==="nav";   // a família mostra os subgrupos como cartões (que abrem em nova tela)?
function vGrp(f,x){const c=grStat(f,x),gs=f.g.filter(g=>g.gr===x.id),kids=grKids(f,x.id),nav=navMode(f);
 let h=`<p class="crumb">${crumb(f,x)}</p><h2>${esc(x.r)} ${esc(x.n)}</h2><div><span class="chip">${pl(c.ng,"gênero","gêneros")}</span><span class="chip">${pl(c.ns,"espécie","espécies")}</span></div>${x.nt?`<p class="note">${esc(x.nt)}</p>`:""}`;
 h+=`<div class="tools" style="flex-wrap:wrap"><button class="sec" data-a="addGen" data-i="${f.id}|${x.id}">+ Gênero</button><button class="sec" data-a="addGrp" data-i="${f.id}|${x.id}">+ Subgrupo</button><button class="sec" data-a="editGrp" data-i="${f.id}|${x.id}">Editar</button></div>`;
 if(kids.length)h+=`<div class="grp">Subgrupos (${kids.length})</div><div class="fam">`+(nav?kids.map(y=>grCard(f,y)).join(""):kids.map(y=>secH(f,y,f.g,"",0)).join(""))+`</div>`;
 h+=`<div class="grp">Gêneros (${gs.length})</div>`+(gs.length?`<div class="fam">${gs.map(g=>genRow(f,g)).join("")}</div>`:'<div class="note" style="margin:0 2px 8px">Nenhum gênero direto aqui. Toque em + Gênero.</div>');
 return h+`<div class="grp">Atividades (${x.tasks.filter(t=>t.s!==STAT[2]).length} em aberto)</div>`+tasksH(x)+notesH(x);
}
// [v1.3] tela de atividades gerais / da família / do subgrupo · [v2.1] diário de notas
function vSup(){
 const o=supOwn();if(!o){V.u=null;return vGroups()}
 if(o.r)return vGrp(fam(V.u.split("|")[0]),o);   // [v2.4] subgrupo: tela própria, como a do gênero
 return`<h2>${V.u==="*"?"Atividades gerais":esc(o.r?grl(o):o.n)}</h2><p class="note">${V.u==="*"?"Atividades sem família: coletas, triagem de várias famílias, montagem de material...":esc(o.nt||"")}</p>${prog(o)}`+tasksH(o)+notesH(o);
}
// [v1.4] contagem regressiva: formatos, cálculo de anos/meses/dias e horas perto da data
const FM={ymd:"Anos, meses e dias",md:"Meses e dias",d:"Só dias"};
const cdT=c=>new Date(c.d+"T"+(c.h||"23:59")+":00");
const pl=(n,a,b)=>n+" "+(n===1?a:b);
function cdText(c){
 const now=new Date(),t=cdT(c);if(isNaN(t))return"—";
 const ms=t-now,past=ms<0,a=past?t:now,b=past?now:t,days=Math.floor(Math.abs(ms)/864e5);
 let y=b.getFullYear()-a.getFullYear(),m=b.getMonth()-a.getMonth(),d=b.getDate()-a.getDate(),h=b.getHours()-a.getHours(),n=b.getMinutes()-a.getMinutes();
 if(n<0){n+=60;h--}if(h<0){h+=24;d--}if(d<0){d+=new Date(b.getFullYear(),b.getMonth(),0).getDate();m--}if(m<0){m+=12;y--}
 const U=[],sh=c.hz>0&&days<c.hz;
 if(c.fm==="ymd"&&y)U.push(pl(y,"ano","anos"));
 if(c.fm!=="d"){const mm=c.fm==="ymd"?m:y*12+m;if(mm)U.push(pl(mm,"mês","meses"))}
 const dd=c.fm==="d"?days:d;
 if(dd||!(U.length||sh))U.push(dd?pl(dd,"dia","dias"):"menos de 1 dia");
 if(sh){if(h)U.push(h+" h");if(!days&&(n||!U.length))U.push(n+" min")}
 const s=U.length>1?U.slice(0,-1).join(", ")+" e "+U[U.length-1]:U[0]||"agora";
 return past?"há "+s:s;
}
const cdSt=c=>{const ms=cdT(c)-new Date();return ms<0?"late":ms<7*864e5?"soon":""};
function tick(){document.querySelectorAll("[data-cd]").forEach(e=>{const c=S.cd.find(x=>x.id===e.dataset.cd);if(c){e.textContent=cdText(c);e.className="cdn "+cdSt(c)}})}
// [v1.4] lista de contagens · [v2.1] folgas até a data
function vCd(){
 return S.cd.slice().sort((a,b)=>cdT(a)-cdT(b)).map(c=>{const fg=folgas(c.d);return`<div class="card cd" data-a="ecd" data-i="${c.id}"><div class="r"><b class="g1">${esc(c.n)}</b><span class="note">✎</span></div><div class="cdn ${cdSt(c)}" data-cd="${c.id}">${cdText(c)}</div><small>${fmt(c.d)}${c.h?" às "+esc(c.h):""} · ${FM[c.fm]}${fg!=null?" · "+pl(fg,"folga","folgas")+" até lá":""}</small>${c.nt?`<div class="note">${esc(c.nt)}</div>`:""}</div>`}).join("")||'<div class="empty">Nenhuma contagem ainda. Toque no + para criar (qualificação, submissão de artigo, defesa...).</div>';
}
const cdForm=[{k:"n",l:"Nome da atividade"},{k:"d",l:"Data",t:"date"},{k:"h",l:"Hora (opcional)",t:"time"},{k:"fm",l:"Formato da contagem",t:"sel",o:Object.values(FM)},{k:"hz",l:"Mostrar horas quando faltar menos de (dias; 0 = nunca)",t:"number"},{k:"nt",l:"Notas",t:"area"}];
const cdSave=(c,v)=>Object.assign(c,{n:v.n,d:v.d,h:v.h,fm:Object.keys(FM).find(k=>FM[k]===v.fm)||"ymd",hz:Math.max(0,+v.hz||0),nt:v.nt});

// ----- agenda (calendário) -----
// [v1.8] Agenda: cores, formulário com "Incluir no Painel?" · [v2.1] data de conclusão (dc)
// [v2.4] data opcional (tarefa sem data), repetição (rp), dias concluídos (dd) e pulados (ex), ‼ e antecedência
const CL={blue:"Azul",green:"Verde",red:"Vermelho",orange:"Laranja",yellow:"Amarelo",purple:"Roxo",gray:"Cinza"};
let AGL=[];   // itens do dia selecionado (para tocar e editar)
const agForm=[{k:"t",l:"Atividade"},{k:"d",l:"Data (deixe em branco para uma tarefa sem data)",t:"date"},{k:"h",l:"Hora (opcional)",t:"time"},{k:"rp",l:"Repetir",t:"sel",o:RPT.map(x=>x[1])},{k:"rn",l:"Repetir a cada (1 = toda vez; 2 = a cada 2 dias, semanas, meses...)",t:"number"},{k:"ru",l:"Repetir até (opcional)",t:"date"},{k:"s",l:"Situação",t:"sel",o:STAT},{k:"p",l:"Prioridade",t:"sel",o:["Sem prioridade",...PRIO]},{k:"xi",l:"‼ Extremamente importante",t:"chk"},{k:"av",l:"Mostrar no Painel com antecedência de (dias)",t:"number"},{k:"col",l:"Cor no calendário",t:"sel",o:Object.values(CL)},{k:"pn",l:"Incluir no Painel?",t:"sel",o:["Sim","Não"]},{k:"nt",l:"Notas",t:"area"}];
function agSave(e,v){Object.assign(e,{t:v.t,d:v.d,h:v.h,s:v.s,p:PRIO.includes(v.p)?v.p:"",col:Object.keys(CL).find(k=>CL[k]===v.col)||"blue",pn:v.pn==="Sim"?1:0,nt:v.nt,xi:v.xi?1:0,av:Math.max(0,+v.av||0)||S.cfg.xi,dc:v.s===STAT[2]?(e.dc||(isDate(v.d)&&v.d<=today()?v.d:today())):""});
 const f=(RPT.find(x=>x[1]===v.rp)||RPT[0])[0];e.rp=f&&e.d?{f,n:Math.max(1,+v.rn||1),u:v.ru||""}:null;e.dd=e.dd||[];e.ex=e.ex||[];return e}
const agVals=e=>{const r=e.rp||{};return{t:e.t,d:e.d,h:e.h,rp:(RPT.find(x=>x[0]===(r.f||""))||RPT[0])[1],rn:String(r.n||1),ru:r.u||"",s:e.s,p:e.p||"Sem prioridade",xi:e.xi?"1":"",av:String(e.av||S.cfg.xi),col:CL[e.col]||CL.blue,pn:e.pn?"Sim":"Não",nt:e.nt}};
// [v2.4] REPETIÇÃO: datas em que a atividade acontece entre lo e hi (sem os dias pulados)
function occ(e,lo,hi){const r=e.rp,out=[],ex=new Set(e.ex||[]),n=Math.max(1,+r.n||1),s=e.d,end=r.u&&r.u<hi?r.u:hi;if(!s||s>end)return out;
 const y0=+s.slice(0,4),m0=+s.slice(5,7)-1,d0=+s.slice(8,10);
 for(let i=0;i<6000;i++){let ds;
  if(r.f==="d")ds=addD(s,i*n);else if(r.f==="w")ds=addD(s,i*n*7);
  else{const mm=r.f==="m"?m0+i*n:m0,yy=(r.f==="y"?y0+i*n:y0)+Math.floor(mm/12),M=((mm%12)+12)%12;if(d0>new Date(yy,M+1,0).getDate())continue;ds=yy+"-"+p2(M+1)+"-"+p2(d0)}   // dia 31 em mês de 30: pula
  if(ds>end)break;if(ds>=lo&&!ex.has(ds))out.push(ds)}
 return out}
const rptL=r=>{const n=+r.n||1;return(n===1?{d:"todo dia",w:"toda semana",m:"todo mês",y:"todo ano"}[r.f]:"a cada "+n+" "+{d:"dias",w:"semanas",m:"meses",y:"anos"}[r.f])+(r.u?" até "+fmt(r.u):"")};
const nextOcc=e=>occ(e,today(),addD(today(),800)).find(d=>!e.dd.includes(d))||"";   // próxima data ainda não concluída
// [v2.4] REGISTRO DO DIA: etapas concluídas (peças, estruturas, habitus, molecular, tipos) aparecem como ✓ no calendário
function regItems(){const R={};
 S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{const ad=(v,w)=>{if(!isDate(v))return;const k=v+"|"+s.id;(R[k]=R[k]||{d:v,f,g,s,c:{}}).c[w]=(R[k].c[w]||0)+1};
  s.parts.forEach(p=>STEPS.forEach(x=>ad(p[x[0]],"peças")));s.hab.forEach(h=>ad(h.x,"habitus"));s.me.forEach(p=>STEPS_ME.forEach(x=>ad(p[x[0]],"morfologia externa")));
  MOLA.forEach(x=>ad(s.mol[x[0]],"molecular"));s.mol.ms.forEach(m=>MOLST.forEach(x=>ad(m[x[0]],"molecular")));s.ty.L.forEach(r=>TYST.forEach(x=>ad(r[x[0]],"material-tipo")))})));
 return Object.values(R).map(r=>({d:r.d,t:"✓ "+abbr(r.g,r.s.n)+" — "+Object.keys(r.c).map(k=>k+" "+r.c[k]).join(" · "),col:"gray",k:"r",dn:1,sub:"Etapas concluídas · "+esc(r.g.n)+" · "+esc(r.f.n),x:{f:r.f,g:r.g,s:r.s}}))}
// [v1.8] editar atividade tocada na Agenda (antes ficava só dentro de "et") · [v2.1] data de conclusão e Desfazer
function editTask(g,t){form("Editar atividade",tForm(t.c,0,g),{t:t.t,c:t.c,s:t.s,d:t.d,dc:t.dc,nt:t.nt,p:t.p||"Sem prioridade",xi:t.xi?"1":"",av:String(t.av||S.cfg.xi)},v=>{if(!v.t)return;Object.assign(t,{t:v.t,c:v.c,s:v.s,d:v.d,nt:v.nt,p:PRIO.includes(v.p)?v.p:"",xi:v.xi?1:0,av:Math.max(0,+v.av||0)||S.cfg.xi,dc:v.s===STAT[2]?(v.dc||t.dc||today()):""});done()},()=>rm("Atividade excluída",()=>{g.tasks=g.tasks.filter(x=>x!==t)}))}
// [v1.8] tudo que tem data vai para a Agenda · [v2.2] eventos trazidos do Google Agenda
// [v2.4] repetições (lo..hi = período em que as datas são calculadas), tarefa sem data concluída aparece no dia em que
//        foi feita, ‼ dos extremamente importantes e registro das etapas concluídas
function agItems(lo,hi){ // tudo que tem data: atividades do app, prazos de preparação, contagens e atividades da agenda
 const L=[],td=today();lo=lo||addD(td,-400);hi=hi||addD(td,550);
 allT().forEach(x=>{const dn=x.t.s===STAT[2],d=dn&&x.t.dc?x.t.dc:x.t.d;if(d)L.push({d,t:x.t.t,col:dn?"gray":(x.t.p?pc(x.t.p):"blue"),k:"t",sub:where(x)+(dn&&x.t.d&&x.t.d!==d?" · prazo era "+fmt(x.t.d):""),dn,x,xi:x.t.xi,av:x.t.av})});   // [v2.3] concluída aparece (com ✓) no dia em que foi feita
 S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{if(s.d){const dn=!prepPend(s);L.push({d:s.d,t:(s.tp===ME?"Morfologia externa":"Dissecção e preparação")+" — "+abbr(g,s.n),col:dn?"gray":"orange",k:"p",sub:esc(g.n)+" · "+esc(f.n),dn,x:{f,g,s}})}})));
 S.cd.forEach(c=>L.push({d:c.d,h:c.h,t:"⏳ "+c.n,col:"purple",k:"c",sub:"Contagem regressiva",x:c}));
 S.ag.forEach(e=>{const sub=(e.gk?"Google Agenda"+(e.gc?" · "+esc(e.gc):""):"Agenda")+(e.p?" · prioridade "+e.p.toLowerCase():"")+(e.pn?" · no Painel":""),b={h:e.h,t:e.t,k:"a",x:e,xi:e.xi,av:e.av};
  if(e.rp&&e.rp.f&&e.d)occ(e,lo,hi).forEach(oc=>{const dn=e.dd.includes(oc);L.push(Object.assign({},b,{d:oc,oc,col:dn?"gray":e.col,sub:sub+" · repete "+rptL(e.rp),dn}))});   // [v2.4] cada dia da repetição
  else{const dn=e.s===STAT[2],d=e.d||(dn?e.dc:"");if(d)L.push(Object.assign({},b,{d,col:dn?"gray":e.col,sub:sub+(e.d?"":" · tarefa sem data"),dn}))}});
 if(S.cfg.reg)L.push(...regItems());   // [v2.4]
 return L;
}
// abre o item tocado na Agenda ou no cartão "Hoje"
// [v2.1] (a Agenda abria os itens desde a v1.8; aqui virou uma função só, usada também pelo cartão Hoje) · [v2.4] repetição e registro
function openIt(i){if(!i)return;if(i.k==="t")editTask(i.x.o||i.x.s||i.x.g,i.x.t);else if(i.k==="p"||i.k==="r")A.og({dataset:{i:i.x.f.id+"|"+i.x.g.id+"|"+i.x.s.id}});else if(i.k==="c")A.ecd({dataset:{i:i.x.id}});else eagO(i.x,i.oc||"")}
// [v2.4] editar atividade da agenda; numa repetição dá para pular só aquele dia
function eagO(e,oc){const rp=e.rp&&e.rp.f;form("Editar atividade da agenda",agForm,agVals(e),v=>{if(!v.t)return toast("Informe a atividade");agSave(e,v);if(v.d)V.cal.d=v.d;done()},()=>rm(rp?"Atividade e repetições excluídas":"Atividade excluída",()=>{S.ag=S.ag.filter(x=>x!==e)}),rp?"Excluir todas":"",oc&&rp?[{l:"Pular só "+fmt(oc),f:()=>rm("Dia pulado",()=>{e.ex.push(oc)})}]:null)}
// ----- escala de trabalho e feriados -----
// [v1.9] escala do museu: ciclo de letras M/N/F a partir de uma data de referência
const p2=n=>String(n).padStart(2,"0");
const D8=s=>Date.UTC(+s.slice(0,4),+s.slice(5,7)-1,+s.slice(8,10))/864e5;
const ESN={M:"manhã",N:"noite",F:"folga"},ESC={M:"yellow",N:"purple",F:"green"};
const escForm=[{k:"pat",l:"Padrão do ciclo, uma letra por dia (M manhã, N noite, F folga)"},{k:"ref",l:"Data de referência",t:"date"},{k:"pos",l:"Em que dia do ciclo cai a data de referência (1 = primeiro dia do padrão)",t:"number"},{k:"on",l:"Mostrar a escala no calendário?",t:"sel",o:["Sim","Não"]}];
function escL(ds){const e=S.sc;if(!e||!e.on||!e.pat)return"";const n=e.pat.length;return e.pat[(((D8(ds)-D8(e.ref)+e.pos-1)%n)+n)%n]}
// [v2.1] quantos dias de folga (F) da escala existem de hoje até a data ds (incluindo as duas)
function folgas(ds){const e=S.sc,td=today();if(!e||!e.on||!e.pat||!ds||ds<td)return null;const L=e.pat.length,n=D8(ds)-D8(td)+1,i0=((D8(td)-D8(e.ref)+e.pos-1)%L+L)%L;let c=0;for(let i=0;i<L&&i<n;i++)if(e.pat[(i0+i)%L]==="F")c+=Math.floor((n-1-i)/L)+1;return c}
// [v2.1] distância até a data: "hoje", "amanhã", "em 5 dias", "atrasado 2 dias"
const rel=ds=>{const n=D8(ds)-D8(today());return n===0?"hoje":n===1?"amanhã":n>1?"em "+n+" dias":"atrasado "+pl(-n,"dia","dias")};
// feriados fixos (para incluir outro, acrescente ["MM-DD","Nome"] nesta lista)
// [v1.9] feriados nacionais + 25/01, 09/07 e 20/11; móveis calculados pela Páscoa (Carnaval, Sexta-feira Santa, Corpus Christi)
const FIX=[["01-01","Confraternização Universal"],["01-25","Aniversário de São Paulo"],["04-21","Tiradentes"],["05-01","Dia do Trabalho"],["07-09","Revolução Constitucionalista"],["09-07","Independência do Brasil"],["10-12","Nossa Senhora Aparecida"],["11-02","Finados"],["11-15","Proclamação da República"],["11-20","Consciência Negra"],["12-25","Natal"]];
function easter(y){const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),da=((h+l-7*m+114)%31)+1;return new Date(y,mo-1,da)}
const FC={};
function feriados(y){
 if(FC[y])return FC[y];
 const H={},E=easter(y),k=n=>{const x=new Date(E);x.setDate(x.getDate()+n);return x.getFullYear()+"-"+p2(x.getMonth()+1)+"-"+p2(x.getDate())};
 FIX.forEach(([md,n])=>{H[y+"-"+md]={n}});
 H[k(-2)]={n:"Sexta-feira Santa"};H[k(-48)]={n:"Carnaval",pf:1};H[k(-47)]={n:"Carnaval",pf:1};H[k(60)]={n:"Corpus Christi",pf:1};
 return FC[y]=H;
}
const hn=h=>h.n+(h.pf?" (ponto facultativo)":"");
// [v1.8] calendário do mês e itens do dia · [v1.9] escala no canto, feriados e domingos · [v1.10] legenda retrátil (sem lista de feriados do mês)
// [v2.2] botão "+ Google" em cada item e atalho para a tela Google Agenda
// [v2.3] círculo para marcar como concluída (✓) e ✓ nos dias com algo concluído
// [v2.4] repetições (↻), ‼, registro das etapas do dia e lista "Sem data"
function vAg(){
 const c=V.cal,M={},td=today(),H=S.cfg.fer?feriados(c.y):{},m0=c.y+"-"+p2(c.m+1)+"-01",m1=c.y+"-"+p2(c.m+1)+"-"+p2(new Date(c.y,c.m+1,0).getDate());
 agItems(addD(m0<c.d?m0:c.d,-1),addD(m1>c.d?m1:c.d,1)).forEach(i=>(M[i.d]=M[i.d]||[]).push(i));   // [v2.4] repetições só do mês mostrado
 const k0=new Date(c.y,c.m,1).getDay(),nd=new Date(c.y,c.m+1,0).getDate();
 let g="";for(let i=0;i<k0;i++)g+="<span></span>";
 for(let d=1;d<=nd;d++){const ds=c.y+"-"+p2(c.m+1)+"-"+p2(d),it=M[ds]||[],h=H[ds],l=escL(ds);
  g+=`<button class="cl${h?" hol":(k0+d-1)%7===0?" dom":""}${ds===td?" td":""}${ds===c.d?" sel":""}" data-a="agd" data-i="${ds}">${l?`<span class="sc ${l}">${esc(l)}</span>`:""}<b>${d}</b><span class="dots">${it.slice(0,4).map(i=>`<i class="dot ${i.dn?"ok":i.col}${i.xi&&!i.dn?" xi":""}"></i>`).join("")}${it.length>4?"+":""}</span></button>`}
 const day=(M[c.d]||[]).slice().sort((a,b)=>(a.k==="r")-(b.k==="r")||(a.h||"").localeCompare(b.h||""));AGL=day;
 const hd=S.cfg.fer?feriados(+c.d.slice(0,4))[c.d]:null,le=escL(c.d),nd2=S.ag.filter(e=>!e.d&&e.s!==STAT[2]);
 return`<div class="r" style="justify-content:space-between;margin-bottom:8px"><button class="sec" data-a="agm" data-i="-1">‹</button><b style="text-transform:capitalize">${new Date(c.y,c.m,1).toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}</b><button class="sec" data-a="agm" data-i="1">›</button></div><div class="cg">${["D","S","T","Q","Q","S","S"].map(x=>`<small>${x}</small>`).join("")}${g}</div>`
 +`<div class="r" style="justify-content:space-between"><div class="grp">${fmt(c.d)}${c.d===td?" · hoje":""}</div><button class="lnk" data-a="agt">Ir para hoje</button></div><div>${hd?`<span class="chip orange">🎉 ${esc(hn(hd))}</span>`:""}${le?`<span class="chip ${ESC[le]||"gray"}">Escala: ${esc(ESN[le]||le)}</span>`:""}</div>`
 +(day.map((i,n)=>`<div class="card gen${i.k==="r"?" reg":""}" style="border-top:0" data-a="agi" data-i="${n}"><div class="r">${i.k==="t"||i.k==="a"?`<button class="agck ${i.dn?"on":i.col}" data-a="agck" data-i="${n}" title="${i.dn?"Desmarcar":"Marcar como concluída"}">${i.dn?"✓":""}</button>`:`<i class="dot ${i.k==="r"?"ok":i.col}"></i>`}<b class="g1">${i.xi&&!i.dn?'<span class="xib">‼</span> ':""}${i.oc?'<span class="rpi-i" title="Repete">↻</span> ':""}${esc(i.t)}</b><small>${i.h?esc(i.h):""}</small>${i.dn||i.k==="r"||i.x.gk||gAuto()?"":`<button class="gbtn" data-a="gcal" data-i="${n}" title="Adicionar ao Google Agenda">+ Google</button>`}</div><small>${i.sub}</small></div>`).join("")||'<div class="empty">Nada neste dia. Toque no + para criar uma atividade.</div>')
 +`<div class="r" style="justify-content:space-between"><div class="grp">Sem data (${nd2.length})</div><button class="lnk" data-a="addNd">+ Tarefa sem data</button></div>`   // [v2.4] tarefas sem data
 +(nd2.map(e=>`<div class="card gen" style="border-top:0" data-a="eag" data-i="${e.id}"><div class="r"><button class="agck ${e.col}" data-a="ndck" data-i="${e.id}" title="Marcar como concluída"></button><b class="g1">${e.xi?'<span class="xib">‼</span> ':""}${esc(e.t)}</b></div>${e.nt?`<small>${esc(e.nt)}</small>`:""}</div>`).join("")||'<div class="note" style="margin:0 2px 10px">Coisas que precisam ser feitas, mas sem dia marcado. Ao concluir, ficam no calendário do dia em que foram feitas.</div>')
 +'<div class="tools" style="margin-top:12px;flex-wrap:wrap"><button class="sec" data-a="escf">⚙ Escala de trabalho</button><button class="sec" data-a="tab" data-i="k">Google Agenda</button></div><details class="lg"><summary>Legenda</summary><p class="note">Escala no canto de cada dia (M manhã · N noite · F folga). Domingos em azul; feriados com o número em vermelho. Cores dos prazos: vermelho = prioridade alta, amarelo = média, verde = baixa, azul = sem prioridade, ✓ = concluída (atividades concluídas aparecem no dia em que foram feitas; toque no círculo para marcar ou desmarcar); laranja = dissecção/preparação; roxo = contagem regressiva; ‼ = extremamente importante; ↻ = repete (cada dia pode ser marcado ou pulado). Itens cinza com ✓ mostram as etapas feitas naquele dia (peças, habitus, molecular...). Atividades criadas na agenda usam a cor escolhida. Com a conta Google conectada (menu ⋮ › Google), tudo isso vai sozinho para a agenda “Diário de Pesquisa (app)”; sem ela, o botão + Google abre o Google Agenda com o item já preenchido; eventos trazidos do Google aparecem como “Google Agenda”.</p></details>';
}

// [v1.2] tela Modelos: peças, posições de habitus e atividades padrão (incluir/excluir/restaurar)
function vTpl(){
 const sec=(k,t)=>`<div class="grp">${t}</div>`+S.tpl[k].map((n,i)=>`<div class="r" style="justify-content:space-between"><span>${esc(n)}</span><button class="ic" data-a="tdel" data-i="${k}|${i}">✕</button></div>`).join("")+`<input class="addsub" style="margin:6px 0;width:100%" data-tadd="${k}" placeholder="+ adicionar (Enter)">`;
 return `<p class="note">Modelos usados nos botões de 1 clique. Mudar aqui não altera o que já foi adicionado às espécies e gêneros. Para subitens, use › ou > (ex.: Terminália ♂ > T8).</p>`+sec("parts","Peças de dissecção (espécie)")+sec("me","Estruturas de morfologia externa (espécie)")+sec("hab","Posições de habitus (espécie)")+sec("mk","Marcadores moleculares (espécie)")+`<div class="grp">Atividades padrão</div>`+S.tpl.tk.map((k,i)=>`<div class="card gen" style="border-top:0" data-a="tke" data-i="${i}"><b>${esc(k.t)}</b><div><span class="chip">${esc(k.c)}</span><span class="chip blue">${LV[k.lv]}</span></div></div>`).join("")+`<div class="tools"><button class="sec" data-a="tka">+ Atividade padrão</button><button class="dng" data-a="treset">Restaurar padrão</button></div>`;
}
// [v1.2] campos da espécie (nome, material, dissecção, notas) · [v1.5] prazo · [v1.8] situação e prioridade · [v2.1] autor, ano e combinação
// [v2.3] caixinha "espécie sem nome" e "Tipo de estudo" (dissecção completa/parcial ou só morfologia externa)
const sForm=[{k:"n",l:"Nome da espécie (só o epíteto, ex.: punctatus; sem nome: sp. 1, sp. nov. A)"},{k:"un",l:"Espécie ainda sem nome (sp., sp. nov., morfoespécie): o nome não fica em itálico",t:"chk"},{k:"au",l:"Autor (opcional)"},{k:"an",l:"Ano (opcional)"},{k:"cb",l:"Combinação",t:"sel",o:CBO},{k:"ex",l:"Material disponível (ex.: 3 ♂, 2 ♀)"},{k:"tp",l:"Tipo de estudo",t:"sel",o:TPO.map(x=>x[1])},{k:"d",l:"Prazo da preparação ou do estudo",t:"date"},{k:"st",l:"Situação",t:"sel",o:GST},{k:"p",l:"Prioridade",t:"sel",o:PRIO},{k:"nt",l:"Notas",t:"area"}];
// [v1.2] campos da atividade padrão (modelo)
const kForm=[{k:"t",l:"Atividade"},{k:"c",l:"Categoria",t:"sel",o:CATS},{k:"lv",l:"Vale para",t:"sel",o:Object.values(LV)},{k:"b",l:"Subatividades (separadas por vírgula)"}];
const kSave=(k,v)=>{k.t=v.t;k.c=v.c;k.lv=Object.keys(LV).find(x=>LV[x]===v.lv);k.b=v.b?v.b.split(",").map(x=>x.trim()).filter(Boolean):[]};

// ----- família: ordem e ícone [v2.1] -----
const famForm=[{k:"n",l:"Nome da família"},{k:"ord",l:"Ordem",t:"sel",o:ORD.map(o=>o[0]).concat([OUTRA])},{k:"nt",l:"Notas",t:"area"}];
const ordIco=f=>{const o=ORD.find(x=>x[0]===f.ord),k=o?o[1]:"oth";return`<span class="ordic ${k}" title="${esc(f.ord||OUTRA)}">${ICO[k]}</span>`};

// ----- agrupamentos supragenéricos (subfamília > tribo > subtribo...) [v2.1: um dentro do outro] -----
// [v1.3] subfamília, tribo, subtribo e grupo de gêneros dentro da família · [v2.1] um dentro do outro (pa = "dentro de")
const RANKS=["Subfamília","Tribo","Subtribo","Grupo de gêneros"];
const NOPA="(direto na família)";
const grl=x=>x.r+" "+x.n;
const grById=(f,id)=>f.grp.find(x=>x.id===id);
const grKids=(f,pa)=>f.grp.filter(x=>(x.pa||"")===pa);                                   // subgrupos logo abaixo de pa ("" = direto na família)
function grDesc(f,x,k=0){return k>8?[x.id]:[x.id].concat(...grKids(f,x.id).map(y=>grDesc(f,y,k+1)))}   // x e tudo que está dentro dele
function grAll(f){const r=[],w=(pa,k)=>{if(k>8)return;grKids(f,pa).forEach(x=>{r.push(x);w(x.id,k+1)})};w("",0);return r}   // todos, na ordem de exibição
const grPath=(f,x)=>{const p=[];let y=x,k=0;while(y&&k++<9){p.unshift(grl(y));y=y.pa?grById(f,y.pa):null}return p.join(" › ")};
const grLab=(f,id)=>{const x=grById(f,id);return x?grPath(f,x):"(nenhum)"};
const grId=(f,l)=>{const x=f.grp.find(y=>grPath(f,y)===l);return x?x.id:""};
const grForm=(f,x)=>{const ex=x?grDesc(f,x):[];return[{k:"n",l:"Nome"},{k:"r",l:"Categoria",t:"sel",o:RANKS},{k:"pa",l:"Dentro de",t:"sel",o:[NOPA].concat(grAll(f).filter(y=>!ex.includes(y.id)).map(y=>grPath(f,y)))},{k:"nt",l:"Notas",t:"area"}]};
// [v1.0] linha do gênero na família · [v1.6] nº de espécies no app · [v1.7] nº à direita e bandeja separada · [v2.1] autor e ano
const genRow=(f,g)=>`<div class="gen" data-a="og" data-i="${f.id}|${g.id}"><div class="r"><b class="g1">${gl(g)}${authH(g)}</b><small>${pl(g.spp.length,"espécie","espécies")}</small></div><div><span class="chip ${gc(g.st)}">${esc(g.st)}</span><span class="chip ${pc(g.p)}">Prioridade ${esc(g.p.toLowerCase())}</span>${g.est===ME?`<span class="chip blue">${ME}</span>`:""}${g.sp?`<span class="chip">${esc(g.sp)} spp.</span>`:""}</div>${prog(g)}</div>`;
// [v2.1] texto de um item para a busca (nome, autor, notas, atividades, subitens e diário)
const txt=o=>[o.n,o.au,o.an,o.nt,o.dist,o.ty&&o.ty.lt].concat((o.tasks||[]).map(t=>[t.t,t.nt].concat(t.b.map(b=>b.t)).join(" ")),(o.nts||[]).map(n=>n.tx),((o.mol||{}).ms||[]).map(m=>m.m+" "+(m.acc||""))).join(" ");   // [v2.4] + distribuição, localidade-tipo, marcadores
// [v1.3] bloco do subgrupo com seus gêneros e botão Atividades · [v2.1] subgrupos de dentro · [v2.4] a faixa abre a tela do subgrupo (✎ edita)
function secH(f,x,gs,q,dep){ // um subgrupo, seus gêneros e os subgrupos de dentro
 const ids=grDesc(f,x),m=gs.filter(g=>g.gr===x.id),tot=f.g.filter(g=>ids.includes(g.gr)).length,inner=grKids(f,x.id).map(y=>secH(f,y,gs,q,dep+1)).join("");
 if(q&&!m.length&&!inner)return"";
 return`<div class="grpbox"><div class="sub" data-a="ou" data-i="${f.id}|${x.id}"><span class="chip blue">${esc(x.r)}</span><b>${esc(x.n)}</b><small>${pl(tot,"gênero","gêneros")}${x.tasks.length?" · "+pl(x.tasks.length,"atividade","atividades"):""}</small><button class="ic" data-a="editGrp" data-i="${f.id}|${x.id}" title="Editar">✎</button><span class="oc">›</span></div>${m.map(g=>genRow(f,g)).join("")}${inner}</div>`;
}
// [v1.0] lista de famílias e gêneros (com busca) · [v1.3] Atividades da família e + Subgrupo
// [v1.6] abrir uma família fecha as outras; nº de gêneros e de espécies · [v1.7] botões da família antes dos gêneros
// [v1.10] botões compactos numa linha · [v2.1] ícone da ordem e busca sem acentos (também em notas e atividades)
// [v2.4] exibição "lista completa" ou "por subgrupos" (botão Ver tudo / Ver por subgrupo)
function list(){
 const q=nz(V.q.trim());let h="";
 const ge=$("#gecard");if(ge)ge.hidden=!!q&&!nz("atividades gerais "+txt(S.ge)).includes(q);
 for(const f of S.f){
  const fq=!q||nz(txt(f)+" "+(f.ord||"")).includes(q);   // a família inteira combina com a busca?
  const gs=f.g.filter(g=>{if(fq)return true;const x=grById(f,g.gr);return nz(txt(g)+" "+g.spp.map(txt).join(" ")+(x?" "+grPath(f,x)+" "+txt(x):"")).includes(q)});
  if(q&&!fq&&!gs.length)continue;
  const open=q||f.o,nsp=f.g.reduce((n,g)=>n+g.spp.length,0);
  h+=`<section class="card fam"><div class="fh" data-a="tf" data-i="${f.id}">${ordIco(f)}<b>${esc(f.n)}</b><small>${f.ord?esc(f.ord)+" · ":""}${pl(f.g.length,"gênero","gêneros")} · ${pl(nsp,"espécie","espécies")}</small><span>${open?"▾":"▸"}</span></div>`;
  if(open){
   h+=`<div class="acts fb"><button class="sec" data-a="addGen" data-i="${f.id}">+ Gênero</button><button class="sec" data-a="ou" data-i="${f.id}">Atividades (${f.tasks.length})</button><button class="sec" data-a="editFam" data-i="${f.id}">Editar</button><button class="lnk" data-a="addGrp" data-i="${f.id}" title="Nova subfamília, tribo ou grupo de gêneros">+ Subgrupo</button>${f.grp.length?`<button class="lnk" data-a="fvw" data-i="${f.id}">${navMode(f)?"Ver tudo":"Ver por subgrupo"}</button>`:""}</div>${f.nt?`<div class="acts note">${esc(f.nt)}</div>`:""}`;
   h+=gs.filter(g=>!grById(f,g.gr)).map(g=>genRow(f,g)).join("");
   h+=navMode(f)&&!q?grKids(f,"").map(x=>grCard(f,x)).join(""):grKids(f,"").map(x=>secH(f,x,gs,q,0)).join("");   // [v2.4] por subgrupos: cartões
  }
  h+="</section>";
 }
 $("#list").innerHTML=h||(q?'<div class="empty">Nada encontrado.</div>':'<div class="empty">Nenhuma família ainda. Toque no + para criar.</div>');
}

// ----- [v2.1] ORGANIZAR: arrastar pela alça e ordem alfabética -----
const HD=`<span class="hd" data-a="nop" aria-label="Arrastar">${GRIP}</span>`;
function vOrg(){
 return`<p class="note">Arraste pela alça de pontinhos para mudar a posição. <b>A–Z</b> põe aquela lista em ordem alfabética. Toque no nome para ver o que tem dentro.</p><div class="r"><div class="grp">Famílias</div><button class="lnk" data-a="az" data-i="f">A–Z</button></div><div class="ol" data-k="f">`
 +S.f.map(f=>{const op=V.oF===f.id;return`<div class="oi" data-id="${f.id}"><div class="or" data-a="oF" data-i="${f.id}">${HD}${ordIco(f)}<b>${esc(f.n)}</b><small>${pl(f.g.length,"gênero","gêneros")}</small><span class="oc">${op?"▾":"▸"}</span></div>${op?orgF(f):""}</div>`}).join("")+`</div>`;
}
function orgF(f){ // gêneros da família, uma lista por agrupamento
 let h="";
 [null].concat(grAll(f)).forEach(x=>{const gs=f.g.filter(g=>x?g.gr===x.id:!grById(f,g.gr));if(!gs.length)return;
  h+=`<div class="osec"><div class="r"><small class="g1">${x?esc(grPath(f,x)):"Gêneros"}</small><button class="lnk" data-a="az" data-i="g|${f.id}|${x?x.id:""}">A–Z</button></div><div class="ol" data-k="g" data-p="${f.id}">`
  +gs.map(g=>{const op=V.oG===g.id;return`<div class="oi" data-id="${g.id}"><div class="or" data-a="oG" data-i="${g.id}">${HD}<b>${gnH(g)}</b><small>${g.spp.length} spp.</small><span class="oc">${op?"▾":"▸"}</span></div>${op?orgG(g):""}</div>`}).join("")+`</div></div>`});
 return`<div class="osub">${h||'<div class="note">Nenhum gênero.</div>'}</div>`;
}
function orgG(g){
 if(!g.spp.length)return'<div class="osub"><div class="note">Nenhuma espécie.</div></div>';
 return`<div class="osub"><div class="r"><small class="g1">Espécies</small><button class="lnk" data-a="az" data-i="s|${g.id}">A–Z</button></div><div class="ol" data-k="s" data-p="${g.id}">`+g.spp.map(s=>`<div class="oi" data-id="${s.id}"><div class="or">${HD}<b>${spH(g,s)}${authH(s)}</b></div></div>`).join("")+`</div></div>`;
}
// coloca os itens "ids" na nova ordem, ocupando as mesmas posições que eles tinham na lista arr
function reorderArr(arr,ids){const pos=[];arr.forEach((x,i)=>{if(ids.includes(x.id))pos.push(i)});const it=ids.map(id=>arr.find(x=>x.id===id));pos.forEach((p,j)=>arr[p]=it[j])}
const listArr=(k,p)=>k==="f"?S.f:k==="g"?(fam(p)||{}).g:k==="s"?(gById(p)||{}).spp:null;

// ----- [v2.1] RELATÓRIO do período: o que foi concluído (datas guardadas a partir desta versão) -----
// [v2.4] cada item guarda onde está a sua data (ref), para corrigir tocando nele; inclui material-tipo e molecular;
//        e a seção "Concluídas sem data" (feitas antes de o diário guardar datas)
let REPI=[];   // [v2.4] refs dos itens mostrados (o número do item é a posição aqui)
const rf=(o,k,lab)=>({lab,v:o[k],set:d=>{o[k]=d}});
const MOLR=[["a","a","Tecido (amostra)","tecido separado"],["e","e","Extração de DNA","DNA extraído"]];   // [4] = texto no relatório
function repData(a,b){
 const inR=v=>isDate(v)&&v>=a&&v<=b,G=[],C={t:0,b:0,p:0,h:0,n:0};
 const add=(key,lh,lt,d,th,tt,c,q,r)=>{let g=G.find(x=>x.key===key);if(!g)G.push(g={key,lh,lt,it:[]});g.it.push({d,th,tt,r:r||[]});C[c]+=q||1};
 const tk=(key,lh,lt,o)=>{
  o.tasks.forEach(t=>{if(inR(t.dc))add(key,lh,lt,t.dc,"Atividade concluída: <b>"+esc(t.t)+"</b>","Atividade concluída: "+t.t,"t",1,[rf(t,"dc","Atividade: "+t.t)]);
   t.b.forEach(x=>{if(inR(x.x))add(key,lh,lt,x.x,"Subitem concluído: "+esc(x.t)+' <span class="note">('+esc(t.t)+")</span>","Subitem concluído: "+x.t+" ("+t.t+")","b",1,[rf(x,"x","Subitem: "+x.t)])})});
  (o.nts||[]).forEach(n=>{if(inR(n.d))add(key,lh,lt,n.d,"Nota: "+esc(n.tx),"Nota: "+n.tx,"n",1,[rf(n,"d","Nota")])})};
 // etapas agrupadas por dia: "Peças: Antena (dissecada, lâmina montada); Labro (dissecada)"
 const st=(key,lh,lt,L,ST,nm,lab,c)=>{const P={};L.forEach(p=>ST.forEach(x=>{const v=p[x[0]];if(inR(v)){const z=P[v]=P[v]||{n:{},r:[]},w=x[3]||x[2].toLowerCase();(z.n[nm(p)]=z.n[nm(p)]||[]).push(w);z.r.push(rf(p,x[0],nm(p)+" — "+w))}}));
  Object.keys(P).forEach(d=>{const t=Object.keys(P[d].n).map(n=>n+" ("+P[d].n[n].join(", ")+")").join("; ");add(key,lh,lt,d,lab+": "+esc(t),lab+": "+t,c,P[d].r.length,P[d].r)})};
 tk("ge","Atividades gerais","Atividades gerais",S.ge);
 S.f.forEach(f=>{
  tk(f.id,esc(f.n),f.n,f);
  f.grp.forEach(x=>tk(x.id,esc(grl(x))+" · "+esc(f.n),grl(x)+" ("+f.n+")",x));
  f.g.forEach(g=>{
   tk(g.id,gl(g)+" · "+esc(f.n),"Gênero "+g.n+(auth(g)?" "+auth(g):"")+" ("+f.n+")",g);
   g.spp.forEach(s=>{const nm=fullSp(g,s),lh=spH(g,s,1)+" · "+esc(f.n),lt=nm+(auth(s)?" "+auth(s):"")+" ("+f.n+")",K=s.id;
    st(K,lh,lt,s.parts,STEPS,p=>p.n,"Peças","p");
    st(K,lh,lt,s.hab,[["x","x","fotografado"]],p=>p.n,"Habitus","h");
    st(K,lh,lt,s.me,STEPS_ME,p=>p.n,"Morfologia externa","p");   // [v2.3]
    st(K,lh,lt,s.ty.L,TYST,r=>tyK(s,r),"Material-tipo","p");      // [v2.4]
    st(K,lh,lt,[s.mol],MOLR,()=>"Amostra","Molecular","p");          // [v2.4]
    st(K,lh,lt,s.mol.ms,MOLST,m=>m.m,"Molecular","p");
    tk(K,lh,lt,s)})})});
 S.ag.forEach(e=>{if(inR(e.dc))add("ag","Agenda","Agenda",e.dc,"Concluída: <b>"+esc(e.t)+"</b>","Concluída: "+e.t,"t",1,[rf(e,"dc","Agenda: "+e.t)]);
  (e.dd||[]).forEach((d,j)=>{if(inR(d))add("ag","Agenda","Agenda",d,"Concluída (repetição): <b>"+esc(e.t)+"</b>","Concluída (repetição): "+e.t,"t",1,[{lab:"Agenda: "+e.t,v:d,set:nd=>{e.dd[j]=nd}}])})});   // [v2.4]
 G.forEach(g=>g.it.sort((x,y)=>x.d.localeCompare(y.d)));return{G,C};
}
// [v2.4] CONCLUÍDAS SEM DATA: atividades, subitens e etapas marcados como feitos sem data guardada
function undData(){const G=[],add=(lh,lab,r)=>{if(r.length)G.push({lh,lab,r})};
 const tkU=(lh,o)=>{const r=[];o.tasks.forEach(t=>{if(t.s===STAT[2]&&!isDate(t.dc))r.push(rf(t,"dc","Atividade: "+t.t));t.b.forEach(x=>{if(x.x&&!isDate(x.x))r.push(rf(x,"x","Subitem: "+x.t+" ("+t.t+")"))})});add(lh,"Atividades e subitens",r)};
 const stU=(lh,L,ST,nm,lab)=>{const r=[];L.forEach(p=>ST.forEach(x=>{const v=p[x[0]];if(isD(v)&&!isDate(v))r.push(rf(p,x[0],nm(p)+" — "+(x[3]||x[2].toLowerCase())))}));add(lh,lab,r)};
 tkU("Atividades gerais",S.ge);
 S.f.forEach(f=>{tkU(esc(f.n),f);f.grp.forEach(x=>tkU(esc(grl(x))+" · "+esc(f.n),x));
  f.g.forEach(g=>{tkU(gl(g)+" · "+esc(f.n),g);g.spp.forEach(s=>{const lh=spH(g,s,1)+" · "+esc(f.n);tkU(lh,s);
   stU(lh,s.parts,STEPS,p=>p.n,"Peças");stU(lh,s.hab,[["x","x","fotografado"]],p=>p.n,"Habitus");stU(lh,s.me,STEPS_ME,p=>p.n,"Morfologia externa");
   stU(lh,s.ty.L,TYST,r=>tyK(s,r),"Material-tipo");stU(lh,[s.mol],MOLR,()=>"Amostra","Molecular");stU(lh,s.mol.ms,MOLST,m=>m.m,"Molecular")})})});
 S.ag.forEach(e=>{if(e.s===STAT[2]&&!isDate(e.dc))add("Agenda","Atividade da agenda",[rf(e,"dc","Agenda: "+e.t)])});
 return G}
// [v2.4] janela para informar/corrigir datas de conclusão (uma ou várias de uma vez)
function datForm(R){const one=R.length===1,F=(one?[]:[{k:"all",l:"Usar a mesma data para todos (opcional)",t:"date"}]).concat(R.map((r,i)=>({k:"d"+i,l:r.lab,t:"date"}))),Vv={};R.forEach((r,i)=>Vv["d"+i]=isDate(r.v)?r.v:"");
 form(one?"Data de conclusão":"Datas de conclusão",F,Vv,v=>{let n=0;R.forEach((r,i)=>{const o=isDate(r.v)?r.v:"",d=v["d"+i]!==o?v["d"+i]:(v.all||"");if(isDate(d)&&d!==o){r.set(d);n++}});done();if(n)toast(pl(n,"data atualizada","datas atualizadas"))})}
function vRep(){
 const r=V.rp,{G,C}=repData(r.a,r.b),P=[["7","7 dias"],["m","Este mês"],["mp","Mês passado"],["x","Escolher"]];REPI=[];const ref=x=>(REPI.push(x),REPI.length-1);
 const ch=(n,a,b,c)=>n?`<span class="chip ${c}">${pl(n,a,b)}</span>`:"",U=undData();
 return`<div class="seg">${P.map(([i,l])=>`<button class="${r.k===i?"on":""}" data-a="rpk" data-i="${i}">${l}</button>`).join("")}</div>`
 +(r.k==="x"?`<div class="rpd"><label>De<input type="date" data-rp="a" value="${r.a}"></label><label>Até<input type="date" data-rp="b" value="${r.b}"></label></div>`:"")
 +`<h2 class="rph">${fmt(r.a)} a ${fmt(r.b)}</h2><div>${ch(C.t,"atividade concluída","atividades concluídas","green")}${ch(C.b,"subitem","subitens","")}${ch(C.p,"etapa de peça ou estrutura","etapas de peças e estruturas","blue")}${ch(C.h,"habitus","habitus","purple")}${ch(C.n,"nota","notas","yellow")}</div>`
 +(G.map(g=>`<div class="card rpg"><b>${g.lh}</b>${g.it.map(i=>`<div class="rpi" data-a="rpe" data-i="${ref(i.r)}"><small>${fmt(i.d).slice(0,5)}</small><span>${i.th}</span></div>`).join("")}</div>`).join("")||'<div class="empty">Nada registrado neste período.</div>')
 +(G.length?`<p class="note">Toque num item para corrigir a data.</p><div class="tools"><button class="pri" data-a="rpc">Copiar relatório</button>${navigator.share?'<button class="sec" data-a="rps">Compartilhar</button>':""}</div>`:"")
 +(U.length?`<div class="grp">Concluídas sem data (${U.reduce((n,u)=>n+u.r.length,0)})</div><p class="note">Coisas marcadas como feitas antes de o diário guardar datas. Toque para informar quando foram feitas: passam a contar no relatório do período e aparecem no calendário.</p>`
  +U.map(u=>`<div class="card rpg und" data-a="rpe" data-i="${ref(u.r)}"><b>${u.lh}</b><div class="rpi"><small>${u.r.length}</small><span>${esc(u.lab)}: ${esc(u.r.slice(0,4).map(x=>x.lab.replace(/^(Atividade|Subitem|Agenda): /,"")).join("; "))}${u.r.length>4?"…":""}</span></div></div>`).join(""):"");
}
function repText(){const r=V.rp,{G}=repData(r.a,r.b);return"Relatório de atividades — "+fmt(r.a)+" a "+fmt(r.b)+"\n"+G.map(g=>"\n"+g.lt+"\n"+g.it.map(i=>"  • "+fmt(i.d).slice(0,5)+" — "+i.tt).join("\n")).join("\n")}


// ----- [v2.2] GOOGLE AGENDA: trazer eventos (arquivo .ics ou .zip exportado do Google) e enviar itens -----
const MARCA="[Diário de Pesquisa]";   // marca nos eventos enviados pelo app (assim eles não voltam duplicados)
const plain=h=>{const d=document.createElement("div");d.innerHTML=String(h||"").replace(/<br\s*\/?>/gi,"\n");return d.textContent};
const icsUnesc=s=>s.replace(/\\n/gi,"\n").replace(/\\([,;\\])/g,"$1");
// lê o texto do .ics e devolve o nome da agenda e a lista de eventos (cada campo = {v: valor, p: parâmetros})
function icsParse(txt){
 const L=txt.replace(/\r\n?/g,"\n").replace(/\n[ \t]/g,"").split("\n"),evs=[];let ev=null,sub=0,cal="";
 for(const ln of L){
  if(ln==="BEGIN:VEVENT"){ev={};sub=0;continue}
  if(ln==="END:VEVENT"){if(ev)evs.push(ev);ev=null;continue}
  if(ev&&/^BEGIN:/.test(ln)){sub++;continue}          // ignora blocos internos (ex.: lembretes VALARM)
  if(ev&&/^END:/.test(ln)){sub--;continue}
  const m=ln.match(/^([A-Za-z0-9-]+)((?:;[^:;=]+=(?:"[^"]*"|[^:;]*))*):(.*)$/);if(!m)continue;
  const nm=m[1].toUpperCase(),pr={};m[2].split(";").slice(1).forEach(x=>{const k=x.indexOf("=");pr[x.slice(0,k).toUpperCase()]=x.slice(k+1).replace(/^"|"$/g,"")});
  if(!ev){if(nm==="X-WR-CALNAME")cal=icsUnesc(m[3]);continue}
  if(sub>0)continue;
  if(nm==="EXDATE"){(ev.EXDATE=ev.EXDATE||[]).push(...m[3].split(",").map(v=>({v,p:pr})));continue}
  if(!(nm in ev))ev[nm]={v:m[3],p:pr};
 }
 return{cal,evs};
}
// hora "de parede" num fuso (TZID) convertida para um Date
function tzDate(Y,Mo,D,H,Mi,Se,tz){const g=Date.UTC(Y,Mo-1,D,H,Mi,Se);try{const p={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(g)).forEach(x=>p[x.type]=x.value);return new Date(g-(Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second)-g))}catch(e){return new Date(Y,Mo-1,D,H,Mi,Se)}}
// data e hora de um campo (DTSTART etc.) no fuso deste celular: {d:"AAAA-MM-DD", h:"HH:MM" ou "", all: dia inteiro?}
function icsWhen(o){
 const m=o&&o.v.trim().match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/);if(!m)return null;
 const[,Y,Mo,D,H,Mi,Se,Z]=m;if(!H||o.p.VALUE==="DATE")return{d:Y+"-"+Mo+"-"+D,h:"",all:1};
 const dt=Z?new Date(Date.UTC(+Y,+Mo-1,+D,+H,+Mi,+(Se||0))):o.p.TZID?tzDate(+Y,+Mo,+D,+H,+Mi,+(Se||0),o.p.TZID):new Date(+Y,+Mo-1,+D,+H,+Mi,+(Se||0));
 return{d:dt.getFullYear()+"-"+p2(dt.getMonth()+1)+"-"+p2(dt.getDate()),h:p2(dt.getHours())+":"+p2(dt.getMinutes()),all:0};
}
// eventos que se repetem (RRULE): gera as ocorrências até a data lim ("AAAAMMDD")
function rrExpand(st,rr,lim,exd){
 const m=st.v.match(/^(\d{4})(\d{2})(\d{2})(T\d{4,6}Z?)?$/);if(!m)return[st];
 const R={};rr.split(";").forEach(x=>{const[k,v]=x.split("=");R[k.toUpperCase()]=v||""});
 const fr=R.FREQ,iv=Math.max(1,+R.INTERVAL||1),cnt=R.COUNT?+R.COUNT:1e9,un=R.UNTIL?R.UNTIL.slice(0,8):"99999999",DW=["SU","MO","TU","WE","TH","FR","SA"],tail=m[4]||"";
 const s0=Date.UTC(+m[1],+m[2]-1,+m[3]),d0=new Date(s0),ymd=t=>{const d=new Date(t);return""+d.getUTCFullYear()+p2(d.getUTCMonth()+1)+p2(d.getUTCDate())},k0=ymd(s0);
 const ex=new Set((exd||[]).map(e=>e.v.slice(0,8))),bd=(R.BYDAY||"").split(",").filter(Boolean),out=[];let n=0;
 const push=t=>{const k=ymd(t);if(k<k0)return true;if(k>un||n>=cnt||k>lim)return false;n++;if(!ex.has(k))out.push({v:k+tail,p:st.p});return true};
 const nDias=(Y,M)=>new Date(Date.UTC(Y,M+1,0)).getUTCDate();
 for(let i=0;i<20000;i++){
  if(fr==="DAILY"){if(!push(s0+i*iv*864e5))break}
  else if(fr==="WEEKLY"){const w0=s0-d0.getUTCDay()*864e5+i*iv*7*864e5,ds=bd.length?bd.map(x=>DW.indexOf(x.slice(-2))).sort():[d0.getUTCDay()];if(!ds.every(k=>push(w0+k*864e5)))break}
  else if(fr==="MONTHLY"||fr==="YEARLY"){
   const yr=d0.getUTCFullYear()+(fr==="YEARLY"?i*iv:0),ms=fr==="YEARLY"?(R.BYMONTH?R.BYMONTH.split(",").map(x=>+x-1):[d0.getUTCMonth()]):[d0.getUTCMonth()+i*iv];let ok=true;
   for(const mm of ms){const Y=yr+Math.floor(mm/12),M=((mm%12)+12)%12,nd=nDias(Y,M);let ds;
    if(R.BYMONTHDAY)ds=R.BYMONTHDAY.split(",").map(x=>+x>0?+x:nd+(+x)+1);
    else if(bd.length)ds=bd.flatMap(x=>{const o=parseInt(x)||0,wd=DW.indexOf(x.slice(-2)),all=[];for(let d=1;d<=nd;d++)if(new Date(Date.UTC(Y,M,d)).getUTCDay()===wd)all.push(d);return o>0?[all[o-1]]:o<0?[all[all.length+o]]:all});
    else ds=[d0.getUTCDate()];
    if(!ds.filter(d=>d&&d<=nd).sort((a,b)=>a-b).every(d=>push(Date.UTC(Y,M,d)))){ok=false;break}}
   if(!ok)break}
  else{out.push(st);break}
 }
 return out;
}
// junta os eventos dos arquivos na Agenda do app, sem duplicar (cada evento do Google tem um código UID)
function icsImport(files,o){
 const lim=addD(o.from,366).replace(/-/g,""),r={n:0,u:0,x:0,cals:[]};
 files.forEach(f=>{
  const{cal,evs}=icsParse(f.text),cn=cal||f.name.replace(/\.(ics|txt)$/i,""),M=new Map(),seen=new Set(),canc=e=>e.STATUS&&/CANCELLED/i.test(e.STATUS.v);r.cals.push(cn);
  evs.forEach(e=>{if(e["RECURRENCE-ID"]||!e.DTSTART||!e.UID)return;const u=e.UID.v;
   if(/^diario-/.test(u)||(e.DESCRIPTION&&icsUnesc(e.DESCRIPTION.v).includes(MARCA)))return;   // enviado pelo próprio app
   (e.RRULE?rrExpand(e.DTSTART,e.RRULE.v,lim,e.EXDATE):[e.DTSTART]).forEach(x=>{const w=icsWhen(x);if(w)M.set(e.RRULE?u+"|"+w.d:u,{e,w})})});
  evs.forEach(e=>{if(!e["RECURRENCE-ID"]||!e.UID)return;const z=icsWhen(e["RECURRENCE-ID"]),k=e.UID.v+"|"+(z&&z.d),w=e.DTSTART&&icsWhen(e.DTSTART);   // ocorrência alterada ou cancelada
   if(canc(e)||!w)M.delete(k);else M.set(k,{e,w})});
  M.forEach(({e,w},k)=>{if(canc(e)||w.d<o.from)return;seen.add(k);
   const t=e.SUMMARY?icsUnesc(e.SUMMARY.v):"(sem título)",loc=e.LOCATION?icsUnesc(e.LOCATION.v):"",ds=e.DESCRIPTION?plain(icsUnesc(e.DESCRIPTION.v)).trim():"";
   let fim="";if(w.all&&e.DTEND){const z=icsWhen(e.DTEND);if(z&&z.d>addD(w.d,1))fim="Até "+fmt(addD(z.d,-1))}
   const nt=[fim,loc&&"Local: "+loc,ds].filter(Boolean).join("\n"),a=S.ag.find(x=>x.gk===k&&x.gc===cn);
   if(a){Object.assign(a,{t,d:w.d,h:w.h,nt});r.u++}   // já existia: atualiza (mantém situação, prioridade, cor e Painel)
   else{S.ag.push({id:uid(),t,d:w.d,h:w.h,s:STAT[0],p:"",col:o.col,pn:0,nt,gk:k,gc:cn});r.n++}});
  if(o.rm){const n0=S.ag.length;S.ag=S.ag.filter(x=>!(x.gk&&x.gc===cn&&x.d>=o.from&&!seen.has(x.gk)));r.x+=n0-S.ag.length}
 });
 return r;
}
// abre um .zip (exportação de todas as agendas) e devolve os arquivos .ics de dentro
async function unzip(buf){
 const b=new Uint8Array(buf),dv=new DataView(buf),td=new TextDecoder(),out=[];let e=b.length-22;
 while(e>=0&&dv.getUint32(e,true)!==0x06054b50)e--;if(e<0)throw new Error("zip");
 let p=dv.getUint32(e+16,true);
 for(let i=0,n=dv.getUint16(e+10,true);i<n;i++){
  if(dv.getUint32(p,true)!==0x02014b50)break;
  const meth=dv.getUint16(p+10,true),csz=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),off=dv.getUint32(p+42,true),name=td.decode(b.subarray(p+46,p+46+nl));
  p+=46+nl+dv.getUint16(p+30,true)+dv.getUint16(p+32,true);
  if(!/\.ics$/i.test(name))continue;
  const lo=off+30+dv.getUint16(off+26,true)+dv.getUint16(off+28,true),data=b.subarray(lo,lo+csz);
  const raw=meth===0?data:meth===8?new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer()):null;
  if(raw)out.push({name:name.split("/").pop(),text:td.decode(raw)});
 }
 return out;
}
async function lerAgenda(file){
 try{
  const buf=await file.arrayBuffer(),b=new Uint8Array(buf);
  const files=(b[0]===0x50&&b[1]===0x4b?await unzip(buf):[{name:file.name,text:new TextDecoder().decode(b)}]).filter(f=>/BEGIN:VCALENDAR/.test(f.text));
  if(!files.length)return toast("Arquivo não reconhecido. Use o .ics ou .zip exportado do Google Agenda.");
  let r;rm(()=>`${pl(r.n,"novo","novos")} · ${pl(r.u,"atualizado","atualizados")}${r.x?" · "+pl(r.x,"removido","removidos"):""}`,()=>{r=icsImport(files,V.kf);V.kres=r});
 }catch(e){toast("Não foi possível ler o arquivo")}
}
// envio: link que abre o Google Agenda com o evento preenchido (1 hora se tiver horário; senão, dia inteiro)
const gTit=i=>i.t.replace(/^⏳\s*/,"");
const gNt=i=>{const x=i.k==="t"?i.x.t:i.k==="p"?null:i.x;return x&&x.nt?x.nt:""};
const gDet=i=>MARCA+" "+plain(i.sub)+(gNt(i)?"\n\n"+gNt(i):"");
const stamp=dt=>dt.getFullYear()+p2(dt.getMonth()+1)+p2(dt.getDate())+"T"+p2(dt.getHours())+p2(dt.getMinutes())+"00";
function gUrl(i){
 let dates;if(i.h){const a=new Date(i.d+"T"+i.h+":00");dates=stamp(a)+"/"+stamp(new Date(a.getTime()+36e5))}else dates=i.d.replace(/-/g,"")+"/"+addD(i.d,1).replace(/-/g,"");
 let tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
 return"https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(gTit(i))+"&dates="+dates+(i.h&&tz?"&ctz="+encodeURIComponent(tz):"")+"&details="+encodeURIComponent(gDet(i));
}
// [v2.3] corrigido: o ";" agora é protegido como "\;" (antes podia cortar o título no Google)
// envio em lote: arquivo .ics com todos os prazos de hoje em diante (para importar no Google pelo computador)
const icsEsc=s=>String(s).replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n");
const icsFold=l=>{let o="";while(l.length>70){o+=l.slice(0,70)+"\r\n ";l=l.slice(70)}return o+l};
function icsExport(){
 const td=today(),now=new Date().toISOString().replace(/[-:]/g,"").slice(0,15)+"Z",z=dt=>dt.toISOString().replace(/[-:]/g,"").slice(0,15)+"Z";
 const L=agItems().filter(i=>!i.dn&&i.d>=td&&!i.oc&&!(i.k==="a"&&i.x.gk));
 // [v2.4] repetição: um evento só, com a regra (RRULE), como no Google
 S.ag.forEach(e=>{if(!e.gk&&e.rp&&e.rp.f&&e.d&&(!e.rp.u||e.rp.u>=td))L.push({d:e.d,h:e.h,t:e.t,k:"a",x:e,sub:"Agenda · repete "+rptL(e.rp),rr:1})});
 const ev=L.map(i=>{const id=i.k==="t"?i.x.t.id:i.k==="p"?"prep-"+i.x.s.id:i.x.id;let dt;
  if(i.h){const a=new Date(i.d+"T"+i.h+":00");dt=["DTSTART:"+z(a),"DTEND:"+z(new Date(a.getTime()+36e5))]}else dt=["DTSTART;VALUE=DATE:"+i.d.replace(/-/g,""),"DTEND;VALUE=DATE:"+addD(i.d,1).replace(/-/g,"")];
  if(i.rr)dt.push(...rrLines(i.x,1));
  return["BEGIN:VEVENT","UID:diario-"+id+"@diario-pesquisa","DTSTAMP:"+now,...dt,"SUMMARY:"+icsEsc(gTit(i)),"DESCRIPTION:"+icsEsc(gDet(i)),"END:VEVENT"].map(icsFold).join("\r\n")});
 return{n:L.length,txt:["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Diario de Pesquisa//PT-BR","CALSCALE:GREGORIAN","X-WR-CALNAME:Diário de Pesquisa",...ev,"END:VCALENDAR"].join("\r\n")+"\r\n"};
}
function baixar(nome,txt,tipo){const u=URL.createObjectURL(new Blob([txt],{type:tipo})),a=document.createElement("a");a.href=u;a.download=nome;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000)}
// [v2.2] tela do Google Agenda · [v2.3] conta Google (Drive + Agenda); arquivos .ics ficam como alternativa
function vK(){
 const k=V.kf,G={};S.ag.forEach(e=>{if(e.gk)G[e.gc||"?"]=(G[e.gc||"?"]||0)+1});
 let h=`<div class="grp">Conta Google</div><div class="card kbox">`;
 if(!SY.on)h+=`<p>Entre com sua conta Google para <b>sincronizar</b> os dados entre o celular e o computador e para <b>ligar</b> a Agenda do app ao Google Agenda.</p><p class="note">Os dados ficam numa pasta escondida do seu Google Drive, que só este app acessa. Entre com a mesma conta em todos os aparelhos. Na primeira vez o Google avisa que o app não foi verificado: toque em Avançado › Acessar Diário de Pesquisa.</p><button class="pri kfile" data-a="gcon">Entrar com Google</button>`;
 else h+=`<p><b>${esc(SY.email||"Conta Google conectada")}</b><br><small>${GBUSY?"Sincronizando...":"Última sincronização: "+quando(SY.at)}${GERR?" · problema: "+esc(GERR):""}</small></p>${tokOk()?"":`<p class="note">O acesso do Google vence depois de cerca de 1 hora. Toque em Sincronizar agora (ou na faixa do alto) para renovar.</p>`}<div class="tools"><button class="pri" data-a="sync">Sincronizar agora</button><button class="sec" data-a="gdes">Desconectar</button></div><p class="note">Enquanto o acesso vale, cada mudança vai sozinha para o Drive e para o Google Agenda em poucos segundos; ao abrir o app, ele traz o que mudou no outro aparelho.</p>`;
 h+=`</div>`;
 if(SY.on&&SY.cal){
  h+=`<div class="grp">Google Agenda</div><div class="card kbox"><label class="kck"><input type="checkbox" data-a="gpush"${S.gg.push?" checked":""}><span>Enviar para o Google os prazos, as atividades com data, as preparações e as contagens, numa agenda própria chamada “${CALN}”. O que você muda, conclui ou apaga aqui é atualizado lá.</span></label><p class="kl">Trazer para o calendário do app os eventos destas agendas:</p>`
  +(S.gg.cals.length?S.gg.cals.map(c=>`<label class="kck"><input type="checkbox" data-a="gsrc" data-i="${esc(c.id)}"${S.gg.src.includes(c.id)?" checked":""}><span>${esc(c.n)}${c.p?" (principal)":""}</span></label>`).join(""):`<p class="note">Toque em Sincronizar agora para carregar a lista das suas agendas.</p>`)
  +`<label class="kl">Cor dos eventos trazidos<select id="gcol">${Object.keys(CL).map(c=>`<option value="${c}"${c===(S.gg.col||"blue")?" selected":""}>${CL[c]}</option>`).join("")}</select></label><p class="note">Vêm os eventos dos últimos 60 dias e do próximo ano. Edite esses eventos no Google; aqui você pode marcar como concluído, mudar a cor ou pôr no Painel. Se já tinha trazido eventos por arquivo .ics, use “Remover todos os eventos trazidos” (no fim desta tela) para não ficarem repetidos.</p></div>`;
 }else if(SY.on)h+=`<p class="note">A permissão do Google Agenda não foi dada. Para ligar a agenda, desconecte e entre de novo marcando a permissão da Agenda.</p>`;
 h+=`<details class="lg kd"><summary>Sem conta conectada: arquivos .ics</summary>`;
 h+=`<div class="grp">Trazer do Google Agenda</div><div class="card kbox"><ol class="kst"><li>No <b>computador</b>, abra o Google Agenda. Em “Minhas agendas”, passe o mouse na agenda › ⋮ › <b>Configurações e compartilhamento</b> › <b>Exportar agenda</b>. (Pelo app do Google não dá para exportar.)</li><li>Mande o arquivo baixado (.ics, ou .zip se exportou todas) para o celular: Drive, e-mail, WhatsApp...</li><li>Escolha o arquivo aqui. Pode repetir sempre que quiser atualizar: o que já veio é atualizado, não duplicado.</li></ol>`
 +`<label class="kl">Trazer eventos a partir de<input type="date" id="kfrom" value="${esc(k.from)}"></label><label class="kl">Cor no calendário<select id="kcol">${Object.keys(CL).map(c=>`<option value="${c}"${c===k.col?" selected":""}>${CL[c]}</option>`).join("")}</select></label>`
 +`<label class="kck"><input type="checkbox" id="krm"${k.rm?" checked":""}><span>Ao atualizar, remover os eventos que foram apagados no Google</span></label><label class="pri kfile">Escolher arquivo .ics ou .zip<input type="file" id="icsf"></label>`
 +(V.kres?`<p class="kres">Última importação (${esc(V.kres.cals.join(", "))}): ${pl(V.kres.n,"novo","novos")}, ${pl(V.kres.u,"atualizado","atualizados")}${V.kres.x?", "+pl(V.kres.x,"removido","removidos"):""}.</p>`:"")+`</div>`
 +`<div class="grp">Levar para o Google Agenda</div><div class="card kbox"><p>Na aba <b>Agenda</b>, toque num dia: cada item tem o botão <span class="gbtn" style="pointer-events:none">+ Google</span>, que abre o Google Agenda com o evento já preenchido. É só salvar.</p><p class="note">Para mandar todos os prazos de uma vez, gere o arquivo abaixo e importe no Google Agenda pelo computador (Configurações › Importar e exportar). Use de preferência uma agenda criada só para isso: para atualizar depois, é só apagá-la e importar de novo.</p><button class="sec" data-a="icsx">Gerar arquivo com os prazos (.ics)</button></div>`;
 h+=`</details>`;
 return h+(Object.keys(G).length?`<div class="grp">Eventos trazidos do Google</div><div class="card kbox">${Object.keys(G).map(c=>`<div class="r" style="justify-content:space-between;min-height:36px"><span>${esc(c)}</span><small>${pl(G[c],"evento","eventos")}</small></div>`).join("")}<button class="dng" data-a="kclr" style="margin-top:8px">Remover todos os eventos trazidos</button></div>`:"");
}

// ----- [v2.3] CONTA GOOGLE: sincronização pelo Google Drive e ligação direta com o Google Agenda -----
// Não há servidor: o app pede ao Google uma chave de acesso (token) que vale cerca de 1 hora.
// Com ela, guarda todos os dados num arquivo escondido do seu Drive (pasta do app: não aparece no Drive)
// e conversa com o Google Agenda. Quando a chave vence, um toque em "Sincronizar" pede outra.
const GID="1051160223290-i8l8egjeqhp5246u05mfphu26fshpskq.apps.googleusercontent.com";   // ID do cliente (Google Cloud)
const GSC="https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/calendar";   // permissões pedidas
const GAPI="https://www.googleapis.com",DRV="/drive/v3/files",CAPI="/calendar/v3";
const ARQ="diario-dados.json";                                                     // nome do arquivo no Drive
const CALN="Diário de Pesquisa (app)",CALD="Agenda criada pelo app Diário de Pesquisa";   // agenda do app no Google
const GCC={red:"11",orange:"6",yellow:"5",green:"10",blue:"9",purple:"3",gray:"8"};       // cores do app → cores do Google
const SYK="diario-sync";   // configuração da sincronização deste aparelho (fica fora do backup)
let SY={on:0,email:"",cal:0,last:0,at:0,tok:"",exp:0,dev:"",pick:""};
try{Object.assign(SY,JSON.parse(localStorage.getItem(SYK))||{})}catch(e){}
if(!SY.dev)SY.dev=uid();
let GTC=null,GCB=null,GBUSY=0,GQ=0,GTM=0,GERR="";   // login do Google, o que fazer depois do login, sincronizando?, pedido na fila, temporizador, último problema
const sySave=()=>{try{localStorage.setItem(SYK,JSON.stringify(Object.assign({},SY,{pick:""})))}catch(e){}};
const tokOk=()=>!!SY.tok&&Date.now()<SY.exp-60e3;   // a chave ainda vale (com 1 minuto de folga)?
const gAuto=()=>!!(SY.on&&SY.cal&&S.gg.push);          // os prazos vão sozinhos para o Google?
const tzN=()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||"America/Sao_Paulo"}catch(e){return"America/Sao_Paulo"}};
const isoL=dt=>dt.getFullYear()+"-"+p2(dt.getMonth()+1)+"-"+p2(dt.getDate())+"T"+p2(dt.getHours())+":"+p2(dt.getMinutes())+":00";
const hex=s=>[...String(s)].map(c=>c.charCodeAt(0).toString(16).padStart(2,"0")).join("");

// pede a chave de acesso: abre a janelinha do Google (por isso precisa vir de um toque na tela)
function gLogin(then){
 const go=window.google&&google.accounts&&google.accounts.oauth2;
 if(!go)return toast(navigator.onLine?"O login do Google ainda está carregando. Tente de novo.":"Sem internet");
 if(!GTC)GTC=go.initTokenClient({client_id:GID,scope:GSC,callback:r=>GCB&&GCB(r),
  error_callback:e=>{const t=e&&e.type;GERR=t==="popup_closed"?"":"login";syncUI();if(t==="popup_failed_to_open")toast("O navegador bloqueou a janela do Google. Toque em Sincronizar.")}});
 GCB=r=>{
  if(!r||r.error){GERR="login";syncUI();return toast("Não foi possível entrar")}
  const sc=r.scope||"";
  if(!sc.includes("drive.appdata")){GERR="sem permissão do Drive";syncUI();return toast("Permita o acesso ao Google Drive para sincronizar")}
  SY.tok=r.access_token;SY.exp=Date.now()+(+r.expires_in||3600)*1e3;SY.cal=sc.includes("auth/calendar")?1:0;GERR="";sySave();then&&then()};
 GTC.requestAccessToken(SY.email?{prompt:"",hint:SY.email}:{prompt:"consent"});
}
// chamada às APIs do Google com a chave de acesso (devolve o JSON da resposta)
async function gF(path,o={}){
 const r=await fetch(path.startsWith("http")?path:GAPI+path,Object.assign({},o,{headers:Object.assign({Authorization:"Bearer "+SY.tok},o.headers||{})}));
 if(r.status===401){SY.tok="";SY.exp=0;sySave();const e=new Error("auth");e.st=401;throw e}   // chave vencida
 if(r.status===204)return null;
 const tx=await r.text();let b=tx;try{b=tx?JSON.parse(tx):null}catch(e){}
 if(!r.ok){const e=new Error((b&&b.error&&b.error.message)||"HTTP "+r.status);e.st=r.status;throw e}
 return b;
}
// lista longa, em várias páginas
async function gList(url,key){let out=[],pt="";do{const r=await gF(url+(url.includes("?")?"&":"?")+"maxResults=250"+(pt?"&pageToken="+encodeURIComponent(pt):""));out=out.concat((r&&r[key])||[]);pt=r&&r.nextPageToken}while(pt);return out}
// faz vários pedidos ao mesmo tempo (n de cada vez)
async function runJobs(J,n){let i=0;const w=async()=>{while(i<J.length)await J[i++]()};await Promise.all(Array.from({length:Math.min(n,J.length)},w))}

// ---- DRIVE: um arquivo com todos os dados; appProperties.t = horário da última mudança ----
async function dFind(){const r=await gF(`${DRV}?spaces=appDataFolder&q=${encodeURIComponent(`name='${ARQ}' and trashed=false`)}&fields=files(id,appProperties)&pageSize=10`);return(r&&r.files&&r.files[0])||null}
async function dUp(id){   // envia os dados (cria o arquivo na primeira vez)
 const B="dp"+uid()+uid(),pr={t:String(S.t||0),dev:SY.dev},meta=id?{appProperties:pr}:{name:ARQ,parents:["appDataFolder"],appProperties:pr};
 const body="--"+B+"\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n"+JSON.stringify(meta)+"\r\n--"+B+"\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n"+JSON.stringify(S)+"\r\n--"+B+"--";
 return gF(`/upload/drive/v3/files${id?"/"+id:""}?uploadType=multipart&fields=id`,{method:id?"PATCH":"POST",headers:{"Content-Type":"multipart/related; boundary="+B},body});
}
// quando os dois lados mudaram, a versão que não ficou é guardada aqui (aparece em Backup)
function guardaOutra(o,de){try{localStorage.setItem("diario-outra",JSON.stringify({t:Date.now(),de,data:o}))}catch(e){}}
const outraV=()=>{try{return JSON.parse(localStorage.getItem("diario-outra"))}catch(e){return null}};
function outraH(){const O=outraV();return O&&O.data?`<div class="grp">Versão guardada na sincronização</div><p class="note">Quando havia mudanças dos dois lados, o app ficou com uma versão e guardou a outra aqui (${esc(O.de)}, ${quando(O.t)}).</p><div class="tools"><button class="sec" data-a="outra">Restaurar a versão guardada</button></div>`:""}
// compara este aparelho com o Drive: manda, traz ou (1ª vez com dados dos dois lados) pergunta
async function driveSync(){
 const f=await dFind(),lt=S.t||0;
 if(!f){await dUp("");SY.last=lt;return"up"}
 const rt=+((f.appProperties||{}).t||0),lc=lt!==SY.last,rc=rt!==SY.last;   // mudou aqui? mudou no Drive?
 if(!rc&&!lc)return"";
 if(!rc){await dUp(f.id);SY.last=lt;return"up"}
 const R=await gF(`${DRV}/${f.id}?alt=media`);
 if(!R||!Array.isArray(R.f))throw new Error("arquivo do Drive inválido");
 const keep=!lc?"drive":SY.pick||(SY.last?(lt>rt?"local":"drive"):"");   // mudou dos dois lados: fica a mais recente
 SY.pick="";
 if(!keep){const e=new Error("pick");e.rt=rt;throw e}
 if(keep==="local"){guardaOutra(R,"a que estava no Drive");await dUp(f.id);SY.last=lt;return"conf-up"}
 if(lc)guardaOutra(S,"a que estava neste aparelho");
 S=R;S.t=rt;fix();persist();SY.last=rt;return lc?"conf-down":"down";
}

// ---- GOOGLE AGENDA ----
// lista as agendas da conta (para escolher de quais trazer eventos) e acha a agenda do app
async function gCals(){
 const L=await gList(`${CAPI}/users/me/calendarList?fields=items(id,summary,summaryOverride,description,primary),nextPageToken`,"items");
 const mine=L.find(c=>c.id===S.gg.cal)||L.find(c=>c.description===CALD);
 S.gg.cal=mine?mine.id:"";
 S.gg.cals=L.filter(c=>c!==mine).map(c=>({id:c.id,n:c.summaryOverride||c.summary||c.id,p:c.primary?1:0}));
 S.gg.src=S.gg.src.filter(id=>S.gg.cals.some(c=>c.id===id));
}
// [v2.4] REGRA DE REPETIÇÃO (RRULE + dias pulados), usada no Google e no arquivo .ics
// utc=1 (arquivo .ics): horários em UTC, sem precisar descrever o fuso; no Google vai o fuso do aparelho
const zU=dt=>dt.toISOString().replace(/[-:]/g,"").slice(0,15)+"Z";
function rrLines(e,utc){const r=e.rp,R=["RRULE:FREQ="+{d:"DAILY",w:"WEEKLY",m:"MONTHLY",y:"YEARLY"}[r.f]+(r.n>1?";INTERVAL="+r.n:"")+(r.u?";UNTIL="+(e.h?zU(new Date(r.u+"T23:59:59")):r.u.replace(/-/g,"")):"")];   // UNTIL com hora: fim do dia local, em UTC
 if(e.ex.length)R.push(!e.h?"EXDATE;VALUE=DATE:"+e.ex.map(d=>d.replace(/-/g,"")).join(","):utc?"EXDATE:"+e.ex.map(d=>zU(new Date(d+"T"+e.h+":00"))).join(","):"EXDATE;TZID="+tzN()+":"+e.ex.map(d=>d.replace(/-/g,"")+"T"+e.h.replace(":","")+"00").join(","));
 return R}
// o que deve existir na agenda do app no Google: tudo que tem data no app (menos o que veio do próprio Google)
// [v2.4] com AVISOS (lembretes do Google: o das Configurações + o da antecedência dos ‼) e REPETIÇÕES num evento só
function gWant(){
 const tz=tzN(),W=new Map(),rem=S.cfg.rem;
 const rmd=(dn,xi,av,hm)=>{const o=[];if(!dn){if(rem!=="")o.push(+rem+hm);if(xi)o.push((+av||S.cfg.xi)*1440-540+hm)}   // ‼: "av" dias antes, às 9h
  return{useDefault:false,overrides:[...new Set(o.map(m=>Math.min(40320,Math.max(0,m))))].sort((a,b)=>a-b).slice(0,5).map(m=>({method:"popup",minutes:m}))}};   // o Google aceita até 4 semanas antes
 const when=(d,h)=>{if(h){const a=new Date(d+"T"+h+":00");return[{dateTime:isoL(a),timeZone:tz},{dateTime:isoL(new Date(a.getTime()+36e5)),timeZone:tz},+h.slice(0,2)*60+ +h.slice(3,5)]}return[{date:d},{date:addD(d,1)},0]};
 agItems().forEach(i=>{if(i.k==="r"||(i.k==="a"&&(i.x.gk||(i.x.rp&&i.x.rp.f))))return;
  const key=i.k==="t"?"t"+i.x.t.id:i.k==="p"?"p"+i.x.s.id:i.k==="c"?"c"+i.x.id:"a"+i.x.id,[st,en,hm]=when(i.d,i.h);
  W.set("dpq0"+hex(key),{summary:(i.dn?"✓ ":"")+gTit(i),description:gDet(i),start:st,end:en,colorId:GCC[i.dn?"gray":i.col]||"9",reminders:rmd(i.dn,i.xi,i.av,hm)})});   // código fixo por item: nunca duplica
 S.ag.forEach(e=>{if(e.gk||!e.rp||!e.rp.f||!e.d)return;const[st,en,hm]=when(e.d,e.h),i={t:e.t,k:"a",x:e,sub:"Agenda · repete "+rptL(e.rp)};   // [v2.4] repetição: um evento com regra (RRULE)
  W.set("dpq0"+hex("a"+e.id),{summary:gTit(i),description:gDet(i),start:st,end:en,colorId:GCC[e.col]||"9",recurrence:rrLines(e),reminders:rmd(0,e.xi,e.av,hm)})});
 return W;
}
const evSig=e=>{const t=o=>o?(o.date||String(o.dateTime||"").slice(0,16)):"",r=e.reminders||{};return[e.summary||"",e.description||"",e.colorId||"",t(e.start),t(e.end),(e.recurrence||[]).join(";"),r.useDefault?"d":(r.overrides||[]).map(o=>+o.minutes).sort((a,b)=>a-b).join(",")].join("|")};
// envia: cria, atualiza ou apaga eventos na agenda do app no Google, para ficar igual ao app
async function gPush(){
 const h={"Content-Type":"application/json"};
 if(!S.gg.cal){const c=await gF(`${CAPI}/calendars`,{method:"POST",headers:h,body:JSON.stringify({summary:CALN,description:CALD,timeZone:tzN()})});S.gg.cal=c.id;S.t=Date.now();persist()}
 const cal=encodeURIComponent(S.gg.cal),W=gWant();let have;
 try{have=await gList(`${CAPI}/calendars/${cal}/events?showDeleted=false&timeZone=${encodeURIComponent(tzN())}&fields=items(id,summary,description,colorId,start,end,recurrence,reminders),nextPageToken`,"items")}
 catch(e){if(e.st===404||e.st===410){S.gg.cal="";return gPush()}throw e}   // a agenda foi apagada no Google: cria de novo
 const H=new Map(have.map(e=>[e.id,e])),J=[];
 W.forEach((ev,id)=>{const o=H.get(id);if(!o||evSig(o)!==evSig(ev))J.push(()=>gPut(cal,id,ev,!o))});
 H.forEach((e,id)=>{if(id.startsWith("dpq0")&&!id.includes("_")&&!W.has(id))J.push(()=>gF(`${CAPI}/calendars/${cal}/events/${id}`,{method:"DELETE"}).catch(x=>{if(x.st!==404&&x.st!==410)throw x}))});   // só apaga o que o app criou (e nunca um dia avulso de repetição, "_")
 await runJobs(J,4);return J.length;
}
async function gPut(cal,id,ev,nw){   // cria (ou, se já existiu e foi apagado, revive) e atualiza
 const h={"Content-Type":"application/json"},b=JSON.stringify(Object.assign({id,status:"confirmed"},ev)),u=`${CAPI}/calendars/${cal}/events`;
 if(!nw)return gF(`${u}/${id}`,{method:"PUT",headers:h,body:b});
 try{return await gF(u,{method:"POST",headers:h,body:b})}catch(e){if(e.st===409)return gF(`${u}/${id}`,{method:"PUT",headers:h,body:b});throw e}
}
// data e hora de um evento do Google no fuso deste aparelho
const gWhen=o=>{if(!o)return null;if(o.date)return{d:o.date,h:""};if(!o.dateTime)return null;const t=new Date(o.dateTime);if(isNaN(t))return null;return{d:t.getFullYear()+"-"+p2(t.getMonth()+1)+"-"+p2(t.getDate()),h:p2(t.getHours())+":"+p2(t.getMinutes())}};
// traz: eventos das agendas escolhidas entram na Agenda do app (sem duplicar; os apagados lá saem daqui)
async function gPull(){
 const a=addD(today(),-60),b=addD(today(),366),r={n:0,u:0,x:0};
 for(const id of S.gg.src){
  const c=S.gg.cals.find(x=>x.id===id),cn=c?c.n:id,seen=new Set();let L;
  try{L=await gList(`${CAPI}/calendars/${encodeURIComponent(id)}/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(a+"T00:00:00Z")}&timeMax=${encodeURIComponent(b+"T00:00:00Z")}&fields=items(id,status,summary,location,description,start,end),nextPageToken`,"items")}
  catch(e){if(e.st===404)continue;throw e}
  L.forEach(e=>{if(e.status==="cancelled")return;const w=gWhen(e.start);if(!w)return;
   const ds=e.description?plain(e.description).trim():"";if(ds.includes(MARCA))return;   // enviado pelo próprio app (botão + Google)
   const k="g:"+e.id;seen.add(k);
   let fim="";if(e.start.date&&e.end&&e.end.date&&e.end.date>addD(e.start.date,1))fim="Até "+fmt(addD(e.end.date,-1));
   const t=e.summary||"(sem título)",nt=[fim,e.location&&"Local: "+e.location,ds].filter(Boolean).join("\n"),x=S.ag.find(y=>y.gk===k&&y.gi===id);
   if(x){if(x.t!==t||x.d!==w.d||x.h!==w.h||x.nt!==nt||x.gc!==cn){Object.assign(x,{t,d:w.d,h:w.h,nt,gc:cn});r.u++}}   // mantém situação, cor e Painel
   else{S.ag.push({id:uid(),t,d:w.d,h:w.h,s:STAT[0],p:"",col:S.gg.col||"blue",pn:0,nt,gk:k,gc:cn,gi:id});r.n++}});
  const n0=S.ag.length;S.ag=S.ag.filter(y=>!(y.gi===id&&y.d>=a&&!seen.has(y.gk)));r.x+=n0-S.ag.length;
 }
 const n0=S.ag.length;S.ag=S.ag.filter(y=>!y.gi||S.gg.src.includes(y.gi));r.x+=n0-S.ag.length;   // agendas desmarcadas: tira os eventos delas
 return r;
}

// ---- SINCRONIZAR: Drive (dados) → Agenda (trazer e enviar) → Drive de novo, se algo mudou ----
async function syncNow(user){
 if(!SY.on)return;
 if(!navigator.onLine){GERR="sem internet";syncUI();if(user)toast("Sem internet: sincroniza quando a conexão voltar");return}
 if(!tokOk()){syncUI();if(user)gLogin(()=>syncNow(1));return}   // pede a chave de novo (só com um toque)
 if(GBUSY){GQ=1;return}
 GBUSY=1;GERR="";syncUI();
 const t0=S.t;let r="";
 try{
  r=await driveSync();
  if(SY.cal){
   if(user||!S.gg.cals.length){await gCals();if(!S.gg.ini){S.gg.ini=1;const pr=S.gg.cals.find(c=>c.p);if(pr&&!S.gg.src.length)S.gg.src=[pr.id];S.t=Date.now();persist()}}   // 1ª vez: já traz a agenda principal
   if(S.gg.src.length||S.ag.some(y=>y.gi)){const p=await gPull();if(p.n||p.u||p.x){S.t=Date.now();persist()}}
   if(S.gg.push)await gPush();
  }
  if((S.t||0)!==SY.last)await driveSync();
  SY.at=Date.now();
  if(r==="conf-up"||r==="conf-down")toast("Havia mudanças nos dois aparelhos: ficou a mais recente; a outra está em Backup");
  else if(user)toast("Sincronizado");
 }catch(e){
  if(e.message==="pick"){GBUSY=0;syncUI();return pickModal(e.rt)}
  GERR=e.message==="auth"?"":e.message||"erro";
  if(e.message!=="auth"&&user)toast("Erro ao sincronizar: "+GERR);
 }
 GBUSY=0;sySave();syncUI();
 if(S.t!==t0||r==="down"||r==="conf-down")softRender();
 if(GQ){GQ=0;syncLater(1000)}
}
// sincroniza daqui a pouco (junta várias mudanças seguidas num envio só); espera a janela de formulário fechar
function syncLater(ms){clearTimeout(GTM);GTM=setTimeout(()=>{if(modalOn())return syncLater(3000);syncNow()},ms==null?4000:ms)}
// nuvem no alto e faixa "Toque para sincronizar"
function syncUI(){
 const b=$("#sy"),bar=$("#sbar");if(!b)return;
 b.hidden=!SY.on;b.className=GBUSY?"busy":!tokOk()?"need":GERR?"err":"ok";
 b.title=GBUSY?"Sincronizando...":!tokOk()?"Toque para sincronizar":GERR?"Problema: "+GERR:"Sincronizado "+quando(SY.at);
 if(bar)bar.hidden=!(SY.on&&!tokOk()&&!GBUSY);
 if(V.tab==="k"&&!modalOn())softRender();
}
// redesenha sem atrapalhar quem está digitando
function softRender(){const ae=document.activeElement;if(ae&&$("#app").contains(ae)&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)){ae.addEventListener("blur",()=>setTimeout(render,60),{once:true});return}render()}
// 1ª sincronização neste aparelho com dados dos dois lados: qual versão usar?
function pickModal(rt){
 $("#modal").innerHTML=`<div class="sheet"><h3>Já há dados no Drive</h3><p>Seu Google Drive tem dados do app (última mudança ${esc(quando(rt))}) e este aparelho também. Qual versão usar daqui em diante? A outra fica guardada em Backup.</p><div class="r"><button class="pri" data-a="sypick" data-i="drive">Usar os do Drive</button><button class="sec" data-a="sypick" data-i="local">Usar os deste aparelho</button></div></div>`;
 $("#modal").classList.add("on");cb=null;syncHist();
}
// sincroniza ao voltar para o app e quando a internet volta
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&SY.on)syncLater(400)});
addEventListener("online",()=>{if(SY.on)syncLater(400)});

// [v2.0] fechar o menu ⋮ (o menu ganhou itens a cada versão: Sobre v1.10, Relatório/Organizar/Tema v2.1, Google Agenda v2.2)
const closeMenu=()=>{$("#menu").hidden=true;$("#scrim").hidden=true;syncHist()};
// ----- abas, deslize e animação -----
// [v2.0?] troca de aba com animação para o lado certo · lista de telas: r e o [v2.1], k [v2.2]
const TABS=["g","p","a","c","r","o","k","m","b","z","s"];   // [v2.4] z = Configurações
let dir=0;
function go(t){dir=Math.sign(TABS.indexOf(t)-TABS.indexOf(V.tab));V.tab=t;V.g=null;V.s=null;V.u=null;V.ret=null;V.hs=[];render();$("#app").scrollTop=0}

// ===== 6. RENDER (redesenha a tela a partir dos dados) =====
// títulos das telas: Backup b [v1.1] · Modelos m [v1.2] · Contagem c [v1.4] · Agenda a [v1.8] · Sobre s [v1.10] · Relatório r e Organizar o [v2.1] · Google Agenda k [v2.2]
const TTL={m:"Modelos",b:"Backup",s:"Sobre o app",a:"Agenda",c:"Contagens regressivas",r:"Relatório",o:"Organizar",k:"Google",z:"Configurações"};   // [v2.3] k = conta Google
// [v1.0] desenha a tela atual · [v2.0] título na barra, seta de voltar, botão + flutuante e animação de entrada
function render(){
 document.querySelectorAll("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.i===V.tab));
 const a=$("#app");
 a.innerHTML=V.tab==="g"?(V.u?vSup():V.g?vGen():vGroups()):V.tab==="p"?vDash():V.tab==="a"?vAg():V.tab==="c"?vCd():V.tab==="m"?vTpl():V.tab==="s"?vAbout():V.tab==="r"?vRep():V.tab==="o"?vOrg():V.tab==="k"?vK():V.tab==="z"?vCfg():vBackup();
 if(V.tab==="g"&&!V.g&&!V.u)list();
 const sub=V.tab==="g"&&(V.g||V.u);                       // dentro de um gênero ou espécie?
 $("#bk").hidden=!(sub||"mbsrokz".includes(V.tab));
 $("#ttl").textContent=TTL[V.tab]||(V.u?(V.u==="*"?"Atividades gerais":fam(V.u.split("|")[0]).n):!sub?"Diário de Pesquisa":fam(V.f).n);
 const su=V.tab==="g"&&V.u&&V.u.includes("|")?supOwn():null;   // [v2.4] numa tela de subgrupo, o + cria gênero nele
 const fa=V.tab==="a"?"addAg":V.tab==="c"?"addCd":V.tab==="g"?(V.u?(su&&su.r?"addGen":""):(V.g?"addSp":"addFam")):"";   // ação do botão flutuante +
 $("#fab").hidden=!fa;$("#fab").dataset.a=fa;$("#fab").dataset.i=su&&su.r?V.u:"";
 a.classList.remove("in-l","in-r");
 if(dir){void a.offsetWidth;a.classList.add(dir>0?"in-r":"in-l");dir=0}
 syncHist();
}

// ===== 7. AÇÕES (o que cada botão faz) =====
const done=()=>{fix();save();closeM();render()}; // fix() garante que itens novos tenham todos os campos
const A={
 tab(el){const r={tab:V.tab,f:V.f,g:V.g,u:V.u},t=el.dataset.i;closeMenu();go(t);if("mbsrokz".includes(t)&&r.tab!==t)V.ret=r},   // [v2.1] lembra de onde veio
 // [v1.6] abrir uma família fecha as outras; Abrir/Fechar todas (famílias e espécies)
 tf(el){const f=fam(el.dataset.i);if(f.o)f.o=0;else{S.f.forEach(x=>x.o=0);f.o=1}saveUI();render()},   // [v2.3] abrir/fechar não conta como mudança
 tgf(){const a=!S.f.some(f=>f.o);S.f.forEach(f=>f.o=a?1:0);saveUI();render()},
 tgs(){const g=gen(V.f,V.g),a=!g.spp.some(s=>s.o);g.spp.forEach(s=>s.o=a?1:0);saveUI();render()},
 // [v1.0] abrir um gênero · [v1.6] já abre na aba da espécie certa · [v1.3] ou = abrir atividades gerais/família/subgrupo · [v2.4] guardam o caminho para o voltar
 og(el){const[f,g,s]=el.dataset.i.split("|");if(V.tab==="g")V.hs.push({u:V.u,f:V.f,g:V.g});else V.hs=[];V.tab="g";V.u=null;V.f=f;V.g=g;if(s)gen(f,g).spp.forEach(x=>x.o=x.id===s?1:0);dir=1;render();$("#app").scrollTop=0},
 ou(el){if(V.tab==="g")V.hs.push({u:V.u,f:V.f,g:V.g});else V.hs=[];V.tab="g";V.u=el.dataset.i;V.f=V.g=V.s=null;dir=1;render();$("#app").scrollTop=0},
 // [v1.5] prazo da atividade (chip 📅)
 dd(el){const t=own().tasks.find(x=>x.id===el.dataset.i);form("Prazo da atividade",[{k:"d",l:"Prazo",t:"date"}],{d:t.d},v=>{t.d=v.d;done()},t.d?()=>{t.d="";done()}:null,"Remover prazo")},
 // [v1.3] editar subitem/seção (nome e posição na lista)
 es(el){const[a,b]=el.dataset.i.split("|"),t=own().tasks.find(x=>x.id===a),i=t.b.findIndex(s=>s.id===b),x=t.b[i];form("Editar subitem",[{k:"t",l:"Nome"},{k:"p",l:"Posição na lista",t:"sel",o:t.b.map((_,j)=>String(j+1))}],{t:x.t,p:String(i+1)},v=>{if(!v.t)return;x.t=v.t;t.b.splice(i,1);t.b.splice(Math.max(0,Math.min(+v.p-1,t.b.length)),0,x);done()},()=>rm("Subitem excluído",()=>{t.b.splice(i,1)}))},
 // [v1.4] criar e editar contagem regressiva
 addCd(){form("Nova contagem regressiva",cdForm,{fm:FM.ymd,hz:"7"},v=>{if(!v.n||!v.d)return toast("Informe o nome e a data");S.cd.push(cdSave({id:uid()},v));done()})},
 ecd(el){const c=S.cd.find(x=>x.id===el.dataset.i);form("Editar contagem",cdForm,{n:c.n,d:c.d,h:c.h,fm:FM[c.fm],hz:String(c.hz),nt:c.nt},v=>{if(!v.n||!v.d)return toast("Informe o nome e a data");cdSave(c,v);done()},()=>rm("Contagem excluída",()=>{S.cd=S.cd.filter(x=>x!==c)}))},
 // [v1.9] configurar a escala de trabalho
 escf(){const e=S.sc;form("Escala de trabalho",escForm,{pat:e.pat,ref:e.ref,pos:String(e.pos),on:e.on?"Sim":"Não"},v=>{const p=v.pat.toUpperCase().replace(/[^A-Z]/g,"");if(!p||!v.ref)return toast("Informe o padrão e a data de referência");S.sc={pat:p,ref:v.ref,pos:Math.min(p.length,Math.max(1,+v.pos||1)),on:v.on==="Sim"?1:0};done()})},
 // [v1.10] trocar a subaba do Painel
 ptab(el){V.pt=el.dataset.i;render()},
 // [v1.8] Agenda: mudar de mês, escolher dia, ir para hoje, abrir item, criar e editar atividade · [v2.1] hji = item do cartão Hoje
 agm(el){const c=V.cal,d=new Date(c.y,c.m+(+el.dataset.i),1);c.y=d.getFullYear();c.m=d.getMonth();render()},
 agd(el){V.cal.d=el.dataset.i;render()},
 agt(){const s=today();V.cal={y:+s.slice(0,4),m:+s.slice(5,7)-1,d:s};render()},
 agi(el){openIt(AGL[+el.dataset.i])},
 hji(el){openIt(HJL[+el.dataset.i])},
 // [v2.4] data opcional (nd = tarefa sem data), repetição e ‼
 addAg(el,nd){form(nd?"Nova tarefa sem data":"Nova atividade na agenda",agForm,{d:nd?"":V.cal.d,rp:RPT[0][1],rn:"1",s:STAT[0],col:CL.blue,pn:"Sim",av:String(S.cfg.xi)},v=>{if(!v.t)return toast("Informe a atividade");S.ag.push(agSave({id:uid(),dd:[],ex:[]},v));if(v.d){V.cal.d=v.d;V.cal.y=+v.d.slice(0,4);V.cal.m=+v.d.slice(5,7)-1}done()})},
 eag(el){const e=S.ag.find(x=>x.id===el.dataset.i);if(e)eagO(e,"")},
 // [v1.0] voltar · [v2.0] seta de voltar na barra · [v2.1] volta para a tela de onde veio (V.ret) · menu ⋮
 back(){V.g=null;V.s=null;render()},
 navback(){if(V.tab!=="g"){const r=V.ret;if(r){go(r.tab);V.f=r.f;V.g=r.g;V.u=r.u;dir=-1;render()}else go("g");return}const p=V.hs.pop();if(p){V.u=p.u;V.f=p.f;V.g=p.g}else{V.u=null;V.g=null}dir=-1;render()},   // [v2.4] volta pelo caminho (gênero › subgrupo › família)
 menu(){const o=$("#menu").hidden;$("#menu").hidden=!o;$("#scrim").hidden=!o;syncHist()},
 // [v1.3] criar e editar subfamília/tribo · [v2.1] campo "Dentro de" e exclusão que mantém os gêneros · [v2.4] criar dentro de um subgrupo (já sugere a categoria seguinte)
 addGrp(el){const[fi,pi]=el.dataset.i.split("|"),f=fam(fi),q=pi&&grById(f,pi);form("Novo agrupamento (subfamília, tribo...)",grForm(f),{r:q?RANKS[Math.min(RANKS.indexOf(q.r)+1,RANKS.length-1)]:RANKS[0],pa:q?grPath(f,q):NOPA},v=>{if(!v.n)return;f.grp.push({id:uid(),n:v.n,r:v.r,pa:grId(f,v.pa),nt:v.nt,tasks:[],nts:[]});f.o=1;done()})},
 editGrp(el){const[fi,gi]=el.dataset.i.split("|"),f=fam(fi),x=grById(f,gi);form("Editar agrupamento",grForm(f,x),{n:x.n,r:x.r,pa:x.pa?grLab(f,x.pa):NOPA,nt:x.nt},v=>{if(!v.n)return;Object.assign(x,{n:v.n,r:v.r,pa:grId(f,v.pa),nt:v.nt});done()},()=>rm("Agrupamento excluído (os gêneros foram mantidos)",()=>{f.g.forEach(g=>{if(g.gr===x.id)g.gr=x.pa||""});f.grp.forEach(y=>{if(y.pa===x.id)y.pa=x.pa||""});f.grp=f.grp.filter(y=>y!==x)}))},
 // [v1.6] abrir/fechar a aba de uma espécie (abrir uma fecha as outras)
 backg(){V.s=null;render()},
 os(el){const g=gen(V.f,V.g),s=g.spp.find(x=>x.id===el.dataset.i);if(s.o)s.o=0;else{g.spp.forEach(x=>x.o=0);s.o=1}saveUI();render()},
 // [v1.2] criar e editar espécie · [v1.8] situação e prioridade · [v2.1] autor, ano, combinação e confirmação ao excluir
 // [v2.3] espécie sem nome (un), tipo de estudo vindo do gênero e estruturas de morfologia externa (me)
 addSp(){const g=gen(V.f,V.g);form("Nova espécie",sForm,{tp:tpL(g.est||TPO[0][0]),st:GST[0],p:PRIO[1],cb:CBO[0]},v=>{if(!v.n)return;g.spp.push({id:uid(),n:v.n,un:v.un||SPUN.test(v.n)?1:0,au:v.au,an:v.an,cn:v.cb===CBO[1]?1:0,ex:v.ex,tp:tpV(v.tp),d:v.d,st:v.st,p:v.p,nt:v.nt,parts:[],hab:[],me:[],tasks:[],nts:[]});done()})},
 editSp(){const g=gen(V.f,V.g),s=own();form("Editar espécie",sForm,{n:s.n,un:s.un?"1":"",au:s.au,an:s.an,cb:s.cn?CBO[1]:CBO[0],ex:s.ex,tp:tpL(s.tp),d:s.d,st:s.st,p:s.p,nt:s.nt},v=>{if(!v.n)return;Object.assign(s,{n:v.n,un:v.un||SPUN.test(v.n)?1:0,au:v.au,an:v.an,cn:v.cb===CBO[1]?1:0,ex:v.ex,tp:tpV(v.tp),d:v.d,st:v.st,p:v.p,nt:v.nt});done()},()=>conf("Excluir a espécie "+s.n+" e todo o seu progresso?","Excluir",()=>rm("Espécie excluída",()=>{g.spp=g.spp.filter(x=>x!==s);V.s=null})))},
 // [v1.2] peças (marcar etapa, remover, adicionar, dissecção completa ♂/♀) e habitus
 pt(el){const[i,k]=el.dataset.i.split("|"),p=own().parts[+i];p[k]=nxt(p[k]);save();render()},   // [v2.1] guarda a data em vez de 1 · [v2.4] 3 estados
 dp(el){const o=own(),i=+el.dataset.i;rm("Peça removida",()=>{o.parts.splice(i,1)})},
 ap(el){pAdd(own().parts,el.dataset.i);save();render()},   // [v2.3] entra junto do seu grupo
 apall(el){const s=own(),x=el.dataset.i==="M"?"♀":"♂";S.tpl.parts.forEach(n=>{if(!n.includes(x)&&!s.parts.some(p=>p.n===n))pAdd(s.parts,n)});save();render()},
 // [v2.3] morfologia externa: marcar etapa, remover, adicionar uma ou todas as estruturas
 mt(el){const[i,k]=el.dataset.i.split("|"),p=own().me[+i];p[k]=nxt(p[k]);save();render()},
 dm(el){const o=own(),i=+el.dataset.i;rm("Estrutura removida",()=>{o.me.splice(i,1)})},
 am(el){pAdd(own().me,el.dataset.i);save();render()},
 amall(){const s=own();S.tpl.me.forEach(n=>{if(!s.me.some(p=>p.n===n))pAdd(s.me,n)});save();render()},
 hb(el){const h=own().hab[+el.dataset.i.split("|")[0]];h.x=nxt(h.x);save();render()},
 dh(el){const o=own(),i=+el.dataset.i;rm("Posição de habitus removida",()=>{o.hab.splice(i,1)})},
 ah(el){own().hab.push({n:el.dataset.i,x:0});save();render()},
 // [v1.2] modelos: 1 clique, excluir item, nova/editar atividade padrão, restaurar
 tq(el){const k=S.tpl.tk[+el.dataset.i];own().tasks.push(mk(k.t,k.c,STAT[0],"","",k.b));save();render()},
 tdel(el){const[k,i]=el.dataset.i.split("|");rm("Item do modelo removido",()=>{S.tpl[k].splice(+i,1)})},
 tka(){form("Nova atividade padrão",kForm,{c:CATS[0],lv:LV.gs},v=>{if(!v.t)return;const k={};kSave(k,v);S.tpl.tk.push(k);done()})},
 tke(el){const i=+el.dataset.i,k=S.tpl.tk[i];form("Editar atividade padrão",kForm,{t:k.t,c:k.c,lv:LV[k.lv],b:k.b.join(", ")},v=>{if(!v.t)return;kSave(k,v);done()},()=>rm("Atividade padrão excluída",()=>{S.tpl.tk.splice(i,1)}))},
 treset(){conf("Restaurar todos os modelos para o padrão?","Restaurar",()=>rm("Modelos restaurados",()=>{S.tpl=defTpl()}))},
 // [v1.0] criar e editar família e gênero · [v1.3] agrupamento do gênero · [v1.6] nova família abre e fecha as outras · [v2.1] ordem, autor e ano, confirmação ao excluir
 addFam(){form("Nova família",famForm,{ord:ORD[0][0]},v=>{if(!v.n)return;S.f.forEach(x=>x.o=0);S.f.push({id:uid(),n:v.n,ord:v.ord===OUTRA?"":v.ord,nt:v.nt,o:1,g:[],grp:[],tasks:[],nts:[]});done()})},
 editFam(el){const f=fam(el.dataset.i);form("Editar família",famForm,{n:f.n,ord:f.ord||OUTRA,nt:f.nt},v=>{if(!v.n)return;f.n=v.n;f.ord=v.ord===OUTRA?"":v.ord;f.nt=v.nt;done()},()=>conf("Excluir a família "+f.n+" e todos os seus "+f.g.length+" gênero(s), espécies e atividades?","Excluir",()=>rm("Família excluída",()=>{S.f=S.f.filter(x=>x!==f)})))},
 // [v2.3] gênero sem nome (un) e tipo de estudo das espécies (est); mudar o tipo atualiza as espécies sem tipo definido
 addGen(el){const[fi,xi]=el.dataset.i.split("|"),f=fam(fi),x=xi&&grById(f,xi);form("Novo gênero",gForm(f),{st:GST[0],p:PRIO[1],est:TPO[0][1],dsp:"1",gr:x?grPath(f,x):"(nenhum)"},v=>{if(!v.n)return;f.g.push({id:uid(),n:v.n,un:v.un?1:0,est:tpV(v.est),au:v.au,an:v.an,st:v.st,p:v.p,sp:v.sp,dist:v.dist,dsp:v.dsp?1:0,nt:v.nt,gr:grId(f,v.gr),tasks:[],spp:[],nts:[]});f.o=1;done()})},
 editGen(){const f=fam(V.f),g=gen(V.f,V.g);form("Editar gênero",gForm(f),{n:g.n,un:g.un?"1":"",au:g.au,an:g.an,st:g.st,p:g.p,est:tpL(g.est||TPO[0][0]),sp:g.sp,dist:g.dist,dsp:g.dsp?"1":"",nt:g.nt,gr:grLab(f,g.gr)},v=>{if(!v.n)return;const e0=g.est;Object.assign(g,{n:v.n,un:v.un?1:0,au:v.au,an:v.an,st:v.st,p:v.p,est:tpV(v.est),sp:v.sp,dist:v.dist,dsp:v.dsp?1:0,nt:v.nt,gr:grId(f,v.gr)});if(g.est!==e0)g.spp.forEach(s=>{if(!s.tp||s.tp===TPO[0][0])s.tp=g.est});done()},()=>conf("Excluir o gênero "+g.n+", com "+g.spp.length+" espécie(s) e todo o progresso?","Excluir",()=>rm("Gênero excluído",()=>{f.g=f.g.filter(x=>x!==g);V.g=null})))},
 // [v1.0] atividades: criar, editar, alternar situação (○ ◐ ●), marcar e excluir subatividade
 // [v1.3] seções/subitens já no formulário · [v1.5] prioridade e prazo · [v2.1] datas de conclusão (para o Relatório)
 addTask(){const g=own();form("Nova atividade",tForm(0,1),{c:catsFor()[0],s:STAT[0],av:String(S.cfg.xi)},v=>{if(!v.t)return;const t=mk(v.t,v.c,v.s,v.d,v.nt,sp(v.b),PRIO.includes(v.p)?v.p:"");t.xi=v.xi?1:0;t.av=Math.max(0,+v.av||0)||S.cfg.xi;if(t.s===STAT[2])t.dc=today();g.tasks.push(t);done()})},
 et(el){const g=own();editTask(g,g.tasks.find(x=>x.id===el.dataset.i))},
 cy(el){const t=own().tasks.find(x=>x.id===el.dataset.i);t.s=STAT[(STAT.indexOf(t.s)+1)%3];t.dc=t.s===STAT[2]?today():"";save();render()},
 sb(el){const[a,b]=el.dataset.i.split("|"),x=own().tasks.find(t=>t.id===a).b.find(s=>s.id===b);x.x=el.checked?today():0;save();render()},
 ds(el){const[a,b]=el.dataset.i.split("|"),t=own().tasks.find(t=>t.id===a);rm("Subitem excluído",()=>{t.b=t.b.filter(s=>s.id!==b)})},
 // [v1.0] botões da janela de formulário
 ok(){if(cb)cb.ok(vals())},cancel:closeM,del(){if(cb&&cb.del)cb.del()},
 // [v1.1] copiar backup e restaurar · [v2.1] confirmação e "Desfazer" na restauração
 copy(){const t=$("#bkp"),ok=()=>toast("Backup copiado"),fb=()=>{try{document.execCommand("copy")?ok():toast("Selecione o texto e copie manualmente")}catch(e){toast("Selecione o texto e copie manualmente")}};t.focus();t.select();t.setSelectionRange(0,t.value.length);if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t.value).then(ok,fb);else fb()},
 imp(){let o;try{o=JSON.parse($("#imp").value);if(!o||!Array.isArray(o.f))throw 0}catch(e){return toast("Backup inválido")}conf("Restaurar este backup? Tudo o que está no app agora será substituído.","Restaurar",()=>rm("Backup restaurado",()=>{S=o}))},
 // [v2.1] desfazer a última exclusão
 undo(){if(!UNDO)return;S=JSON.parse(UNDO);S.t=Date.now();UNDO=null;V.kres=null;fix();persist();render();toast("Desfeito");if(SY.on)syncLater()},   // [v2.3] conta como mudança (para sincronizar)
 // [v2.3] marcar/desmarcar como concluída direto na Agenda (fica no calendário com ✓, no dia em que foi feita)
 agck(el){const i=AGL[+el.dataset.i];if(!i)return;
  if(i.oc){const e=i.x,k=e.dd.indexOf(i.oc);if(k>=0)e.dd.splice(k,1);else e.dd.push(i.oc);save();render();return}   // [v2.4] repetição: marca só aquele dia
  const o=i.k==="t"?i.x.t:i.k==="a"?i.x:null;if(!o)return;
  if(o.s===STAT[2]){o.s=STAT[0];o.dc=""}else{o.s=STAT[2];o.dc=V.cal.d<=today()?V.cal.d:today()}
  save();render();if(o.s===STAT[2]&&o.dc!==V.cal.d)toast("Concluída hoje ("+fmt(o.dc)+")")},
 // [v2.3] conta Google: entrar, sincronizar, desconectar, opções da agenda, escolha na 1ª sincronização, versão guardada
 gcon(){gLogin(async()=>{try{const a=await gF("/drive/v3/about?fields=user(emailAddress)");SY.email=(a&&a.user&&a.user.emailAddress)||SY.email}catch(e){}SY.on=1;sySave();render();syncNow(1)})},
 sync(){if(!SY.on){closeMenu();go("k");return}syncNow(1)},
 gdes(){conf("Desconectar a conta Google neste aparelho? Os dados continuam aqui e no Drive; a sincronização só volta quando você entrar de novo.","Desconectar",()=>{Object.assign(SY,{on:0,tok:"",exp:0,email:"",last:0,cal:0,at:0});GERR="";sySave();closeM();render();syncUI()})},
 gpush(el){S.gg.push=el.checked?1:0;save()},
 gsrc(el){const id=el.dataset.i;S.gg.src=S.gg.src.filter(x=>x!==id).concat(el.checked?[id]:[]);save()},
 sypick(el){SY.pick=el.dataset.i;closeM();syncNow(1)},
 outra(){conf("Trocar os dados atuais pela versão guardada? Os atuais ficam guardados no lugar dela.","Restaurar",()=>{const O=outraV();if(!O||!O.data)return closeM();rm("Versão guardada restaurada",()=>{guardaOutra(S,"a que estava em uso antes de restaurar");S=O.data})})},
 // [v2.4] seções retráteis da espécie
 sec(el){const[id,k]=el.dataset.i.split("|"),s=spc(V.f,V.g,id);if(!s)return;s.op=s.op||{};s.op[k]=s.op[k]?0:1;saveUI();render()},
 // [v2.4] material-tipo: editar linha, nova linha, etapa (3 estados), excluir, localidade-tipo e observações
 tye(el){const s=own(),r=s.ty.L[+el.dataset.i];if(r)tyForm(s,r)},
 tya(el){tyForm(own(),{id:uid(),r:el.dataset.i,n:"",sx:SEXO[0],dep:""},1)},
 tyc(el){const[i,k]=el.dataset.i.split("|"),r=own().ty.L[+i];r[k]=nxt(r[k]);save();render()},
 tyd(el){const s=own(),i=+el.dataset.i;rm("Linha do material-tipo removida",()=>{s.ty.L.splice(i,1)})},
 tyi(){const s=own();form("Material-tipo",[{k:"lt",l:"Localidade-tipo",t:"area"},{k:"nt",l:"Observações (designação, condição do exemplar, etiquetas...)",t:"area"}],{lt:s.ty.lt,nt:s.ty.nt},v=>{s.ty.lt=v.lt;s.ty.nt=v.nt;done()})},
 // [v2.4] distribuição da espécie
 edi(){const s=own();form("Distribuição geográfica",[{k:"dist",l:"Áreas, separadas por ponto e vírgula ou uma por linha (ex.: Brasil: SP, RJ; Argentina: Misiones)",t:"area"}],{dist:s.dist},v=>{s.dist=v.dist;done()})},
 // [v2.4] dados moleculares: amostra/extração, voucher e marcadores
 moa(el){const k=el.dataset.i.split("|")[1],m=own().mol;m[k]=nxt(m[k]);save();render()},
 mov(){const s=own();form("Voucher / código do extrato",[{k:"v",l:"Código (ex.: voucher DNA-0123, nº da extração)"}],{v:s.mol.v},v=>{s.mol.v=v.v;done()})},
 mkc(el){const[i,k]=el.dataset.i.split("|"),m=own().mol.ms[+i];m[k]=nxt(m[k]);save();render()},
 mka(el){own().mol.ms.push({id:uid(),m:el.dataset.i,g:0,acc:""});save();render()},
 mkf(){const s=own();form("Novo marcador",mkForm(),{m:S.tpl.mk[0],src:LAB},v=>{const m=v.m===OUTRO?v.mo:v.m;if(!m)return toast("Informe o marcador");s.mol.ms.push({id:uid(),m,g:v.src===GBK?1:0,acc:v.acc});done()})},
 mke(el){const s=own(),x=s.mol.ms[+el.dataset.i];if(!x)return;const inL=S.tpl.mk.includes(x.m);form("Editar marcador",mkForm(),{m:inL?x.m:OUTRO,mo:inL?"":x.m,src:x.g?GBK:LAB,acc:x.acc},v=>{const m=v.m===OUTRO?v.mo:v.m;if(!m)return toast("Informe o marcador");Object.assign(x,{m,g:v.src===GBK?1:0,acc:v.acc});if(x.g){x.p=0;x.s=0}done()},()=>rm("Marcador removido",()=>{s.mol.ms=s.mol.ms.filter(y=>y!==x)}))},
 mkd(el){const s=own(),i=+el.dataset.i;rm("Marcador removido",()=>{s.mol.ms.splice(i,1)})},
 // [v2.4] família: ver tudo numa tela ou por subgrupos
 fvw(el){const f=fam(el.dataset.i);f.vw=navMode(f)?"lista":"nav";saveUI();render()},
 // [v2.4] configurações
 cfg(el){S.cfg[el.dataset.i]=el.checked?1:0;save()},
 cfgesc(el){S.sc.on=el.checked?1:0;save()},
 // [v2.4] Painel: abrir item ‼ · Agenda: concluir/criar tarefa sem data · Relatório: corrigir data · botões extras das janelas
 xii(el){const i=XIL[+el.dataset.i];if(!i)return;if(i.x)editTask(i.x.o||i.x.s||i.x.g,i.x.t);else eagO(i.e,i.oc||"")},
 ndck(el){const e=S.ag.find(x=>x.id===el.dataset.i);if(!e)return;e.s=STAT[2];e.dc=today();save();render();toast("Concluída hoje: fica no calendário de hoje")},
 addNd(){A.addAg(null,1)},
 rpe(el){const R=REPI[+el.dataset.i];if(R&&R.length)datForm(R)},
 fx(el){const x=cb&&cb.fx&&cb.fx[+el.dataset.i];if(x)x.f()},
 // [v2.2] Google Agenda
 gcal(el){const i=AGL[+el.dataset.i];if(i)window.open(gUrl(i),"_blank")},
 icsx(){const r=icsExport();if(!r.n)return toast("Nenhum prazo de hoje em diante");baixar("diario-prazos-"+today()+".ics",r.txt,"text/calendar");toast(pl(r.n,"prazo","prazos")+" no arquivo")},
 kclr(){conf("Remover da Agenda todos os eventos trazidos do Google Agenda? (No Google nada muda.)","Remover",()=>rm("Eventos do Google removidos",()=>{S.ag=S.ag.filter(x=>!x.gk)}))},
 // [v2.1] diário de notas
 addNt(){const o=own();form("Nova nota",ntForm,{d:today()},v=>{if(!v.tx)return;o.nts.push({id:uid(),d:v.d||today(),tx:v.tx});done()})},
 eNt(el){const o=own(),n=o.nts.find(x=>x.id===el.dataset.i);form("Editar nota",ntForm,{d:n.d,tx:n.tx},v=>{if(!v.tx)return;n.d=v.d||n.d;n.tx=v.tx;done()},()=>rm("Nota excluída",()=>{o.nts=o.nts.filter(x=>x!==n)}))},
 // [v2.1] relatório
 rpk(el){const k=el.dataset.i,td=today(),r=V.rp;r.k=k;if(k==="7"){r.a=addD(td,-6);r.b=td}else if(k==="m"){r.a=td.slice(0,8)+"01";r.b=td}else if(k==="mp"){const z=addD(td.slice(0,8)+"01",-1);r.a=z.slice(0,8)+"01";r.b=z}render()},
 rpc(){copyText(repText(),"Relatório copiado")},
 rps(){navigator.share({title:"Relatório de atividades",text:repText()}).catch(()=>{})},
 // [v2.1] organizar
 ordG(){const r={tab:"g",f:V.f,g:V.g,u:null};V.oF=V.f;V.oG=V.g;go("o");V.ret=r},
 oF(el){const i=el.dataset.i;V.oF=V.oF===i?null:i;V.oG=null;render()},
 oG(el){const i=el.dataset.i;V.oG=V.oG===i?null:i;render()},
 az(el){const[k,p,x]=el.dataset.i.split("|");let a,ids;
  if(k==="f"){a=S.f;ids=a.map(o=>o.id)}
  else if(k==="g"){const f=fam(p);a=f.g;ids=a.filter(g=>x?g.gr===x:!grById(f,g.gr)).map(g=>g.id)}
  else{a=gById(p).spp;ids=a.map(o=>o.id)}
  const nm=id=>nz(a.find(o=>o.id===id).n);
  ids.sort((u,v)=>nm(u).localeCompare(nm(v),"pt"));reorderArr(a,ids);save();render();toast("Em ordem alfabética")},
 // [v2.1] tema
 theme(el){const t=el.dataset.i;try{t?localStorage.setItem(THK,t):localStorage.removeItem(THK)}catch(e){}applyTheme(t)}
};

// ===== 8. EVENTOS (escuta cliques, digitação e teclas) =====
// [v1.6] descobre em qual aba de espécie foi o clique (para várias espécies abertas ao mesmo tempo)
["click","keydown"].forEach(ev=>document.addEventListener(ev,e=>{const w=e.target.closest&&e.target.closest("[data-sp]");V.ow=w?w.dataset.sp:null},true));   // qual espécie (aba) recebeu o clique/tecla
// [v1.0] um só "ouvinte" de cliques chama a ação do botão (data-a) · busca enquanto digita
document.addEventListener("click",e=>{const el=e.target.closest("[data-a]");if(el&&A[el.dataset.a]){if(el.type!=="checkbox")e.preventDefault&&0;A[el.dataset.a](el)}});
document.addEventListener("input",e=>{if(e.target.id==="q"){V.q=e.target.value;list()}});
document.addEventListener("change",e=>{const el=e.target;if(el.dataset&&el.dataset.rp&&el.value){V.rp[el.dataset.rp]=el.value;render()}   // [v2.1] datas do relatório
 if(el.id==="kfrom"&&el.value)V.kf.from=el.value;if(el.id==="kcol")V.kf.col=el.value;if(el.id==="krm")V.kf.rm=el.checked?1:0;   // [v2.2] opções da importação
 if(el.id==="icsf"&&el.files&&el.files[0]){lerAgenda(el.files[0]);el.value=""}
 if(el.id==="gcol"){S.gg.col=el.value;save()}   // [v2.3] cor dos eventos trazidos do Google
 const c=el.dataset&&el.dataset.c;   // [v2.4] tipo primário do material-tipo e listas/números das Configurações
 if(c==="typr"){const s=spc(V.f,V.g,el.dataset.s);if(s)setPr(s,el.value)}
 if(c==="cfg"){S.cfg[el.dataset.i]=el.value;save()}
 if(c==="cfgn"){S.cfg[el.dataset.i]=Math.max(0,+el.value||0);save()}});
// [v1.0] Enter no campo "+ subatividade" adiciona e mantém o cursor no campo
document.addEventListener("keydown",e=>{const el=e.target;if(e.key==="Enter"&&el.dataset&&el.dataset.sub&&el.value.trim()){const t=own().tasks.find(x=>x.id===el.dataset.sub);t.b.push({id:uid(),t:el.value.trim(),x:0});save();render();const n=document.querySelector(`[data-sub="${t.id}"]`);if(n)n.focus()}});
// deslizar com o dedo: a tela acompanha o gesto e troca com animação suave
// [v2.0?] deslizar entre as abas principais (Grupos, Painel, Agenda, Contagem) e para voltar
const pane=$("#app");
let tx=0,ty=0,tt=0,mode=0;   // mode: 0 = indefinido, 1 = horizontal, -1 = vertical/ignorar
const MAIN=["g","p","a","c"];
const swTarget=dx=>{const i=MAIN.indexOf(V.tab);if(i<0)return dx>0?"back":null;if(!i&&(V.g||V.u))return dx>0?"back":null;return MAIN[i+(dx<0?1:-1)]||null};
pane.addEventListener("touchstart",e=>{const t=e.touches[0];tx=t.clientX;ty=t.clientY;tt=Date.now();mode=e.target.closest("input,textarea,select,.hd")?-1:0;pane.style.transition="none"},{passive:true});
pane.addEventListener("touchmove",e=>{
 const t=e.touches[0],dx=t.clientX-tx,dy=t.clientY-ty;
 if(!mode&&(Math.abs(dx)>10||Math.abs(dy)>10))mode=Math.abs(dx)>Math.abs(dy)*1.5?1:-1;
 if(mode!==1)return;
 pane.style.transform=`translateX(${dx*(swTarget(dx)?0.55:0.12)}px)`;   // sem destino: só uma leve resistência
 pane.style.opacity=1-Math.min(Math.abs(dx)/500,0.4);
},{passive:true});
function release(e){
 if(mode!==1)return;
 const dx=(e.changedTouches?e.changedTouches[0].clientX:tx)-tx,alvo=swTarget(dx),rapido=Math.abs(dx)/(Date.now()-tt+1)>0.5;
 if(alvo&&(Math.abs(dx)>90||(rapido&&Math.abs(dx)>40))){
  pane.style.transition="transform .16s ease-in,opacity .16s ease-in";   // sai deslizando...
  pane.style.transform=`translateX(${dx<0?-70:70}px)`;pane.style.opacity=0;
  setTimeout(()=>{pane.style.transition="none";pane.style.transform="";pane.style.opacity="";   // ...e a nova tela entra
   if(alvo==="back")A.navback();else go(alvo)},160);
 }else{pane.style.transition="transform .28s cubic-bezier(.2,.8,.2,1),opacity .28s";pane.style.transform="";pane.style.opacity=""}   // volta suavemente
 mode=0;
}
pane.addEventListener("touchend",release,{passive:true});
pane.addEventListener("touchcancel",release,{passive:true});
// [v1.2] Enter nos campos "+ outra posição de habitus" e "+ adicionar" dos Modelos
document.addEventListener("keydown",e=>{ // Enter nos campos de habitus e de modelos
 const el=e.target,v=el.value&&el.value.trim();if(e.key!=="Enter"||!v)return;
 if(el.dataset.hab)own().hab.push({n:v,x:0});else if(el.dataset.me)pAdd(own().me,pNorm(v));else if(el.dataset.pa)pAdd(own().parts,pNorm(v));else if(el.dataset.tadd)S.tpl[el.dataset.tadd].push(["parts","me"].includes(el.dataset.tadd)?pNorm(v):v);else return;   // [v2.3] estruturas, peças avulsas e subitens (Grupo > item)
 save();render();const n=document.querySelector(el.dataset.hab?"[data-hab]":el.dataset.me?"[data-me]":el.dataset.pa?"[data-pa]":`[data-tadd="${el.dataset.tadd}"]`);if(n)n.focus();
});
// [v1.0] tocar fora da janela de formulário fecha a janela
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeM()});

// ----- [v2.1] arrastar para reordenar (tela Organizar) -----
let DR=null;   // item sendo arrastado
document.addEventListener("pointerdown",e=>{
 const h=e.target.closest(".hd");if(!h||DR)return;
 const it=h.closest(".oi"),ls=it.parentElement,r=it.getBoundingClientRect(),ph=document.createElement("div");
 e.preventDefault();ph.className="oph";ph.style.height=r.height+"px";ls.insertBefore(ph,it);   // "buraco" onde o item vai cair
 Object.assign(it.style,{position:"fixed",left:r.left+"px",top:r.top+"px",width:r.width+"px",zIndex:40});it.classList.add("drg");
 DR={it,ls,ph,dy:e.clientY-r.top,y:e.clientY,v:0,id:e.pointerId};
 try{h.setPointerCapture(e.pointerId)}catch(_){}
 DR.t=setInterval(()=>{if(DR&&DR.v){pane.scrollTop+=DR.v;dmove()}},16);   // rola a tela perto das bordas
});
function dmove(){const d=DR;d.it.style.top=(d.y-d.dy)+"px";
 let before=null;for(const s of d.ls.children){if(s===d.it||!s.classList.contains("oi"))continue;const r=s.getBoundingClientRect();if(d.y<r.top+r.height/2){before=s;break}}
 if(before)d.ls.insertBefore(d.ph,before);else d.ls.appendChild(d.ph);
 const a=pane.getBoundingClientRect();d.v=d.y<a.top+70?-9:d.y>a.bottom-70?9:0}
document.addEventListener("pointermove",e=>{if(!DR||e.pointerId!==DR.id)return;DR.y=e.clientY;dmove()});
function dend(){if(!DR)return;const d=DR;DR=null;clearInterval(d.t);d.ls.insertBefore(d.it,d.ph);d.ph.remove();d.it.removeAttribute("style");d.it.classList.remove("drg");
 const ids=[...d.ls.children].filter(x=>x.classList.contains("oi")).map(x=>x.dataset.id),arr=listArr(d.ls.dataset.k,d.ls.dataset.p);
 if(arr){reorderArr(arr,ids);save()}}
document.addEventListener("pointerup",dend);document.addEventListener("pointercancel",dend);

// ----- [v2.1] botão/gesto "voltar" do Android: fecha janela, menu ou volta de tela -----
const modalOn=()=>$("#modal").classList.contains("on");
const canBack=()=>modalOn()||!$("#menu").hidden||V.tab!=="g"||!!(V.g||V.u);
let skipPop=0;
function syncHist(){const st=history.state&&history.state.app;if(canBack()&&!st)history.pushState({app:1},"");else if(!canBack()&&st&&!skipPop){skipPop=1;history.back()}}
addEventListener("popstate",()=>{if(skipPop){skipPop=0;syncHist();return}if(modalOn())closeM();else if(!$("#menu").hidden)closeMenu();else if(canBack())A.navback();syncHist()});

// ----- [v2.1] tema: automático (segue o celular), claro ou escuro -----
function applyTheme(t){const r=document.documentElement;if(t)r.dataset.theme=t;else delete r.dataset.theme;
 const dk=t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches),m=$('meta[name="theme-color"]');if(m)m.content=dk?"#0a1610":"#12301f";
 document.querySelectorAll("#thm button").forEach(b=>b.classList.toggle("on",b.dataset.i===(t||"")))}
const temaAtual=()=>{try{return localStorage.getItem(THK)||""}catch(e){return""}};
try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>applyTheme(temaAtual()))}catch(e){}

// ===== 9. INÍCIO (primeira vez que a tela é desenhada) =====
applyTheme(temaAtual());   // [v2.1]
render();   // [v1.0]
syncUI();if(SY.on)syncLater(700);   // [v2.3] sincroniza logo ao abrir (se o acesso do Google ainda vale)

setInterval(()=>{if(V.tab==="c")tick()},20000);   // atualiza as contagens   // [v1.4]

// ===== 10. MODO OFFLINE / INSTALÁVEL (registra o service worker) =====
// [v1.1] registra o sw.js para o app funcionar sem internet
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
