// =====================================================================
// Diário de Pesquisa — emprestimos.js: MATERIAL E EMPRÉSTIMOS
// Material de cada espécie (próprio ou de empréstimo) e a tela Empréstimos
// (menu ⋮): instituição, situação, prazo de devolução, prorrogações e
// exemplares de cada espécie. O prazo vai para a Agenda e o Google Agenda.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== LISTAS FIXAS E FERRAMENTAS =====
// [v2.5] situação do empréstimo (e cor de cada uma) e origem do material
const EST=["Solicitado","Recebido","Devolvido"],ESTC=["blue","yellow","green"];
const ORIG=["Próprio (do laboratório)","Empréstimo"];
const NOVO_EMP="+ Novo empréstimo (cadastrar agora)";
// [v2.5] todas as espécies, com família e gênero, para escolher numa lista (usado também nas matrizes)
function spAll(){const r=[],k={};S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>r.push({f,g,s,lab:fullSp(g,s)+" ("+f.n+")"}))));
 r.forEach(x=>{k[x.lab]=(k[x.lab]||0)+1;if(k[x.lab]>1)x.lab+=" #"+k[x.lab]});return r}   // nomes repetidos ganham #2, #3...
function spById(id){for(const f of S.f)for(const g of f.g){const s=g.spp.find(x=>x.id===id);if(s)return{f,g,s}}return null}
const empById=id=>S.emp.find(e=>e.id===id);
const empNome=e=>e?(e.inst||"Empréstimo")+(e.num?" nº "+e.num:""):"empréstimo excluído";
// exemplares (lotes) ligados a um empréstimo, em todas as espécies
function empLotes(id){const r=[];S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>s.lo.forEach(l=>{if(l.o==="e"&&l.e===id)r.push({f,g,s,l})}))));return r}
// nº de exemplares de uma lista de lotes; sem números, mostra a observação (ex.: "3 ♂, 2 ♀" vindo da versão antiga)
const nEx=L=>L.reduce((n,l)=>n+(parseInt(l.n,10)||0),0);
const exTxt=L=>{const n=nEx(L);if(n)return n+" ex.";if(L.length===1&&L[0].nt){const t=L[0].nt;return t.length>28?t.slice(0,27)+"…":t}return pl(L.length,"lote","lotes")};
const loDesc=l=>[l.n?l.n+" ex.":"",l.sx&&l.sx!==SEXO[0]?l.sx:""].filter(Boolean).join(" · ");
// prazo de devolução: "late" (atrasado) ou "soon" (dentro da antecedência do aviso)
function empPrazo(e){if(!e||e.st===EST[2]||!e.dd)return"";const n=D8(e.dd)-D8(today());return n<0?"late":n<=(+e.av||30)?"soon":""}

// ===== MATERIAL DA ESPÉCIE (próprio e de empréstimo) =====
// [v2.5] etiquetas: material próprio e de empréstimo (âmbar; vermelho perto do prazo); full = uma por empréstimo, tocável
function loChips(s,full){if(!S.cfg.slo||!s.lo.length)return"";
 const P=s.lo.filter(l=>l.o!=="e"),E=s.lo.filter(l=>l.o==="e"&&(empById(l.e)||{}).st!==EST[2]);
 let h=P.length?`<span class="chip">Próprio: ${esc(exTxt(P))}</span>`:"";
 if(full)h+=[...new Set(E.map(l=>l.e))].map(id=>{const e=empById(id),z=empPrazo(e);return`<button class="chip emp${z?" "+z:""}" data-a="emo" data-i="${id}">${esc((e&&e.inst)||"Empréstimo")}: ${esc(exTxt(E.filter(l=>l.e===id)))}${e&&e.dd?" · até "+fmt(e.dd):""}</button>`}).join("");
 else if(E.length){const z=E.map(l=>empPrazo(empById(l.e)));h+=`<span class="chip emp${z.includes("late")?" late":z.includes("soon")?" soon":""}">Empréstimo: ${esc(exTxt(E))}</span>`}
 return h}
function loSum(s){if(!s.lo.length)return"não informado";const P=s.lo.filter(l=>l.o!=="e"),E=s.lo.filter(l=>l.o==="e");
 return esc([P.length?"próprio "+exTxt(P):"",E.length?"empréstimo "+exTxt(E):""].filter(Boolean).join(" · "))}
// seção "Material": cada lote com a origem; os de empréstimo mostram o prazo de devolução
function loH(s){
 const h=s.lo.length?`<div class="card lol">${s.lo.map(l=>{const e=l.o==="e"?empById(l.e):null,z=empPrazo(e),dv=e&&e.st===EST[2];
  return`<div class="lor${dv?" mut":""}" data-a="loe" data-i="${l.id}"><span class="chip${l.o==="e"?" emp"+(z?" "+z:""):""}">${l.o==="e"?esc((e&&e.inst)||"Empréstimo"):"Próprio"}</span><span class="g1"><b>${esc(loDesc(l))||"exemplares"}</b>${l.nt?`<small>${esc(l.nt)}</small>`:""}${e?`<small>${dv?"devolvido"+(e.dv?" em "+fmt(e.dv):""):e.dd?"devolver até "+fmt(e.dd)+" ("+rel(e.dd)+")":esc(e.st.toLowerCase())}</small>`:""}</span><b class="note">✎</b></div>`}).join("")}</div>`
  :`<p class="note">Nenhum material informado. Separe o que é do laboratório do que veio emprestado.</p>`;
 return h+`<div class="tools" style="flex-wrap:wrap"><button class="sec" data-a="loa" data-i="p">+ Material próprio</button><button class="sec" data-a="loa" data-i="e">+ Material de empréstimo</button></div>`}
// janela do lote (nv = novo: só entra na lista ao salvar); um empréstimo novo pode ser cadastrado na hora
function loForm(s,l,nv){
 const act=S.emp.filter(e=>e.st!==EST[2]||e.id===l.e),labs=act.map(e=>empNome(e)+(e.dd?" · até "+fmt(e.dd):"")),cur=act.findIndex(e=>e.id===l.e);
 form(nv?(l.o==="e"?"Material de empréstimo":"Material próprio"):"Material da espécie",[{k:"o",l:"Origem",t:"sel",o:ORIG},{k:"e",l:"Empréstimo (se a origem for empréstimo)",t:"sel",o:labs.concat([NOVO_EMP])},{k:"n",l:"Nº de exemplares",t:"number"},{k:"sx",l:"Sexo",t:"sel",o:SEXO},{k:"nt",l:"Observações (ex.: montados, em álcool, nº de tombo, localidade)",t:"area"}],
  {o:ORIG[l.o==="e"?1:0],e:cur>=0?labs[cur]:labs[0]||NOVO_EMP,n:l.n,sx:l.sx||SEXO[0],nt:l.nt},
  v=>{const fin=eid=>{Object.assign(l,{o:v.o===ORIG[1]?"e":"p",e:v.o===ORIG[1]?eid:"",n:v.n,sx:v.sx,nt:v.nt});if(nv)s.lo.push(l);done()};
   if(v.o!==ORIG[1])return fin("");
   const i=labs.indexOf(v.e);if(i>=0)return fin(act[i].id);
   empForm({id:uid(),st:EST[1],dr:today(),av:30,pr:[]},e=>fin(e.id),1)},   // "+ Novo empréstimo": cadastra e depois guarda o lote
  nv?null:()=>rm("Material removido",()=>{s.lo=s.lo.filter(y=>y!==l)}))}

// ===== EMPRÉSTIMO: formulário e tela (menu ⋮) =====
// [v2.5] then = o que fazer depois de salvar (usado ao cadastrar um empréstimo de dentro da espécie)
function empForm(e,then,nv){
 form(nv?"Novo empréstimo":"Editar empréstimo",[{k:"inst",l:"Instituição / coleção (sigla, ex.: MZSP, NHMUK)"},{k:"cur",l:"Curador(a) ou contato"},{k:"num",l:"Nº do empréstimo ou do processo (opcional)"},{k:"st",l:"Situação",t:"sel",o:EST},{k:"dp",l:"Data do pedido",t:"date"},{k:"dr",l:"Data de recebimento",t:"date"},{k:"dd",l:"Prazo de devolução",t:"date"},{k:"dv",l:"Data da devolução",t:"date"},{k:"av",l:"Avisar quantos dias antes do prazo (no Google Agenda, no máximo 28)",t:"number"},{k:"nt",l:"Observações (material, tipos, condições do empréstimo)",t:"area"}],
  {inst:e.inst,cur:e.cur,num:e.num,st:e.st||EST[0],dp:e.dp,dr:e.dr,dd:e.dd,dv:e.dv,av:String(e.av||30),nt:e.nt},
  v=>{if(!v.inst)return toast("Informe a instituição");
   Object.assign(e,{inst:v.inst,cur:v.cur,num:v.num,st:v.st,dp:v.dp,dr:v.dr,dd:v.dd,dv:v.dv,av:Math.max(0,+v.av||0)||30,nt:v.nt});
   if(e.st!==EST[0]&&!e.dr)e.dr=today();if(e.st===EST[2]&&!e.dv)e.dv=today();   // recebido/devolvido sem data: hoje
   e.pr=e.pr||[];if(nv)S.emp.push(e);if(then)then(e);else done()},
  nv?null:()=>{const n=empLotes(e.id).length;conf("Excluir o empréstimo "+empNome(e)+(n?" e "+pl(n,"lote","lotes")+" de material ligado a ele nas espécies":"")+"?","Excluir",()=>rm("Empréstimo excluído",()=>{S.emp=S.emp.filter(x=>x!==e);S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{s.lo=s.lo.filter(l=>!(l.o==="e"&&l.e===e.id))})))}))})}
// [v2.5] cartão do empréstimo: situação, prazo e nº de exemplares; aberto mostra datas, prorrogações e espécies
function empCard(e){const L=empLotes(e.id),z=empPrazo(e),op=V.eo===e.id,i=EST.indexOf(e.st),lab=L.map(x=>x.l);
 let h=`<section class="card empc${z?" "+z:""}" data-emp="${e.id}"><div class="fh" data-a="eop" data-i="${e.id}"><span class="g1"><b>${esc(e.inst||"Empréstimo")}</b><small>${esc([e.num?"nº "+e.num:"",e.cur].filter(Boolean).join(" · "))||"empréstimo de material"}</small></span><span>${op?"▾":"▸"}</span></div>`
 +`<div class="empb"><span class="chip ${ESTC[i]||"gray"}">${esc(e.st)}</span>${e.dd&&i<2?`<span class="chip ${z==="late"?"red":z==="soon"?"orange":""}">Devolver até ${fmt(e.dd)} · ${rel(e.dd)}</span>`:""}${i===2&&e.dv?`<span class="chip green">✓ devolvido em ${fmt(e.dv)}</span>`:""}${L.length?`<span class="chip gray">${esc(exTxt(lab))} · ${pl(new Set(L.map(x=>x.s.id)).size,"espécie","espécies")}</span>`:""}</div>`;
 if(op)h+=`<div class="empd"><div class="empg">${[["dp","Pedido"],["dr","Recebido"],["dd","Prazo de devolução"],["dv","Devolvido"]].map(([k,l])=>`<div><small>${l}</small><span>${e[k]?fmt(e[k]):"—"}</span></div>`).join("")}</div>`
  +(e.pr.length?`<div class="grp">Prorrogações (${e.pr.length})</div>`+e.pr.map(p=>`<div class="hj" data-a="epe" data-i="${e.id}|${p.id}"><span class="g1">${p.ant?fmt(p.ant)+" → ":""}<b>${fmt(p.nd)}</b>${p.nt?` <small>· ${esc(p.nt)}</small>`:""}</span><small>${p.d?fmt(p.d):""}</small></div>`).join(""):"")
  +`<div class="grp">Exemplares (${L.length?esc(exTxt(lab)):"nenhum"})</div>`
  +(L.map(x=>`<div class="hj" data-a="og" data-i="${x.f.id}|${x.g.id}|${x.s.id}"><span class="g1">${spH(x.g,x.s,1)}${x.l.nt?` <small>· ${esc(x.l.nt)}</small>`:""}</span><small>${esc(loDesc(x.l))}</small></div>`).join("")||`<p class="note">Nenhum exemplar ligado a espécies. Use “+ Exemplares” ou, na espécie, Material › + Material de empréstimo.</p>`)
  +(e.nt?`<p class="note">${esc(e.nt).replace(/\n/g,"<br>")}</p>`:"")
  +`<div class="tools" style="flex-wrap:wrap">${i===0?`<button class="pri" data-a="emr" data-i="${e.id}">Marcar como recebido</button>`:i===1?`<button class="pri" data-a="emv" data-i="${e.id}">Marcar como devolvido</button>`:""}${i<2?`<button class="sec" data-a="epa" data-i="${e.id}">+ Prorrogação</button>`:""}<button class="sec" data-a="els" data-i="${e.id}">+ Exemplares</button><button class="sec" data-a="eme" data-i="${e.id}">Editar</button></div></div>`;
 return h+`</section>`}
// [v2.5] tela Empréstimos: com você (recebidos, pelo prazo), solicitados e devolvidos
function vEmp(){const top=`<p class="note">Empréstimos de material de outras coleções. O prazo de devolução vai para a Agenda como ‼ e, com a conta Google conectada, para o Google Agenda com aviso antecipado.</p>`;
 if(!S.emp.length)return top+`<div class="empty">Nenhum empréstimo ainda. Toque no + para cadastrar.</div>`;
 const byD=(a,b)=>(a.dd||"9999").localeCompare(b.dd||"9999");
 return top+[[EST[1],"Com você"],[EST[0],"Solicitados"],[EST[2],"Devolvidos"]].map(([st,t])=>{const L=S.emp.filter(e=>e.st===st).sort(st===EST[2]?(a,b)=>(b.dv||"").localeCompare(a.dv||""):byD);
  return L.length?`<div class="grp">${t} (${L.length})</div>`+L.map(empCard).join(""):""}).join("")}
// [v2.5] abrir um empréstimo (a partir da espécie, da Agenda ou do Painel); a seta volta para onde estava
function openEmp(id){const r={tab:V.tab,f:V.f,g:V.g,u:V.u};V.eo=id;go("e");if(r.tab!=="e")V.ret=r;const c=document.querySelector(`[data-emp="${id}"]`);if(c)c.scrollIntoView({block:"start"})}

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.5] material da espécie: novo lote (sem empréstimo ativo, cadastra o empréstimo antes) e editar
 loa(el){const s=own(),o=el.dataset.i==="e"?"e":"p";if(!s||!s.lo)return;const l={id:uid(),o,e:"",n:"",sx:SEXO[0],nt:""};
  if(o==="e"&&!S.emp.some(e=>e.st!==EST[2]))return empForm({id:uid(),st:EST[1],dr:today(),av:30,pr:[]},e=>{save();l.e=e.id;loForm(s,l,1)},1);
  loForm(s,l,1)},
 loe(el){const s=own(),l=s&&s.lo&&s.lo.find(x=>x.id===el.dataset.i);if(l)loForm(s,l)},
 emo(el){openEmp(el.dataset.i)},
 // [v2.5] tela Empréstimos: abrir/fechar cartão, criar, editar, recebido, devolvido, prorrogação e exemplares
 eop(el){V.eo=V.eo===el.dataset.i?null:el.dataset.i;render()},
 addEmp(){empForm({id:uid(),st:EST[0],dp:today(),av:30,pr:[]},null,1)},
 eme(el){const e=empById(el.dataset.i);if(e)empForm(e)},
 emr(el){const e=empById(el.dataset.i);if(!e)return;e.st=EST[1];e.dr=e.dr||today();save();render();
  if(!e.dd)form("Recebido — prazo de devolução",[{k:"dd",l:"Prazo de devolução",t:"date"}],{},v=>{e.dd=v.dd;done()});else toast("Empréstimo recebido")},
 emv(el){const e=empById(el.dataset.i);if(!e)return;e.st=EST[2];e.dv=e.dv||today();save();render();toast("Empréstimo devolvido")},
 epa(el){const e=empById(el.dataset.i);if(!e)return;form("Prorrogação do prazo",[{k:"nd",l:"Novo prazo de devolução",t:"date"},{k:"d",l:"Data em que foi pedida ou concedida",t:"date"},{k:"nt",l:"Observação (opcional)",t:"area"}],{d:today()},v=>{if(!v.nd)return toast("Informe o novo prazo");e.pr.push({id:uid(),d:v.d||today(),ant:e.dd||"",nd:v.nd,nt:v.nt});e.dd=v.nd;done()})},
 epe(el){const[a,b]=el.dataset.i.split("|"),e=empById(a),p=e&&e.pr.find(x=>x.id===b);if(!p)return;const last=e.pr[e.pr.length-1]===p;   // a última prorrogação manda no prazo
  form("Prorrogação",[{k:"nd",l:"Novo prazo de devolução",t:"date"},{k:"d",l:"Data em que foi pedida ou concedida",t:"date"},{k:"nt",l:"Observação (opcional)",t:"area"}],{nd:p.nd,d:p.d,nt:p.nt},v=>{if(!v.nd)return toast("Informe o novo prazo");Object.assign(p,{nd:v.nd,d:v.d,nt:v.nt});if(last)e.dd=v.nd;done()},()=>rm("Prorrogação removida",()=>{e.pr=e.pr.filter(x=>x!==p);if(last&&p.ant)e.dd=p.ant}))},
 els(el){const e=empById(el.dataset.i),L=spAll();if(!e)return;if(!L.length)return toast("Cadastre a espécie primeiro (aba Grupos)");
  form("Exemplares — "+esc(empNome(e)),[{k:"sp",l:"Espécie",t:"sel",o:L.map(x=>x.lab)},{k:"n",l:"Nº de exemplares",t:"number"},{k:"sx",l:"Sexo",t:"sel",o:SEXO},{k:"nt",l:"Observações (ex.: montados, em álcool, nº de tombo)",t:"area"}],{sx:SEXO[0]},v=>{const x=L.find(y=>y.lab===v.sp);if(!x)return;x.s.lo.push({id:uid(),o:"e",e:e.id,n:v.n,sx:v.sx,nt:v.nt});done()})},
});
