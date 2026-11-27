// =====================================================================
// Diário de Pesquisa — matrizes.js: MATRIZES DE CARACTERES
// Uma matriz por análise a ser publicada: nº de caracteres, terminais (espécies
// do app e grupos externos digitados) e quantos caracteres já foram
// codificados em cada terminal. Tela própria no menu ⋮ e números no Painel.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== FERRAMENTAS DAS MATRIZES =====
// [v2.5] terminal: s = código da espécie do app ou nm = nome digitado (grupo externo) · c = caracteres codificados
const mxById=id=>S.mx.find(m=>m.id===id);
const mxNome=t=>{if(!t.s)return esc(t.nm||"Terminal");const x=spById(t.s);return x?spH(x.g,x.s,1):"<i>espécie excluída</i>"};
const mxN=n=>Number(n||0).toLocaleString("pt-BR");   // 2150 → "2.150"
const mxC=(m,t)=>Math.min(Math.max(0,+m.nc||0),Math.max(0,+t.c||0));
// [células feitas, total]: cada terminal vale o nº de caracteres da matriz
function mxCel(m){const nc=Math.max(0,+m.nc||0);return[m.T.reduce((d,t)=>d+mxC(m,t),0),nc*m.T.length]}
const mxPct=m=>{const[d,n]=mxCel(m);return n?Math.floor(d/n*100):0};   // 100% só quando estiver tudo codificado
// etiquetas "▦ Análise 1: 120/215" no cabeçalho da espécie (tocar abre a matriz)
function mxChips(s){return S.mx.filter(m=>m.T.some(t=>t.s===s.id)).map(m=>{const t=m.T.find(t=>t.s===s.id);return`<button class="chip mx" data-a="mxop" data-i="${m.id}">▦ ${esc(m.n)}: ${mxC(m,t)}/${+m.nc||0}</button>`}).join("")}

// ===== TELA MATRIZES DE CARACTERES (menu ⋮) =====
// [v2.5] um cartão por matriz com o progresso em células; aberto mostra cada terminal
function vMx(){
 const top=`<p class="note">Uma matriz por análise que vai ser publicada. Informe o nº de caracteres e, em cada terminal, quantos já foram codificados.</p>`;
 if(!S.mx.length)return top+`<div class="empty">Nenhuma matriz ainda. Toque no + para criar.</div>`;
 return top+S.mx.map(m=>{const[d,n]=mxCel(m),op=V.mo===m.id,p=mxPct(m),nc=+m.nc||0;
  let h=`<section class="card mxc" data-mx="${m.id}"><div class="fh" data-a="mxo" data-i="${m.id}"><span class="g1"><b>${esc(m.n)}</b><small>${pl(nc,"caractere","caracteres")} · ${pl(m.T.length,"terminal","terminais")}</small></span><span>${op?"▾":"▸"}</span></div><div class="mxb"><div class="bar"><span style="width:${p}%"></span></div><small>${mxN(d)} de ${mxN(n)} células (${p}%)</small></div>`;
  if(op)h+=`<div class="mxd">`+(m.T.map(t=>{const c=mxC(m,t);return`<div class="mxt" data-a="mxt" data-i="${m.id}|${t.id}"><span class="g1">${mxNome(t)}${t.s?"":' <span class="chip gray">grupo externo</span>'}</span><span class="mxm"><i style="width:${nc?c/nc*100:0}%"></i></span><small>${c}/${nc}</small></div>`}).join("")||`<p class="note">Nenhum terminal. Acrescente as espécies do app e os grupos externos.</p>`)
   +(m.nt?`<p class="note">${esc(m.nt).replace(/\n/g,"<br>")}</p>`:"")
   +`<div class="tools" style="flex-wrap:wrap"><button class="sec" data-a="mxs" data-i="${m.id}">+ Espécie</button><button class="sec" data-a="mxg" data-i="${m.id}">+ Espécies de um gênero</button><button class="sec" data-a="mxx" data-i="${m.id}">+ Grupo externo</button><button class="sec" data-a="mxe" data-i="${m.id}">Editar matriz</button></div></div>`;
  return h+`</section>`}).join("")}
const mxF=[{k:"n",l:"Nome da análise (ex.: Biphyllidae — morfologia)"},{k:"nc",l:"Nº de caracteres",t:"number"},{k:"nt",l:"Notas (opcional)",t:"area"}];
// [v2.5] abrir uma matriz (a partir da espécie ou do Painel); a seta volta para onde estava
function openMx(id){const r={tab:V.tab,f:V.f,g:V.g,u:V.u};V.mo=id;go("x");if(r.tab!=="x")V.ret=r;const c=document.querySelector(`[data-mx="${id}"]`);if(c)c.scrollIntoView({block:"start"})}

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.5] matriz: criar, editar/excluir, abrir/fechar e abrir a partir de outra tela
 addMx(){form("Nova matriz",mxF,{},v=>{if(!v.n)return toast("Informe o nome");const m={id:uid(),n:v.n,nc:Math.max(0,+v.nc||0),T:[],nt:v.nt};S.mx.push(m);V.mo=m.id;done()})},
 mxe(el){const m=mxById(el.dataset.i);if(!m)return;form("Editar matriz",mxF,{n:m.n,nc:String(m.nc||""),nt:m.nt},v=>{if(!v.n)return toast("Informe o nome");Object.assign(m,{n:v.n,nc:Math.max(0,+v.nc||0),nt:v.nt});done()},()=>conf("Excluir a matriz "+m.n+"?","Excluir",()=>rm("Matriz excluída",()=>{S.mx=S.mx.filter(x=>x!==m)})))},
 mxo(el){V.mo=V.mo===el.dataset.i?null:el.dataset.i;render()},
 mxop(el){openMx(el.dataset.i)},
 // [v2.5] terminais: uma espécie, todas as de um gênero, grupo externo; tocar no terminal muda o nº codificado
 mxs(el){const m=mxById(el.dataset.i);if(!m)return;const L=spAll().filter(x=>!m.T.some(t=>t.s===x.s.id));if(!L.length)return toast("Todas as espécies do app já estão na matriz");
  form("Acrescentar espécie",[{k:"sp",l:"Espécie",t:"sel",o:L.map(x=>x.lab)},{k:"c",l:"Caracteres já codificados (opcional)",t:"number"}],{},v=>{const x=L.find(y=>y.lab===v.sp);if(!x)return;m.T.push({id:uid(),s:x.s.id,c:Math.max(0,+v.c||0)});done()})},
 mxg(el){const m=mxById(el.dataset.i);if(!m)return;const G=[];
  S.f.forEach(f=>f.g.forEach(g=>{const n=g.spp.filter(s=>!m.T.some(t=>t.s===s.id)).length;if(n)G.push({g,lab:"Gênero "+g.n+" ("+f.n+") — "+pl(n,"espécie","espécies")})}));
  if(!G.length)return toast("Nenhuma espécie nova para acrescentar");
  form("Acrescentar as espécies de um gênero",[{k:"g",l:"Gênero",t:"sel",o:G.map(x=>x.lab)}],{},v=>{const x=G.find(y=>y.lab===v.g);if(!x)return;x.g.spp.forEach(s=>{if(!m.T.some(t=>t.s===s.id))m.T.push({id:uid(),s:s.id,c:0})});done()})},
 mxx(el){const m=mxById(el.dataset.i);if(!m)return;form("Grupo externo",[{k:"nm",l:"Nome do terminal (ex.: Cryptophagus sp.)"},{k:"c",l:"Caracteres já codificados (opcional)",t:"number"}],{},v=>{if(!v.nm)return toast("Informe o nome");m.T.push({id:uid(),s:"",nm:v.nm,c:Math.max(0,+v.c||0)});done()})},
 mxt(el){const[a,b]=el.dataset.i.split("|"),m=mxById(a),t=m&&m.T.find(x=>x.id===b);if(!t)return;const nc=+m.nc||0;
  form(t.s?mxNome(t):"Grupo externo",(t.s?[]:[{k:"nm",l:"Nome do terminal"}]).concat([{k:"c",l:"Caracteres codificados (de "+nc+")",t:"number"}]),{nm:t.nm,c:String(t.c||0)},v=>{if(!t.s&&v.nm)t.nm=v.nm;t.c=Math.max(0,+v.c||0);done()},()=>rm("Terminal removido",()=>{m.T=m.T.filter(x=>x!==t)}),"Remover",[{l:"Completo ("+nc+")",f:()=>{t.c=nc;done()}}])},
});
