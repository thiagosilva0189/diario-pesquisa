
// ===== 1. CONSTANTES (listas fixas: situações, categorias, modelo de tarefas) =====
// Trechos marcados com [v2.1] e [v2.2] são novidades dessas versões.
const KEY="diario-pesquisa-v1";
const THK="diario-tema";   // [v2.1] tema escolhido no menu (guardado à parte, fora do backup)
const STAT=["A fazer","Em execução","Concluída"];
const GST=["Potencial","Planejado","Em andamento","Pausado","Concluído"];
const PRIO=["Alta","Média","Baixa"];
const CATS=["Revisão bibliográfica","Material / empréstimos","Coleta","Triagem e identificação","Montagem de espécimes","Dissecção","Genitália / preparação","Fotografia / montagem","Ilustração","Morfometria","Matriz de caracteres","Molecular","Análise filogenética","Descrição / redescrição","Mapas e distribuição","Escrita","Revisão e submissão","Outra"];
const STEPS = [["d","D","Dissecada"],["l","L","Lâmina montada"],["i","I","Ilustrada"],["f","F","Fotografada"]];
const ONLY_S = ["Dissecção","Genitália / preparação","Fotografia / montagem"];   // só espécie
const ONLY_G = ["Matriz de caracteres","Análise filogenética"];                 // só gênero
const LV = {g:"Só gênero", s:"Só espécie", gs:"Gênero e espécie", f:"Família / geral", gsf:"Todos os níveis"};
const GCOL=["gray","purple","blue","orange","green"],PCOL=["red","yellow","green"];   // cores: situação do gênero e prioridade
const gc=v=>GCOL[GST.indexOf(v)],pc=v=>PCOL[PRIO.indexOf(v)];
const WR=["Escrita","Revisão e submissão"];
// [v2.1] combinação do nome da espécie (Código Internacional de Nomenclatura Zoológica, art. 51.3):
// se a espécie está hoje em outro gênero que não o original, autor e ano vão entre parênteses
const CBO=["Original","Nova combinação (autor e ano entre parênteses)"];
// [v2.1] ordens de insetos da família e seus ícones (para incluir outra ordem: acrescente aqui e em ICO)
const ORD=[["Coleoptera","col"],["Lepidoptera","lep"],["Diptera","dip"],["Hymenoptera","hym"],["Hemiptera","hem"]];
const OUTRA="Outra / não informada";
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
const defTpl = () => ({
  parts: ["Antena","Labro","Mandíbulas","Maxilas","Lábio","Perna protorácica","Perna mesotorácica","Perna metatorácica","Asa metatorácica","Metaendosternito","Terminália (esternitos VIII–X, tergitos VIII–XI)","Edeago ♂ (tegmen e lobo médio)","Ovipositor ♀","Espermateca ♀"],
  hab: ["Dorsal","Lateral","Frontal","Ventral"],
  tk: [
    {c:"Revisão bibliográfica", t:"Levantar descrições originais e literatura", lv:"gs", b:[]},
    {c:"Material / empréstimos", t:"Solicitar empréstimos de material e tipos", lv:"gs", b:["Listar coleções","Enviar pedidos","Registrar recebimento"]},
    {c:"Triagem e identificação", t:"Triagem e morfoespécies", lv:"g", b:[]},
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
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const uid=()=>Math.random().toString(36).slice(2,9);
const today=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
const fmt=d=>d.split("-").reverse().join("/");
const mk=(t,c,s,d,nt,b,p)=>({id:uid(),t,c,s:s||STAT[0],d:d||"",nt:nt||"",p:p||"",b:(b||[]).map(x=>({id:uid(),t:x,x:0}))});
// [v2.1] soma n dias a uma data "AAAA-MM-DD"
const addD=(ds,n)=>{const d=new Date(ds+"T12:00:00");d.setDate(d.getDate()+n);return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")};
// [v2.1] texto sem acentos e em minúsculas (para a busca achar "especie" e "espécie")
const nz=s=>String(s==null?"":s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
// [v2.1] autor e ano: "Sharp, 1900" ou "(Sharp, 1900)" se for nova combinação
const auth=o=>{const a=[o.au,o.an].map(x=>String(x||"").trim()).filter(Boolean).join(", ");return a?(o.cn?"("+a+")":a):""};
const authH=o=>{const a=auth(o);return a?` <span class="au">${esc(a)}</span>`:""};

// ===== 3. ESTADO (todos os dados vivem em S; a tela atual em V) =====
function seed(){return{t:0,tpl:defTpl(),f:[{id:uid(),n:"Biphyllidae",ord:"Coleoptera",nt:"Exemplo: edite ou apague.",o:1,g:[{id:uid(),n:"Gênero exemplo",st:"Potencial",p:"Média",sp:"",nt:"Abra o gênero, toque em + Espécie e use os modelos de 1 clique.",tasks:[],spp:[]}]}]}}
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.f))S=seed();
fix();
let V={tab:"g",f:null,g:null,s:null,u:null,q:""},cb=null;
V.cal={y:+today().slice(0,4),m:+today().slice(5,7)-1,d:today()};
V.pt="x";
V.rp={k:"7",a:addD(today(),-6),b:today()};   // [v2.1] período do relatório
V.oF=null;V.oG=null;V.ret=null;               // [v2.1] tela Organizar: família/gênero abertos e tela de retorno
V.kf={from:today(),col:"blue",rm:1};V.kres=null; // [v2.2] opções e resultado da importação do Google Agenda
const fam=id=>S.f.find(f=>f.id===id),gen=(f,g)=>{const F=fam(f);return F&&F.g.find(x=>x.id===g)};
const spc=(f,g,s)=>{const G=gen(f,g);return G&&G.spp.find(x=>x.id===s)};
const gById=id=>{for(const f of S.f){const g=f.g.find(x=>x.id===id);if(g)return g}};
const own=()=>V.u?supOwn():V.ow?spc(V.f,V.g,V.ow):gen(V.f,V.g);

// ===== 4. SALVAR (localStorage), AVISOS E "DESFAZER" =====
let UNDO=null,TT=0;   // [v2.1] UNDO = cópia dos dados antes da última exclusão
function persist(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){toast("Não foi possível salvar!")}}
function save(){S.t=Date.now();persist();if(UNDO){UNDO=null;$("#toast").style.display="none"}}   // outra mudança cancela o "Desfazer"
function toast(m,u){const t=$("#toast");t.innerHTML=`<span>${esc(m)}</span>`+(u?'<button data-a="undo">Desfazer</button>':"");t.style.display="flex";clearTimeout(TT);TT=setTimeout(()=>{t.style.display="none";if(u)UNDO=null},u?6000:2200)}
// [v2.1] excluir com "Desfazer": guarda uma cópia de tudo, exclui e mostra o aviso por 6 segundos
function rm(msg,fn){const snap=JSON.stringify(S);fn();fix();S.t=Date.now();persist();closeM();render();UNDO=snap;toast(typeof msg==="function"?msg():msg,1)}
// [v2.1] pergunta de confirmação dentro do app (no lugar da janelinha do navegador)
function conf(msg,lab,fn){$("#modal").innerHTML=`<div class="sheet"><h3>Tem certeza?</h3><p>${esc(msg)}</p><div class="r"><button class="dng" data-a="ok">${esc(lab)}</button><button class="sec" data-a="cancel">Cancelar</button></div></div>`;$("#modal").classList.add("on");cb={ok:fn};syncHist()}
// [v2.1] copiar texto (relatório) para a área de transferência
function copyText(s,msg){const ok=()=>toast(msg||"Copiado"),fb=()=>{const t=document.createElement("textarea");t.value=s;t.style.cssText="position:fixed;opacity:0";document.body.appendChild(t);t.select();try{document.execCommand("copy")?ok():toast("Não foi possível copiar")}catch(e){toast("Não foi possível copiar")}t.remove()};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(s).then(ok,fb);else fb()}

// ===== 5. FORMULÁRIOS E TELAS (funções que devolvem HTML) =====
function units(o){let d=0,n=o.tasks.length;d+=o.tasks.filter(t=>t.s===STAT[2]).length;
 if(o.parts){o.parts.forEach(p=>STEPS.forEach(x=>{n++;d+=p[x[0]]?1:0}));o.hab.forEach(h=>{n++;d+=h.x?1:0})}
 if(o.spp)o.spp.forEach(s=>{const u=units(s);d+=u[0];n+=u[1]});return[d,n]}
function prog(o){const[d,n]=units(o);return`<div class="bar"><span style="width:${n?d/n*100:0}%"></span></div><small>${d}/${n} itens concluídos</small>`}
function form(title,fields,vals,ok,del,dl){
 $("#modal").innerHTML=`<div class="sheet"><h3>${title}</h3>${fields.map(f=>`<label>${f.l}${f.t==="area"?`<textarea name="${f.k}">${esc(vals[f.k])}</textarea>`:f.t==="sel"?`<select name="${f.k}">${f.o.map(o=>`<option${o===vals[f.k]?" selected":""}>${esc(o)}</option>`).join("")}</select>`:`<input name="${f.k}" type="${f.t||"text"}" value="${esc(vals[f.k])}">`}</label>`).join("")}<div class="r"><button class="pri" data-a="ok">Salvar</button><button class="sec" data-a="cancel">Cancelar</button>${del?`<button class="dng" data-a="del">${dl||"Excluir"}</button>`:""}</div></div>`;
 $("#modal").classList.add("on");cb={ok,del};syncHist();
}
const closeM=()=>{$("#modal").classList.remove("on");cb=null;syncHist()};
const vals=()=>{const o={};document.querySelectorAll("#modal [name]").forEach(e=>o[e.name]=e.value.trim());return o};
const gForm=f=>[{k:"n",l:"Nome do gênero"},{k:"au",l:"Autor (opcional)"},{k:"an",l:"Ano (opcional)"}].concat(f.grp.length?[{k:"gr",l:"Agrupamento (opcional)",t:"sel",o:["(nenhum)"].concat(grAll(f).map(x=>grPath(f,x)))}]:[],[{k:"st",l:"Situação",t:"sel",o:GST},{k:"p",l:"Prioridade",t:"sel",o:PRIO},{k:"sp",l:"Nº de espécies (aprox.)"},{k:"nt",l:"Notas",t:"area"}]);
const tForm=(c,nw,o)=>[{k:"t",l:"Atividade"},{k:"c",l:"Categoria",t:"sel",o:!c||catsFor(o).includes(c)?catsFor(o):[c,...catsFor(o)]},{k:"s",l:"Situação",t:"sel",o:STAT},{k:"p",l:"Prioridade",t:"sel",o:["Sem prioridade",...PRIO]},{k:"d",l:"Prazo",t:"date"}].concat(nw?[]:[{k:"dc",l:"Data de conclusão (preenchida sozinha ao concluir)",t:"date"}],[{k:"nt",l:"Notas",t:"area"}]).concat(nw?[{k:"b",l:"Seções / subitens (separados por vírgula, opcional)"}]:[]);

function vGroups(){return`<div class="tools"><input id="q" type="search" placeholder="Buscar família, gênero ou espécie" value="${esc(V.q)}" style="flex:1;min-width:0"><button class="sec" data-a="tgf" style="white-space:nowrap">${S.f.some(f=>f.o)?"Fechar todas":"Abrir todas"}</button></div><div class="card gen" id="gecard" style="border-top:0" data-a="ou" data-i="*"><b>📌 Atividades gerais</b> <small>sem família</small><div><span class="chip">${S.ge.tasks.filter(t=>t.s!==STAT[2]).length} em aberto</span></div>${prog(S.ge)}</div><div id="list"></div>`}
function taskH(t){
 const k=STAT.indexOf(t.s),over=t.d&&t.d<today()&&k<2,sd=t.b.filter(x=>x.x).length;
 return`<div class="task s${k}"><div class="r"><button class="st k${k}" data-a="cy" data-i="${t.id}" title="Alternar situação">${["○","◐","●"][k]}</button><div class="g1"><b>${esc(t.t)}</b><div><span class="chip">${esc(t.c)}</span>${t.p?`<span class="chip ${pc(t.p)}">Prioridade ${esc(t.p.toLowerCase())}</span>`:""}<button class="chip ${t.d?(over?"red":"blue"):""}" data-a="dd" data-i="${t.id}">📅 ${t.d?fmt(t.d):"+ prazo"}</button>${k===2&&t.dc?`<span class="chip green">✓ ${fmt(t.dc)}</span>`:""}${t.b.length?`<span class="chip">${sd}/${t.b.length}</span>`:""}</div></div><button class="ic" data-a="et" data-i="${t.id}">✎</button></div>${t.nt?`<div class="note" style="margin:4px 0 0 46px">${esc(t.nt)}</div>`:""}<ul>${t.b.map(x=>`<li><label><input type="checkbox" data-a="sb" data-i="${t.id}|${x.id}"${x.x?" checked":""}><span class="${x.x?"dn":""}">${esc(x.t)}</span></label><span><button class="ic" data-a="es" data-i="${t.id}|${x.id}">✎</button><button class="ic" data-a="ds" data-i="${t.id}|${x.id}">✕</button></span></li>`).join("")}</ul><input class="addsub" data-sub="${t.id}" placeholder="${WR.includes(t.c)?"+ seção ou subitem (Enter)":"+ subatividade (Enter)"}"></div>`;
}
const spSt=s=>`<span class="chip ${gc(s.st)}">${esc(s.st)}</span><span class="chip ${pc(s.p)}">Prioridade ${esc((s.p||"").toLowerCase())}</span>`;
const spChips=s=>`${spSt(s)}${s.ex?`<span class="chip">${esc(s.ex)}</span>`:""}<span class="chip blue">Dissecção: ${esc(s.tp)}</span>${s.d?`<span class="chip ${s.d<today()?"red":"blue"}">📅 ${fmt(s.d)}</span>`:""}`;
function vGen(){
 const F=fam(V.f),g=gen(V.f,V.g);if(!g){V.g=null;return vGroups()}
 const x=grById(F,g.gr);
 let h=`<h2>${gl(g.n)}${authH(g)}</h2><div>${x?`<span class="chip">${esc(grl(x))}</span>`:""}<span class="chip ${gc(g.st)}">${esc(g.st)}</span><span class="chip ${pc(g.p)}">Prioridade ${esc(g.p.toLowerCase())}</span>${g.sp?`<span class="chip">${esc(g.sp)} spp. (estimado)</span>`:""}</div>${g.nt?`<p class="note">${esc(g.nt)}</p>`:""}${prog(g)}`;
 h+=`<div class="tools"><button class="sec" data-a="addSp">+ Espécie</button><button class="sec" data-a="editGen">Editar gênero</button></div>`;
 h+=`<div class="r" style="justify-content:space-between"><div class="grp">Espécies (${g.spp.length})</div>${g.spp.length>1?`<button class="lnk" data-a="ordG">Ordenar</button>`:""}${g.spp.length?`<button class="lnk" data-a="tgs">${g.spp.some(s=>s.o)?"Fechar todas":"Abrir todas"}</button>`:""}</div>`+(g.spp.map(s=>`<section class="card"><div class="fh" data-a="os" data-i="${s.id}"><b><em>${esc(abbr(g,s.n))}</em>${authH(s)}</b><span>${s.o?"▾":"▸"}</span></div>${s.o?`<div class="spb" data-sp="${s.id}">${vSp(s)}</div>`:`<div class="gen" style="border-top:0;padding-top:0" data-a="os" data-i="${s.id}">${spChips(s)}${prog(s)}</div>`}</section>`).join("")||'<div class="empty">Nenhuma espécie ainda. Toque no + para adicionar.</div>');
 return h+`<div class="grp">Atividades do gênero</div>`+tasksH(g)+notesH(g);
}
const allT=()=>{const r=[];S.ge.tasks.forEach(t=>r.push({u:"*",o:S.ge,t}));S.f.forEach(f=>{f.tasks.forEach(t=>r.push({f,u:f.id,o:f,t}));f.grp.forEach(x=>x.tasks.forEach(t=>r.push({f,u:f.id+"|"+x.id,o:x,t})));f.g.forEach(g=>{g.tasks.forEach(t=>r.push({f,g,t}));g.spp.forEach(s=>s.tasks.forEach(t=>r.push({f,g,s,t})))})});return r};
const where=x=>x.ag?"Atividade da agenda":x.u?(x.u==="*"?"Atividades gerais":(x.o.r?esc(grl(x.o))+" · ":"")+esc(x.f.n)):"<em>"+esc(x.s?abbr(x.g,x.s.n):x.g.n)+"</em> · "+esc(x.f.n);
// [v2.1] linha de prazo: "em 12 dias · 5 folgas" (ou "atrasado 3 dias")
const dlH=(d,dn)=>{if(!d||dn)return"";const fg=folgas(d);return`<div class="dl${d<today()?" late":""}">${rel(d)}${fg!=null?" · "+pl(fg,"folga","folgas"):""}</div>`};
const item=x=>`<div class="card gen" style="border-top:0" data-a="${x.ag?"eag":x.u?"ou":"og"}" data-i="${x.ag?x.ag.id:x.u||x.f.id+"|"+x.g.id+"|"+(x.s?x.s.id:"")}"><b>${esc(x.t.t)}</b><div><span class="chip">${esc(x.t.c)}</span>${x.t.p?`<span class="chip ${pc(x.t.p)}">Prioridade ${esc(x.t.p.toLowerCase())}</span>`:""}${x.t.d?`<span class="chip ${x.t.d<today()?"red":"blue"}">📅 ${fmt(x.t.d)}</span>`:""}</div>${dlH(x.t.d,x.t.s===STAT[2])}<small>${where(x)}</small></div>`;
// nomes: "Gênero X" automático e espécie abreviada (B. punctatus)
const gl=n=>"Gênero <em>"+esc(n)+"</em>";
const abbr=(g,n)=>{const G=(g.n||"").trim(),w=(n||"").trim();if(!G||!w)return w;const a=G[0].toUpperCase()+".";if(w.startsWith(a))return w;if(w.toLowerCase().startsWith(G.toLowerCase()+" "))return a+" "+w.slice(G.length+1);return a+" "+w};
// [v2.1] nome completo da espécie, para o relatório (Biphyllus punctatus)
const fullSp=(g,s)=>{const G=(g.n||"").trim(),w=(s.n||"").trim();if(!G||!w)return w;if(nz(w).startsWith(nz(G)+" "))return w;if(w.startsWith(G[0].toUpperCase()+". "))return G+w.slice(2);return G+" "+w};
const PT=[["x","Em execução"],["p","Prazos"],["g","Potenciais"]];
function vDash(){
 const T=allT(),G=[];S.f.forEach(f=>f.g.forEach(g=>G.push({f,g})));
 const ag=S.ag.filter(e=>e.pn).map(e=>({ag:e,t:{t:e.t,c:"Agenda",d:e.d,s:e.s,p:e.p}})),prep=[];
 G.forEach(x=>x.g.spp.forEach(s=>{if(s.d&&prepPend(s))prep.push({f:x.f,g:x.g,s,t:{t:"Dissecção e preparação das peças",c:"Dissecção",d:s.d,s:STAT[0]}})}));
 const L={
  x:T.concat(ag).filter(x=>x.t.s===STAT[1]),
  p:T.concat(prep,ag).filter(x=>x.t.d&&x.t.s!==STAT[2]).sort((a,b)=>a.t.d.localeCompare(b.t.d)),
  g:G.filter(x=>x.g.st==="Potencial").sort((a,b)=>PRIO.indexOf(a.g.p)-PRIO.indexOf(b.g.p))
 };
 const pg=x=>`<div class="card gen" style="border-top:0" data-a="og" data-i="${x.f.id}|${x.g.id}"><b>${gl(x.g.n)}</b> <small>${esc(x.f.n)}</small><div><span class="chip ${pc(x.g.p)}">Prioridade ${esc(x.g.p.toLowerCase())}</span></div></div>`;
 const k=PT.some(a=>a[0]===V.pt)?V.pt:"x",vazio={x:"Nada em execução.",p:"Nenhum prazo definido.",g:"Nenhum gênero potencial."};
 return hojeH()+prodH()+`<div class="grp">Gêneros e atividades</div><div>${GST.map(s=>`<span class="chip ${gc(s)}">${s}: ${G.filter(x=>x.g.st===s).length}</span>`).join("")}</div><div class="seg">${PT.map(([i,l])=>`<button class="${i===k?"on":""}" data-a="ptab" data-i="${i}">${l} (${L[i].length})</button>`).join("")}</div>`
 +(L[k].map(k==="g"?pg:item).join("")||`<div class="empty">${vazio[k]}</div>`);
}
// [v2.1] cartão "Hoje" no topo do Painel: escala, feriado, atrasados e próximos 7 dias
let HJL=[];
function hojeH(){
 const td=today(),lim=addD(td,7),hd=feriados(+td.slice(0,4))[td],le=escL(td);
 const L=agItems().filter(i=>!i.dn&&i.d<=lim&&!(i.k==="c"&&i.d<td)).sort((a,b)=>a.d.localeCompare(b.d)||(a.h||"").localeCompare(b.h||""));
 const late=L.filter(i=>i.d<td),up=L.filter(i=>i.d>=td),mais=Math.max(0,late.length-5)+Math.max(0,up.length-7);
 HJL=late.slice(0,5).concat(up.slice(0,7));
 const dia=new Date(td+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
 return`<div class="card hoje"><div class="hj-h"><b>${esc(dia)}</b>${le?`<span class="chip ${ESC[le]||"gray"}">Escala: ${esc(ESN[le]||le)}</span>`:""}${hd?`<span class="chip orange">🎉 ${esc(hn(hd))}</span>`:""}${late.length?`<span class="chip red">${pl(late.length,"atrasada","atrasadas")}</span>`:""}</div>`
 +(HJL.map((i,n)=>`<div class="hj${i.d<td?" late":""}" data-a="hji" data-i="${n}"><i class="dot ${i.col}"></i><span class="g1">${esc(i.t)}</span><small>${rel(i.d)}${i.h?" "+esc(i.h):""}</small></div>`).join("")||'<div class="note" style="padding:4px 0 8px">Nada atrasado nem com prazo nos próximos 7 dias.</div>')
 +`<div class="hj-f">${mais?`<small>+${mais} na aba Prazos ou na Agenda</small>`:"<span></span>"}<button class="lnk" data-a="tab" data-i="r">Relatório do período ›</button></div></div>`;
}
// [v2.1] números de produção (peças, habitus, espécies prontas e atividades)
function prodH(){
 const c={d:0,l:0,i:0,f:0},PL=["Peças dissecadas","Em lâmina","Ilustradas","Fotografadas"];let n=0,hb=0,hn=0,sp=0,sok=0;
 S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{if(s.parts.length||s.hab.length){sp++;if(!prepPend(s))sok++}
  s.parts.forEach(p=>{n++;STEPS.forEach(x=>{if(p[x[0]])c[x[0]]++})});s.hab.forEach(h=>{hn++;if(h.x)hb++})})));
 const T=allT(),td=T.filter(x=>x.t.s===STAT[2]).length,tile=(v,t,l)=>`<div><b>${v}<small>/${t}</small></b><span>${l}</span></div>`;
 return`<div class="grp">Produção</div><div class="stats">${STEPS.map((x,i)=>tile(c[x[0]],n,PL[i])).join("")}</div><div class="stats s3">${tile(hb,hn,"Habitus fotografados")}${tile(sok,sp,"Espécies com preparação completa")}${tile(td,T.length,"Atividades concluídas")}</div>`;
}
const VERSAO="2.2";   // mude aqui quando atualizar o app
function vAbout(){
 let nG=0,nS=0;S.f.forEach(f=>{nG+=f.g.length;f.g.forEach(g=>nS+=g.spp.length)});
 return`<h2>Diário de Pesquisa</h2><p class="note">Sistemática e taxonomia · versão ${VERSAO}</p><p>Aplicativo pessoal para organizar o doutorado: famílias, gêneros e espécies, atividades e subatividades, prazos, escala de trabalho, agenda e diário de notas.</p><div class="grp">Seus dados</div><p>${S.f.length} famílias · ${nG} gêneros · ${nS} espécies.<br>Ficam salvos apenas neste aparelho. Faça backups com frequência (menu ⋮ › Backup e restauração).</p><div class="grp">Abas</div><p><b>Grupos</b>: famílias, gêneros, espécies, atividades e notas.<br><b>Painel</b>: hoje, produção, em execução, prazos e gêneros potenciais.<br><b>Agenda</b>: calendário com prazos, escala e feriados.<br><b>Contagem</b>: contagens regressivas.</p><div class="grp">Menu ⋮</div><p><b>Relatório</b>: o que foi concluído num período (para copiar ou compartilhar).<br><b>Organizar</b>: arrastar famílias, gêneros e espécies ou pôr em ordem alfabética.<br><b>Google Agenda</b>: trazer eventos (arquivo exportado do Google) e enviar prazos.<br><b>Modelos</b>: atividades e peças de 1 clique.<br><b>Tema</b>: automático, claro ou escuro.</p><div class="grp">Uso offline</div><p>Depois da primeira abertura funciona sem internet e pode ser instalado na tela inicial. Com internet, atualiza sozinho para a versão mais nova.</p>`;
}
function vBackup(){return`<p class="note">Seus dados ficam salvos só neste aparelho, dentro do navegador. Copie o backup abaixo de vez em quando e guarde em lugar seguro (e-mail, Drive...).</p><textarea id="bkp" readonly style="min-height:160px">${esc(JSON.stringify(S,null,1))}</textarea><div class="tools" style="margin-top:8px"><button class="sec" data-a="copy">Copiar backup</button></div><div class="grp">Restaurar</div><textarea id="imp" placeholder="Cole aqui um backup (substitui tudo)"></textarea><div class="tools" style="margin-top:8px"><button class="dng" data-a="imp">Restaurar backup</button></div>`}

function fix(){ // completa dados antigos com os campos novos
 S.tpl=S.tpl||defTpl();
 S.ge=S.ge||{tasks:[]};S.ge.tasks=S.ge.tasks||[];S.ge.nts=S.ge.nts||[];S.cd=S.cd||[];S.ag=S.ag||[];S.sc=S.sc||{on:1,pat:"MMMMNNFFFF",ref:"2026-11-23",pos:7};
 S.f.forEach(f=>{f.grp=f.grp||[];f.tasks=f.tasks||[];f.nts=f.nts||[];if(f.ord===undefined)f.ord="Coleoptera";
  f.grp.forEach(x=>{x.tasks=x.tasks||[];x.nts=x.nts||[];x.pa=x.pa||"";if(x.pa&&!f.grp.some(y=>y.id===x.pa))x.pa=""});
  f.grp.forEach(x=>{let y=x,k=0;while(y&&y.pa&&k++<12){y=f.grp.find(z=>z.id===y.pa);if(y===x){x.pa="";break}}});   // [v2.1] evita subgrupo dentro de si mesmo
 });
 if((S.v||0)<3){S.tpl.tk.forEach(k=>{if(k.lv==="g"&&(k.t==="Levantar descrições originais e literatura"||k.t==="Redação do manuscrito"))k.lv="gs"});S.v=3}
 if(S.v<4){defTpl().tk.filter(k=>k.lv==="f").forEach(k=>{if(!S.tpl.tk.some(y=>y.t===k.t))S.tpl.tk.push(k)});S.v=4}
 S.f.forEach(f=>f.g.forEach(g=>{g.tasks=g.tasks||[];g.spp=g.spp||[];g.nts=g.nts||[];g.spp.forEach(s=>{s.parts=s.parts||[];s.hab=s.hab||[];s.tasks=s.tasks||[];s.nts=s.nts||[];s.st=s.st||GST[0];s.p=s.p||PRIO[1]})}));
}
const lvOf=o=>o.parts?"s":o.spp?"g":"f";
const catsFor=o=>{const l=lvOf(o||own());return l==="f"?CATS:CATS.filter(c=>!(l==="s"?ONLY_G:ONLY_S).includes(c))};
const chip=(a,i,t)=>`<button class="chip" data-a="${a}" data-i="${esc(i)}">+ ${esc(t==null?i:t)}</button>`;
function qadd(o){ // atividades do modelo que ainda não estão em o (1 clique)
 const lv=lvOf(o),have=o.tasks.map(t=>t.t);
 const c=S.tpl.tk.filter(k=>k.lv.includes(lv)&&!have.includes(k.t));
 return c.length?`<div class="grp">Adicionar do modelo (1 clique)</div><div>${c.map(k=>chip("tq",S.tpl.tk.indexOf(k),k.t)).join("")}</div>`:"";
}
function tasksH(o){
 let h="";[1,0,2].forEach(k=>{const ts=o.tasks.filter(t=>t.s===STAT[k]);if(ts.length)h+=`<div class="grp">${STAT[k]} (${ts.length})</div>`+ts.map(taskH).join("")});
 return h+qadd(o)+`<div class="tools" style="margin-top:8px"><button class="sec" data-a="addTask">+ Atividade própria</button></div>`;
}
// [v2.1] diário de notas datadas (gênero, espécie, família, subgrupo e atividades gerais)
const ntForm=[{k:"d",l:"Data",t:"date"},{k:"tx",l:"Nota",t:"area"}];
function notesH(o){
 const L=(o.nts||[]).slice().sort((a,b)=>b.d.localeCompare(a.d));
 return`<div class="r" style="justify-content:space-between"><div class="grp">Diário de notas (${L.length})</div><button class="lnk" data-a="addNt">+ Nota</button></div>`
 +(L.map(n=>`<div class="nt" data-a="eNt" data-i="${n.id}"><small>${fmt(n.d)}</small><div>${esc(n.tx).replace(/\n/g,"<br>")}</div></div>`).join("")||'<div class="note" style="margin:0 2px 8px">Anotações com data: observações, decisões, dúvidas...</div>');
}
function vSp(s){
 const hp=s.parts.map(p=>p.n),hh=s.hab.map(x=>x.n);
 const fp=S.tpl.parts.filter(n=>!hp.includes(n)),fh=S.tpl.hab.filter(n=>!hh.includes(n));
 let h=`<div>${spSt(s)}${s.ex?`<span class="chip">Material: ${esc(s.ex)}</span>`:""}<span class="chip blue">Dissecção: ${esc(s.tp)}</span>${s.d?`<span class="chip ${s.d<today()?"red":"blue"}">📅 Prazo da preparação: ${fmt(s.d)}</span>`:""}</div>${s.nt?`<p class="note">${esc(s.nt)}</p>`:""}${prog(s)}<div class="tools" style="margin-top:10px"><button class="sec" data-a="editSp">Editar / excluir espécie</button></div>`;
 h+=`<div class="grp">Dissecção e preparação das peças</div>`;
 if(s.tp==="Parcial")h+=`<div class="note">Dissecção parcial: adicione só as peças que vai retirar.</div>`;
 if(s.parts.length)h+=`<div class="card"><div class="pg note"><span></span>${STEPS.map(x=>`<span style="text-align:center">${x[1]}</span>`).join("")}<span></span></div>`+s.parts.map((p,i)=>`<div class="pg"><span>${esc(p.n)}</span>${STEPS.map(x=>`<input type="checkbox" data-a="pt" data-i="${i}|${x[0]}"${p[x[0]]?" checked":""}>`).join("")}<button class="ic" data-a="dp" data-i="${i}">✕</button></div>`).join("")+`<div class="note" style="padding:6px 10px">D dissecada · L lâmina montada · I ilustrada · F fotografada</div></div>`;
 h+=`<div class="tools" style="margin-top:8px;flex-wrap:wrap"><button class="sec" data-a="apall" data-i="M">+ Completa ♂</button><button class="sec" data-a="apall" data-i="F">+ Completa ♀</button></div>`;
 if(fp.length)h+=`<div>${fp.map(n=>chip("ap",n)).join("")}</div>`;
 h+=`<div class="grp">Imagens de habitus</div>`+s.hab.map((x,i)=>`<div class="r" style="justify-content:space-between"><label class="r"><input type="checkbox" data-a="hb" data-i="${i}"${x.x?" checked":""}><span class="${x.x?"dn":""}">${esc(x.n)}</span></label><button class="ic" data-a="dh" data-i="${i}">✕</button></div>`).join("");
 if(fh.length)h+=`<div>${fh.map(n=>chip("ah",n)).join("")}</div>`;
 h+=`<input class="addsub" style="margin:6px 0;width:100%" data-hab="1" placeholder="+ outra posição de habitus (Enter)">`;
 return h+`<div class="grp">Atividades da espécie</div>`+tasksH(s)+notesH(s);
}
// ----- atividades gerais / de categorias superiores e contagens regressivas -----
const supOwn=()=>{if(V.u==="*")return S.ge;const[f,r]=V.u.split("|"),F=fam(f);return F&&(r?grById(F,r):F)};
const sp=s=>s?s.split(",").map(x=>x.trim()).filter(Boolean):[];
const prepPend=s=>!(s.parts.length+s.hab.length)||s.parts.some(p=>STEPS.some(x=>!p[x[0]]))||s.hab.some(h=>!h.x);
function vSup(){
 const o=supOwn();if(!o){V.u=null;return vGroups()}
 return`<h2>${V.u==="*"?"Atividades gerais":esc(o.r?grl(o):o.n)}</h2><p class="note">${V.u==="*"?"Atividades sem família: coletas, triagem de várias famílias, montagem de material...":esc(o.nt||"")}</p>${prog(o)}`+tasksH(o)+notesH(o);
}
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
function vCd(){
 return S.cd.slice().sort((a,b)=>cdT(a)-cdT(b)).map(c=>{const fg=folgas(c.d);return`<div class="card cd" data-a="ecd" data-i="${c.id}"><div class="r"><b class="g1">${esc(c.n)}</b><span class="note">✎</span></div><div class="cdn ${cdSt(c)}" data-cd="${c.id}">${cdText(c)}</div><small>${fmt(c.d)}${c.h?" às "+esc(c.h):""} · ${FM[c.fm]}${fg!=null?" · "+pl(fg,"folga","folgas")+" até lá":""}</small>${c.nt?`<div class="note">${esc(c.nt)}</div>`:""}</div>`}).join("")||'<div class="empty">Nenhuma contagem ainda. Toque no + para criar (qualificação, submissão de artigo, defesa...).</div>';
}
const cdForm=[{k:"n",l:"Nome da atividade"},{k:"d",l:"Data",t:"date"},{k:"h",l:"Hora (opcional)",t:"time"},{k:"fm",l:"Formato da contagem",t:"sel",o:Object.values(FM)},{k:"hz",l:"Mostrar horas quando faltar menos de (dias; 0 = nunca)",t:"number"},{k:"nt",l:"Notas",t:"area"}];
const cdSave=(c,v)=>Object.assign(c,{n:v.n,d:v.d,h:v.h,fm:Object.keys(FM).find(k=>FM[k]===v.fm)||"ymd",hz:Math.max(0,+v.hz||0),nt:v.nt});

// ----- agenda (calendário) -----
const CL={blue:"Azul",green:"Verde",red:"Vermelho",orange:"Laranja",yellow:"Amarelo",purple:"Roxo",gray:"Cinza"};
let AGL=[];   // itens do dia selecionado (para tocar e editar)
const agForm=[{k:"t",l:"Atividade"},{k:"d",l:"Data",t:"date"},{k:"h",l:"Hora (opcional)",t:"time"},{k:"s",l:"Situação",t:"sel",o:STAT},{k:"p",l:"Prioridade",t:"sel",o:["Sem prioridade",...PRIO]},{k:"col",l:"Cor no calendário",t:"sel",o:Object.values(CL)},{k:"pn",l:"Incluir no Painel?",t:"sel",o:["Sim","Não"]},{k:"nt",l:"Notas",t:"area"}];
const agSave=(e,v)=>Object.assign(e,{t:v.t,d:v.d,h:v.h,s:v.s,p:PRIO.includes(v.p)?v.p:"",col:Object.keys(CL).find(k=>CL[k]===v.col)||"blue",pn:v.pn==="Sim"?1:0,nt:v.nt,dc:v.s===STAT[2]?(e.dc||today()):""});
function editTask(g,t){form("Editar atividade",tForm(t.c,0,g),{t:t.t,c:t.c,s:t.s,d:t.d,dc:t.dc,nt:t.nt,p:t.p||"Sem prioridade"},v=>{if(!v.t)return;Object.assign(t,{t:v.t,c:v.c,s:v.s,d:v.d,nt:v.nt,p:PRIO.includes(v.p)?v.p:"",dc:v.s===STAT[2]?(v.dc||t.dc||today()):""});done()},()=>rm("Atividade excluída",()=>{g.tasks=g.tasks.filter(x=>x!==t)}))}
function agItems(){ // tudo que tem data: atividades do app, prazos de preparação, contagens e atividades da agenda
 const L=[];
 allT().forEach(x=>{if(x.t.d){const dn=x.t.s===STAT[2];L.push({d:x.t.d,t:x.t.t,col:dn?"gray":(x.t.p?pc(x.t.p):"blue"),k:"t",sub:where(x),dn,x})}});
 S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{if(s.d){const dn=!prepPend(s);L.push({d:s.d,t:"Dissecção e preparação — "+abbr(g,s.n),col:dn?"gray":"orange",k:"p",sub:esc(g.n)+" · "+esc(f.n),dn,x:{f,g,s}})}})));
 S.cd.forEach(c=>L.push({d:c.d,h:c.h,t:"⏳ "+c.n,col:"purple",k:"c",sub:"Contagem regressiva",x:c}));
 S.ag.forEach(e=>{const dn=e.s===STAT[2];L.push({d:e.d,h:e.h,t:e.t,col:dn?"gray":e.col,k:"a",sub:(e.gk?"Google Agenda"+(e.gc?" · "+esc(e.gc):""):"Agenda")+(e.p?" · prioridade "+e.p.toLowerCase():"")+(e.pn?" · no Painel":""),dn,x:e})});
 return L;
}
// abre o item tocado na Agenda ou no cartão "Hoje"
function openIt(i){if(!i)return;if(i.k==="t")editTask(i.x.o||i.x.s||i.x.g,i.x.t);else if(i.k==="p")A.og({dataset:{i:i.x.f.id+"|"+i.x.g.id+"|"+i.x.s.id}});else if(i.k==="c")A.ecd({dataset:{i:i.x.id}});else A.eag({dataset:{i:i.x.id}})}
// ----- escala de trabalho e feriados -----
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
function vAg(){
 const c=V.cal,M={},td=today(),H=feriados(c.y);
 agItems().forEach(i=>(M[i.d]=M[i.d]||[]).push(i));
 const k0=new Date(c.y,c.m,1).getDay(),nd=new Date(c.y,c.m+1,0).getDate();
 let g="";for(let i=0;i<k0;i++)g+="<span></span>";
 for(let d=1;d<=nd;d++){const ds=c.y+"-"+p2(c.m+1)+"-"+p2(d),it=M[ds]||[],h=H[ds],l=escL(ds);
  g+=`<button class="cl${h?" hol":(k0+d-1)%7===0?" dom":""}${ds===td?" td":""}${ds===c.d?" sel":""}" data-a="agd" data-i="${ds}">${l?`<span class="sc ${l}">${esc(l)}</span>`:""}<b>${d}</b><span class="dots">${it.slice(0,4).map(i=>`<i class="dot ${i.col}"></i>`).join("")}${it.length>4?"+":""}</span></button>`}
 const day=(M[c.d]||[]).slice().sort((a,b)=>(a.h||"").localeCompare(b.h||""));AGL=day;
 const hd=feriados(+c.d.slice(0,4))[c.d],le=escL(c.d);
 return`<div class="r" style="justify-content:space-between;margin-bottom:8px"><button class="sec" data-a="agm" data-i="-1">‹</button><b style="text-transform:capitalize">${new Date(c.y,c.m,1).toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}</b><button class="sec" data-a="agm" data-i="1">›</button></div><div class="cg">${["D","S","T","Q","Q","S","S"].map(x=>`<small>${x}</small>`).join("")}${g}</div>`
 +`<div class="r" style="justify-content:space-between"><div class="grp">${fmt(c.d)}${c.d===td?" · hoje":""}</div><button class="lnk" data-a="agt">Ir para hoje</button></div><div>${hd?`<span class="chip orange">🎉 ${esc(hn(hd))}</span>`:""}${le?`<span class="chip ${ESC[le]||"gray"}">Escala: ${esc(ESN[le]||le)}</span>`:""}</div>`
 +(day.map((i,n)=>`<div class="card gen" style="border-top:0" data-a="agi" data-i="${n}"><div class="r"><i class="dot ${i.col}"></i><b class="g1${i.dn?" dn":""}">${esc(i.t)}</b><small>${i.h?esc(i.h):""}</small>${i.dn||i.x.gk?"":`<button class="gbtn" data-a="gcal" data-i="${n}" title="Adicionar ao Google Agenda">+ Google</button>`}</div><small>${i.sub}</small></div>`).join("")||'<div class="empty">Nada neste dia. Toque no + para criar uma atividade.</div>')
 +'<div class="tools" style="margin-top:12px;flex-wrap:wrap"><button class="sec" data-a="escf">⚙ Escala de trabalho</button><button class="sec" data-a="tab" data-i="k">Google Agenda</button></div><details class="lg"><summary>Legenda</summary><p class="note">Escala no canto de cada dia (M manhã · N noite · F folga). Domingos em azul; feriados com o número em vermelho. Cores dos prazos: vermelho = prioridade alta, amarelo = média, verde = baixa, azul = sem prioridade, cinza = concluída; laranja = dissecção/preparação; roxo = contagem regressiva. Atividades criadas na agenda usam a cor escolhida. O botão + Google abre o Google Agenda com o item já preenchido; eventos trazidos do Google aparecem como “Google Agenda”.</p></details>';
}

function vTpl(){
 const sec=(k,t)=>`<div class="grp">${t}</div>`+S.tpl[k].map((n,i)=>`<div class="r" style="justify-content:space-between"><span>${esc(n)}</span><button class="ic" data-a="tdel" data-i="${k}|${i}">✕</button></div>`).join("")+`<input class="addsub" style="margin:6px 0;width:100%" data-tadd="${k}" placeholder="+ adicionar (Enter)">`;
 return `<p class="note">Modelos usados nos botões de 1 clique. Mudar aqui não altera o que já foi adicionado às espécies e gêneros.</p>`+sec("parts","Peças de dissecção (espécie)")+sec("hab","Posições de habitus (espécie)")+`<div class="grp">Atividades padrão</div>`+S.tpl.tk.map((k,i)=>`<div class="card gen" style="border-top:0" data-a="tke" data-i="${i}"><b>${esc(k.t)}</b><div><span class="chip">${esc(k.c)}</span><span class="chip blue">${LV[k.lv]}</span></div></div>`).join("")+`<div class="tools"><button class="sec" data-a="tka">+ Atividade padrão</button><button class="dng" data-a="treset">Restaurar padrão</button></div>`;
}
const sForm=[{k:"n",l:"Nome da espécie (só o epíteto, ex.: punctatus)"},{k:"au",l:"Autor (opcional)"},{k:"an",l:"Ano (opcional)"},{k:"cb",l:"Combinação",t:"sel",o:CBO},{k:"ex",l:"Material disponível (ex.: 3 ♂, 2 ♀)"},{k:"tp",l:"Dissecção planejada",t:"sel",o:["Não definida","Completa","Parcial"]},{k:"d",l:"Prazo da dissecção e preparação",t:"date"},{k:"st",l:"Situação",t:"sel",o:GST},{k:"p",l:"Prioridade",t:"sel",o:PRIO},{k:"nt",l:"Notas",t:"area"}];
const kForm=[{k:"t",l:"Atividade"},{k:"c",l:"Categoria",t:"sel",o:CATS},{k:"lv",l:"Vale para",t:"sel",o:Object.values(LV)},{k:"b",l:"Subatividades (separadas por vírgula)"}];
const kSave=(k,v)=>{k.t=v.t;k.c=v.c;k.lv=Object.keys(LV).find(x=>LV[x]===v.lv);k.b=v.b?v.b.split(",").map(x=>x.trim()).filter(Boolean):[]};

// ----- família: ordem e ícone [v2.1] -----
const famForm=[{k:"n",l:"Nome da família"},{k:"ord",l:"Ordem",t:"sel",o:ORD.map(o=>o[0]).concat([OUTRA])},{k:"nt",l:"Notas",t:"area"}];
const ordIco=f=>{const o=ORD.find(x=>x[0]===f.ord),k=o?o[1]:"oth";return`<span class="ordic ${k}" title="${esc(f.ord||OUTRA)}">${ICO[k]}</span>`};

// ----- agrupamentos supragenéricos (subfamília > tribo > subtribo...) [v2.1: um dentro do outro] -----
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
const genRow=(f,g)=>`<div class="gen" data-a="og" data-i="${f.id}|${g.id}"><div class="r"><b class="g1">${gl(g.n)}${authH(g)}</b><small>${pl(g.spp.length,"espécie","espécies")}</small></div><div><span class="chip ${gc(g.st)}">${esc(g.st)}</span><span class="chip ${pc(g.p)}">Prioridade ${esc(g.p.toLowerCase())}</span>${g.sp?`<span class="chip">${esc(g.sp)} spp.</span>`:""}</div>${prog(g)}</div>`;
// [v2.1] texto de um item para a busca (nome, autor, notas, atividades, subitens e diário)
const txt=o=>[o.n,o.au,o.an,o.nt].concat((o.tasks||[]).map(t=>[t.t,t.nt].concat(t.b.map(b=>b.t)).join(" ")),(o.nts||[]).map(n=>n.tx)).join(" ");
function secH(f,x,gs,q,dep){ // um subgrupo, seus gêneros e os subgrupos de dentro
 const ids=grDesc(f,x),m=gs.filter(g=>g.gr===x.id),tot=f.g.filter(g=>ids.includes(g.gr)).length,inner=grKids(f,x.id).map(y=>secH(f,y,gs,q,dep+1)).join("");
 if(q&&!m.length&&!inner)return"";
 return`<div class="grpbox"><div class="sub" data-a="editGrp" data-i="${f.id}|${x.id}"><span class="chip blue">${esc(x.r)}</span><b>${esc(x.n)}</b><small>${pl(tot,"gênero","gêneros")}</small><button class="chip" data-a="ou" data-i="${f.id}|${x.id}">Atividades (${x.tasks.length})</button><span>✎</span></div>${m.map(g=>genRow(f,g)).join("")}${inner}</div>`;
}
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
   h+=`<div class="acts fb"><button class="sec" data-a="addGen" data-i="${f.id}">+ Gênero</button><button class="sec" data-a="ou" data-i="${f.id}">Atividades (${f.tasks.length})</button><button class="sec" data-a="editFam" data-i="${f.id}">Editar</button><button class="lnk" data-a="addGrp" data-i="${f.id}" title="Nova subfamília, tribo ou grupo de gêneros">+ Subgrupo</button></div>${f.nt?`<div class="acts note">${esc(f.nt)}</div>`:""}`;
   h+=gs.filter(g=>!grById(f,g.gr)).map(g=>genRow(f,g)).join("");
   h+=grKids(f,"").map(x=>secH(f,x,gs,q,0)).join("");
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
  +gs.map(g=>{const op=V.oG===g.id;return`<div class="oi" data-id="${g.id}"><div class="or" data-a="oG" data-i="${g.id}">${HD}<b><em>${esc(g.n)}</em></b><small>${g.spp.length} spp.</small><span class="oc">${op?"▾":"▸"}</span></div>${op?orgG(g):""}</div>`}).join("")+`</div></div>`});
 return`<div class="osub">${h||'<div class="note">Nenhum gênero.</div>'}</div>`;
}
function orgG(g){
 if(!g.spp.length)return'<div class="osub"><div class="note">Nenhuma espécie.</div></div>';
 return`<div class="osub"><div class="r"><small class="g1">Espécies</small><button class="lnk" data-a="az" data-i="s|${g.id}">A–Z</button></div><div class="ol" data-k="s" data-p="${g.id}">`+g.spp.map(s=>`<div class="oi" data-id="${s.id}"><div class="or">${HD}<b><em>${esc(abbr(g,s.n))}</em>${authH(s)}</b></div></div>`).join("")+`</div></div>`;
}
// coloca os itens "ids" na nova ordem, ocupando as mesmas posições que eles tinham na lista arr
function reorderArr(arr,ids){const pos=[];arr.forEach((x,i)=>{if(ids.includes(x.id))pos.push(i)});const it=ids.map(id=>arr.find(x=>x.id===id));pos.forEach((p,j)=>arr[p]=it[j])}
const listArr=(k,p)=>k==="f"?S.f:k==="g"?(fam(p)||{}).g:k==="s"?(gById(p)||{}).spp:null;

// ----- [v2.1] RELATÓRIO do período: o que foi concluído (datas guardadas a partir desta versão) -----
function repData(a,b){
 const inR=v=>typeof v==="string"&&v>=a&&v<=b,G=[],C={t:0,b:0,p:0,h:0,n:0};
 const add=(key,lh,lt,d,th,tt,c,q)=>{let g=G.find(x=>x.key===key);if(!g)G.push(g={key,lh,lt,it:[]});g.it.push({d,th,tt});C[c]+=q||1};
 const tk=(key,lh,lt,o)=>{
  o.tasks.forEach(t=>{if(inR(t.dc))add(key,lh,lt,t.dc,"Atividade concluída: <b>"+esc(t.t)+"</b>","Atividade concluída: "+t.t,"t");
   t.b.forEach(x=>{if(inR(x.x))add(key,lh,lt,x.x,"Subitem concluído: "+esc(x.t)+' <span class="note">('+esc(t.t)+")</span>","Subitem concluído: "+x.t+" ("+t.t+")","b")})});
  (o.nts||[]).forEach(n=>{if(inR(n.d))add(key,lh,lt,n.d,"Nota: "+esc(n.tx),"Nota: "+n.tx,"n")})};
 tk("ge","Atividades gerais","Atividades gerais",S.ge);
 S.f.forEach(f=>{
  tk(f.id,esc(f.n),f.n,f);
  f.grp.forEach(x=>tk(x.id,esc(grl(x))+" · "+esc(f.n),grl(x)+" ("+f.n+")",x));
  f.g.forEach(g=>{
   tk(g.id,gl(g.n)+" · "+esc(f.n),"Gênero "+g.n+(auth(g)?" "+auth(g):"")+" ("+f.n+")",g);
   g.spp.forEach(s=>{const nm=fullSp(g,s),lh="<em>"+esc(nm)+"</em> · "+esc(f.n),lt=nm+(auth(s)?" "+auth(s):"")+" ("+f.n+")",P={},H={};
    s.parts.forEach(p=>STEPS.forEach(x=>{const v=p[x[0]];if(inR(v)){P[v]=P[v]||{};(P[v][p.n]=P[v][p.n]||[]).push(x[2].toLowerCase())}}));
    Object.keys(P).forEach(d=>{const t=Object.keys(P[d]).map(n=>n+" ("+P[d][n].join(", ")+")").join("; ");add(s.id,lh,lt,d,"Peças: "+esc(t),"Peças: "+t,"p",Object.values(P[d]).reduce((n,v)=>n+v.length,0))});
    s.hab.forEach(h=>{if(inR(h.x))(H[h.x]=H[h.x]||[]).push(h.n.toLowerCase())});
    Object.keys(H).forEach(d=>add(s.id,lh,lt,d,"Habitus fotografado: "+esc(H[d].join(", ")),"Habitus fotografado: "+H[d].join(", "),"h",H[d].length));
    tk(s.id,lh,lt,s)})})});
 S.ag.forEach(e=>{if(inR(e.dc))add("ag","Agenda","Agenda",e.dc,"Concluída: <b>"+esc(e.t)+"</b>","Concluída: "+e.t,"t")});
 G.forEach(g=>g.it.sort((x,y)=>x.d.localeCompare(y.d)));return{G,C};
}
function vRep(){
 const r=V.rp,{G,C}=repData(r.a,r.b),P=[["7","7 dias"],["m","Este mês"],["mp","Mês passado"],["x","Escolher"]];
 const ch=(n,a,b,c)=>n?`<span class="chip ${c}">${pl(n,a,b)}</span>`:"";
 return`<div class="seg">${P.map(([i,l])=>`<button class="${r.k===i?"on":""}" data-a="rpk" data-i="${i}">${l}</button>`).join("")}</div>`
 +(r.k==="x"?`<div class="rpd"><label>De<input type="date" data-rp="a" value="${r.a}"></label><label>Até<input type="date" data-rp="b" value="${r.b}"></label></div>`:"")
 +`<h2 class="rph">${fmt(r.a)} a ${fmt(r.b)}</h2><div>${ch(C.t,"atividade concluída","atividades concluídas","green")}${ch(C.b,"subitem","subitens","")}${ch(C.p,"etapa de peça","etapas de peças","blue")}${ch(C.h,"habitus","habitus","purple")}${ch(C.n,"nota","notas","yellow")}</div>`
 +(G.map(g=>`<div class="card rpg"><b>${g.lh}</b>${g.it.map(i=>`<div class="rpi"><small>${fmt(i.d).slice(0,5)}</small><span>${i.th}</span></div>`).join("")}</div>`).join("")||'<div class="empty">Nada registrado neste período. A partir desta versão o app guarda a data quando você conclui atividades, subitens, peças e habitus, ou escreve notas.</div>')
 +(G.length?`<div class="tools"><button class="pri" data-a="rpc">Copiar relatório</button>${navigator.share?'<button class="sec" data-a="rps">Compartilhar</button>':""}</div>`:"");
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
// envio em lote: arquivo .ics com todos os prazos de hoje em diante (para importar no Google pelo computador)
const icsEsc=s=>String(s).replace(/\\/g,"\\\\").replace(/;/g,"\;").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n");
const icsFold=l=>{let o="";while(l.length>70){o+=l.slice(0,70)+"\r\n ";l=l.slice(70)}return o+l};
function icsExport(){
 const td=today(),now=new Date().toISOString().replace(/[-:]/g,"").slice(0,15)+"Z",z=dt=>dt.toISOString().replace(/[-:]/g,"").slice(0,15)+"Z";
 const L=agItems().filter(i=>!i.dn&&i.d>=td&&!(i.k==="a"&&i.x.gk));
 const ev=L.map(i=>{const id=i.k==="t"?i.x.t.id:i.k==="p"?"prep-"+i.x.s.id:i.x.id;let dt;
  if(i.h){const a=new Date(i.d+"T"+i.h+":00");dt=["DTSTART:"+z(a),"DTEND:"+z(new Date(a.getTime()+36e5))]}else dt=["DTSTART;VALUE=DATE:"+i.d.replace(/-/g,""),"DTEND;VALUE=DATE:"+addD(i.d,1).replace(/-/g,"")];
  return["BEGIN:VEVENT","UID:diario-"+id+"@diario-pesquisa","DTSTAMP:"+now,...dt,"SUMMARY:"+icsEsc(gTit(i)),"DESCRIPTION:"+icsEsc(gDet(i)),"END:VEVENT"].map(icsFold).join("\r\n")});
 return{n:L.length,txt:["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Diario de Pesquisa//PT-BR","CALSCALE:GREGORIAN","X-WR-CALNAME:Diário de Pesquisa",...ev,"END:VCALENDAR"].join("\r\n")+"\r\n"};
}
function baixar(nome,txt,tipo){const u=URL.createObjectURL(new Blob([txt],{type:tipo})),a=document.createElement("a");a.href=u;a.download=nome;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000)}
function vK(){
 const k=V.kf,G={};S.ag.forEach(e=>{if(e.gk)G[e.gc||"?"]=(G[e.gc||"?"]||0)+1});
 return`<div class="grp">Trazer do Google Agenda</div><div class="card kbox"><ol class="kst"><li>No <b>computador</b>, abra o Google Agenda. Em “Minhas agendas”, passe o mouse na agenda › ⋮ › <b>Configurações e compartilhamento</b> › <b>Exportar agenda</b>. (Pelo app do Google não dá para exportar.)</li><li>Mande o arquivo baixado (.ics, ou .zip se exportou todas) para o celular: Drive, e-mail, WhatsApp...</li><li>Escolha o arquivo aqui. Pode repetir sempre que quiser atualizar: o que já veio é atualizado, não duplicado.</li></ol>`
 +`<label class="kl">Trazer eventos a partir de<input type="date" id="kfrom" value="${esc(k.from)}"></label><label class="kl">Cor no calendário<select id="kcol">${Object.keys(CL).map(c=>`<option value="${c}"${c===k.col?" selected":""}>${CL[c]}</option>`).join("")}</select></label>`
 +`<label class="kck"><input type="checkbox" id="krm"${k.rm?" checked":""}><span>Ao atualizar, remover os eventos que foram apagados no Google</span></label><label class="pri kfile">Escolher arquivo .ics ou .zip<input type="file" id="icsf"></label>`
 +(V.kres?`<p class="kres">Última importação (${esc(V.kres.cals.join(", "))}): ${pl(V.kres.n,"novo","novos")}, ${pl(V.kres.u,"atualizado","atualizados")}${V.kres.x?", "+pl(V.kres.x,"removido","removidos"):""}.</p>`:"")+`</div>`
 +`<div class="grp">Levar para o Google Agenda</div><div class="card kbox"><p>Na aba <b>Agenda</b>, toque num dia: cada item tem o botão <span class="gbtn" style="pointer-events:none">+ Google</span>, que abre o Google Agenda com o evento já preenchido. É só salvar.</p><p class="note">Para mandar todos os prazos de uma vez, gere o arquivo abaixo e importe no Google Agenda pelo computador (Configurações › Importar e exportar). Use de preferência uma agenda criada só para isso: para atualizar depois, é só apagá-la e importar de novo.</p><button class="sec" data-a="icsx">Gerar arquivo com os prazos (.ics)</button></div>`
 +(Object.keys(G).length?`<div class="grp">Eventos trazidos do Google</div><div class="card kbox">${Object.keys(G).map(c=>`<div class="r" style="justify-content:space-between;min-height:36px"><span>${esc(c)}</span><small>${pl(G[c],"evento","eventos")}</small></div>`).join("")}<button class="dng" data-a="kclr" style="margin-top:8px">Remover todos os eventos trazidos</button></div>`:"");
}

const closeMenu=()=>{$("#menu").hidden=true;$("#scrim").hidden=true;syncHist()};
// ----- abas, deslize e animação -----
const TABS=["g","p","a","c","r","o","k","m","b","s"];
let dir=0;
function go(t){dir=Math.sign(TABS.indexOf(t)-TABS.indexOf(V.tab));V.tab=t;V.g=null;V.s=null;V.u=null;V.ret=null;render();$("#app").scrollTop=0}

// ===== 6. RENDER (redesenha a tela a partir dos dados) =====
const TTL={m:"Modelos",b:"Backup",s:"Sobre o app",a:"Agenda",c:"Contagens regressivas",r:"Relatório",o:"Organizar",k:"Google Agenda"};
function render(){
 document.querySelectorAll("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.i===V.tab));
 const a=$("#app");
 a.innerHTML=V.tab==="g"?(V.u?vSup():V.g?vGen():vGroups()):V.tab==="p"?vDash():V.tab==="a"?vAg():V.tab==="c"?vCd():V.tab==="m"?vTpl():V.tab==="s"?vAbout():V.tab==="r"?vRep():V.tab==="o"?vOrg():V.tab==="k"?vK():vBackup();
 if(V.tab==="g"&&!V.g&&!V.u)list();
 const sub=V.tab==="g"&&(V.g||V.u);                       // dentro de um gênero ou espécie?
 $("#bk").hidden=!(sub||"mbsrok".includes(V.tab));
 $("#ttl").textContent=TTL[V.tab]||(V.u?(V.u==="*"?"Atividades gerais":fam(V.u.split("|")[0]).n):!sub?"Diário de Pesquisa":fam(V.f).n);
 const fa=V.tab==="a"?"addAg":V.tab==="c"?"addCd":V.tab==="g"&&!V.u?(V.g?"addSp":"addFam"):"";   // ação do botão flutuante +
 $("#fab").hidden=!fa;$("#fab").dataset.a=fa;
 a.classList.remove("in-l","in-r");
 if(dir){void a.offsetWidth;a.classList.add(dir>0?"in-r":"in-l");dir=0}
 syncHist();
}

// ===== 7. AÇÕES (o que cada botão faz) =====
const done=()=>{fix();save();closeM();render()}; // fix() garante que itens novos tenham todos os campos
const A={
 tab(el){const r={tab:V.tab,f:V.f,g:V.g,u:V.u},t=el.dataset.i;closeMenu();go(t);if("mbsrok".includes(t)&&r.tab!==t)V.ret=r},   // [v2.1] lembra de onde veio
 tf(el){const f=fam(el.dataset.i);if(f.o)f.o=0;else{S.f.forEach(x=>x.o=0);f.o=1}save();render()},
 tgf(){const a=!S.f.some(f=>f.o);S.f.forEach(f=>f.o=a?1:0);save();render()},
 tgs(){const g=gen(V.f,V.g),a=!g.spp.some(s=>s.o);g.spp.forEach(s=>s.o=a?1:0);save();render()},
 og(el){const[f,g,s]=el.dataset.i.split("|");V.tab="g";V.u=null;V.f=f;V.g=g;if(s)gen(f,g).spp.forEach(x=>x.o=x.id===s?1:0);dir=1;render();$("#app").scrollTop=0},
 ou(el){V.tab="g";V.u=el.dataset.i;V.f=V.g=V.s=null;dir=1;render();$("#app").scrollTop=0},
 dd(el){const t=own().tasks.find(x=>x.id===el.dataset.i);form("Prazo da atividade",[{k:"d",l:"Prazo",t:"date"}],{d:t.d},v=>{t.d=v.d;done()},t.d?()=>{t.d="";done()}:null,"Remover prazo")},
 es(el){const[a,b]=el.dataset.i.split("|"),t=own().tasks.find(x=>x.id===a),i=t.b.findIndex(s=>s.id===b),x=t.b[i];form("Editar subitem",[{k:"t",l:"Nome"},{k:"p",l:"Posição na lista",t:"sel",o:t.b.map((_,j)=>String(j+1))}],{t:x.t,p:String(i+1)},v=>{if(!v.t)return;x.t=v.t;t.b.splice(i,1);t.b.splice(Math.max(0,Math.min(+v.p-1,t.b.length)),0,x);done()},()=>rm("Subitem excluído",()=>{t.b.splice(i,1)}))},
 addCd(){form("Nova contagem regressiva",cdForm,{fm:FM.ymd,hz:"7"},v=>{if(!v.n||!v.d)return toast("Informe o nome e a data");S.cd.push(cdSave({id:uid()},v));done()})},
 ecd(el){const c=S.cd.find(x=>x.id===el.dataset.i);form("Editar contagem",cdForm,{n:c.n,d:c.d,h:c.h,fm:FM[c.fm],hz:String(c.hz),nt:c.nt},v=>{if(!v.n||!v.d)return toast("Informe o nome e a data");cdSave(c,v);done()},()=>rm("Contagem excluída",()=>{S.cd=S.cd.filter(x=>x!==c)}))},
 escf(){const e=S.sc;form("Escala de trabalho",escForm,{pat:e.pat,ref:e.ref,pos:String(e.pos),on:e.on?"Sim":"Não"},v=>{const p=v.pat.toUpperCase().replace(/[^A-Z]/g,"");if(!p||!v.ref)return toast("Informe o padrão e a data de referência");S.sc={pat:p,ref:v.ref,pos:Math.min(p.length,Math.max(1,+v.pos||1)),on:v.on==="Sim"?1:0};done()})},
 ptab(el){V.pt=el.dataset.i;render()},
 agm(el){const c=V.cal,d=new Date(c.y,c.m+(+el.dataset.i),1);c.y=d.getFullYear();c.m=d.getMonth();render()},
 agd(el){V.cal.d=el.dataset.i;render()},
 agt(){const s=today();V.cal={y:+s.slice(0,4),m:+s.slice(5,7)-1,d:s};render()},
 agi(el){openIt(AGL[+el.dataset.i])},
 hji(el){openIt(HJL[+el.dataset.i])},
 addAg(){form("Nova atividade na agenda",agForm,{d:V.cal.d,s:STAT[0],col:CL.blue,pn:"Sim"},v=>{if(!v.t||!v.d)return toast("Informe a atividade e a data");S.ag.push(agSave({id:uid()},v));V.cal.d=v.d;V.cal.y=+v.d.slice(0,4);V.cal.m=+v.d.slice(5,7)-1;done()})},
 eag(el){const e=S.ag.find(x=>x.id===el.dataset.i);form("Editar atividade da agenda",agForm,{t:e.t,d:e.d,h:e.h,s:e.s,p:e.p||"Sem prioridade",col:CL[e.col],pn:e.pn?"Sim":"Não",nt:e.nt},v=>{if(!v.t||!v.d)return toast("Informe a atividade e a data");agSave(e,v);V.cal.d=v.d;done()},()=>rm("Atividade excluída",()=>{S.ag=S.ag.filter(x=>x!==e)}))},
 back(){V.g=null;V.s=null;render()},
 navback(){if(V.tab!=="g"){const r=V.ret;if(r){go(r.tab);V.f=r.f;V.g=r.g;V.u=r.u;dir=-1;render()}else go("g");return}if(V.u)V.u=null;else V.g=null;dir=-1;render()},
 menu(){const o=$("#menu").hidden;$("#menu").hidden=!o;$("#scrim").hidden=!o;syncHist()},
 addGrp(el){const f=fam(el.dataset.i);form("Novo agrupamento (subfamília, tribo...)",grForm(f),{r:RANKS[0],pa:NOPA},v=>{if(!v.n)return;f.grp.push({id:uid(),n:v.n,r:v.r,pa:grId(f,v.pa),nt:v.nt,tasks:[],nts:[]});f.o=1;done()})},
 editGrp(el){const[fi,gi]=el.dataset.i.split("|"),f=fam(fi),x=grById(f,gi);form("Editar agrupamento",grForm(f,x),{n:x.n,r:x.r,pa:x.pa?grLab(f,x.pa):NOPA,nt:x.nt},v=>{if(!v.n)return;Object.assign(x,{n:v.n,r:v.r,pa:grId(f,v.pa),nt:v.nt});done()},()=>rm("Agrupamento excluído (os gêneros foram mantidos)",()=>{f.g.forEach(g=>{if(g.gr===x.id)g.gr=x.pa||""});f.grp.forEach(y=>{if(y.pa===x.id)y.pa=x.pa||""});f.grp=f.grp.filter(y=>y!==x)}))},
 backg(){V.s=null;render()},
 os(el){const g=gen(V.f,V.g),s=g.spp.find(x=>x.id===el.dataset.i);if(s.o)s.o=0;else{g.spp.forEach(x=>x.o=0);s.o=1}save();render()},
 addSp(){const g=gen(V.f,V.g);form("Nova espécie",sForm,{tp:"Não definida",st:GST[0],p:PRIO[1],cb:CBO[0]},v=>{if(!v.n)return;g.spp.push({id:uid(),n:v.n,au:v.au,an:v.an,cn:v.cb===CBO[1]?1:0,ex:v.ex,tp:v.tp,d:v.d,st:v.st,p:v.p,nt:v.nt,parts:[],hab:[],tasks:[],nts:[]});done()})},
 editSp(){const g=gen(V.f,V.g),s=own();form("Editar espécie",sForm,{n:s.n,au:s.au,an:s.an,cb:s.cn?CBO[1]:CBO[0],ex:s.ex,tp:s.tp,d:s.d,st:s.st,p:s.p,nt:s.nt},v=>{if(!v.n)return;Object.assign(s,{n:v.n,au:v.au,an:v.an,cn:v.cb===CBO[1]?1:0,ex:v.ex,tp:v.tp,d:v.d,st:v.st,p:v.p,nt:v.nt});done()},()=>conf("Excluir a espécie "+s.n+" e todo o seu progresso?","Excluir",()=>rm("Espécie excluída",()=>{g.spp=g.spp.filter(x=>x!==s);V.s=null})))},
 pt(el){const[i,k]=el.dataset.i.split("|");own().parts[i][k]=el.checked?today():0;save();render()},   // [v2.1] guarda a data em vez de 1
 dp(el){const o=own(),i=+el.dataset.i;rm("Peça removida",()=>{o.parts.splice(i,1)})},
 ap(el){own().parts.push({n:el.dataset.i});save();render()},
 apall(el){const s=own(),x=el.dataset.i==="M"?"♀":"♂";S.tpl.parts.forEach(n=>{if(!n.includes(x)&&!s.parts.some(p=>p.n===n))s.parts.push({n})});save();render()},
 hb(el){own().hab[+el.dataset.i].x=el.checked?today():0;save();render()},
 dh(el){const o=own(),i=+el.dataset.i;rm("Posição de habitus removida",()=>{o.hab.splice(i,1)})},
 ah(el){own().hab.push({n:el.dataset.i,x:0});save();render()},
 tq(el){const k=S.tpl.tk[+el.dataset.i];own().tasks.push(mk(k.t,k.c,STAT[0],"","",k.b));save();render()},
 tdel(el){const[k,i]=el.dataset.i.split("|");rm("Item do modelo removido",()=>{S.tpl[k].splice(+i,1)})},
 tka(){form("Nova atividade padrão",kForm,{c:CATS[0],lv:LV.gs},v=>{if(!v.t)return;const k={};kSave(k,v);S.tpl.tk.push(k);done()})},
 tke(el){const i=+el.dataset.i,k=S.tpl.tk[i];form("Editar atividade padrão",kForm,{t:k.t,c:k.c,lv:LV[k.lv],b:k.b.join(", ")},v=>{if(!v.t)return;kSave(k,v);done()},()=>rm("Atividade padrão excluída",()=>{S.tpl.tk.splice(i,1)}))},
 treset(){conf("Restaurar todos os modelos para o padrão?","Restaurar",()=>rm("Modelos restaurados",()=>{S.tpl=defTpl()}))},
 addFam(){form("Nova família",famForm,{ord:ORD[0][0]},v=>{if(!v.n)return;S.f.forEach(x=>x.o=0);S.f.push({id:uid(),n:v.n,ord:v.ord===OUTRA?"":v.ord,nt:v.nt,o:1,g:[],grp:[],tasks:[],nts:[]});done()})},
 editFam(el){const f=fam(el.dataset.i);form("Editar família",famForm,{n:f.n,ord:f.ord||OUTRA,nt:f.nt},v=>{if(!v.n)return;f.n=v.n;f.ord=v.ord===OUTRA?"":v.ord;f.nt=v.nt;done()},()=>conf("Excluir a família "+f.n+" e todos os seus "+f.g.length+" gênero(s), espécies e atividades?","Excluir",()=>rm("Família excluída",()=>{S.f=S.f.filter(x=>x!==f)})))},
 addGen(el){const f=fam(el.dataset.i);form("Novo gênero",gForm(f),{st:GST[0],p:PRIO[1]},v=>{if(!v.n)return;f.g.push({id:uid(),n:v.n,au:v.au,an:v.an,st:v.st,p:v.p,sp:v.sp,nt:v.nt,gr:grId(f,v.gr),tasks:[],spp:[],nts:[]});f.o=1;done()})},
 editGen(){const f=fam(V.f),g=gen(V.f,V.g);form("Editar gênero",gForm(f),{n:g.n,au:g.au,an:g.an,st:g.st,p:g.p,sp:g.sp,nt:g.nt,gr:grLab(f,g.gr)},v=>{if(!v.n)return;Object.assign(g,{n:v.n,au:v.au,an:v.an,st:v.st,p:v.p,sp:v.sp,nt:v.nt,gr:grId(f,v.gr)});done()},()=>conf("Excluir o gênero "+g.n+", com "+g.spp.length+" espécie(s) e todo o progresso?","Excluir",()=>rm("Gênero excluído",()=>{f.g=f.g.filter(x=>x!==g);V.g=null})))},
 addTask(){const g=own();form("Nova atividade",tForm(0,1),{c:catsFor()[0],s:STAT[0]},v=>{if(!v.t)return;const t=mk(v.t,v.c,v.s,v.d,v.nt,sp(v.b),PRIO.includes(v.p)?v.p:"");if(t.s===STAT[2])t.dc=today();g.tasks.push(t);done()})},
 et(el){const g=own();editTask(g,g.tasks.find(x=>x.id===el.dataset.i))},
 cy(el){const t=own().tasks.find(x=>x.id===el.dataset.i);t.s=STAT[(STAT.indexOf(t.s)+1)%3];t.dc=t.s===STAT[2]?today():"";save();render()},
 sb(el){const[a,b]=el.dataset.i.split("|"),x=own().tasks.find(t=>t.id===a).b.find(s=>s.id===b);x.x=el.checked?today():0;save();render()},
 ds(el){const[a,b]=el.dataset.i.split("|"),t=own().tasks.find(t=>t.id===a);rm("Subitem excluído",()=>{t.b=t.b.filter(s=>s.id!==b)})},
 ok(){if(cb)cb.ok(vals())},cancel:closeM,del(){if(cb&&cb.del)cb.del()},
 copy(){const t=$("#bkp"),ok=()=>toast("Backup copiado"),fb=()=>{try{document.execCommand("copy")?ok():toast("Selecione o texto e copie manualmente")}catch(e){toast("Selecione o texto e copie manualmente")}};t.focus();t.select();t.setSelectionRange(0,t.value.length);if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t.value).then(ok,fb);else fb()},
 imp(){let o;try{o=JSON.parse($("#imp").value);if(!o||!Array.isArray(o.f))throw 0}catch(e){return toast("Backup inválido")}conf("Restaurar este backup? Tudo o que está no app agora será substituído.","Restaurar",()=>rm("Backup restaurado",()=>{S=o}))},
 // [v2.1] desfazer a última exclusão
 undo(){if(!UNDO)return;S=JSON.parse(UNDO);UNDO=null;V.kres=null;fix();persist();render();toast("Desfeito")},
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
["click","keydown"].forEach(ev=>document.addEventListener(ev,e=>{const w=e.target.closest&&e.target.closest("[data-sp]");V.ow=w?w.dataset.sp:null},true));   // qual espécie (aba) recebeu o clique/tecla
document.addEventListener("click",e=>{const el=e.target.closest("[data-a]");if(el&&A[el.dataset.a]){if(el.type!=="checkbox")e.preventDefault&&0;A[el.dataset.a](el)}});
document.addEventListener("input",e=>{if(e.target.id==="q"){V.q=e.target.value;list()}});
document.addEventListener("change",e=>{const el=e.target;if(el.dataset&&el.dataset.rp&&el.value){V.rp[el.dataset.rp]=el.value;render()}   // [v2.1] datas do relatório
 if(el.id==="kfrom"&&el.value)V.kf.from=el.value;if(el.id==="kcol")V.kf.col=el.value;if(el.id==="krm")V.kf.rm=el.checked?1:0;   // [v2.2] opções da importação
 if(el.id==="icsf"&&el.files&&el.files[0]){lerAgenda(el.files[0]);el.value=""}});
document.addEventListener("keydown",e=>{const el=e.target;if(e.key==="Enter"&&el.dataset&&el.dataset.sub&&el.value.trim()){const t=own().tasks.find(x=>x.id===el.dataset.sub);t.b.push({id:uid(),t:el.value.trim(),x:0});save();render();const n=document.querySelector(`[data-sub="${t.id}"]`);if(n)n.focus()}});
// deslizar com o dedo: a tela acompanha o gesto e troca com animação suave
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
document.addEventListener("keydown",e=>{ // Enter nos campos de habitus e de modelos
 const el=e.target,v=el.value&&el.value.trim();if(e.key!=="Enter"||!v)return;
 if(el.dataset.hab)own().hab.push({n:v,x:0});else if(el.dataset.tadd)S.tpl[el.dataset.tadd].push(v);else return;
 save();render();const n=document.querySelector(el.dataset.hab?"[data-hab]":`[data-tadd="${el.dataset.tadd}"]`);if(n)n.focus();
});
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
applyTheme(temaAtual());
render();

setInterval(()=>{if(V.tab==="c")tick()},20000);   // atualiza as contagens

// ===== 10. MODO OFFLINE / INSTALÁVEL (registra o service worker) =====
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
