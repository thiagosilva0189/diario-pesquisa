// =====================================================================
// Diário de Pesquisa — dados.js: A BASE DO APP
// Listas fixas (situações, categorias, peças, modelos de 1 clique), pequenas
// ferramentas usadas em todo o app, os dados salvos (S) e a tela atual (V),
// salvar e desfazer, migração de dados antigos (fix), janela de formulário,
// barra de progresso e nomes científicos. As ações de cada parte (A) começam
// aqui e são completadas nos outros arquivos.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== 1. LISTAS FIXAS (situações, categorias, peças, modelos) =====
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

// ===== 2. FERRAMENTAS (pequenas funções usadas em todo o app) =====
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
// [v2.3] data e hora de um registro: "hoje às 10:32" ou "25/11/2026 às 08:10"
const quando=ts=>{const d=new Date(+ts);if(!+ts||isNaN(d))return"—";const ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");return(ds===today()?"hoje":fmt(ds))+" às "+String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0")};
// [v1.4] plural: pl(1,"dia","dias") → "1 dia" · pl(3,"dia","dias") → "3 dias"
const pl=(n,a,b)=>n+" "+(n===1?a:b);
// [v1.9] número com 2 dígitos (5 → "05")
const p2=n=>String(n).padStart(2,"0");
// [v1.9] data "AAAA-MM-DD" → nº do dia (para contar dias entre duas datas)
const D8=s=>Date.UTC(+s.slice(0,4),+s.slice(5,7)-1,+s.slice(8,10))/864e5;
// [v2.1] distância até a data: "hoje", "amanhã", "em 5 dias", "atrasado 2 dias"
const rel=ds=>{const n=D8(ds)-D8(today());return n===0?"hoje":n===1?"amanhã":n>1?"em "+n+" dias":"atrasado "+pl(-n,"dia","dias")};

// ===== 3. DADOS SALVOS (S) E TELA ATUAL (V) =====
// [v1.0] dados de exemplo da primeira abertura (depois ganhou: modelos v1.2, ordem e notas v2.1)
function seed(){return{t:0,tpl:defTpl(),f:[{id:uid(),n:"Biphyllidae",ord:"Coleoptera",nt:"Exemplo: edite ou apague.",o:1,g:[{id:uid(),n:"Gênero exemplo",st:"Potencial",p:"Média",sp:"",nt:"Abra o gênero, toque em + Espécie e use os modelos de 1 clique.",tasks:[],spp:[]}]}]}}
// [v1.1] carrega os dados salvos no aparelho (ou usa o exemplo)
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.f))S=seed();
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
fix();
// [v1.0] tela atual (aba, família, gênero, busca) · [v1.3] u = atividades da família/gerais
let V={tab:"g",f:null,g:null,s:null,u:null,q:""},cb=null;
V.cal={y:+today().slice(0,4),m:+today().slice(5,7)-1,d:today()};   // [v1.8] mês e dia escolhidos na Agenda
V.pt="x";   // [v1.10] subaba aberta do Painel
V.rp={k:"7",a:addD(today(),-6),b:today()};   // [v2.1] período do relatório
V.oF=null;V.oG=null;V.ret=null;               // [v2.1] tela Organizar: família/gênero abertos e tela de retorno
V.kf={from:today(),col:"blue",rm:1};V.kres=null; // [v2.2] opções e resultado da importação do Google Agenda
V.hs=[];   // [v2.4] caminho percorrido na aba Grupos (família › subgrupo › gênero), para o "voltar"
// [v2.0] área que rola (usada pelos gestos de deslizar e pelo arrastar da tela Organizar)
const pane=$("#app");
// [v1.0] achar família e gênero · [v1.2] achar espécie · [v2.1] gênero só pelo código (gById)
const fam=id=>S.f.find(f=>f.id===id),gen=(f,g)=>{const F=fam(f);return F&&F.g.find(x=>x.id===g)};
const spc=(f,g,s)=>{const G=gen(f,g);return G&&G.spp.find(x=>x.id===s)};
const gById=id=>{for(const f of S.f){const g=f.g.find(x=>x.id===id);if(g)return g}};
// [v1.2] "dono" das atividades na tela · [v1.3] família/gerais (V.u) · [v1.6] espécie da aba tocada (V.ow)
const own=()=>V.u?supOwn():V.ow?spc(V.f,V.g,V.ow):gen(V.f,V.g);

// ===== 4. SALVAR, AVISOS E DESFAZER =====
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

// ===== 5. BARRA DE PROGRESSO E JANELA DE FORMULÁRIO =====
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
const done=()=>{fix();save();closeM();render()}; // fix() garante que itens novos tenham todos os campos
// [v1.0] tocar fora da janela de formulário fecha a janela
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeM()});
// [v1.2] botões de 1 clique (modelos)
const chip=(a,i,t)=>`<button class="chip" data-a="${a}" data-i="${esc(i)}">+ ${esc(t==null?i:t)}</button>`;

// ===== 6. NOMES CIENTÍFICOS (gênero, espécie, autor) =====
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

// ===== AÇÕES (o que cada botão faz) =====
// A guarda as ações do app inteiro. Cada arquivo acrescenta as suas com Object.assign(A,{...}).
// Um botão com data-a="nome" chama A.nome (o ouvinte de cliques fica no inicio.js).
const A={
 // [v1.0] botões da janela de formulário
 ok(){if(cb)cb.ok(vals())},cancel:closeM,del(){if(cb&&cb.del)cb.del()},
 // [v2.1] desfazer a última exclusão
 undo(){if(!UNDO)return;S=JSON.parse(UNDO);S.t=Date.now();UNDO=null;V.kres=null;fix();persist();render();toast("Desfeito");if(SY.on)syncLater()},   // [v2.3] conta como mudança (para sincronizar)
 // [v2.4] botões extras das janelas (ex.: "Pular só este dia" numa repetição)
 fx(el){const x=cb&&cb.fx&&cb.fx[+el.dataset.i];if(x)x.f()},
};
