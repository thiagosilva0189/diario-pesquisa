
// ===== 1. CONSTANTES (listas fixas: situações, categorias, modelo de tarefas) =====
const KEY="diario-pesquisa-v1";
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

// ===== 3. ESTADO (todos os dados vivem em S; a tela atual em V) =====
function seed(){return{t:0,tpl:defTpl(),f:[{id:uid(),n:"Biphyllidae",nt:"Exemplo: edite ou apague.",o:1,g:[{id:uid(),n:"Gênero exemplo",st:"Potencial",p:"Média",sp:"",nt:"Abra o gênero, toque em + Espécie e use os modelos de 1 clique.",tasks:[],spp:[]}]}]}}
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.f))S=seed();
fix();
let V={tab:"g",f:null,g:null,s:null,u:null,q:""},cb=null;
V.cal={y:+today().slice(0,4),m:+today().slice(5,7)-1,d:today()};
const fam=id=>S.f.find(f=>f.id===id),gen=(f,g)=>{const F=fam(f);return F&&F.g.find(x=>x.id===g)};
const spc=(f,g,s)=>{const G=gen(f,g);return G&&G.spp.find(x=>x.id===s)};
const own=()=>V.u?supOwn():V.ow?spc(V.f,V.g,V.ow):gen(V.f,V.g);

// ===== 4. SALVAR (localStorage) =====
function persist(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function save(){S.t=Date.now();persist()}
function toast(m){const t=$("#toast");t.textContent=m;t.style.display="block";setTimeout(()=>t.style.display="none",2200)}

// ===== 5. FORMULÁRIOS E TELAS (funções que devolvem HTML) =====
function units(o){let d=0,n=o.tasks.length;d+=o.tasks.filter(t=>t.s===STAT[2]).length;
 if(o.parts){o.parts.forEach(p=>STEPS.forEach(x=>{n++;d+=p[x[0]]?1:0}));o.hab.forEach(h=>{n++;d+=h.x?1:0})}
 if(o.spp)o.spp.forEach(s=>{const u=units(s);d+=u[0];n+=u[1]});return[d,n]}
function prog(o){const[d,n]=units(o);return`<div class="bar"><span style="width:${n?d/n*100:0}%"></span></div><small>${d}/${n} itens concluídos</small>`}
function form(title,fields,vals,ok,del,dl){
 $("#modal").innerHTML=`<div class="sheet"><h3>${title}</h3>${fields.map(f=>`<label>${f.l}${f.t==="area"?`<textarea name="${f.k}">${esc(vals[f.k])}</textarea>`:f.t==="sel"?`<select name="${f.k}">${f.o.map(o=>`<option${o===vals[f.k]?" selected":""}>${esc(o)}</option>`).join("")}</select>`:`<input name="${f.k}" type="${f.t||"text"}" value="${esc(vals[f.k])}">`}</label>`).join("")}<div class="r"><button class="pri" data-a="ok">Salvar</button><button class="sec" data-a="cancel">Cancelar</button>${del?`<button class="dng" data-a="del">${dl||"Excluir"}</button>`:""}</div></div>`;
 $("#modal").classList.add("on");cb={ok,del};
}
const closeM=()=>{$("#modal").classList.remove("on");cb=null};
const vals=()=>{const o={};document.querySelectorAll("#modal [name]").forEach(e=>o[e.name]=e.value.trim());return o};
const gForm=f=>[{k:"n",l:"Nome do gênero"}].concat(f.grp.length?[{k:"gr",l:"Agrupamento (opcional)",t:"sel",o:["(nenhum)"].concat(f.grp.map(grl))}]:[],[{k:"st",l:"Situação",t:"sel",o:GST},{k:"p",l:"Prioridade",t:"sel",o:PRIO},{k:"sp",l:"Nº de espécies (aprox.)"},{k:"nt",l:"Notas",t:"area"}]);
const tForm=(c,nw,o)=>[{k:"t",l:"Atividade"},{k:"c",l:"Categoria",t:"sel",o:!c||catsFor(o).includes(c)?catsFor(o):[c,...catsFor(o)]},{k:"s",l:"Situação",t:"sel",o:STAT},{k:"p",l:"Prioridade",t:"sel",o:["Sem prioridade",...PRIO]},{k:"d",l:"Prazo",t:"date"},{k:"nt",l:"Notas",t:"area"}].concat(nw?[{k:"b",l:"Seções / subitens (separados por vírgula, opcional)"}]:[]);

function vGroups(){return`<div class="tools"><input id="q" type="search" placeholder="Buscar família, gênero ou espécie" value="${esc(V.q)}" style="flex:1;min-width:0"><button class="sec" data-a="tgf" style="white-space:nowrap">${S.f.some(f=>f.o)?"Fechar todas":"Abrir todas"}</button></div><div class="card gen" style="border-top:0" data-a="ou" data-i="*"><b>📌 Atividades gerais</b> <small>sem família</small><div><span class="chip">${S.ge.tasks.filter(t=>t.s!==STAT[2]).length} em aberto</span></div>${prog(S.ge)}</div><div id="list"></div>`}
function taskH(t){
 const k=STAT.indexOf(t.s),over=t.d&&t.d<today()&&k<2,sd=t.b.filter(x=>x.x).length;
 return`<div class="task s${k}"><div class="r"><button class="st k${k}" data-a="cy" data-i="${t.id}" title="Alternar situação">${["○","◐","●"][k]}</button><div class="g1"><b>${esc(t.t)}</b><div><span class="chip">${esc(t.c)}</span>${t.p?`<span class="chip ${pc(t.p)}">Prioridade ${esc(t.p.toLowerCase())}</span>`:""}<button class="chip ${t.d?(over?"red":"blue"):""}" data-a="dd" data-i="${t.id}">📅 ${t.d?fmt(t.d):"+ prazo"}</button>${t.b.length?`<span class="chip">${sd}/${t.b.length}</span>`:""}</div></div><button class="ic" data-a="et" data-i="${t.id}">✎</button></div>${t.nt?`<div class="note" style="margin:4px 0 0 46px">${esc(t.nt)}</div>`:""}<ul>${t.b.map(x=>`<li><label><input type="checkbox" data-a="sb" data-i="${t.id}|${x.id}"${x.x?" checked":""}><span class="${x.x?"dn":""}">${esc(x.t)}</span></label><span><button class="ic" data-a="es" data-i="${t.id}|${x.id}">✎</button><button class="ic" data-a="ds" data-i="${t.id}|${x.id}">✕</button></span></li>`).join("")}</ul><input class="addsub" data-sub="${t.id}" placeholder="${WR.includes(t.c)?"+ seção ou subitem (Enter)":"+ subatividade (Enter)"}"></div>`;
}
const spSt=s=>`<span class="chip ${gc(s.st)}">${esc(s.st)}</span><span class="chip ${pc(s.p)}">Prioridade ${esc((s.p||"").toLowerCase())}</span>`;
const spChips=s=>`${spSt(s)}${s.ex?`<span class="chip">${esc(s.ex)}</span>`:""}<span class="chip blue">Dissecção: ${esc(s.tp)}</span>${s.d?`<span class="chip ${s.d<today()?"red":"blue"}">📅 ${fmt(s.d)}</span>`:""}`;
function vGen(){
 const F=fam(V.f),g=gen(V.f,V.g);if(!g){V.g=null;return vGroups()}
 const x=grById(F,g.gr);
 let h=`<h2><em>${esc(g.n)}</em></h2><div>${x?`<span class="chip">${esc(grl(x))}</span>`:""}<span class="chip ${gc(g.st)}">${esc(g.st)}</span><span class="chip ${pc(g.p)}">Prioridade ${esc(g.p.toLowerCase())}</span>${g.sp?`<span class="chip">${esc(g.sp)} spp. (estimado)</span>`:""}</div>${g.nt?`<p class="note">${esc(g.nt)}</p>`:""}${prog(g)}`;
 h+=`<div class="tools"><button class="sec" data-a="addSp">+ Espécie</button><button class="sec" data-a="editGen">Editar / excluir gênero</button></div>`;
 h+=`<div class="r" style="justify-content:space-between"><div class="grp">Espécies (${g.spp.length})</div>${g.spp.length?`<button class="lnk" data-a="tgs">${g.spp.some(s=>s.o)?"Fechar todas":"Abrir todas"}</button>`:""}</div>`+(g.spp.map(s=>`<section class="card"><div class="fh" data-a="os" data-i="${s.id}"><b><em>${esc(s.n)}</em></b><span>${s.o?"▾":"▸"}</span></div>${s.o?`<div class="spb" data-sp="${s.id}">${vSp(s)}</div>`:`<div class="gen" style="border-top:0;padding-top:0" data-a="os" data-i="${s.id}">${spChips(s)}${prog(s)}</div>`}</section>`).join("")||'<div class="empty">Nenhuma espécie ainda. Toque no + para adicionar.</div>');
 return h+`<div class="grp">Atividades do gênero</div>`+tasksH(g);
}
const allT=()=>{const r=[];S.ge.tasks.forEach(t=>r.push({u:"*",o:S.ge,t}));S.f.forEach(f=>{f.tasks.forEach(t=>r.push({f,u:f.id,o:f,t}));f.grp.forEach(x=>x.tasks.forEach(t=>r.push({f,u:f.id+"|"+x.id,o:x,t})));f.g.forEach(g=>{g.tasks.forEach(t=>r.push({f,g,t}));g.spp.forEach(s=>s.tasks.forEach(t=>r.push({f,g,s,t})))})});return r};
const where=x=>x.ag?"Atividade da agenda":x.u?(x.u==="*"?"Atividades gerais":(x.o.r?esc(grl(x.o))+" · ":"")+esc(x.f.n)):"<em>"+esc(x.s?x.s.n:x.g.n)+"</em> · "+esc(x.f.n);
const item=x=>`<div class="card gen" style="border-top:0" data-a="${x.ag?"eag":x.u?"ou":"og"}" data-i="${x.ag?x.ag.id:x.u||x.f.id+"|"+x.g.id+"|"+(x.s?x.s.id:"")}"><b>${esc(x.t.t)}</b><div><span class="chip">${esc(x.t.c)}</span>${x.t.p?`<span class="chip ${pc(x.t.p)}">Prioridade ${esc(x.t.p.toLowerCase())}</span>`:""}${x.t.d?`<span class="chip ${x.t.d<today()?"red":"blue"}">📅 ${fmt(x.t.d)}</span>`:""}</div><small>${where(x)}</small></div>`;
function vDash(){
 const T=allT(),G=[];S.f.forEach(f=>f.g.forEach(g=>G.push({f,g})));
 const ag=S.ag.filter(e=>e.pn).map(e=>({ag:e,t:{t:e.t,c:"Agenda",d:e.d,s:e.s,p:e.p}}));const prep=[];G.forEach(x=>x.g.spp.forEach(s=>{if(s.d&&prepPend(s))prep.push({f:x.f,g:x.g,s,t:{t:"Dissecção e preparação das peças",c:"Dissecção",d:s.d,s:STAT[0]}})}));
 const doing=T.concat(ag).filter(x=>x.t.s===STAT[1]),due=T.concat(prep,ag).filter(x=>x.t.d&&x.t.s!==STAT[2]).sort((a,b)=>a.t.d.localeCompare(b.t.d)).slice(0,8);
 const pot=G.filter(x=>x.g.st==="Potencial").sort((a,b)=>PRIO.indexOf(a.g.p)-PRIO.indexOf(b.g.p));
 let h=`<div>${GST.map(s=>`<span class="chip ${gc(s)}">${s}: ${G.filter(x=>x.g.st===s).length}</span>`).join("")}<span class="chip">${T.filter(x=>x.t.s===STAT[2]).length}/${T.length} atividades concluídas</span></div>`;
 h+=`<div class="grp">Em execução (${doing.length})</div>`+(doing.map(item).join("")||'<div class="empty">Nada em execução.</div>');
 h+=`<div class="grp">Próximos prazos</div>`+(due.map(item).join("")||'<div class="empty">Nenhum prazo definido.</div>');
 h+=`<div class="grp">Gêneros potenciais (por prioridade)</div>`+(pot.map(x=>`<div class="card gen" style="border-top:0" data-a="og" data-i="${x.f.id}|${x.g.id}"><b><em>${esc(x.g.n)}</em></b> <small>${esc(x.f.n)}</small><div><span class="chip ${pc(x.g.p)}">Prioridade ${esc(x.g.p.toLowerCase())}</span></div></div>`).join("")||'<div class="empty">Nenhum gênero potencial.</div>');
 return h;
}
function vBackup(){return`<p class="note">Seus dados ficam salvos neste aparelho e, quando disponível, sincronizam entre seus dispositivos pela sua conta. Copie o backup abaixo de vez em quando.</p><textarea id="bk" readonly style="min-height:160px">${esc(JSON.stringify(S,null,1))}</textarea><div class="tools" style="margin-top:8px"><button class="sec" data-a="copy">Copiar backup</button></div><div class="grp">Restaurar</div><textarea id="imp" placeholder="Cole aqui um backup (substitui tudo)"></textarea><div class="tools" style="margin-top:8px"><button class="dng" data-a="imp">Restaurar backup</button></div>`}

function fix(){ // completa dados antigos com os campos novos
 S.tpl=S.tpl||defTpl();
 S.ge=S.ge||{tasks:[]};S.ge.tasks=S.ge.tasks||[];S.cd=S.cd||[];S.ag=S.ag||[];S.sc=S.sc||{on:1,pat:"MMMMNNFFFF",ref:"2026-11-23",pos:7};
 S.f.forEach(f=>{f.grp=f.grp||[];f.tasks=f.tasks||[];f.grp.forEach(x=>{x.tasks=x.tasks||[]})});
 if((S.v||0)<3){S.tpl.tk.forEach(k=>{if(k.lv==="g"&&(k.t==="Levantar descrições originais e literatura"||k.t==="Redação do manuscrito"))k.lv="gs"});S.v=3}
 if(S.v<4){defTpl().tk.filter(k=>k.lv==="f").forEach(k=>{if(!S.tpl.tk.some(y=>y.t===k.t))S.tpl.tk.push(k)});S.v=4}
 S.f.forEach(f=>f.g.forEach(g=>{g.tasks=g.tasks||[];g.spp=g.spp||[];g.spp.forEach(s=>{s.parts=s.parts||[];s.hab=s.hab||[];s.tasks=s.tasks||[];s.st=s.st||GST[0];s.p=s.p||PRIO[1]})}));
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
 return h+`<div class="grp">Atividades da espécie</div>`+tasksH(s);
}
// ----- atividades gerais / de categorias superiores e contagens regressivas -----
const supOwn=()=>{if(V.u==="*")return S.ge;const[f,r]=V.u.split("|"),F=fam(f);return F&&(r?grById(F,r):F)};
const sp=s=>s?s.split(",").map(x=>x.trim()).filter(Boolean):[];
const prepPend=s=>!(s.parts.length+s.hab.length)||s.parts.some(p=>STEPS.some(x=>!p[x[0]]))||s.hab.some(h=>!h.x);
function vSup(){
 const o=supOwn();if(!o){V.u=null;return vGroups()}
 return`<h2>${V.u==="*"?"Atividades gerais":esc(o.r?grl(o):o.n)}</h2><p class="note">${V.u==="*"?"Atividades sem família: coletas, triagem de várias famílias, montagem de material...":esc(o.nt||"")}</p>${prog(o)}`+tasksH(o);
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
 return S.cd.slice().sort((a,b)=>cdT(a)-cdT(b)).map(c=>`<div class="card cd" data-a="ecd" data-i="${c.id}"><div class="r"><b class="g1">${esc(c.n)}</b><span class="note">✎</span></div><div class="cdn ${cdSt(c)}" data-cd="${c.id}">${cdText(c)}</div><small>${fmt(c.d)}${c.h?" às "+esc(c.h):""} · ${FM[c.fm]}</small>${c.nt?`<div class="note">${esc(c.nt)}</div>`:""}</div>`).join("")||'<div class="empty">Nenhuma contagem ainda. Toque no + para criar (qualificação, submissão de artigo, defesa...).</div>';
}
const cdForm=[{k:"n",l:"Nome da atividade"},{k:"d",l:"Data",t:"date"},{k:"h",l:"Hora (opcional)",t:"time"},{k:"fm",l:"Formato da contagem",t:"sel",o:Object.values(FM)},{k:"hz",l:"Mostrar horas quando faltar menos de (dias; 0 = nunca)",t:"number"},{k:"nt",l:"Notas",t:"area"}];
const cdSave=(c,v)=>Object.assign(c,{n:v.n,d:v.d,h:v.h,fm:Object.keys(FM).find(k=>FM[k]===v.fm)||"ymd",hz:Math.max(0,+v.hz||0),nt:v.nt});

// ----- agenda (calendário) -----
const CL={blue:"Azul",green:"Verde",red:"Vermelho",orange:"Laranja",yellow:"Amarelo",purple:"Roxo",gray:"Cinza"};
let AGL=[];   // itens do dia selecionado (para tocar e editar)
const agForm=[{k:"t",l:"Atividade"},{k:"d",l:"Data",t:"date"},{k:"h",l:"Hora (opcional)",t:"time"},{k:"s",l:"Situação",t:"sel",o:STAT},{k:"p",l:"Prioridade",t:"sel",o:["Sem prioridade",...PRIO]},{k:"col",l:"Cor no calendário",t:"sel",o:Object.values(CL)},{k:"pn",l:"Incluir no Painel?",t:"sel",o:["Sim","Não"]},{k:"nt",l:"Notas",t:"area"}];
const agSave=(e,v)=>Object.assign(e,{t:v.t,d:v.d,h:v.h,s:v.s,p:PRIO.includes(v.p)?v.p:"",col:Object.keys(CL).find(k=>CL[k]===v.col)||"blue",pn:v.pn==="Sim"?1:0,nt:v.nt});
function editTask(g,t){form("Editar atividade",tForm(t.c,0,g),{t:t.t,c:t.c,s:t.s,d:t.d,nt:t.nt,p:t.p||"Sem prioridade"},v=>{if(!v.t)return;Object.assign(t,{t:v.t,c:v.c,s:v.s,d:v.d,nt:v.nt,p:PRIO.includes(v.p)?v.p:""});done()},()=>{g.tasks=g.tasks.filter(x=>x!==t);done()})}
function agItems(){ // tudo que tem data: atividades do app, prazos de preparação, contagens e atividades da agenda
 const L=[];
 allT().forEach(x=>{if(x.t.d){const dn=x.t.s===STAT[2];L.push({d:x.t.d,t:x.t.t,col:dn?"gray":(x.t.p?pc(x.t.p):"blue"),k:"t",sub:where(x),dn,x})}});
 S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{if(s.d){const dn=!prepPend(s);L.push({d:s.d,t:"Dissecção e preparação — "+s.n,col:dn?"gray":"orange",k:"p",sub:esc(g.n)+" · "+esc(f.n),dn,x:{f,g,s}})}})));
 S.cd.forEach(c=>L.push({d:c.d,h:c.h,t:"⏳ "+c.n,col:"purple",k:"c",sub:"Contagem regressiva",x:c}));
 S.ag.forEach(e=>{const dn=e.s===STAT[2];L.push({d:e.d,h:e.h,t:e.t,col:dn?"gray":e.col,k:"a",sub:"Agenda"+(e.p?" · prioridade "+e.p.toLowerCase():"")+(e.pn?" · no Painel":""),dn,x:e})});
 return L;
}
// ----- escala de trabalho e feriados -----
const p2=n=>String(n).padStart(2,"0");
const D8=s=>Date.UTC(+s.slice(0,4),+s.slice(5,7)-1,+s.slice(8,10))/864e5;
const ESN={M:"manhã",N:"noite",F:"folga"},ESC={M:"yellow",N:"purple",F:"green"};
const escForm=[{k:"pat",l:"Padrão do ciclo, uma letra por dia (M manhã, N noite, F folga)"},{k:"ref",l:"Data de referência",t:"date"},{k:"pos",l:"Em que dia do ciclo cai a data de referência (1 = primeiro dia do padrão)",t:"number"},{k:"on",l:"Mostrar a escala no calendário?",t:"sel",o:["Sim","Não"]}];
function escL(ds){const e=S.sc;if(!e||!e.on||!e.pat)return"";const n=e.pat.length;return e.pat[(((D8(ds)-D8(e.ref)+e.pos-1)%n)+n)%n]}
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
 const c=V.cal,M={},td=today(),H=feriados(c.y),hm=[];
 agItems().forEach(i=>(M[i.d]=M[i.d]||[]).push(i));
 const k0=new Date(c.y,c.m,1).getDay(),nd=new Date(c.y,c.m+1,0).getDate();
 let g="";for(let i=0;i<k0;i++)g+="<span></span>";
 for(let d=1;d<=nd;d++){const ds=c.y+"-"+p2(c.m+1)+"-"+p2(d),it=M[ds]||[],h=H[ds],l=escL(ds);
  if(h)hm.push(p2(d)+"/"+p2(c.m+1)+" · "+hn(h));
  g+=`<button class="cl${h?" hol":(k0+d-1)%7===0?" dom":""}${ds===td?" td":""}${ds===c.d?" sel":""}" data-a="agd" data-i="${ds}">${l?`<span class="sc ${l}">${esc(l)}</span>`:""}<b>${d}</b><span class="dots">${it.slice(0,4).map(i=>`<i class="dot ${i.col}"></i>`).join("")}${it.length>4?"+":""}</span></button>`}
 const day=(M[c.d]||[]).slice().sort((a,b)=>(a.h||"").localeCompare(b.h||""));AGL=day;
 const hd=feriados(+c.d.slice(0,4))[c.d],le=escL(c.d);
 return`<div class="r" style="justify-content:space-between;margin-bottom:8px"><button class="sec" data-a="agm" data-i="-1">‹</button><b style="text-transform:capitalize">${new Date(c.y,c.m,1).toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}</b><button class="sec" data-a="agm" data-i="1">›</button></div><div class="cg">${["D","S","T","Q","Q","S","S"].map(x=>`<small>${x}</small>`).join("")}${g}</div>`
 +(hm.length?`<div class="grp">Feriados do mês</div><div>${hm.map(x=>`<span class="chip orange">${esc(x)}</span>`).join("")}</div>`:"")
 +`<div class="r" style="justify-content:space-between"><div class="grp">${fmt(c.d)}${c.d===td?" · hoje":""}</div><button class="lnk" data-a="agt">Ir para hoje</button></div><div>${hd?`<span class="chip orange">🎉 ${esc(hn(hd))}</span>`:""}${le?`<span class="chip ${ESC[le]||"gray"}">Escala: ${esc(ESN[le]||le)}</span>`:""}</div>`
 +(day.map((i,n)=>`<div class="card gen" style="border-top:0" data-a="agi" data-i="${n}"><div class="r"><i class="dot ${i.col}"></i><b class="g1${i.dn?" dn":""}">${esc(i.t)}</b><small>${i.h?esc(i.h):""}</small></div><small>${i.sub}</small></div>`).join("")||'<div class="empty">Nada neste dia. Toque no + para criar uma atividade.</div>')
 +'<div class="tools" style="margin-top:12px"><button class="sec" data-a="escf">⚙ Escala de trabalho</button></div><p class="note">Escala no canto de cada dia (M manhã · N noite · F folga). Domingos em azul; feriados com o número em vermelho. Cores dos prazos: vermelho = prioridade alta, amarelo = média, verde = baixa, azul = sem prioridade, cinza = concluída; laranja = dissecção/preparação; roxo = contagem regressiva. Atividades criadas na agenda usam a cor escolhida.</p>';
}

function vTpl(){
 const sec=(k,t)=>`<div class="grp">${t}</div>`+S.tpl[k].map((n,i)=>`<div class="r" style="justify-content:space-between"><span>${esc(n)}</span><button class="ic" data-a="tdel" data-i="${k}|${i}">✕</button></div>`).join("")+`<input class="addsub" style="margin:6px 0;width:100%" data-tadd="${k}" placeholder="+ adicionar (Enter)">`;
 return `<p class="note">Modelos usados nos botões de 1 clique. Mudar aqui não altera o que já foi adicionado às espécies e gêneros.</p>`+sec("parts","Peças de dissecção (espécie)")+sec("hab","Posições de habitus (espécie)")+`<div class="grp">Atividades padrão</div>`+S.tpl.tk.map((k,i)=>`<div class="card gen" style="border-top:0" data-a="tke" data-i="${i}"><b>${esc(k.t)}</b><div><span class="chip">${esc(k.c)}</span><span class="chip blue">${LV[k.lv]}</span></div></div>`).join("")+`<div class="tools"><button class="sec" data-a="tka">+ Atividade padrão</button><button class="dng" data-a="treset">Restaurar padrão</button></div>`;
}
const sForm=[{k:"n",l:"Nome da espécie"},{k:"ex",l:"Material disponível (ex.: 3 ♂, 2 ♀)"},{k:"tp",l:"Dissecção planejada",t:"sel",o:["Não definida","Completa","Parcial"]},{k:"d",l:"Prazo da dissecção e preparação",t:"date"},{k:"st",l:"Situação",t:"sel",o:GST},{k:"p",l:"Prioridade",t:"sel",o:PRIO},{k:"nt",l:"Notas",t:"area"}];
const kForm=[{k:"t",l:"Atividade"},{k:"c",l:"Categoria",t:"sel",o:CATS},{k:"lv",l:"Vale para",t:"sel",o:Object.values(LV)},{k:"b",l:"Subatividades (separadas por vírgula)"}];
const kSave=(k,v)=>{k.t=v.t;k.c=v.c;k.lv=Object.keys(LV).find(x=>LV[x]===v.lv);k.b=v.b?v.b.split(",").map(x=>x.trim()).filter(Boolean):[]};

// ----- agrupamentos supragenéricos (subfamília, tribo...) e confirmação de exclusão -----
const RANKS=["Subfamília","Tribo","Subtribo","Grupo de gêneros"];
const grForm=[{k:"n",l:"Nome"},{k:"r",l:"Categoria",t:"sel",o:RANKS},{k:"nt",l:"Notas",t:"area"}];
const grl=x=>x.r+" "+x.n;
const grById=(f,id)=>f.grp.find(x=>x.id===id);
const grLab=(f,id)=>{const x=grById(f,id);return x?grl(x):"(nenhum)"};
const grId=(f,l)=>{const x=f.grp.find(y=>grl(y)===l);return x?x.id:""};
const ask=t=>confirm("Excluir "+t+"? Esta ação não pode ser desfeita.");
const genRow=(f,g)=>`<div class="gen" data-a="og" data-i="${f.id}|${g.id}"><div class="r"><b class="g1"><em>${esc(g.n)}</em></b><small>${g.spp.length} espécies</small></div><div><span class="chip ${gc(g.st)}">${esc(g.st)}</span><span class="chip ${pc(g.p)}">Prioridade ${esc(g.p.toLowerCase())}</span>${g.sp?`<span class="chip">${esc(g.sp)} spp.</span>`:""}</div>${prog(g)}</div>`;
function list(){
 const q=V.q.toLowerCase();let h="";
 for(const f of S.f){
  const gs=f.g.filter(g=>!q||(f.n+" "+g.n+" "+g.tasks.map(t=>t.t).join(" ")+" "+g.spp.map(s=>s.n).join(" ")).toLowerCase().includes(q));
  if(q&&!gs.length)continue;
  const open=q||f.o;
  h+=`<section class="card"><div class="fh" data-a="tf" data-i="${f.id}"><b>${esc(f.n)}</b><small>${f.g.length} gêneros · ${f.g.reduce((n,g)=>n+g.spp.length,0)} espécies</small><span>${open?"▾":"▸"}</span></div>`;
  if(open){
   h+=`<div class="acts"><button class="sec" data-a="addGen" data-i="${f.id}">+ Gênero</button><button class="sec" data-a="ou" data-i="${f.id}">Atividades (${f.tasks.length})</button><button class="sec" data-a="editFam" data-i="${f.id}">Editar / excluir família</button><button class="lnk" data-a="addGrp" data-i="${f.id}">+ subfamília / tribo / grupo</button></div>${f.nt?`<div class="acts note">${esc(f.nt)}</div>`:""}`;
   h+=gs.filter(g=>!grById(f,g.gr)).map(g=>genRow(f,g)).join("");
   f.grp.forEach(x=>{const m=gs.filter(g=>g.gr===x.id);if(q&&!m.length)return;
    h+=`<div class="sub" data-a="editGrp" data-i="${f.id}|${x.id}"><span class="chip blue">${esc(x.r)}</span><b>${esc(x.n)}</b><small>${m.length} gêneros</small><button class="chip" data-a="ou" data-i="${f.id}|${x.id}">Atividades (${x.tasks.length})</button><span>✎</span></div>`+m.map(g=>genRow(f,g)).join("")});
  }
  h+="</section>";
 }
 $("#list").innerHTML=h||'<div class="empty">Nenhuma família ainda. Toque no + para criar.</div>';
}
const closeMenu=()=>{$("#menu").hidden=true;$("#scrim").hidden=true};
// ----- abas, deslize e animação -----
const TABS=["g","p","a","c","m","b"];
let dir=0;
function go(t){dir=Math.sign(TABS.indexOf(t)-TABS.indexOf(V.tab));V.tab=t;V.g=null;V.s=null;V.u=null;render();$("#app").scrollTop=0}

// ===== 6. RENDER (redesenha a tela a partir dos dados) =====
function render(){
 document.querySelectorAll("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.i===V.tab));
 const a=$("#app");
 a.innerHTML=V.tab==="g"?(V.u?vSup():V.g?vGen():vGroups()):V.tab==="p"?vDash():V.tab==="a"?vAg():V.tab==="c"?vCd():V.tab==="m"?vTpl():vBackup();
 if(V.tab==="g"&&!V.g&&!V.u)list();
 const sub=V.tab==="g"&&(V.g||V.u);                       // dentro de um gênero ou espécie?
 $("#bk").hidden=!(sub||V.tab==="m"||V.tab==="b");
 $("#ttl").textContent=V.tab==="m"?"Modelos":V.tab==="b"?"Backup":V.tab==="a"?"Agenda":V.tab==="c"?"Contagens regressivas":V.u?(V.u==="*"?"Atividades gerais":fam(V.u.split("|")[0]).n):!sub?"Diário de Pesquisa":fam(V.f).n;
 const fa=V.tab==="a"?"addAg":V.tab==="c"?"addCd":V.tab==="g"&&!V.u?(V.g?"addSp":"addFam"):"";   // ação do botão flutuante +
 $("#fab").hidden=!fa;$("#fab").dataset.a=fa;
 a.classList.remove("in-l","in-r");
 if(dir){void a.offsetWidth;a.classList.add(dir>0?"in-r":"in-l");dir=0}
}

// ===== 7. AÇÕES (o que cada botão faz) =====
const done=()=>{fix();save();closeM();render()}; // fix() garante que itens novos tenham todos os campos
const A={
 tab(el){closeMenu();go(el.dataset.i)},
 tf(el){const f=fam(el.dataset.i);if(f.o)f.o=0;else{S.f.forEach(x=>x.o=0);f.o=1}save();render()},
 tgf(){const a=!S.f.some(f=>f.o);S.f.forEach(f=>f.o=a?1:0);save();render()},
 tgs(){const g=gen(V.f,V.g),a=!g.spp.some(s=>s.o);g.spp.forEach(s=>s.o=a?1:0);save();render()},
 og(el){const[f,g,s]=el.dataset.i.split("|");V.tab="g";V.u=null;V.f=f;V.g=g;if(s)gen(f,g).spp.forEach(x=>x.o=x.id===s?1:0);dir=1;render();$("#app").scrollTop=0},
 ou(el){V.tab="g";V.u=el.dataset.i;V.f=V.g=V.s=null;dir=1;render();$("#app").scrollTop=0},
 dd(el){const t=own().tasks.find(x=>x.id===el.dataset.i);form("Prazo da atividade",[{k:"d",l:"Prazo",t:"date"}],{d:t.d},v=>{t.d=v.d;done()},t.d?()=>{t.d="";done()}:null,"Remover prazo")},
 es(el){const[a,b]=el.dataset.i.split("|"),t=own().tasks.find(x=>x.id===a),i=t.b.findIndex(s=>s.id===b),x=t.b[i];form("Editar subitem",[{k:"t",l:"Nome"},{k:"p",l:"Posição na lista",t:"sel",o:t.b.map((_,j)=>String(j+1))}],{t:x.t,p:String(i+1)},v=>{if(!v.t)return;x.t=v.t;t.b.splice(i,1);t.b.splice(Math.max(0,Math.min(+v.p-1,t.b.length)),0,x);done()},()=>{t.b.splice(i,1);done()})},
 addCd(){form("Nova contagem regressiva",cdForm,{fm:FM.ymd,hz:"7"},v=>{if(!v.n||!v.d)return toast("Informe o nome e a data");S.cd.push(cdSave({id:uid()},v));done()})},
 ecd(el){const c=S.cd.find(x=>x.id===el.dataset.i);form("Editar contagem",cdForm,{n:c.n,d:c.d,h:c.h,fm:FM[c.fm],hz:String(c.hz),nt:c.nt},v=>{if(!v.n||!v.d)return toast("Informe o nome e a data");cdSave(c,v);done()},()=>{if(!ask("a contagem "+c.n))return;S.cd=S.cd.filter(x=>x!==c);done()})},
 escf(){const e=S.sc;form("Escala de trabalho",escForm,{pat:e.pat,ref:e.ref,pos:String(e.pos),on:e.on?"Sim":"Não"},v=>{const p=v.pat.toUpperCase().replace(/[^A-Z]/g,"");if(!p||!v.ref)return toast("Informe o padrão e a data de referência");S.sc={pat:p,ref:v.ref,pos:Math.min(p.length,Math.max(1,+v.pos||1)),on:v.on==="Sim"?1:0};done()})},
 agm(el){const c=V.cal,d=new Date(c.y,c.m+(+el.dataset.i),1);c.y=d.getFullYear();c.m=d.getMonth();render()},
 agd(el){V.cal.d=el.dataset.i;render()},
 agt(){const s=today();V.cal={y:+s.slice(0,4),m:+s.slice(5,7)-1,d:s};render()},
 agi(el){const i=AGL[+el.dataset.i];if(!i)return;if(i.k==="t")editTask(i.x.o||i.x.s||i.x.g,i.x.t);else if(i.k==="p")A.og({dataset:{i:i.x.f.id+"|"+i.x.g.id+"|"+i.x.s.id}});else if(i.k==="c")A.ecd({dataset:{i:i.x.id}});else A.eag({dataset:{i:i.x.id}})},
 addAg(){form("Nova atividade na agenda",agForm,{d:V.cal.d,s:STAT[0],col:CL.blue,pn:"Sim"},v=>{if(!v.t||!v.d)return toast("Informe a atividade e a data");S.ag.push(agSave({id:uid()},v));V.cal.d=v.d;V.cal.y=+v.d.slice(0,4);V.cal.m=+v.d.slice(5,7)-1;done()})},
 eag(el){const e=S.ag.find(x=>x.id===el.dataset.i);form("Editar atividade da agenda",agForm,{t:e.t,d:e.d,h:e.h,s:e.s,p:e.p||"Sem prioridade",col:CL[e.col],pn:e.pn?"Sim":"Não",nt:e.nt},v=>{if(!v.t||!v.d)return toast("Informe a atividade e a data");agSave(e,v);V.cal.d=v.d;done()},()=>{if(!ask("a atividade "+e.t))return;S.ag=S.ag.filter(x=>x!==e);done()})},
 back(){V.g=null;V.s=null;render()},
 navback(){if(V.tab!=="g"){go("g");return}if(V.u)V.u=null;else V.g=null;dir=-1;render()},
 menu(){const o=$("#menu").hidden;$("#menu").hidden=!o;$("#scrim").hidden=!o},
 addGrp(el){const f=fam(el.dataset.i);form("Novo agrupamento (subfamília, tribo...)",grForm,{r:RANKS[0]},v=>{if(!v.n)return;f.grp.push({id:uid(),n:v.n,r:v.r,nt:v.nt});f.o=1;done()})},
 editGrp(el){const[fi,gi]=el.dataset.i.split("|"),f=fam(fi),x=grById(f,gi);form("Editar agrupamento",grForm,{n:x.n,r:x.r,nt:x.nt},v=>{if(!v.n)return;Object.assign(x,{n:v.n,r:v.r,nt:v.nt});done()},()=>{if(!ask(grl(x)+" (os gêneros dele NÃO serão apagados, só ficarão sem agrupamento)"))return;f.g.forEach(g=>{if(g.gr===x.id)g.gr=""});f.grp=f.grp.filter(y=>y!==x);done()})},
 backg(){V.s=null;render()},
 os(el){const g=gen(V.f,V.g),s=g.spp.find(x=>x.id===el.dataset.i);if(s.o)s.o=0;else{g.spp.forEach(x=>x.o=0);s.o=1}save();render()},
 addSp(){const g=gen(V.f,V.g);form("Nova espécie",sForm,{tp:"Não definida",st:GST[0],p:PRIO[1]},v=>{if(!v.n)return;g.spp.push({id:uid(),n:v.n,ex:v.ex,tp:v.tp,d:v.d,st:v.st,p:v.p,nt:v.nt,parts:[],hab:[],tasks:[]});done()})},
 editSp(){const g=gen(V.f,V.g),s=own();form("Editar espécie",sForm,{n:s.n,ex:s.ex,tp:s.tp,d:s.d,st:s.st,p:s.p,nt:s.nt},v=>{if(!v.n)return;Object.assign(s,{n:v.n,ex:v.ex,tp:v.tp,d:v.d,st:v.st,p:v.p,nt:v.nt});done()},()=>{if(!ask("a espécie "+s.n+" e todo o seu progresso"))return;g.spp=g.spp.filter(x=>x!==s);V.s=null;done()})},
 pt(el){const[i,k]=el.dataset.i.split("|");own().parts[i][k]=el.checked?1:0;save();render()},
 dp(el){own().parts.splice(+el.dataset.i,1);save();render()},
 ap(el){own().parts.push({n:el.dataset.i});save();render()},
 apall(el){const s=own(),x=el.dataset.i==="M"?"♀":"♂";S.tpl.parts.forEach(n=>{if(!n.includes(x)&&!s.parts.some(p=>p.n===n))s.parts.push({n})});save();render()},
 hb(el){own().hab[+el.dataset.i].x=el.checked?1:0;save();render()},
 dh(el){own().hab.splice(+el.dataset.i,1);save();render()},
 ah(el){own().hab.push({n:el.dataset.i,x:0});save();render()},
 tq(el){const k=S.tpl.tk[+el.dataset.i];own().tasks.push(mk(k.t,k.c,STAT[0],"","",k.b));save();render()},
 tdel(el){const[k,i]=el.dataset.i.split("|");S.tpl[k].splice(+i,1);save();render()},
 tka(){form("Nova atividade padrão",kForm,{c:CATS[0],lv:LV.gs},v=>{if(!v.t)return;const k={};kSave(k,v);S.tpl.tk.push(k);done()})},
 tke(el){const i=+el.dataset.i,k=S.tpl.tk[i];form("Editar atividade padrão",kForm,{t:k.t,c:k.c,lv:LV[k.lv],b:k.b.join(", ")},v=>{if(!v.t)return;kSave(k,v);done()},()=>{S.tpl.tk.splice(i,1);done()})},
 treset(){if(confirm("Restaurar todos os modelos para o padrão?")){S.tpl=defTpl();save();render()}},
 addFam(){form("Nova família",[{k:"n",l:"Nome da família"},{k:"nt",l:"Notas",t:"area"}],{},v=>{if(!v.n)return;S.f.forEach(x=>x.o=0);S.f.push({id:uid(),n:v.n,nt:v.nt,o:1,g:[],grp:[]});done()})},
 editFam(el){const f=fam(el.dataset.i);form("Editar família",[{k:"n",l:"Nome da família"},{k:"nt",l:"Notas",t:"area"}],{n:f.n,nt:f.nt},v=>{if(!v.n)return;f.n=v.n;f.nt=v.nt;done()},()=>{if(!ask("a família "+f.n+" e todos os seus "+f.g.length+" gênero(s), espécies e atividades"))return;S.f=S.f.filter(x=>x!==f);done()})},
 addGen(el){const f=fam(el.dataset.i);form("Novo gênero",gForm(f),{st:GST[0],p:PRIO[1]},v=>{if(!v.n)return;f.g.push({id:uid(),n:v.n,st:v.st,p:v.p,sp:v.sp,nt:v.nt,gr:grId(f,v.gr),tasks:[],spp:[]});f.o=1;done()})},
 editGen(){const f=fam(V.f),g=gen(V.f,V.g);form("Editar gênero",gForm(f),{n:g.n,st:g.st,p:g.p,sp:g.sp,nt:g.nt,gr:grLab(f,g.gr)},v=>{if(!v.n)return;Object.assign(g,{n:v.n,st:v.st,p:v.p,sp:v.sp,nt:v.nt,gr:grId(f,v.gr)});done()},()=>{if(!ask("o gênero "+g.n+", com "+g.spp.length+" espécie(s) e todo o progresso"))return;f.g=f.g.filter(x=>x!==g);V.g=null;done()})},
 addTask(){const g=own();form("Nova atividade",tForm(0,1),{c:catsFor()[0],s:STAT[0]},v=>{if(!v.t)return;g.tasks.push(mk(v.t,v.c,v.s,v.d,v.nt,sp(v.b),PRIO.includes(v.p)?v.p:""));done()})},
 et(el){const g=own();editTask(g,g.tasks.find(x=>x.id===el.dataset.i))},
 cy(el){const t=own().tasks.find(x=>x.id===el.dataset.i);t.s=STAT[(STAT.indexOf(t.s)+1)%3];save();render()},
 sb(el){const[a,b]=el.dataset.i.split("|"),x=own().tasks.find(t=>t.id===a).b.find(s=>s.id===b);x.x=el.checked?1:0;save();render()},
 ds(el){const[a,b]=el.dataset.i.split("|"),t=own().tasks.find(t=>t.id===a);t.b=t.b.filter(s=>s.id!==b);save();render()},
 ok(){if(cb)cb.ok(vals())},cancel:closeM,del(){if(cb&&cb.del)cb.del()},
 copy(){const t=$("#bk");t.select();try{navigator.clipboard.writeText(t.value).then(()=>toast("Backup copiado"),()=>document.execCommand("copy"))}catch(e){document.execCommand("copy");toast("Backup copiado")}},
 imp(){try{const o=JSON.parse($("#imp").value);if(!o||!Array.isArray(o.f))throw 0;S=o;fix();save();render();toast("Backup restaurado")}catch(e){toast("Backup inválido")}}
};

// ===== 8. EVENTOS (escuta cliques, digitação e teclas) =====
["click","keydown"].forEach(ev=>document.addEventListener(ev,e=>{const w=e.target.closest&&e.target.closest("[data-sp]");V.ow=w?w.dataset.sp:null},true));   // qual espécie (aba) recebeu o clique/tecla
document.addEventListener("click",e=>{const el=e.target.closest("[data-a]");if(el&&A[el.dataset.a]){if(el.type!=="checkbox")e.preventDefault&&0;A[el.dataset.a](el)}});
document.addEventListener("input",e=>{if(e.target.id==="q"){V.q=e.target.value;list()}});
document.addEventListener("keydown",e=>{const el=e.target;if(e.key==="Enter"&&el.dataset&&el.dataset.sub&&el.value.trim()){const t=own().tasks.find(x=>x.id===el.dataset.sub);t.b.push({id:uid(),t:el.value.trim(),x:0});save();render();const n=document.querySelector(`[data-sub="${t.id}"]`);if(n)n.focus()}});
// deslizar com o dedo: a tela acompanha o gesto e troca com animação suave
const pane=$("#app");
let tx=0,ty=0,tt=0,mode=0;   // mode: 0 = indefinido, 1 = horizontal, -1 = vertical/ignorar
const MAIN=["g","p","a","c"];
const swTarget=dx=>{const i=MAIN.indexOf(V.tab);if(i<0)return dx>0?"g":null;if(!i&&(V.g||V.u))return dx>0?"back":null;return MAIN[i+(dx<0?1:-1)]||null};
pane.addEventListener("touchstart",e=>{const t=e.touches[0];tx=t.clientX;ty=t.clientY;tt=Date.now();mode=e.target.closest("input,textarea,select")?-1:0;pane.style.transition="none"},{passive:true});
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
// ===== 9. INÍCIO (primeira vez que a tela é desenhada) =====
render();

setInterval(()=>{if(V.tab==="c")tick()},20000);   // atualiza as contagens

// ===== 10. MODO OFFLINE / INSTALÁVEL (registra o service worker) =====
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
