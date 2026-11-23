
// ===== 1. CONSTANTES (listas fixas: situações, categorias, modelo de tarefas) =====
const KEY="diario-pesquisa-v1";
const STAT=["A fazer","Em execução","Concluída"];
const GST=["Potencial","Planejado","Em andamento","Pausado","Concluído"];
const PRIO=["Alta","Média","Baixa"];
const CATS=["Revisão bibliográfica","Material / empréstimos","Coleta","Triagem e identificação","Dissecção","Genitália / preparação","Fotografia / montagem","Ilustração","Morfometria","Matriz de caracteres","Molecular","Análise filogenética","Descrição / redescrição","Mapas e distribuição","Escrita","Revisão e submissão","Outra"];
const STEPS = [["d","D","Dissecada"],["l","L","Lâmina montada"],["i","I","Ilustrada"],["f","F","Fotografada"]];
const ONLY_S = ["Dissecção","Genitália / preparação","Fotografia / montagem"];   // só espécie
const ONLY_G = ["Matriz de caracteres","Análise filogenética"];                 // só gênero
const LV = {g:"Só gênero", s:"Só espécie", gs:"Gênero e espécie"};
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
    {c:"Escrita", t:"Redação do manuscrito", lv:"gs", b:["Introdução","Material e métodos","Resultados","Discussão"]}
  ]
});

// ===== 2. FUNÇÕES AUXILIARES (pequenas ferramentas reutilizáveis) =====
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const uid=()=>Math.random().toString(36).slice(2,9);
const today=()=>new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
const fmt=d=>d.split("-").reverse().join("/");
const mk=(t,c,s,d,nt,b)=>({id:uid(),t,c,s:s||STAT[0],d:d||"",nt:nt||"",b:(b||[]).map(x=>({id:uid(),t:x,x:0}))});

// ===== 3. ESTADO (todos os dados vivem em S; a tela atual em V) =====
function seed(){return{t:0,tpl:defTpl(),f:[{id:uid(),n:"Biphyllidae",nt:"Exemplo: edite ou apague.",o:1,g:[{id:uid(),n:"Gênero exemplo",st:"Potencial",p:"Média",sp:"",nt:"Abra o gênero, toque em + Espécie e use os modelos de 1 clique.",tasks:[],spp:[]}]}]}}
let S;try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!S||!Array.isArray(S.f))S=seed();
fix();
let V={tab:"g",f:null,g:null,s:null,q:""},cb=null;
const fam=id=>S.f.find(f=>f.id===id),gen=(f,g)=>{const F=fam(f);return F&&F.g.find(x=>x.id===g)};
const spc=(f,g,s)=>{const G=gen(f,g);return G&&G.spp.find(x=>x.id===s)};
const own=()=>V.s?spc(V.f,V.g,V.s):gen(V.f,V.g);

// ===== 4. SALVAR (localStorage) =====
function persist(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function save(){S.t=Date.now();persist()}
function toast(m){const t=$("#toast");t.textContent=m;t.style.display="block";setTimeout(()=>t.style.display="none",2200)}

// ===== 5. FORMULÁRIOS E TELAS (funções que devolvem HTML) =====
function units(o){let d=0,n=o.tasks.length;d+=o.tasks.filter(t=>t.s===STAT[2]).length;
 if(o.parts){o.parts.forEach(p=>STEPS.forEach(x=>{n++;d+=p[x[0]]?1:0}));o.hab.forEach(h=>{n++;d+=h.x?1:0})}
 if(o.spp)o.spp.forEach(s=>{const u=units(s);d+=u[0];n+=u[1]});return[d,n]}
function prog(o){const[d,n]=units(o);return`<div class="bar"><span style="width:${n?d/n*100:0}%"></span></div><small>${d}/${n} itens concluídos</small>`}
function form(title,fields,vals,ok,del){
 $("#modal").innerHTML=`<div class="sheet"><h3>${title}</h3>${fields.map(f=>`<label>${f.l}${f.t==="area"?`<textarea name="${f.k}">${esc(vals[f.k])}</textarea>`:f.t==="sel"?`<select name="${f.k}">${f.o.map(o=>`<option${o===vals[f.k]?" selected":""}>${esc(o)}</option>`).join("")}</select>`:`<input name="${f.k}" type="${f.t||"text"}" value="${esc(vals[f.k])}">`}</label>`).join("")}<div class="r"><button class="pri" data-a="ok">Salvar</button><button class="sec" data-a="cancel">Cancelar</button>${del?'<button class="dng" data-a="del">Excluir</button>':""}</div></div>`;
 $("#modal").classList.add("on");cb={ok,del};
}
const closeM=()=>{$("#modal").classList.remove("on");cb=null};
const vals=()=>{const o={};document.querySelectorAll("#modal [name]").forEach(e=>o[e.name]=e.value.trim());return o};
const gForm=f=>[{k:"n",l:"Nome do gênero"}].concat(f.grp.length?[{k:"gr",l:"Agrupamento (opcional)",t:"sel",o:["(nenhum)"].concat(f.grp.map(grl))}]:[],[{k:"st",l:"Situação",t:"sel",o:GST},{k:"p",l:"Prioridade",t:"sel",o:PRIO},{k:"sp",l:"Nº de espécies (aprox.)"},{k:"nt",l:"Notas",t:"area"}]);
const tForm=c=>[{k:"t",l:"Atividade"},{k:"c",l:"Categoria",t:"sel",o:catsFor().includes(c)?catsFor():[c,...catsFor()]},{k:"s",l:"Situação",t:"sel",o:STAT},{k:"d",l:"Prazo",t:"date"},{k:"nt",l:"Notas",t:"area"}];

function vGroups(){return`<div class="tools"><input id="q" type="search" placeholder="Buscar família, gênero, espécie ou atividade" value="${esc(V.q)}"></div><div id="list"></div>`}
function taskH(t){
 const k=STAT.indexOf(t.s),over=t.d&&t.d<today()&&k<2,sd=t.b.filter(x=>x.x).length;
 return`<div class="task s${k}"><div class="r"><button class="st" data-a="cy" data-i="${t.id}" title="Alternar situação">${["○","◐","●"][k]}</button><div class="g1"><b>${esc(t.t)}</b><div><span class="chip">${esc(t.c)}</span>${t.d?`<span class="chip ${over?"red":"blue"}">📅 ${fmt(t.d)}</span>`:""}${t.b.length?`<span class="chip">${sd}/${t.b.length}</span>`:""}</div></div><button class="ic" data-a="et" data-i="${t.id}">✎</button></div>${t.nt?`<div class="note" style="margin:4px 0 0 46px">${esc(t.nt)}</div>`:""}<ul>${t.b.map(x=>`<li><label><input type="checkbox" data-a="sb" data-i="${t.id}|${x.id}"${x.x?" checked":""}><span class="${x.x?"dn":""}">${esc(x.t)}</span></label><button class="ic" data-a="ds" data-i="${t.id}|${x.id}">✕</button></li>`).join("")}</ul><input class="addsub" data-sub="${t.id}" placeholder="+ subatividade (Enter)"></div>`;
}
function vGen(){
 const F=fam(V.f),g=gen(V.f,V.g);if(!g){V.g=null;return vGroups()}
 const x=grById(F,g.gr);
 let h=`<h2><em>${esc(g.n)}</em></h2><div>${x?`<span class="chip">${esc(grl(x))}</span>`:""}<span class="chip blue">${esc(g.st)}</span><span class="chip">Prioridade ${esc(g.p.toLowerCase())}</span>${g.sp?`<span class="chip">${esc(g.sp)} spp. (estimado)</span>`:""}</div>${g.nt?`<p class="note">${esc(g.nt)}</p>`:""}${prog(g)}`;
 h+=`<div class="grp">Espécies (${g.spp.length})</div>`+(g.spp.map(s=>`<div class="card gen" style="border-top:0" data-a="os" data-i="${s.id}"><b><em>${esc(s.n)}</em></b><div>${s.ex?`<span class="chip">${esc(s.ex)}</span>`:""}<span class="chip blue">Dissecção: ${esc(s.tp)}</span></div>${prog(s)}</div>`).join("")||'<div class="empty">Nenhuma espécie ainda. Toque no + para adicionar.</div>');
 h+=`<div class="tools"><button class="sec" data-a="editGen">Editar / excluir gênero</button></div>`;
 return h+`<div class="grp">Atividades do gênero</div>`+tasksH(g);
}
const allT=()=>{const r=[];S.f.forEach(f=>f.g.forEach(g=>{g.tasks.forEach(t=>r.push({f,g,t}));g.spp.forEach(s=>s.tasks.forEach(t=>r.push({f,g,s,t})))}));return r};
const item=x=>`<div class="card gen" style="border-top:0" data-a="og" data-i="${x.f.id}|${x.g.id}|${x.s?x.s.id:""}"><b>${esc(x.t.t)}</b><div><span class="chip">${esc(x.t.c)}</span>${x.t.d?`<span class="chip ${x.t.d<today()?"red":"blue"}">📅 ${fmt(x.t.d)}</span>`:""}</div><small><em>${esc(x.s?x.s.n:x.g.n)}</em> · ${esc(x.f.n)}</small></div>`;
function vDash(){
 const T=allT(),G=[];S.f.forEach(f=>f.g.forEach(g=>G.push({f,g})));
 const doing=T.filter(x=>x.t.s===STAT[1]),due=T.filter(x=>x.t.d&&x.t.s!==STAT[2]).sort((a,b)=>a.t.d.localeCompare(b.t.d)).slice(0,8);
 const pot=G.filter(x=>x.g.st==="Potencial").sort((a,b)=>PRIO.indexOf(a.g.p)-PRIO.indexOf(b.g.p));
 let h=`<div>${GST.map(s=>`<span class="chip blue">${s}: ${G.filter(x=>x.g.st===s).length}</span>`).join("")}<span class="chip">${T.filter(x=>x.t.s===STAT[2]).length}/${T.length} atividades concluídas</span></div>`;
 h+=`<div class="grp">Em execução (${doing.length})</div>`+(doing.map(item).join("")||'<div class="empty">Nada em execução.</div>');
 h+=`<div class="grp">Próximos prazos</div>`+(due.map(item).join("")||'<div class="empty">Nenhum prazo definido.</div>');
 h+=`<div class="grp">Gêneros potenciais (por prioridade)</div>`+(pot.map(x=>`<div class="card gen" style="border-top:0" data-a="og" data-i="${x.f.id}|${x.g.id}"><b><em>${esc(x.g.n)}</em></b> <small>${esc(x.f.n)}</small><div><span class="chip">Prioridade ${esc(x.g.p.toLowerCase())}</span></div></div>`).join("")||'<div class="empty">Nenhum gênero potencial.</div>');
 return h;
}
function vBackup(){return`<p class="note">Seus dados ficam salvos neste aparelho e, quando disponível, sincronizam entre seus dispositivos pela sua conta. Copie o backup abaixo de vez em quando.</p><textarea id="bk" readonly style="min-height:160px">${esc(JSON.stringify(S,null,1))}</textarea><div class="tools" style="margin-top:8px"><button class="sec" data-a="copy">Copiar backup</button></div><div class="grp">Restaurar</div><textarea id="imp" placeholder="Cole aqui um backup (substitui tudo)"></textarea><div class="tools" style="margin-top:8px"><button class="dng" data-a="imp">Restaurar backup</button></div>`}

function fix(){ // completa dados antigos com os campos novos
 S.tpl=S.tpl||defTpl();
 S.f.forEach(f=>{f.grp=f.grp||[]});
 if((S.v||0)<3){S.tpl.tk.forEach(k=>{if(k.lv==="g"&&(k.t==="Levantar descrições originais e literatura"||k.t==="Redação do manuscrito"))k.lv="gs"});S.v=3}
 S.f.forEach(f=>f.g.forEach(g=>{g.tasks=g.tasks||[];g.spp=g.spp||[];g.spp.forEach(s=>{s.parts=s.parts||[];s.hab=s.hab||[];s.tasks=s.tasks||[]})}));
}
const catsFor=()=>CATS.filter(c=>!(V.s?ONLY_G:ONLY_S).includes(c));
const chip=(a,i,t)=>`<button class="chip" data-a="${a}" data-i="${esc(i)}">+ ${esc(t==null?i:t)}</button>`;
function qadd(o){ // atividades do modelo que ainda não estão em o (1 clique)
 const lv=V.s?"s":"g",have=o.tasks.map(t=>t.t);
 const c=S.tpl.tk.filter(k=>k.lv.includes(lv)&&!have.includes(k.t));
 return c.length?`<div class="grp">Adicionar do modelo (1 clique)</div><div>${c.map(k=>chip("tq",S.tpl.tk.indexOf(k),k.t)).join("")}</div>`:"";
}
function tasksH(o){
 let h="";[1,0,2].forEach(k=>{const ts=o.tasks.filter(t=>t.s===STAT[k]);if(ts.length)h+=`<div class="grp">${STAT[k]} (${ts.length})</div>`+ts.map(taskH).join("")});
 return h+qadd(o)+`<div class="tools" style="margin-top:8px"><button class="sec" data-a="addTask">+ Atividade própria</button></div>`;
}
function vSp(){
 const g=gen(V.f,V.g),s=spc(V.f,V.g,V.s);if(!s){V.s=null;return vGen()}
 const hp=s.parts.map(p=>p.n),hh=s.hab.map(x=>x.n);
 const fp=S.tpl.parts.filter(n=>!hp.includes(n)),fh=S.tpl.hab.filter(n=>!hh.includes(n));
 let h=`<h2><em>${esc(s.n)}</em></h2><div>${s.ex?`<span class="chip">Material: ${esc(s.ex)}</span>`:""}<span class="chip blue">Dissecção: ${esc(s.tp)}</span></div>${s.nt?`<p class="note">${esc(s.nt)}</p>`:""}${prog(s)}<div class="tools" style="margin-top:10px"><button class="sec" data-a="editSp">Editar / excluir espécie</button></div>`;
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
function vTpl(){
 const sec=(k,t)=>`<div class="grp">${t}</div>`+S.tpl[k].map((n,i)=>`<div class="r" style="justify-content:space-between"><span>${esc(n)}</span><button class="ic" data-a="tdel" data-i="${k}|${i}">✕</button></div>`).join("")+`<input class="addsub" style="margin:6px 0;width:100%" data-tadd="${k}" placeholder="+ adicionar (Enter)">`;
 return `<p class="note">Modelos usados nos botões de 1 clique. Mudar aqui não altera o que já foi adicionado às espécies e gêneros.</p>`+sec("parts","Peças de dissecção (espécie)")+sec("hab","Posições de habitus (espécie)")+`<div class="grp">Atividades padrão</div>`+S.tpl.tk.map((k,i)=>`<div class="card gen" style="border-top:0" data-a="tke" data-i="${i}"><b>${esc(k.t)}</b><div><span class="chip">${esc(k.c)}</span><span class="chip blue">${LV[k.lv]}</span></div></div>`).join("")+`<div class="tools"><button class="sec" data-a="tka">+ Atividade padrão</button><button class="dng" data-a="treset">Restaurar padrão</button></div>`;
}
const sForm=[{k:"n",l:"Nome da espécie"},{k:"ex",l:"Material disponível (ex.: 3 ♂, 2 ♀)"},{k:"tp",l:"Dissecção planejada",t:"sel",o:["Não definida","Completa","Parcial"]},{k:"nt",l:"Notas",t:"area"}];
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
const genRow=(f,g)=>`<div class="gen" data-a="og" data-i="${f.id}|${g.id}"><b><em>${esc(g.n)}</em></b><div><span class="chip blue">${esc(g.st)}</span><span class="chip">Prioridade ${esc(g.p.toLowerCase())}</span>${g.sp?`<span class="chip">${esc(g.sp)} spp.</span>`:""}</div>${prog(g)}</div>`;
function list(){
 const q=V.q.toLowerCase();let h="";
 for(const f of S.f){
  const gs=f.g.filter(g=>!q||(f.n+" "+g.n+" "+g.tasks.map(t=>t.t).join(" ")+" "+g.spp.map(s=>s.n).join(" ")).toLowerCase().includes(q));
  if(q&&!gs.length)continue;
  const open=q||f.o;
  h+=`<section class="card"><div class="fh" data-a="tf" data-i="${f.id}"><b>${esc(f.n)}</b><small>${f.g.length} gêneros</small><span>${open?"▾":"▸"}</span></div>`;
  if(open){
   h+=gs.filter(g=>!grById(f,g.gr)).map(g=>genRow(f,g)).join("");
   f.grp.forEach(x=>{const m=gs.filter(g=>g.gr===x.id);if(q&&!m.length)return;
    h+=`<div class="sub" data-a="editGrp" data-i="${f.id}|${x.id}"><span class="chip blue">${esc(x.r)}</span><b>${esc(x.n)}</b><small>${m.length} gêneros</small><span>✎</span></div>`+m.map(g=>genRow(f,g)).join("")});
   h+=`<div class="acts"><button class="sec" data-a="addGen" data-i="${f.id}">+ Gênero</button><button class="sec" data-a="editFam" data-i="${f.id}">Editar / excluir</button><button class="lnk" data-a="addGrp" data-i="${f.id}">+ subfamília / tribo / grupo</button></div>${f.nt?`<div class="acts note">${esc(f.nt)}</div>`:""}`;
  }
  h+="</section>";
 }
 $("#list").innerHTML=h||'<div class="empty">Nenhuma família ainda. Toque no + para criar.</div>';
}
// ----- abas, deslize e animação -----
const TABS=["g","p","m","b"];
let dir=0;
function go(t){dir=Math.sign(TABS.indexOf(t)-TABS.indexOf(V.tab));V.tab=t;V.g=null;V.s=null;render();$("#app").scrollTop=0}

// ===== 6. RENDER (redesenha a tela a partir dos dados) =====
function render(){
 document.querySelectorAll("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.i===V.tab));
 const a=$("#app");
 a.innerHTML=V.tab==="g"?(V.s?vSp():V.g?vGen():vGroups()):V.tab==="p"?vDash():V.tab==="m"?vTpl():vBackup();
 if(V.tab==="g"&&!V.g)list();
 const sub=V.tab==="g"&&V.g;                       // dentro de um gênero ou espécie?
 $("#bk").hidden=!sub;
 $("#ttl").textContent=!sub?"Diário de Pesquisa":V.s?gen(V.f,V.g).n:fam(V.f).n;
 const fa=V.tab==="g"&&!V.s?(V.g?"addSp":"addFam"):"";   // ação do botão flutuante +
 $("#fab").hidden=!fa;$("#fab").dataset.a=fa;
 a.classList.remove("in-l","in-r");
 if(dir){void a.offsetWidth;a.classList.add(dir>0?"in-r":"in-l");dir=0}
}

// ===== 7. AÇÕES (o que cada botão faz) =====
const done=()=>{fix();save();closeM();render()}; // fix() garante que itens novos tenham todos os campos
const A={
 tab(el){go(el.dataset.i)},
 tf(el){const f=fam(el.dataset.i);f.o=f.o?0:1;save();render()},
 og(el){const[f,g,s]=el.dataset.i.split("|");V.tab="g";V.f=f;V.g=g;V.s=s||null;dir=1;render();$("#app").scrollTop=0},
 back(){V.g=null;V.s=null;render()},
 navback(){if(V.s)V.s=null;else V.g=null;dir=-1;render()},
 addGrp(el){const f=fam(el.dataset.i);form("Novo agrupamento (subfamília, tribo...)",grForm,{r:RANKS[0]},v=>{if(!v.n)return;f.grp.push({id:uid(),n:v.n,r:v.r,nt:v.nt});f.o=1;done()})},
 editGrp(el){const[fi,gi]=el.dataset.i.split("|"),f=fam(fi),x=grById(f,gi);form("Editar agrupamento",grForm,{n:x.n,r:x.r,nt:x.nt},v=>{if(!v.n)return;Object.assign(x,{n:v.n,r:v.r,nt:v.nt});done()},()=>{if(!ask(grl(x)+" (os gêneros dele NÃO serão apagados, só ficarão sem agrupamento)"))return;f.g.forEach(g=>{if(g.gr===x.id)g.gr=""});f.grp=f.grp.filter(y=>y!==x);done()})},
 backg(){V.s=null;render()},
 os(el){V.s=el.dataset.i;dir=1;render();$("#app").scrollTop=0},
 addSp(){const g=gen(V.f,V.g);form("Nova espécie",sForm,{tp:"Não definida"},v=>{if(!v.n)return;g.spp.push({id:uid(),n:v.n,ex:v.ex,tp:v.tp,nt:v.nt,parts:[],hab:[],tasks:[]});done()})},
 editSp(){const g=gen(V.f,V.g),s=own();form("Editar espécie",sForm,{n:s.n,ex:s.ex,tp:s.tp,nt:s.nt},v=>{if(!v.n)return;Object.assign(s,{n:v.n,ex:v.ex,tp:v.tp,nt:v.nt});done()},()=>{if(!ask("a espécie "+s.n+" e todo o seu progresso"))return;g.spp=g.spp.filter(x=>x!==s);V.s=null;done()})},
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
 addFam(){form("Nova família",[{k:"n",l:"Nome da família"},{k:"nt",l:"Notas",t:"area"}],{},v=>{if(!v.n)return;S.f.push({id:uid(),n:v.n,nt:v.nt,o:1,g:[],grp:[]});done()})},
 editFam(el){const f=fam(el.dataset.i);form("Editar família",[{k:"n",l:"Nome da família"},{k:"nt",l:"Notas",t:"area"}],{n:f.n,nt:f.nt},v=>{if(!v.n)return;f.n=v.n;f.nt=v.nt;done()},()=>{if(!ask("a família "+f.n+" e todos os seus "+f.g.length+" gênero(s), espécies e atividades"))return;S.f=S.f.filter(x=>x!==f);done()})},
 addGen(el){const f=fam(el.dataset.i);form("Novo gênero",gForm(f),{st:GST[0],p:PRIO[1]},v=>{if(!v.n)return;f.g.push({id:uid(),n:v.n,st:v.st,p:v.p,sp:v.sp,nt:v.nt,gr:grId(f,v.gr),tasks:[],spp:[]});f.o=1;done()})},
 editGen(){const f=fam(V.f),g=gen(V.f,V.g);form("Editar gênero",gForm(f),{n:g.n,st:g.st,p:g.p,sp:g.sp,nt:g.nt,gr:grLab(f,g.gr)},v=>{if(!v.n)return;Object.assign(g,{n:v.n,st:v.st,p:v.p,sp:v.sp,nt:v.nt,gr:grId(f,v.gr)});done()},()=>{if(!ask("o gênero "+g.n+", com "+g.spp.length+" espécie(s) e todo o progresso"))return;f.g=f.g.filter(x=>x!==g);V.g=null;done()})},
 addTask(){const g=own();form("Nova atividade",tForm(),{c:catsFor()[0],s:STAT[0]},v=>{if(!v.t)return;g.tasks.push(mk(v.t,v.c,v.s,v.d,v.nt));done()})},
 et(el){const g=own(),t=g.tasks.find(x=>x.id===el.dataset.i);form("Editar atividade",tForm(t.c),{t:t.t,c:t.c,s:t.s,d:t.d,nt:t.nt},v=>{if(!v.t)return;Object.assign(t,{t:v.t,c:v.c,s:v.s,d:v.d,nt:v.nt});done()},()=>{g.tasks=g.tasks.filter(x=>x!==t);done()})},
 cy(el){const t=own().tasks.find(x=>x.id===el.dataset.i);t.s=STAT[(STAT.indexOf(t.s)+1)%3];save();render()},
 sb(el){const[a,b]=el.dataset.i.split("|"),x=own().tasks.find(t=>t.id===a).b.find(s=>s.id===b);x.x=el.checked?1:0;save();render()},
 ds(el){const[a,b]=el.dataset.i.split("|"),t=own().tasks.find(t=>t.id===a);t.b=t.b.filter(s=>s.id!==b);save();render()},
 ok(){if(cb)cb.ok(vals())},cancel:closeM,del(){if(cb&&cb.del)cb.del()},
 copy(){const t=$("#bk");t.select();try{navigator.clipboard.writeText(t.value).then(()=>toast("Backup copiado"),()=>document.execCommand("copy"))}catch(e){document.execCommand("copy");toast("Backup copiado")}},
 imp(){try{const o=JSON.parse($("#imp").value);if(!o||!Array.isArray(o.f))throw 0;S=o;fix();save();render();toast("Backup restaurado")}catch(e){toast("Backup inválido")}}
};

// ===== 8. EVENTOS (escuta cliques, digitação e teclas) =====
document.addEventListener("click",e=>{const el=e.target.closest("[data-a]");if(el&&A[el.dataset.a]){if(el.type!=="checkbox")e.preventDefault&&0;A[el.dataset.a](el)}});
document.addEventListener("input",e=>{if(e.target.id==="q"){V.q=e.target.value;list()}});
document.addEventListener("keydown",e=>{const el=e.target;if(e.key==="Enter"&&el.dataset&&el.dataset.sub&&el.value.trim()){const t=own().tasks.find(x=>x.id===el.dataset.sub);t.b.push({id:uid(),t:el.value.trim(),x:0});save();render();const n=document.querySelector(`[data-sub="${t.id}"]`);if(n)n.focus()}});
// deslizar: troca de aba (esquerda/direita) ou volta (direita, dentro de gênero/espécie)
let tx=0,ty=0,tt=0;
$("#app").addEventListener("touchstart",e=>{const t=e.touches[0];tx=t.clientX;ty=t.clientY;tt=Date.now()},{passive:true});
$("#app").addEventListener("touchend",e=>{
 const t=e.changedTouches[0],dx=t.clientX-tx,dy=t.clientY-ty;
 if(Math.abs(dx)<70||Math.abs(dx)<Math.abs(dy)*1.6||Date.now()-tt>600)return;
 if(V.tab==="g"&&V.g){if(dx>0)A.navback();return}
 const t2=TABS[TABS.indexOf(V.tab)+(dx<0?1:-1)];if(t2)go(t2);
},{passive:true});
document.addEventListener("keydown",e=>{ // Enter nos campos de habitus e de modelos
 const el=e.target,v=el.value&&el.value.trim();if(e.key!=="Enter"||!v)return;
 if(el.dataset.hab)own().hab.push({n:v,x:0});else if(el.dataset.tadd)S.tpl[el.dataset.tadd].push(v);else return;
 save();render();const n=document.querySelector(el.dataset.hab?"[data-hab]":`[data-tadd="${el.dataset.tadd}"]`);if(n)n.focus();
});
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeM()});
// ===== 9. INÍCIO (primeira vez que a tela é desenhada) =====
render();

// ===== 10. MODO OFFLINE / INSTALÁVEL (registra o service worker) =====
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
