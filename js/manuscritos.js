// =====================================================================
// Diário de Pesquisa — manuscritos.js: MANUSCRITOS
// Artigos e capítulos: situação (em redação › submetido › em revisão ›
// aceito › publicado) com as datas, prazo na Agenda, atos nomenclaturais e
// pranchas de cada um. Publicado: os atos ligados passam a contar como
// publicados nas Novidades taxonômicas.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== LISTAS FIXAS E FERRAMENTAS =====
// [v2.6] situação (índice 0 a 4; d1..d4 = data em que entrou em cada uma) e tipos
const MST=["Em redação","Submetido","Em revisão","Aceito","Publicado"];
const MTP=["Artigo","Capítulo da tese","Capítulo de livro","Nota científica","Outro"];
const NOMS="(nenhum)";
const msById=id=>id?S.ms.find(m=>m.id===id):null;
const msPub=id=>{const m=msById(id);return!!m&&m.st===4};
// todos os atos do app com o táxon (o lectótipo/neótipo automático guarda o manuscrito no Material-tipo)
function atAll(){const R=[];S.f.forEach(f=>f.g.forEach(g=>{atList(g).forEach(a=>R.push({a,f,g}));g.spp.forEach(s=>atList(s).forEach(a=>R.push({a,f,g,s})))}));return R}
const atMs=x=>x.a.auto?(x.s.ty.ms||""):(x.a.ms||"");
const atTx=x=>x.s?fullSp(x.g,x.s):"Gênero "+x.g.n;
// tira o manuscrito dos atos e pranchas (ao excluir o manuscrito)
function unlinkMs(id){S.f.forEach(f=>f.g.forEach(g=>{g.at.forEach(a=>{if(a.ms===id)a.ms=""});g.spp.forEach(s=>{s.at.forEach(a=>{if(a.ms===id)a.ms=""});if(s.ty.ms===id)s.ty.ms=""})}));S.pr.forEach(p=>{if(p.ms===id)p.ms=""})}

// ===== TELA MANUSCRITOS (menu ⋮) =====
// [v2.6] cartão: indicador de situação, atos e pranchas; aberto mostra datas, referência, atos, pranchas e botões
function msCard(m){const op=V.wo===m.id,A2=atAll().filter(x=>atMs(x)===m.id),P=S.pr.filter(p=>p.ms===m.id),D=[m.d1,m.d2,m.d3,m.d4],cnt={};
 A2.forEach(x=>{cnt[x.a.c]=(cnt[x.a.c]||0)+1});const dt=m.st>0&&D[m.st-1]?" desde "+fmt(D[m.st-1]):"";
 let h=`<section class="card msc" data-ms="${m.id}"><div class="fh" data-a="mso" data-i="${m.id}"><span class="g1"><b>${esc(m.t)}</b><small>${esc([m.tp,m.rv].filter(Boolean).join(" · "))}${m.tp||m.rv?" · ":""}${MST[m.st].toLowerCase()}${dt}</small></span><span>${op?"▾":"▸"}</span></div>`
 +`<div class="prb"><div class="stp">${MST.map((l,i)=>`<i class="${i<m.st||m.st===4?"ok":i===m.st?"cur":""}"></i>`).join("")}</div><div class="stpl">${["redação","submetido","revisão","aceito","publicado"].map((l,i)=>`<span class="${i===m.st?"cur":""}">${l}</span>`).join("")}</div>`
 +`<div class="prm">${ATO.filter(x=>cnt[x.c]).map(x=>`<span class="chip at">${esc(x.l)}${cnt[x.c]>1?" ×"+cnt[x.c]:""}</span>`).join("")}${P.length?`<span class="chip gray">${pl(P.length,"prancha","pranchas")}</span>`:""}${m.pz&&m.st<1?`<span class="chip ${m.pz<today()?"red":"blue"}">📅 ${fmt(m.pz)}</span>`:""}</div></div>`;
 if(op)h+=`<div class="prd"><div class="empg">${MST.slice(1).map((l,i)=>`<div><small>${l}</small><span>${D[i]?fmt(D[i]):"—"}</span></div>`).join("")}</div>`
  +(m.ref||m.doi||m.zb?`<p class="note">${esc(m.ref||"")}${m.doi?`<br>DOI: ${esc(m.doi)}`:""}${m.zb?`<br>ZooBank: ${esc(m.zb)}`:""}</p>`:"")
  +`<div class="stl">Atos nomenclaturais (${A2.length})</div>`+(A2.map(x=>`<div class="hj" data-a="og" data-i="${x.f.id}|${x.g.id}|${x.s?x.s.id:""}"><span class="chip at" style="margin:0">${esc(ATD[x.a.c].l)}</span><span class="g1">${x.s?spH(x.g,x.s,1):gl(x.g)}${x.a.x?` <small>· ${esc(x.a.x)}</small>`:""}</span></div>`).join("")||`<p class="note">Nenhum ato ligado. Toque em Ligar atos.</p>`)
  +`<div class="stl">Pranchas (${P.length})</div>`+(P.map(p=>{const{D,cur}=prSt(p);return`<div class="hj" data-a="pra" data-i="${p.id}"><span class="g1">${esc(p.n)} <small>· ${prFigs(p)}</small><small class="nx">${cur<0?"✓ pronta":"a fazer: "+PRN[cur]}</small></span><span class="stp mini">${D.map((x,i)=>`<i class="${x?"ok":i===cur?"cur":""}"></i>`).join("")}</span></div>`}).join("")||`<p class="note">Nenhuma prancha. Em Pranchas, escolha este manuscrito ao criar ou editar a prancha.</p>`)
  +(m.nt?`<p class="note">${esc(m.nt).replace(/\n/g,"<br>")}</p>`:"")
  +`<div class="tools" style="flex-wrap:wrap">${m.st<4?`<button class="pri" data-a="msa" data-i="${m.id}">${MST[m.st+1]} ›</button>`:""}<button class="sec" data-a="msl" data-i="${m.id}">Ligar atos</button><button class="sec" data-a="mse" data-i="${m.id}">Editar</button></div></div>`;
 return h+`</section>`}
// [v2.6] em andamento (mais adiantados primeiro) e publicados (mais recentes primeiro)
function vMs(){const top=`<p class="note">Artigos e capítulos, do rascunho à publicação. Os atos nomenclaturais ligados a um manuscrito publicado passam a contar como publicados; o prazo vai para a Agenda.</p>`;
 if(!S.ms.length)return top+`<div class="empty">Nenhum manuscrito ainda. Toque no + para cadastrar.</div>`;
 const A=S.ms.filter(m=>m.st<4).sort((a,b)=>b.st-a.st||(a.pz||"9999").localeCompare(b.pz||"9999")),P=S.ms.filter(m=>m.st===4).sort((a,b)=>(b.d4||"").localeCompare(a.d4||""));
 return top+(A.length?`<div class="grp">Em andamento (${A.length})</div>`+A.map(msCard).join(""):"")+(P.length?`<div class="grp">Publicados (${P.length})</div>`+P.map(msCard).join(""):"")}
// [v2.6] abrir um manuscrito (a partir da Agenda); a seta volta para onde estava
function openMs(id){const r={tab:V.tab,f:V.f,g:V.g,u:V.u};V.wo=id;go("w");if(r.tab!=="w")V.ret=r;const c=document.querySelector(`[data-ms="${id}"]`);if(c)c.scrollIntoView({block:"start"})}
const msF=[{k:"t",l:"Título (curto)"},{k:"tp",l:"Tipo",t:"sel",o:MTP},{k:"rv",l:"Revista, editora ou programa"},{k:"st",l:"Situação",t:"sel",o:MST},{k:"pz",l:"Prazo para submeter ou entregar (vai para a Agenda)",t:"date"},{k:"d1",l:"Submetido em",t:"date"},{k:"d2",l:"Revisão recebida em",t:"date"},{k:"d3",l:"Aceito em",t:"date"},{k:"d4",l:"Publicado em",t:"date"},{k:"ref",l:"Referência completa (depois de publicado)",t:"area"},{k:"doi",l:"DOI"},{k:"zb",l:"LSID da publicação no ZooBank"},{k:"nt",l:"Notas",t:"area"}];
function msForm(m,nv){form(nv?"Novo manuscrito":"Editar manuscrito",msF,{t:m.t,tp:m.tp||MTP[0],rv:m.rv,st:MST[m.st||0],pz:m.pz,d1:m.d1,d2:m.d2,d3:m.d3,d4:m.d4,ref:m.ref,doi:m.doi,zb:m.zb,nt:m.nt},v=>{if(!v.t)return toast("Informe o título");
 Object.assign(m,{t:v.t,tp:v.tp,rv:v.rv,st:Math.max(0,MST.indexOf(v.st)),pz:v.pz,d1:v.d1,d2:v.d2,d3:v.d3,d4:v.d4,ref:v.ref,doi:v.doi,zb:v.zb,nt:v.nt});
 if(m.st>0&&!m["d"+m.st])m["d"+m.st]=today();   // a situação atual sem data: hoje
 if(nv){S.ms.push(m);V.wo=m.id}done()},
 nv?null:()=>{const n=atAll().filter(x=>atMs(x)===m.id).length+S.pr.filter(p=>p.ms===m.id).length;conf("Excluir o manuscrito "+m.t+"?"+(n?" Os atos e as pranchas ligados continuam no app, só sem o manuscrito.":""),"Excluir",()=>rm("Manuscrito excluído",()=>{S.ms=S.ms.filter(x=>x!==m);unlinkMs(m.id)}))})}

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.6] manuscritos: criar, abrir/fechar, editar, avançar a situação (com Desfazer) e ligar atos
 addMs(){msForm({id:uid(),t:"",tp:MTP[0],st:0},1)},
 mso(el){V.wo=V.wo===el.dataset.i?null:el.dataset.i;render()},
 mse(el){const m=msById(el.dataset.i);if(m)msForm(m)},
 msa(el){const m=msById(el.dataset.i);if(!m||m.st>=4)return;const n=m.st+1;
  if(n===4)return form("Publicado: "+esc(m.t),[{k:"d4",l:"Data da publicação",t:"date"},{k:"ref",l:"Referência completa",t:"area"},{k:"doi",l:"DOI"},{k:"zb",l:"LSID da publicação no ZooBank"}],{d4:today(),ref:m.ref,doi:m.doi,zb:m.zb},v=>{Object.assign(m,{st:4,d4:v.d4||today(),ref:v.ref,doi:v.doi,zb:v.zb});done();toast("Publicado: os atos ligados contam como publicados")});
  rm(MST[n]+": "+m.t,()=>{m.st=n;if(!m["d"+n])m["d"+n]=today()})},
 msl(el){const m=msById(el.dataset.i);if(!m)return;const A2=atAll();if(!A2.length)return toast("Marque os atos na espécie ou no gênero primeiro");
  const val={};A2.forEach((x,i)=>{val["a"+i]=atMs(x)===m.id?"1":""});
  form("Atos de "+esc(m.t),A2.map((x,i)=>{const o=msById(atMs(x));return{k:"a"+i,t:"chk",l:esc(ATD[x.a.c].l+" · "+atTx(x)+(x.a.x?" ("+x.a.x+")":"")+(o&&o!==m?" — hoje em: "+o.t:""))}}),val,v=>{
   A2.forEach((x,i)=>{const on=!!v["a"+i];if(on===(atMs(x)===m.id))return;const id=on?m.id:"";if(x.a.auto)x.s.ty.ms=id;else{const a=(x.s||x.g).at.find(y=>y.id===x.a.id);if(a)a.ms=id}});done()})},
});
