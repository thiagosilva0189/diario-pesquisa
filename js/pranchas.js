// =====================================================================
// Diário de Pesquisa — pranchas.js: PRANCHAS E LEGENDAS
// Pranchas de figuras (só o esquema; as imagens ficam no computador ou no
// Drive): figuras ligadas às peças, estruturas e habitus das espécies (ficam
// prontas sozinhas quando a peça é ilustrada ou fotografada), etapas da
// prancha, numeração por manuscrito e legendas automáticas.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== LISTAS FIXAS E FERRAMENTAS =====
// [v2.6] etapas da prancha (além de "figuras prontas", que é automática) e nomes no indicador de etapas
const PRS=[["tr","Imagens tratadas"],["mt","Prancha montada"],["lg","Legenda revisada"]];
const PRL=["Figuras","Tratadas","Montada","Legenda"];
const PRN=["terminar as figuras","tratar as imagens","montar","revisar a legenda"];   // próxima etapa (lista de pranchas do manuscrito)
const FTP=["Foto","Ilustração"],SPV="(várias espécies)",SXO=["—","♂","♀"];
const prById=id=>S.pr.find(p=>p.id===id);
const prGrp=P=>S.pr.filter(x=>(x.ms||"")===(P.ms||""));   // pranchas do mesmo manuscrito (numeração das figuras)
// nº da primeira figura da prancha: continua a numeração das pranchas anteriores do mesmo manuscrito
function prN0(P){let n=1;for(const x of prGrp(P)){if(x===P)break;n+=x.F.length}return n}
const prFigs=P=>{const n0=prN0(P),n=P.F.length;return n?(n>1?"Figs "+n0+"–"+(n0+n-1):"Fig. "+n0):"sem figuras"};
// letra minúscula no início, menos em siglas ("Antena" → "antena"; "T8" fica igual)
const lowF=t=>t&&t.length>1&&t[1]!==t[1].toUpperCase()?t[0].toLowerCase()+t.slice(1):t;
// nome do objeto na legenda: "Terminália ♂ › T8" → "terminália ♂, T8" · habitus "Dorsal" → "habitus dorsal"
const figObj=F=>F.k==="h"?"habitus "+lowF(F.o):String(F.o).split(/\s*›\s*/).map(lowF).join(", ");
const figShort=F=>(F.k==="h"?"habitus "+F.o.toLowerCase():String(F.o).split(/\s*›\s*/).pop()).slice(0,22)+(F.v?" · "+F.v:"");
// [v2.6] ligação da figura com a espécie: peça (p), estrutura (m), habitus (h); x = figura avulsa
function figRef(F){const x=F.s&&F.k!=="x"&&spById(F.s);if(!x)return null;const L=F.k==="p"?x.s.parts:F.k==="m"?x.s.me:x.s.hab;return L.find(o=>o.n===F.o)||null}
// pronta: a peça/estrutura foi ilustrada ou fotografada (conforme o tipo da imagem), o habitus fotografado; avulsa: marcada à mão
function figOk(F){const r=figRef(F);if(!r)return isD(F.ok);return isD(F.k==="h"?r.x:r[F.tp==="i"?"i":"f"])}
// situação da prancha: D = [figuras prontas, tratadas, montada, legenda] · cur = primeira que falta (-1 = pronta)
function prSt(P){const D=[!!P.F.length&&P.F.every(figOk)].concat(PRS.map(([k])=>!!P[k]));return{D,cur:D.indexOf(false)}}
// [v2.6] LEGENDA: "Figs 12–16. Biphyllus sp. nov. A, ♂: 12, tergito VIII; 15–16, edeago, vistas dorsal e lateral."
// figuras seguidas da mesma espécie ficam num bloco; vistas do mesmo objeto em seguida se juntam
function legTxt(P,html){const n0=prN0(P),E=html?esc:(x=>x),B=[];
 P.F.forEach((F,i)=>{const b=B[B.length-1];if(b&&b.s===F.s)b.it.push({F,n:n0+i});else B.push({s:F.s,it:[{F,n:n0+i}]})});
 return B.map(b=>{const x=b.s&&spById(b.s),nm=x?(html?spH(x.g,x.s,1):fullSp(x.g,x.s)):"",sx=P.sx&&P.sx!==SXO[0]?", "+P.sx:"",I=[];
  b.it.forEach(({F,n})=>{const t=I[I.length-1];if(t&&!F.lb&&!t.F.lb&&t.F.k===F.k&&t.F.o===F.o&&F.v&&t.v.length){t.v.push(F.v);t.z=n}else I.push({F,v:F.v?[F.v]:[],a:n,z:n})});
  const T=I.map(t=>{const r=t.a===t.z?String(t.a):t.a+"–"+t.z;if(t.F.lb)return[r,E(t.F.lb)];
   return[r,E(figObj(t.F))+(t.v.length?", "+(t.v.length>1?"vistas "+E(t.v.slice(0,-1).join(", "))+" e "+E(t.v[t.v.length-1]):"vista "+E(t.v[0])):"")]});
  const a=b.it[0].n,z=b.it[b.it.length-1].n,head=nm?nm+sx:"";
  return(a===z?"Fig. "+a+". "+(head?head+", ":"")+T[0][1]:"Figs "+a+"–"+z+". "+(head?head+": ":"")+T.map(t=>t[0]+", "+t[1]).join("; "))+"."}).join(" ")}

// ===== TELA PRANCHAS (menu ⋮) =====
// [v2.6] cartão da prancha: indicador de etapas, figuras e legenda; aberto mostra as figuras (tocar edita)
function prCard(P){const op=V.po===P.id,{D,cur}=prSt(P),n0=prN0(P),nok=P.F.filter(figOk).length,x=P.s&&spById(P.s);
 let h=`<section class="card prc" data-pr="${P.id}"><div class="fh" data-a="pro" data-i="${P.id}"><span class="g1"><b>${esc(P.n)}</b><small>${[x?spH(x.g,x.s,1):"",esc(P.tt||"")].filter(Boolean).join(" · ")||"&nbsp;"}</small></span><span>${op?"▾":"▸"}</span></div>`
 +`<div class="prb"><div class="stp">${D.map((d,i)=>`<i class="${d?"ok":i===cur?"cur":""}"></i>`).join("")}</div><div class="stpl">${PRL.map((l,i)=>`<span class="${i===cur?"cur":""}">${l}</span>`).join("")}</div>`
 +`<div class="prm"><span class="chip gray">${prFigs(P)}</span>${P.F.length?`<span class="chip ${nok===P.F.length?"green":""}">${nok}/${P.F.length} prontas</span>`:""}${cur<0?'<span class="chip green">✓ prancha pronta</span>':""}</div></div>`;
 if(op)h+=`<div class="prd"><div class="prq">${P.F.map((F,i)=>`<button class="${figOk(F)?"ok":""}" data-a="prfe" data-i="${P.id}|${F.id}"><b>${n0+i}</b>${esc(figShort(F))}</button>`).join("")}<button data-a="prf" data-i="${P.id}"><b>+</b>figuras</button></div>`
  +`<div class="prs">${PRS.map(([k,l])=>`<div class="r">${tcB("prc",P.id,k,P[k],l)}<span class="g1${isNA(P[k])?" mut":""}">${l}</span><small>${isDate(P[k])?fmt(P[k]):isNA(P[k])?"não precisa":""}</small></div>`).join("")}</div>`
  +(P.F.length?`<div class="stl">Legenda</div><div class="leg">${legTxt(P,1)}</div>`:`<p class="note">Toque em + figuras para escolher as peças, estruturas e habitus que entram nesta prancha.</p>`)
  +(P.nt?`<p class="note">${esc(P.nt).replace(/\n/g,"<br>")}</p>`:"")
  +`<div class="tools" style="flex-wrap:wrap">${P.F.length?`<button class="sec" data-a="prcp" data-i="${P.id}">Copiar legenda</button>`:""}${P.lk?`<button class="sec" data-a="prl" data-i="${P.id}">Abrir pasta</button>`:""}<button class="sec" data-a="pre" data-i="${P.id}">Editar prancha</button></div></div>`;
 return h+`</section>`}
// [v2.6] pranchas agrupadas por manuscrito (cada grupo tem a sua numeração de figuras)
function vPr(){const top=`<p class="note">Pranchas de figuras: só o esquema (as imagens ficam no computador ou no Drive). Cada figura ligada a uma peça, estrutura ou habitus fica pronta sozinha quando ela é ilustrada ou fotografada na espécie; a legenda é montada sozinha.</p>`;
 if(!S.pr.length)return top+`<div class="empty">Nenhuma prancha ainda. Toque no + para criar.</div>`;
 const K=S.ms.map(m=>m.id).filter(id=>S.pr.some(p=>p.ms===id));if(S.pr.some(p=>!msById(p.ms)))K.push("");
 return top+K.map(k=>{const m=msById(k),L=S.pr.filter(p=>k?p.ms===k:!msById(p.ms)),nf=L.reduce((n,p)=>n+p.F.length,0);
  return`<div class="r prg"><div class="grp">${m?esc(m.t):"Sem manuscrito"} (${L.length})</div>${nf?`<button class="lnk" data-a="prca" data-i="${k||"-"}">Copiar legendas</button>`:""}</div>`+L.map(prCard).join("")}).join("")}
// [v2.6] abrir uma prancha (a partir de um manuscrito); a seta volta para onde estava
function openPr(id){const r={tab:V.tab,f:V.f,g:V.g,u:V.u};V.po=id;go("i");if(r.tab!=="i")V.ret=r;const c=document.querySelector(`[data-pr="${id}"]`);if(c)c.scrollIntoView({block:"start"})}

// ===== FORMULÁRIOS =====
const prF=()=>[{k:"n",l:"Nome (ex.: Prancha 3)"},{k:"tt",l:"Assunto (ex.: terminália ♂ e edeago)"},{k:"s",l:"Espécie (as figuras podem ser de outras também)",t:"sel",o:[SPV].concat(spAll().map(x=>x.lab))},{k:"sx",l:"Sexo na legenda",t:"sel",o:SXO},{k:"ms",l:"Manuscrito (as figuras são numeradas por manuscrito)",t:"sel",o:[NOMS].concat(S.ms.map(m=>m.t))},{k:"lk",l:"Link da pasta ou do arquivo no Drive (opcional)"},{k:"nt",l:"Notas",t:"area"}];
function prForm(P,nv){const L=spAll(),sl=L.find(x=>x.s.id===P.s),mm=msById(P.ms);
 form(nv?"Nova prancha":"Editar prancha",prF(),{n:P.n,tt:P.tt,s:sl?sl.lab:SPV,sx:P.sx||SXO[0],ms:mm?mm.t:NOMS,lk:P.lk,nt:P.nt},v=>{if(!v.n)return toast("Informe o nome");
  const s=L.find(x=>x.lab===v.s),i=S.ms.findIndex(m=>m.t===v.ms);Object.assign(P,{n:v.n,tt:v.tt,s:s?s.s.id:"",sx:v.sx,ms:i>=0?S.ms[i].id:"",lk:v.lk,nt:v.nt});
  if(nv){S.pr.push(P);V.po=P.id}done()},
  nv?null:()=>conf("Excluir "+P.n+(P.F.length?" e suas "+pl(P.F.length,"figura","figuras"):"")+"?","Excluir",()=>rm("Prancha excluída",()=>{S.pr=S.pr.filter(x=>x!==P)})),"",
  nv?null:[{l:"↑ Subir",f:()=>prMove(P,-1)},{l:"↓ Descer",f:()=>prMove(P,1)}])}
function prMove(P,d){const G=prGrp(P),o=G[G.indexOf(P)+d];if(!o)return toast("Já está na ponta");const a=S.pr.indexOf(P),b=S.pr.indexOf(o);S.pr[a]=o;S.pr[b]=P;done()}
// [v2.6] escolher a espécie das figuras
function figPick(P,then){const L=spAll();if(!L.length)return toast("Cadastre as espécies primeiro (aba Grupos)");
 form("Figuras de qual espécie?",[{k:"s",l:"Espécie",t:"sel",o:L.map(x=>x.lab)}],{},v=>{const x=L.find(y=>y.lab===v.s);if(x)then(x)})}
// [v2.6] acrescentar várias figuras de uma vez: marque peças, estruturas e habitus; cada vista vira uma figura
function figAdd(P,x){const s=x.s,O=[];
 s.parts.forEach(p=>O.push({k:"p",o:p.n,l:p.n}));s.me.forEach(p=>O.push({k:"m",o:p.n,l:"Estrutura: "+p.n}));s.hab.forEach(h=>O.push({k:"h",o:h.n,l:"Habitus "+h.n.toLowerCase()}));
 const F=O.map((o,i)=>({k:"o"+i,l:esc(o.l),t:"chk"})).concat([{k:"ou",l:"Outra figura (ex.: mapa de distribuição, microscopia eletrônica)"},{k:"vs",l:"Vistas (opcional; várias separadas por vírgula: dorsal, lateral)"},{k:"tp",l:"Tipo de imagem (peças e estruturas)",t:"sel",o:FTP}]);
 form("Figuras de "+spH(x.g,s,1),F,{tp:FTP[1]},v=>{const W=v.vs?v.vs.split(",").map(z=>z.trim()).filter(Boolean):[""];let n=0;
  O.forEach((o,i)=>{if(!v["o"+i])return;(o.k==="h"?[""]:W).forEach(w=>{P.F.push({id:uid(),s:s.id,k:o.k,o:o.o,v:w,tp:o.k==="h"||v.tp===FTP[0]?"f":"i",lb:"",ok:0});n++})});
  if(v.ou)W.forEach(w=>{P.F.push({id:uid(),s:s.id,k:"x",o:v.ou,v:w,tp:"f",lb:"",ok:0});n++});
  if(!n)return toast("Marque pelo menos uma figura");done();toast(pl(n,"figura acrescentada","figuras acrescentadas"))},
  null,"",[{l:"Outra espécie",f:()=>figPick(P,y=>figAdd(P,y))}])}
// [v2.6] mudar a figura de lugar (a janela continua aberta para mudar de novo)
function figMove(P,F,d){const i=P.F.indexOf(F),j=i+d;if(j<0||j>=P.F.length)return toast("Já está na ponta");P.F[i]=P.F[j];P.F[j]=F;save();render();A.prfe({dataset:{i:P.id+"|"+F.id}})}

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.6] pranchas: criar, abrir/fechar, editar, etapas (3 estados), copiar legendas, abrir a pasta
 addPr(){prForm({id:uid(),n:"Prancha "+(S.pr.filter(p=>!msById(p.ms)).length+1),tt:"",s:"",sx:SXO[0],ms:"",lk:"",nt:"",F:[]},1)},
 pro(el){V.po=V.po===el.dataset.i?null:el.dataset.i;render()},
 pre(el){const P=prById(el.dataset.i);if(P)prForm(P)},
 pra(el){openPr(el.dataset.i)},
 prc(el){const[id,k]=el.dataset.i.split("|"),P=prById(id);if(!P)return;P[k]=nxt(P[k]);save();render()},
 prcp(el){const P=prById(el.dataset.i);if(P)copyText(legTxt(P),"Legenda copiada")},
 prca(el){const k=el.dataset.i==="-"?"":el.dataset.i;copyText(S.pr.filter(p=>(k?p.ms===k:!msById(p.ms))&&p.F.length).map(p=>legTxt(p)).join("\n\n"),"Legendas copiadas")},
 prl(el){const P=prById(el.dataset.i);if(P&&/^https?:\/\//i.test(P.lk||""))window.open(P.lk,"_blank");else toast("O link precisa começar com https://")},
 // [v2.6] figuras: acrescentar (da espécie da prancha ou de outra) e editar/mover/remover
 prf(el){const P=prById(el.dataset.i);if(!P)return;const x=P.s&&spById(P.s);if(x)figAdd(P,x);else figPick(P,y=>figAdd(P,y))},
 prfe(el){const[a,b]=el.dataset.i.split("|"),P=prById(a),F=P&&P.F.find(x=>x.id===b);if(!F)return;const r=figRef(F);
  form("Fig. "+(prN0(P)+P.F.indexOf(F)),[{k:"o",l:r?"Objeto (ligado à espécie: mudar o nome desfaz a ligação)":"Objeto"},{k:"v",l:"Vista (opcional)"},{k:"tp",l:"Tipo de imagem",t:"sel",o:FTP},{k:"lb",l:"Texto próprio na legenda (vazio = automático)"},{k:"ok",l:"Imagem pronta (para figuras sem ligação com peça, estrutura ou habitus)",t:"chk"}],
   {o:F.o,v:F.v,tp:F.tp==="f"?FTP[0]:FTP[1],lb:F.lb,ok:isD(F.ok)?"1":""},v=>{if(!v.o)return toast("Informe o objeto");if(v.o!==F.o)F.k="x";
    Object.assign(F,{o:v.o,v:v.v,tp:v.tp===FTP[0]?"f":"i",lb:v.lb,ok:v.ok?(isD(F.ok)?F.ok:today()):0});done()},
   ()=>rm("Figura removida",()=>{P.F=P.F.filter(x=>x!==F)}),"Remover",[{l:"◀ Antes",f:()=>figMove(P,F,-1)},{l:"Depois ▶",f:()=>figMove(P,F,1)}])},
});
