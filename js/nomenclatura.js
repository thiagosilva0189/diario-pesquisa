// =====================================================================
// Diário de Pesquisa — nomenclatura.js: ATOS NOMENCLATURAIS E CHECKLISTS
// Atos nomenclaturais da espécie e do gênero (sp. nov., gen. nov., comb. nov.,
// syn. nov., stat. rev., stat. nov., nom. nov., espécie-tipo, lectótipo e
// neótipo, redescrição), checklist da espécie nova e do gênero novo e o
// cartão "Novidades taxonômicas" do Painel.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== ATOS NOMENCLATURAIS =====
// [v2.5] c = código guardado · l = como aparece · lv = vale para espécie (s), gênero (g) ou os dois (sg)
//        d = descrição · p = pergunta do campo de detalhe (atos que envolvem outro nome)
//        rep = pode repetir (várias sinonímias) · auto = vem do Material-tipo ("designado neste trabalho")
const ATO=[
 {c:"gnn",l:"gen. nov.",lv:"g",d:"gênero novo"},
 {c:"spn",l:"sp. nov.",lv:"s",d:"espécie nova"},
 {c:"cbn",l:"comb. nov.",lv:"s",d:"nova combinação",p:"Combinação anterior (ex.: Diplocoelus fulvus Sharp, 1900)"},
 {c:"syn",l:"syn. nov.",lv:"sg",d:"nova sinonímia",p:"Nome envolvido (ex.: B. fulvus Sharp, 1900, sinônimo júnior)",rep:1},
 {c:"srv",l:"stat. rev.",lv:"sg",d:"status revalidado",p:"Situação anterior (ex.: estava na sinonímia de ...)"},
 {c:"snv",l:"stat. nov.",lv:"sg",d:"novo status",p:"Situação anterior (ex.: era subespécie de ...)"},
 {c:"nmn",l:"nom. nov.",lv:"sg",d:"nome novo (substituto)",p:"Nome substituído (nome preocupado)"},
 {c:"etd",l:"espécie-tipo designada",lv:"g",d:"designação da espécie-tipo",p:"Espécie-tipo (ex.: B. punctatus Sharp, 1900)"},
 {c:"lec",l:"lectótipo designado",lv:"s",d:"designação de lectótipo",auto:1},
 {c:"neo",l:"neótipo designado",lv:"s",d:"designação de neótipo",auto:1},
 {c:"red",l:"redescrição",lv:"sg",d:"redescrição"}
];
const ATD={};ATO.forEach(x=>{ATD[x.c]=x});   // acha o ato pelo código
// atos de uma espécie ou de um gênero, na ordem da lista acima (com o lectótipo/neótipo automático)
function atList(o){const L=(o.at||[]).filter(a=>ATD[a.c]),t=o.ty;
 if(t&&t.dz&&(t.pr==="Lectótipo"||t.pr==="Neótipo"))L.push({id:"",c:t.pr==="Lectótipo"?"lec":"neo",x:"",auto:1});
 return L.sort((a,b)=>ATO.indexOf(ATD[a.c])-ATO.indexOf(ATD[b.c]))}
const atHas=(o,c)=>atList(o).some(a=>a.c===c);
// etiquetas dos atos (cabeçalho e listas); "syn. nov. ×2" quando o ato se repete
function atChips(o){if(!S.cfg.sat)return"";const n={};atList(o).forEach(a=>{n[a.c]=(n[a.c]||0)+1});
 return ATO.filter(x=>n[x.c]).map(x=>`<span class="chip at" title="${esc(x.d)}">${esc(x.l)}${n[x.c]>1?" ×"+n[x.c]:""}</span>`).join("")}
const atSum=o=>{const L=atList(o);return L.length?esc([...new Set(L.map(a=>ATD[a.c].l))].join(", ")):"nenhum"};
// seção "Atos nomenclaturais" (espécie e gênero): lista com o detalhe de cada ato e botões de 1 clique
function atH(o){const lv=lvOf(o),L=atList(o);
 let h=L.length?`<div class="card atl">${L.map(a=>{const d=ATD[a.c];
  return`<div class="r atr">${a.auto?`<span class="chip at">${esc(d.l)}</span>`:`<button class="chip at" data-a="ate" data-i="${a.id}">${esc(d.l)}</button>`}<span class="g1">${a.x?esc(a.x):`<small>${a.auto?"marcado em Material-tipo (designado neste trabalho)":d.p?"toque no ato para informar: "+esc(d.p.split(" (")[0].toLowerCase()):esc(d.d)}</small>`}</span>${a.auto?"":`<button class="ic" data-a="atd" data-i="${a.id}">✕</button>`}</div>`}).join("")}</div>`
  :`<p class="note">Nenhum ato nomenclatural marcado.</p>`;
 const av=ATO.filter(x=>x.lv.includes(lv)&&!x.auto&&(x.rep||!L.some(a=>a.c===x.c)));
 if(av.length)h+=`<div>${av.map(x=>chip("ata",x.c,x.l)).join("")}</div>`;
 if(lv==="s")h+=`<p class="note">Lectótipo ou neótipo designado neste trabalho: escolha o tipo primário em Material-tipo e marque “Designado neste trabalho”.</p>`;
 return h}
// janela do detalhe do ato (nv = ato novo: só entra na lista ao salvar)
function atForm(o,a,nv){const d=ATD[a.c];
 form(esc(d.l)+" — "+esc(d.d),[{k:"x",l:d.p||"Observação (opcional)"}],{x:a.x},v=>{a.x=v.x;if(nv)o.at.push(a);done()},nv?null:()=>rm("Ato removido",()=>{o.at=o.at.filter(y=>y!==a)}))}

// ===== CHECKLIST DA ESPÉCIE NOVA E DO GÊNERO NOVO =====
// [v2.5] k = código · l = item · a = feito sozinho (a partir do Material-tipo ou dos atos) · so = só automático (sem caixinha)
//        sb = também vale um subitem marcado com este nome em qualquer atividade (ex.: "Diagnose" em "Descrição e diagnose")
//        z = registro no ZooBank (pede o LSID)
const NVS=[
 {k:"ho",l:"Holótipo designado",so:1,a:s=>s.ty.pr==="Holótipo"&&s.ty.L.some(r=>r.r==="p")?"em Material-tipo":""},
 {k:"dep",l:"Depositário do holótipo",so:1,a:s=>{const r=s.ty.pr==="Holótipo"&&s.ty.L.find(r=>r.r==="p");return r&&r.dep?r.dep:""}},
 {k:"lt",l:"Localidade-tipo",so:1,a:s=>s.ty.lt?"em Material-tipo":""},
 {k:"dg",l:"Diagnose",sb:["diagnose","diagnosis"]},
 {k:"ds",l:"Descrição",sb:["descricao","description"]},
 {k:"me",l:"Material examinado",sb:["material examinado","material examined"]},
 {k:"et",l:"Etimologia",sb:["etimologia","etymology"]},
 {k:"il",l:"Ilustrações e fotos",sb:["ilustracoes","ilustracoes e fotos","pranchas"]},
 {k:"zb",l:"Registro no ZooBank (LSID)",z:1}
];
const NVG=[
 {k:"tp",l:"Espécie-tipo designada",a:g=>{const x=(g.at||[]).find(a=>a.c==="etd");return x?x.x||"ato marcado":""}},
 {k:"dg",l:"Diagnose do gênero",sb:["diagnose","diagnosis"]},
 {k:"ds",l:"Descrição do gênero",sb:["descricao","description"]},
 {k:"et",l:"Etimologia",sb:["etimologia","etymology"]},
 {k:"gr",l:"Gênero gramatical do nome"},
 {k:"zb",l:"Registro no ZooBank (LSID)",z:1}
];
const nvL=o=>lvOf(o)==="s"?NVS:NVG;
// subitem marcado com o nome do item (sem acentos, maiúsculas e pontuação), em qualquer atividade
function nvSub(o,L){for(const t of o.tasks||[])for(const b of t.b)if(b.x&&L.includes(nz(b.t).replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim()))return{b,t};return null}
// situação de um item: on = feito · na = não será feito · src = a (automático), b (subitem) ou m (à mão)
function nvSt(o,it){
 if(it.a){const r=it.a(o);if(r)return{on:1,src:"a",info:r}}
 if(it.sb){const r=nvSub(o,it.sb);if(r)return{on:1,src:"b",d:isDate(r.b.x)?r.b.x:"",info:"subitem “"+r.b.t+"” ("+r.t.t+")"}}
 const v=(o.nv||{})[it.k];return{on:isD(v),na:isNA(v),d:isDate(v)?v:"",src:"m",info:""}}
// [feitos, que valem]: os "não será feito" saem da conta
function nvCnt(o){let d=0,n=0;nvL(o).forEach(it=>{const x=nvSt(o,it);if(x.na)return;n++;if(x.on)d++});return[d,n]}
const nvSum=o=>{const[d,n]=nvCnt(o);return d+"/"+n+" itens"};
function nvH(o){const sp=lvOf(o)==="s";
 return`<div class="card nvl">${nvL(o).map(it=>{const x=nvSt(o,it),man=!it.so&&x.src==="m";
  const box=man?tcB("nvc",0,it.k,o.nv[it.k],it.l):`<span class="tc fx${x.on?" on":""}" title="${x.on?(x.src==="b"?"feito pelo subitem":"preenchido sozinho"):"preenchido sozinho"}"></span>`;
  let inf=x.src==="a"?esc(x.info):x.src==="b"?"pelo "+esc(x.info)+(x.d?" · "+fmt(x.d):""):x.d?fmt(x.d):x.na?"não será feito":"";
  if(it.z&&o.nv.lsid)inf=(inf?inf+" · ":"")+"LSID "+esc(o.nv.lsid);
  const ex=it.z?`<button class="ic" data-a="zbl" title="LSID do ZooBank">✎</button>`:it.so&&!x.on?`<button class="lnk" data-a="nvgo">Preencher</button>`:"";
  return`<div class="r nvr">${box}<span class="g1${x.na?" mut":""}"><b>${esc(it.l)}</b>${inf?`<small>${inf}</small>`:""}</span>${ex}</div>`}).join("")}</div>`
 +`<p class="note">${sp?"Holótipo, depositário e localidade-tipo vêm do Material-tipo. ":"A espécie-tipo vem do ato “espécie-tipo designada”. "}Diagnose, descrição${sp?", material examinado":""} e etimologia também ficam feitas ao marcar um subitem com esse nome numa atividade (ex.: Descrição e diagnose)${naLeg()}.</p>`}

// ===== PAINEL: NOVIDADES TAXONÔMICAS =====
// [v2.5] quantos atos de cada tipo existem; tocar num número mostra os táxons (com o checklist dos novos)
function nvtH(){const C={},T={},add=(a,x)=>{C[a.c]=(C[a.c]||0)+1;(T[a.c]=T[a.c]||[]).push(Object.assign({a},x))};
 S.f.forEach(f=>f.g.forEach(g=>{atList(g).forEach(a=>add(a,{f,g}));g.spp.forEach(s=>atList(s).forEach(a=>add(a,{f,g,s})))}));
 const K=ATO.filter(x=>C[x.c]);if(!K.length)return"";const k=C[V.nvk]?V.nvk:"";
 return`<div class="grp">Novidades taxonômicas</div><div class="stats nvt">${K.map(x=>`<button class="${x.c===k?"on":""}" data-a="nvk" data-i="${x.c}" title="${esc(x.d)}"><b>${C[x.c]}</b><span>${esc(x.l)}</span></button>`).join("")}</div>`
 +(k?`<div class="card nvtl">${T[k].map(x=>{const nv=k==="spn"||k==="gnn"?nvCnt(x.s||x.g):null;
  return`<div class="hj" data-a="og" data-i="${x.f.id}|${x.g.id}|${x.s?x.s.id:""}"><span class="g1">${x.s?spH(x.g,x.s,1):gl(x.g)}${x.a.x?` <small>· ${esc(x.a.x)}</small>`:""}</span><small>${nv?"checklist "+nv[0]+"/"+nv[1]:esc(x.f.n)}</small></div>`}).join("")}</div>`:"")}

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.5] atos: marcar (1 clique; os que envolvem outro nome perguntam o detalhe), editar o detalhe e remover
 ata(el){const o=own(),d=ATD[el.dataset.i];if(!o||!o.at||!d)return;const a={id:uid(),c:d.c,x:""};
  if(d.p)return atForm(o,a,1);
  o.at.push(a);if(d.c==="spn"||d.c==="gnn"){o.op=o.op||{};o.op.nv=1}   // espécie/gênero novo: abre o checklist
  save();render()},
 ate(el){const o=own(),a=o&&(o.at||[]).find(x=>x.id===el.dataset.i);if(a)atForm(o,a)},
 atd(el){const o=own(),i=el.dataset.i;rm("Ato removido",()=>{o.at=o.at.filter(x=>x.id!==i)})},
 // [v2.5] Material-tipo: lectótipo/neótipo "designado neste trabalho" (vira ato nomenclatural)
 tydz(el){const s=spc(V.f,V.g,el.dataset.i);if(!s)return;s.ty.dz=el.checked?1:0;save();render()},
 // [v2.5] checklist: caixinha de 3 estados, abrir o Material-tipo e LSID do ZooBank
 nvc(el){const o=own(),k=el.dataset.i.split("|")[1];o.nv=o.nv||{};o.nv[k]=nxt(o.nv[k]);save();render()},
 nvgo(){const s=own();if(!s||!s.ty)return;if(!S.cfg.sty)return toast("Ligue a seção Material-tipo nas Configurações");
  s.op=s.op||{};s.op.ty=1;saveUI();render();const b=document.querySelector(`[data-sp="${s.id}"] .acc-h[data-i$="|ty"]`);if(b)b.scrollIntoView({block:"start"})},
 zbl(){const o=own();o.nv=o.nv||{};form("Registro no ZooBank",[{k:"lsid",l:"LSID (ex.: urn:lsid:zoobank.org:act:...)",t:"area"},{k:"d",l:"Data do registro",t:"date"}],{lsid:o.nv.lsid,d:isDate(o.nv.zb)?o.nv.zb:""},v=>{o.nv.lsid=v.lsid.replace(/\s+/g,"");if(v.d)o.nv.zb=v.d;else if(o.nv.lsid&&!isD(o.nv.zb))o.nv.zb=today();done()})},
 // [v2.5] Painel: mostrar/esconder os táxons de um tipo de ato
 nvk(el){V.nvk=V.nvk===el.dataset.i?"":el.dataset.i;render()},
});
