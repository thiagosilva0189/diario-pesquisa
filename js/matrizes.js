// =====================================================================
// Diário de Pesquisa — matrizes.js: MATRIZES (MORFOLÓGICAS E MOLECULARES)
// Uma matriz por análise a ser publicada. Morfológica: nº de caracteres,
// terminais (espécies do app e grupos externos digitados) e quantos caracteres
// já foram codificados em cada um. Molecular [v2.6]: marcadores escolhidos e,
// em cada terminal, a situação de cada marcador, lida dos dados moleculares
// da espécie (tocar na célula prevê ou edita o marcador na própria espécie).
// Tela própria no menu ⋮ e números no Painel e no relatório de progresso.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== FERRAMENTAS DAS MATRIZES =====
// [v2.5] terminal: s = código da espécie do app ou nm = nome digitado (grupo externo) · c = caracteres codificados
// [v2.6] tp = tipo ("mf" morfológica, "mo" molecular) · mk = marcadores da matriz molecular · nt = observação do terminal ·
//        no grupo externo da molecular: M = situação de cada marcador e A = nº de acesso no GenBank
const MXT=[["mf","Morfológica"],["mo","Molecular"]];
const mxById=id=>S.mx.find(m=>m.id===id);
const mxMol=m=>m.tp==="mo";
const mxNome=t=>{if(!t.s)return esc(t.nm||"Terminal");const x=spById(t.s);return x?spH(x.g,x.s,1):"<i>espécie excluída</i>"};
const mxTxt=t=>{if(!t.s)return t.nm||"Terminal";const x=spById(t.s);return x?fullSp(x.g,x.s):"(espécie excluída)"};   // sem HTML (tabela copiada)
const mxN=n=>Number(n||0).toLocaleString("pt-BR");   // 2150 → "2.150"
const mxC=(m,t)=>Math.min(Math.max(0,+m.nc||0),Math.max(0,+t.c||0));
// ----- molecular -----
// marcador k da espécie s (mesmo nome, sem diferenciar maiúsculas e acentos)
const mkOf=(s,k)=>s.mol.ms.find(x=>nz(x.m)===nz(k));
// situação da célula (terminal t, marcador k): ok alinhado · sq sequência pronta (sequenciada ou do GenBank) · pc amplificado ·
// pe previsto na espécie · no ainda não previsto · na não será obtido (fica fora da conta, entra como dado faltante)
function mcSt(t,k){
 if(!t.s){const v=(t.M||{})[k];return isNA(v)?"na":isD(v)?"ok":(t.A||{})[k]?"sq":"no"}
 const x=spById(t.s),y=x&&mkOf(x.s,k);if(!y)return"no";
 if(isD(y.l))return"ok";if(isNA(y.l))return"na";if(y.g||isD(y.s))return"sq";if(isNA(y.s))return"na";return isD(y.p)?"pc":"pe"}
const MCS={ok:"alinhado",sq:"sequência pronta",pc:"amplificado",pe:"previsto na espécie",no:"ainda não previsto (toque para prever)",na:"não será obtido"};
function mcSym(t,k,c){if(c==="ok")return"✓";if(c==="na")return"?";if(c==="no")return"+";if(c==="pc")return"P";if(c==="pe")return"·";
 if(!t.s)return"GB";const x=spById(t.s),y=x&&mkOf(x.s,k);return y&&y.g?"GB":"S"}
// [células feitas, total] · morfológica: cada terminal vale o nº de caracteres · molecular: uma célula por marcador (as "não será obtido" ficam fora)
function mxCel(m){if(mxMol(m)){let d=0,n=0;m.T.forEach(t=>m.mk.forEach(k=>{const c=mcSt(t,k);if(c!=="na"){n++;if(c==="ok")d++}}));return[d,n]}
 const nc=Math.max(0,+m.nc||0);return[m.T.reduce((d,t)=>d+mxC(m,t),0),nc*m.T.length]}
const mxPct=m=>{const[d,n]=mxCel(m);return n?Math.floor(d/n*100):0};   // 100% só quando estiver tudo pronto
// etiquetas "▦ Análise 1: 120/215" (ou "2/3 marcadores") no cabeçalho da espécie (tocar abre a matriz)
function mxChips(s){return S.mx.filter(m=>m.T.some(t=>t.s===s.id)).map(m=>{const t=m.T.find(t=>t.s===s.id);
 if(mxMol(m)){const L=m.mk.map(k=>mcSt(t,k)).filter(c=>c!=="na");return`<button class="chip mx" data-a="mxop" data-i="${m.id}">▦ ${esc(m.n)}: ${L.filter(c=>c==="ok").length}/${L.length} marcadores</button>`}
 return`<button class="chip mx" data-a="mxop" data-i="${m.id}">▦ ${esc(m.n)}: ${mxC(m,t)}/${+m.nc||0}</button>`}).join("")}
// [v2.6] marcadores para acrescentar: os que as espécies da matriz já têm (com quantas) e os da lista de modelos
function mkSug(m){const C={},add=(k,n)=>{const z=nz(k);if(!z||m.mk.some(x=>nz(x)===z))return;C[z]=C[z]||{k,n:0};C[z].n+=n};
 m.T.forEach(t=>{const x=t.s&&spById(t.s);if(x)x.s.mol.ms.forEach(y=>add(y.m,1))});S.tpl.mk.forEach(k=>add(k,0));
 return Object.values(C).sort((a,b)=>b.n-a.n)}
// [v2.6] parte aberta da matriz molecular: marcadores, cobertura de cada um e a grade terminal × marcador
function mxMolH(m){const n=m.mk.length,SG=mkSug(m).filter(x=>x.n);
 let h=`<div class="stl">Marcadores da matriz</div><div class="mkl">${m.mk.map((k,j)=>`<button class="chip mk" data-a="mxk" data-i="${m.id}|${j}" title="Tirar ${esc(k)} da matriz">${esc(k)} <b>✕</b></button>`).join("")}${SG.map(x=>`<button class="chip" data-a="mxka" data-i="${m.id}|${esc(x.k)}">+ ${esc(x.k)} <b>${x.n}</b></button>`).join("")}<button class="chip" data-a="mxko" data-i="${m.id}">+ ${SG.length?"Outro":"Marcador"}…</button></div>`;
 if(!n)return h+`<p class="note">Escolha os marcadores da análise. ${SG.length?"O número ao lado do nome diz quantas espécies da matriz já têm o marcador; ":""}em “+ ${SG.length?"Outro":"Marcador"}…” estão os da lista de modelos (ou digite outro).</p>`;
 if(!m.T.length)return h+`<p class="note">Nenhum terminal. Acrescente as espécies do app e os grupos externos.</p>`;
 h+=`<div class="stl">Cobertura por marcador</div>`+m.mk.map(k=>{const L=m.T.map(t=>mcSt(t,k)).filter(c=>c!=="na"),d=L.filter(c=>c==="ok").length,p=L.length?Math.round(d/L.length*100):0;
  return`<div class="gb2"><b>${esc(k)}</b><div class="mb"><span style="width:${p}%"></span></div><small>${d}/${L.length}</small></div>`}).join("");
 h+=`<div class="mgw"><div class="mg" style="grid-template-columns:minmax(118px,1fr) repeat(${n},34px)"><span></span>${m.mk.map(k=>`<span class="mh" title="${esc(k)}">${esc(k)}</span>`).join("")}`
  +m.T.map(t=>`<button class="mgn" data-a="mxt" data-i="${m.id}|${t.id}">${mxNome(t)}${t.s?"":' <small class="mut">externo</small>'}</button>`+m.mk.map((k,j)=>{const c=mcSt(t,k);return`<button class="mc ${c}" data-a="mxc" data-i="${m.id}|${t.id}|${j}" title="${esc(k)}: ${MCS[c]}">${mcSym(t,k,c)}</button>`}).join("")).join("")+`</div></div>`;
 return h+`<p class="note">✓ alinhado · S sequência pronta · GB do GenBank · P amplificado · · previsto na espécie · + ainda não previsto · ? não será obtido. As células das espécies vêm dos dados moleculares de cada uma: o que mudar aqui muda lá também.</p>`}

// ===== TELA MATRIZES (menu ⋮) =====
// [v2.5] um cartão por matriz com o progresso em células; aberto mostra cada terminal
// [v2.6] tipo (morfológica ou molecular), barra fina, observação do terminal e grade da molecular
function vMx(){
 const top=`<p class="note">Uma matriz por análise que vai ser publicada. Morfológica: informe o nº de caracteres e quantos já foram codificados em cada terminal. Molecular: escolha os marcadores e acompanhe o que já foi alinhado em cada terminal (ligado aos dados moleculares das espécies).</p>`;
 if(!S.mx.length)return top+`<div class="empty">Nenhuma matriz ainda. Toque no + para criar.</div>`;
 return top+S.mx.map(m=>{const[d,n]=mxCel(m),op=V.mo===m.id,p=mxPct(m),nc=+m.nc||0,mol=mxMol(m);
  let h=`<section class="card mxc" data-mx="${m.id}"><div class="fh" data-a="mxo" data-i="${m.id}"><span class="g1"><b>${esc(m.n)}</b><small>${mol?"Molecular · "+pl(m.mk.length,"marcador","marcadores"):"Morfológica · "+pl(nc,"caractere","caracteres")} · ${pl(m.T.length,"terminal","terminais")}</small></span><span>${op?"▾":"▸"}</span></div><div class="mxb"><div class="mb"><span style="width:${p}%"></span></div><small>${mol?`${mxN(d)} de ${mxN(n)} sequências alinhadas (${p}%)`:`${mxN(d)} de ${mxN(n)} células (${p}%)`}</small></div>`;
  if(op)h+=`<div class="mxd">`+(mol?mxMolH(m):m.T.map(t=>{const c=mxC(m,t);return`<div class="mxt" data-a="mxt" data-i="${m.id}|${t.id}"><span class="g1">${mxNome(t)}${t.s?"":' <span class="chip gray">grupo externo</span>'}${t.nt?`<small class="mut"> · ${esc(t.nt)}</small>`:""}</span><span class="mxm"><i style="width:${nc?c/nc*100:0}%"></i></span><small>${c}/${nc}</small></div>`}).join("")||`<p class="note">Nenhum terminal. Acrescente as espécies do app e os grupos externos.</p>`)
   +(m.nt?`<p class="note">${esc(m.nt).replace(/\n/g,"<br>")}</p>`:"")
   +`<div class="tools" style="flex-wrap:wrap"><button class="sec" data-a="mxs" data-i="${m.id}">+ Espécie</button><button class="sec" data-a="mxg" data-i="${m.id}">+ Espécies de um gênero</button>${mol?`<button class="sec" data-a="mxm" data-i="${m.id}">+ Espécies com dados moleculares</button>`:""}<button class="sec" data-a="mxx" data-i="${m.id}">+ Grupo externo</button>${mol&&m.mk.length&&m.T.length?`<button class="sec" data-a="mxa" data-i="${m.id}">Copiar tabela de acessos</button>`:""}<button class="sec" data-a="mxe" data-i="${m.id}">Editar matriz</button></div></div>`;
  return h+`</section>`}).join("")}
// formulário da matriz (o nº de caracteres só vale para a morfológica)
const mxF=m=>[{k:"tp",l:"Tipo de matriz",t:"sel",o:MXT.map(x=>x[1])},{k:"n",l:"Nome da análise (ex.: Biphyllidae — morfologia)"}].concat(m&&mxMol(m)?[]:[{k:"nc",l:m?"Nº de caracteres":"Nº de caracteres (só na morfológica)",t:"number"}],[{k:"nt",l:"Notas (opcional)",t:"area"}]);
const mxTp=l=>(MXT.find(x=>x[1]===l)||MXT[0])[0];
// [v2.5] abrir uma matriz (a partir da espécie ou do Painel); a seta volta para onde estava
function openMx(id){const r={tab:V.tab,f:V.f,g:V.g,u:V.u};V.mo=id;go("x");if(r.tab!=="x")V.ret=r;const c=document.querySelector(`[data-mx="${id}"]`);if(c)c.scrollIntoView({block:"start"})}
// [v2.6] células da molecular: os três passos do marcador como listas (pendente, feita, não será realizada)
const MC3=["Pendente","Feita","Não será realizada"];
const mc3O=v=>[MC3[0],isDate(v)?"Feita em "+fmt(v):MC3[1],MC3[2]];
const mc3L=v=>isNA(v)?MC3[2]:isD(v)?(isDate(v)?"Feita em "+fmt(v):MC3[1]):MC3[0];
const mc3V=(o,v)=>o===MC3[0]?0:o===MC3[2]?"na":isD(v)?v:today();
// marcador de uma espécie (edita o mesmo registro da seção Dados moleculares da espécie)
function mcForm(x,y,k){const F=[{k:"src",l:"Origem",t:"sel",o:[LAB,GBK]}];
 if(!y.g)F.push({k:"p",l:"Amplificação (PCR; em genoma: biblioteca)",t:"sel",o:mc3O(y.p)},{k:"s",l:"Sequenciamento",t:"sel",o:mc3O(y.s)});
 F.push({k:"l",l:"Alinhamento",t:"sel",o:mc3O(y.l)},{k:"acc",l:"Nº de acesso no GenBank (opcional)"});
 form(spH(x.g,x.s,1)+" · "+esc(k),F,{src:y.g?GBK:LAB,p:mc3L(y.p),s:mc3L(y.s),l:mc3L(y.l),acc:y.acc},v=>{
  const g=v.src===GBK?1:0;if(g){y.p=0;y.s=0}else if(!y.g){y.p=mc3V(v.p,y.p);y.s=mc3V(v.s,y.s)}
  y.g=g;y.l=mc3V(v.l,y.l);y.acc=v.acc;done()},
  ()=>rm(k+" tirado de "+abbr(x.g,x.s.n),()=>{x.s.mol.ms=x.s.mol.ms.filter(z=>z!==y)}),"Tirar da espécie",
  [{l:"Abrir a espécie",f:()=>{closeM();A.og({dataset:{i:x.f.id+"|"+x.g.id+"|"+x.s.id}})}}])}
// marcador de um grupo externo (guardado na própria matriz)
function mcFormX(t,k){t.M=t.M||{};t.A=t.A||{};const v0=t.M[k],O=["Ainda não obtido",isDate(v0)?"Alinhado em "+fmt(v0):"Alinhado","Não será obtido"];
 form(esc(t.nm||"Grupo externo")+" · "+esc(k),[{k:"st",l:"Situação",t:"sel",o:O},{k:"acc",l:"Nº de acesso no GenBank (opcional)"}],{st:isNA(v0)?O[2]:isD(v0)?O[1]:O[0],acc:t.A[k]||""},v=>{
  if(v.st===O[0])delete t.M[k];else t.M[k]=v.st===O[2]?"na":isD(v0)?v0:today();
  if(v.acc)t.A[k]=v.acc;else delete t.A[k];done()})}

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.5] matriz: criar, editar/excluir, abrir/fechar e abrir a partir de outra tela · [v2.6] tipo
 addMx(){form("Nova matriz",mxF(),{tp:MXT[0][1]},v=>{if(!v.n)return toast("Informe o nome");const m={id:uid(),tp:mxTp(v.tp),n:v.n,nc:Math.max(0,+v.nc||0),T:[],mk:[],nt:v.nt};S.mx.push(m);V.mo=m.id;done()})},
 mxe(el){const m=mxById(el.dataset.i);if(!m)return;form("Editar matriz",mxF(m),{tp:(MXT.find(x=>x[0]===m.tp)||MXT[0])[1],n:m.n,nc:String(m.nc||""),nt:m.nt},v=>{if(!v.n)return toast("Informe o nome");Object.assign(m,{tp:mxTp(v.tp),n:v.n,nt:v.nt});if(v.nc!==undefined)m.nc=Math.max(0,+v.nc||0);done()},()=>conf("Excluir a matriz "+m.n+"?","Excluir",()=>rm("Matriz excluída",()=>{S.mx=S.mx.filter(x=>x!==m)})))},
 mxo(el){V.mo=V.mo===el.dataset.i?null:el.dataset.i;render()},
 mxop(el){openMx(el.dataset.i)},
 // [v2.5] terminais: uma espécie, todas as de um gênero, grupo externo; tocar no terminal muda o nº codificado
 mxs(el){const m=mxById(el.dataset.i);if(!m)return;const L=spAll().filter(x=>!m.T.some(t=>t.s===x.s.id));if(!L.length)return toast("Todas as espécies do app já estão na matriz");
  form("Acrescentar espécie",[{k:"sp",l:"Espécie",t:"sel",o:L.map(x=>x.lab)}].concat(mxMol(m)?[]:[{k:"c",l:"Caracteres já codificados (opcional)",t:"number"}]),{},v=>{const x=L.find(y=>y.lab===v.sp);if(!x)return;m.T.push({id:uid(),s:x.s.id,c:Math.max(0,+v.c||0)});done()})},
 mxg(el){const m=mxById(el.dataset.i);if(!m)return;const G=[];
  S.f.forEach(f=>f.g.forEach(g=>{const n=g.spp.filter(s=>!m.T.some(t=>t.s===s.id)).length;if(n)G.push({g,lab:"Gênero "+g.n+" ("+f.n+") — "+pl(n,"espécie","espécies")})}));
  if(!G.length)return toast("Nenhuma espécie nova para acrescentar");
  form("Acrescentar as espécies de um gênero",[{k:"g",l:"Gênero",t:"sel",o:G.map(x=>x.lab)}],{},v=>{const x=G.find(y=>y.lab===v.g);if(!x)return;x.g.spp.forEach(s=>{if(!m.T.some(t=>t.s===s.id))m.T.push({id:uid(),s:s.id,c:0})});done()})},
 // [v2.6] todas as espécies que já têm algum marcador nos dados moleculares
 mxm(el){const m=mxById(el.dataset.i);if(!m)return;const L=spAll().filter(x=>x.s.mol.ms.length&&!m.T.some(t=>t.s===x.s.id));if(!L.length)return toast("Nenhuma espécie nova com dados moleculares");
  rm(pl(L.length,"espécie acrescentada","espécies acrescentadas"),()=>{L.forEach(x=>m.T.push({id:uid(),s:x.s.id,c:0}))})},
 mxx(el){const m=mxById(el.dataset.i);if(!m)return;form("Grupo externo",[{k:"nm",l:"Nome do terminal (ex.: Cryptophagus sp.)"}].concat(mxMol(m)?[]:[{k:"c",l:"Caracteres já codificados (opcional)",t:"number"}]),{},v=>{if(!v.nm)return toast("Informe o nome");m.T.push({id:uid(),s:"",nm:v.nm,c:Math.max(0,+v.c||0)});done()})},
 mxt(el){const[a,b]=el.dataset.i.split("|"),m=mxById(a),t=m&&m.T.find(x=>x.id===b);if(!t)return;const nc=+m.nc||0,mol=mxMol(m),x=t.s&&spById(t.s);
  const F=(t.s?[]:[{k:"nm",l:"Nome do terminal"}]).concat(mol?[]:[{k:"c",l:"Caracteres codificados (de "+nc+")",t:"number"}],[{k:"nt",l:"Observação (opcional; ex.: terminal quimérico, espécime usado)"}]);
  const ex=(mol?[]:[{l:"Completo ("+nc+")",f:()=>{t.c=nc;done()}}]).concat(x?[{l:"Abrir a espécie",f:()=>{closeM();A.og({dataset:{i:x.f.id+"|"+x.g.id+"|"+x.s.id}})}}]:[]);
  form(t.s?mxNome(t):"Grupo externo",F,{nm:t.nm,c:String(t.c||0),nt:t.nt},v=>{if(!t.s&&v.nm)t.nm=v.nm;if(!mol)t.c=Math.max(0,+v.c||0);t.nt=v.nt;done()},()=>rm("Terminal removido",()=>{m.T=m.T.filter(x=>x!==t)}),"Remover",ex)},
 // [v2.6] marcadores da molecular: tirar (com desfazer), acrescentar da lista ou outro
 mxk(el){const[a,j]=el.dataset.i.split("|"),m=mxById(a),k=m&&m.mk[+j];if(!k)return;rm(k+" tirado da matriz",()=>{m.mk.splice(+j,1)})},
 mxka(el){const s=el.dataset.i,i=s.indexOf("|"),m=mxById(s.slice(0,i)),k=s.slice(i+1);if(!m||!k||m.mk.some(x=>nz(x)===nz(k)))return;m.mk.push(k);save();render()},
 mxko(el){const m=mxById(el.dataset.i);if(!m)return;const L=mkSug(m).map(x=>x.k),T="(nenhum: digitar abaixo)";
  form("Acrescentar marcador",[{k:"k",l:"Marcador da lista",t:"sel",o:L.concat([T])},{k:"o",l:"Ou digite outro (igual ao nome usado nas espécies)"}],{k:L[0]||T},v=>{const k=(v.o||"").trim()||(v.k===T?"":v.k);if(!k)return toast("Escolha ou digite o marcador");if(!m.mk.some(x=>nz(x)===nz(k)))m.mk.push(k);done()})},
 // [v2.6] célula: grupo externo abre a situação; espécie sem o marcador passa a ter (previsto); com o marcador abre os passos
 mxc(el){const[a,b,j]=el.dataset.i.split("|"),m=mxById(a),t=m&&m.T.find(x=>x.id===b),k=m&&m.mk[+j];if(!t||!k)return;
  if(!t.s)return mcFormX(t,k);
  const x=spById(t.s);if(!x)return toast("Essa espécie foi excluída");
  const y=mkOf(x.s,k);if(!y)return rm(k+" previsto em "+abbr(x.g,x.s.n),()=>{x.s.mol.ms.push({id:uid(),m:k,g:0,acc:""})});
  mcForm(x,y,k)},
 // [v2.6] tabela terminal × marcador com os nºs de acesso (para colar numa planilha ou no material suplementar)
 mxa(el){const m=mxById(el.dataset.i);if(!m)return;const L=["Terminal\t"+m.mk.join("\t")];
  m.T.forEach(t=>L.push(mxTxt(t)+"\t"+m.mk.map(k=>{const c=mcSt(t,k);let acc="";if(t.s){const x=spById(t.s),y=x&&mkOf(x.s,k);acc=y&&y.acc||""}else acc=(t.A||{})[k]||"";return acc||(c==="ok"||c==="sq"?"(sem nº)":"—")}).join("\t")));
  copyText(L.join("\n"),"Tabela copiada: cole numa planilha")},
});
