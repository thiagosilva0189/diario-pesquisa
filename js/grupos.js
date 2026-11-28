// =====================================================================
// Diário de Pesquisa — grupos.js: ABA GRUPOS
// Lista de famílias com busca, subgrupos (subfamília, tribo...) em lista ou em
// tela própria, tela do gênero com suas espécies e "Atividades gerais".
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== GÊNERO: formulário e tela (com a lista de espécies) =====
// [v1.0] campos do gênero (nome, situação, prioridade, nº de espécies, notas) · [v1.3] agrupamento · [v2.1] autor, ano e agrupamento aninhado
// [v2.3] caixinha "gênero sem nome" e tipo de estudo das espécies
const gForm=f=>[{k:"n",l:"Nome do gênero"},{k:"un",l:"Gênero ainda sem nome (gen. nov., gênero A): o nome não fica em itálico",t:"chk"},{k:"au",l:"Autor (opcional)"},{k:"an",l:"Ano (opcional)"}].concat(f.grp.length?[{k:"gr",l:"Agrupamento (opcional)",t:"sel",o:["(nenhum)"].concat(grAll(f).map(x=>grPath(f,x)))}]:[],[{k:"st",l:"Situação",t:"sel",o:GST},{k:"p",l:"Prioridade",t:"sel",o:PRIO},{k:"est",l:"Tipo de estudo das espécies (usado nas espécies novas e nas que estão sem tipo definido)",t:"sel",o:TPO.map(x=>x[1])},{k:"sp",l:"Nº de espécies (aprox.)"},{k:"dist",l:"Distribuição do gênero (áreas separadas por ; — opcional)",t:"area"},{k:"dsp",l:"Somar também a distribuição das espécies",t:"chk"},{k:"nt",l:"Notas",t:"area"}]);   // [v2.4] distribuição
// [v1.0] tela do gênero · [v1.2] lista de espécies · [v1.6] espécies em abas + Abrir/Fechar todas
// [v1.8] botões + Espécie / Editar gênero antes da lista · [v1.10] "Gênero" automático e espécie abreviada
// [v2.1] autor e ano, chip do agrupamento, botão Ordenar e diário de notas
// [v2.3] chip do tipo de estudo do gênero; espécie sem nome fora do itálico (spH) · [v2.4] distribuição do gênero
// [v2.5] atos nomenclaturais do gênero e checklist do gênero novo (seções retráteis antes das espécies)
function vGen(){
 const F=fam(V.f),g=gen(V.f,V.g);if(!g){V.g=null;return vGroups()}
 const x=grById(F,g.gr);
 let h=`<h2>${gl(g)}${authH(g)}</h2><div>${x?`<span class="chip">${esc(grl(x))}</span>`:""}<span class="chip ${gc(g.st)}">${esc(g.st)}</span><span class="chip ${pc(g.p)}">Prioridade ${esc(g.p.toLowerCase())}</span>${atChips(g)}${g.est&&g.est!==TPO[0][0]?`<span class="chip blue">${esc(tpChip(g.est))}</span>`:""}${g.sp?`<span class="chip">${esc(g.sp)} spp. (estimado)</span>`:""}</div>${gDist(g).length?`<div class="gdist"><small>Distribuição</small>${distChips(gDist(g))}</div>`:""}${g.nt?`<p class="note">${esc(g.nt)}</p>`:""}${prog(g)}${fcLineG(g)}`;   // [v2.6] previsão de término da bancada
 h+=`<div class="tools"><button class="sec" data-a="addSp">+ Espécie</button><button class="sec" data-a="editGen">Editar gênero</button></div>`;
 h+=accH(g,"at","Atos nomenclaturais do gênero",atSum(g),()=>atH(g))+(atHas(g,"gnn")?accH(g,"nv","Checklist do gênero novo",nvSum(g),()=>nvH(g)):"");   // [v2.5]
 h+=`<div class="r" style="justify-content:space-between"><div class="grp">Espécies (${g.spp.length})</div>${g.spp.length>1?`<button class="lnk" data-a="ordG">Ordenar</button>`:""}${g.spp.length?`<button class="lnk" data-a="tgs">${g.spp.some(s=>s.o)?"Fechar todas":"Abrir todas"}</button>`:""}</div>`+(g.spp.map(s=>`<section class="card"><div class="fh" data-a="os" data-i="${s.id}"><b>${spH(g,s)}${authH(s)}</b><span>${s.o?"▾":"▸"}</span></div>${s.o?`<div class="spb" data-sp="${s.id}">${vSp(s)}</div>`:`<div class="gen" style="border-top:0;padding-top:0" data-a="os" data-i="${s.id}">${spChips(s)}${prog(s)}</div>`}</section>`).join("")||'<div class="empty">Nenhuma espécie ainda. Toque no + para adicionar.</div>');
 return h+`<div class="grp">Atividades do gênero</div>`+tasksH(g)+notesH(g);
}

// ===== SUBGRUPO EM TELA PRÓPRIA, ATIVIDADES GERAIS E DA FAMÍLIA =====
// [v1.3] de quem são as atividades da tela aberta: gerais (*), da família ou de um subgrupo
const supOwn=()=>{if(V.u==="*")return S.ge;const[f,r]=V.u.split("|"),F=fam(f);return F&&(r?grById(F,r):F)};
// [v2.4] SUBGRUPO EM TELA PRÓPRIA (como o gênero): caminho, gêneros, subgrupos de dentro, atividades e notas
const crumb=(f,x)=>{const p=[];let y=x.pa?grById(f,x.pa):null,k=0;while(y&&k++<9){p.unshift(esc(grl(y)));y=y.pa?grById(f,y.pa):null}return[esc(f.n)].concat(p).join(" › ")};
const grStat=(f,x)=>{const ids=grDesc(f,x),G=f.g.filter(g=>ids.includes(g.gr));return{ng:G.length,ns:G.reduce((n,g)=>n+g.spp.length,0),nk:grKids(f,x.id).length}};
const grCard=(f,x)=>{const c=grStat(f,x);return`<div class="grpc" data-a="ou" data-i="${f.id}|${x.id}"><span class="chip blue">${esc(x.r)}</span><b>${esc(x.n)}</b><span class="oc">›</span><small>${c.nk?pl(c.nk,"subgrupo","subgrupos")+" · ":""}${pl(c.ng,"gênero","gêneros")} · ${pl(c.ns,"espécie","espécies")}</small></div>`};
const navMode=f=>(f.vw||S.cfg.grpv)==="nav";   // a família mostra os subgrupos como cartões (que abrem em nova tela)?
function vGrp(f,x){const c=grStat(f,x),gs=f.g.filter(g=>g.gr===x.id),kids=grKids(f,x.id),nav=navMode(f);
 let h=`<p class="crumb">${crumb(f,x)}</p><h2>${esc(x.r)} ${esc(x.n)}</h2><div><span class="chip">${pl(c.ng,"gênero","gêneros")}</span><span class="chip">${pl(c.ns,"espécie","espécies")}</span></div>${x.nt?`<p class="note">${esc(x.nt)}</p>`:""}`;
 h+=`<div class="tools" style="flex-wrap:wrap"><button class="sec" data-a="addGen" data-i="${f.id}|${x.id}">+ Gênero</button><button class="sec" data-a="addGrp" data-i="${f.id}|${x.id}">+ Subgrupo</button><button class="sec" data-a="editGrp" data-i="${f.id}|${x.id}">Editar</button></div>`;
 if(kids.length)h+=`<div class="grp">Subgrupos (${kids.length})</div><div class="fam">`+(nav?kids.map(y=>grCard(f,y)).join(""):kids.map(y=>secH(f,y,f.g,"",0)).join(""))+`</div>`;
 h+=`<div class="grp">Gêneros (${gs.length})</div>`+(gs.length?`<div class="fam">${gs.map(g=>genRow(f,g)).join("")}</div>`:'<div class="note" style="margin:0 2px 8px">Nenhum gênero direto aqui. Toque em + Gênero.</div>');
 return h+`<div class="grp">Atividades (${x.tasks.filter(t=>t.s!==STAT[2]).length} em aberto)</div>`+tasksH(x)+notesH(x);
}
// [v1.3] tela de atividades gerais / da família / do subgrupo · [v2.1] diário de notas
function vSup(){
 const o=supOwn();if(!o){V.u=null;return vGroups()}
 if(o.r)return vGrp(fam(V.u.split("|")[0]),o);   // [v2.4] subgrupo: tela própria, como a do gênero
 return`<h2>${V.u==="*"?"Atividades gerais":esc(o.r?grl(o):o.n)}</h2><p class="note">${V.u==="*"?"Atividades sem família: coletas, triagem de várias famílias, montagem de material...":esc(o.nt||"")}</p>${prog(o)}`+tasksH(o)+notesH(o);
}
// ----- família: ordem e ícone [v2.1] -----
const famForm=[{k:"n",l:"Nome da família"},{k:"ord",l:"Ordem",t:"sel",o:ORD.map(o=>o[0]).concat([OUTRA])},{k:"nt",l:"Notas",t:"area"}];
const ordIco=f=>{const o=ORD.find(x=>x[0]===f.ord),k=o?o[1]:"oth";return`<span class="ordic ${k}" title="${esc(f.ord||OUTRA)}">${ICO[k]}</span>`};
// ----- agrupamentos supragenéricos (subfamília > tribo > subtribo...) [v2.1: um dentro do outro] -----
// [v1.3] subfamília, tribo, subtribo e grupo de gêneros dentro da família · [v2.1] um dentro do outro (pa = "dentro de")
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

// ===== LISTA DE FAMÍLIAS (aba Grupos) =====
// [v1.0] linha do gênero na família · [v1.6] nº de espécies no app · [v1.7] nº à direita e bandeja separada · [v2.1] autor e ano · [v2.5] atos
const genRow=(f,g)=>`<div class="gen" data-a="og" data-i="${f.id}|${g.id}"><div class="r"><b class="g1">${gl(g)}${authH(g)}</b><small>${pl(g.spp.length,"espécie","espécies")}</small></div><div><span class="chip ${gc(g.st)}">${esc(g.st)}</span><span class="chip ${pc(g.p)}">Prioridade ${esc(g.p.toLowerCase())}</span>${atChips(g)}${g.est===ME?`<span class="chip blue">${ME}</span>`:""}${g.sp?`<span class="chip">${esc(g.sp)} spp.</span>`:""}</div>${prog(g)}</div>`;
// [v2.1] texto de um item para a busca (nome, autor, notas, atividades, subitens e diário)
const txt=o=>[o.n,o.au,o.an,o.nt,o.dist,o.ty&&o.ty.lt].concat((o.tasks||[]).map(t=>[t.t,t.nt].concat(t.b.map(b=>b.t)).join(" ")),(o.nts||[]).map(n=>n.tx),((o.mol||{}).ms||[]).map(m=>m.m+" "+(m.acc||"")),(o.at||[]).map(a=>(ATD[a.c]?ATD[a.c].l:"")+" "+(a.x||"")),(o.lo||[]).map(l=>(l.nt||"")+(l.o==="e"?" "+empNome(empById(l.e)):""))).join(" ");   // [v2.4] + distribuição, localidade-tipo, marcadores · [v2.5] + atos e material
// [v1.3] bloco do subgrupo com seus gêneros e botão Atividades · [v2.1] subgrupos de dentro · [v2.4] a faixa abre a tela do subgrupo (✎ edita)
function secH(f,x,gs,q,dep){ // um subgrupo, seus gêneros e os subgrupos de dentro
 const ids=grDesc(f,x),m=gs.filter(g=>g.gr===x.id),tot=f.g.filter(g=>ids.includes(g.gr)).length,inner=grKids(f,x.id).map(y=>secH(f,y,gs,q,dep+1)).join("");
 if(q&&!m.length&&!inner)return"";
 return`<div class="grpbox"><div class="sub" data-a="ou" data-i="${f.id}|${x.id}"><span class="chip blue">${esc(x.r)}</span><b>${esc(x.n)}</b><small>${pl(tot,"gênero","gêneros")}${x.tasks.length?" · "+pl(x.tasks.length,"atividade","atividades"):""}</small><button class="ic" data-a="editGrp" data-i="${f.id}|${x.id}" title="Editar">✎</button><span class="oc">›</span></div>${m.map(g=>genRow(f,g)).join("")}${inner}</div>`;
}
// [v1.0] lista de famílias e gêneros (com busca) · [v1.3] Atividades da família e + Subgrupo
// [v1.6] abrir uma família fecha as outras; nº de gêneros e de espécies · [v1.7] botões da família antes dos gêneros
// [v1.10] botões compactos numa linha · [v2.1] ícone da ordem e busca sem acentos (também em notas e atividades)
// [v2.4] exibição "lista completa" ou "por subgrupos" (botão Ver tudo / Ver por subgrupo)
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
   h+=`<div class="acts fb"><button class="sec" data-a="addGen" data-i="${f.id}">+ Gênero</button><button class="sec" data-a="ou" data-i="${f.id}">Atividades (${f.tasks.length})</button><button class="sec" data-a="editFam" data-i="${f.id}">Editar</button><button class="lnk" data-a="addGrp" data-i="${f.id}" title="Nova subfamília, tribo ou grupo de gêneros">+ Subgrupo</button>${f.grp.length?`<button class="lnk" data-a="fvw" data-i="${f.id}">${navMode(f)?"Ver tudo":"Ver por subgrupo"}</button>`:""}</div>${f.nt?`<div class="acts note">${esc(f.nt)}</div>`:""}`;
   h+=gs.filter(g=>!grById(f,g.gr)).map(g=>genRow(f,g)).join("");
   h+=navMode(f)&&!q?grKids(f,"").map(x=>grCard(f,x)).join(""):grKids(f,"").map(x=>secH(f,x,gs,q,0)).join("");   // [v2.4] por subgrupos: cartões
  }
  h+="</section>";
 }
 $("#list").innerHTML=h||(q?'<div class="empty">Nada encontrado.</div>':'<div class="empty">Nenhuma família ainda. Toque no + para criar.</div>');
}
// [v1.0] tela Grupos: busca e lista · [v1.3] cartão "Atividades gerais" · [v1.6] botão Abrir/Fechar todas
function vGroups(){return`<div class="tools"><input id="q" type="search" placeholder="Buscar família, gênero ou espécie" value="${esc(V.q)}" style="flex:1;min-width:0"><button class="sec" data-a="tgf" style="white-space:nowrap">${S.f.some(f=>f.o)?"Fechar todas":"Abrir todas"}</button></div><div class="card gen" id="gecard" style="border-top:0" data-a="ou" data-i="*"><b>📌 Atividades gerais</b> <small>sem família</small><div><span class="chip">${S.ge.tasks.filter(t=>t.s!==STAT[2]).length} em aberto</span></div>${prog(S.ge)}</div><div id="list"></div>`}
// [v1.0] busca enquanto digita
document.addEventListener("input",e=>{if(e.target.id==="q"){V.q=e.target.value;list()}});

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v1.6] abrir uma família fecha as outras; Abrir/Fechar todas (famílias e espécies)
 tf(el){const f=fam(el.dataset.i);if(f.o)f.o=0;else{S.f.forEach(x=>x.o=0);f.o=1}saveUI();render()},   // [v2.3] abrir/fechar não conta como mudança
 tgf(){const a=!S.f.some(f=>f.o);S.f.forEach(f=>f.o=a?1:0);saveUI();render()},
 tgs(){const g=gen(V.f,V.g),a=!g.spp.some(s=>s.o);g.spp.forEach(s=>s.o=a?1:0);saveUI();render()},
 // [v1.0] abrir um gênero · [v1.6] já abre na aba da espécie certa · [v1.3] ou = abrir atividades gerais/família/subgrupo · [v2.4] guardam o caminho para o voltar
 og(el){const[f,g,s]=el.dataset.i.split("|");if(V.tab==="g")V.hs.push({u:V.u,f:V.f,g:V.g});else V.hs=[];V.tab="g";V.u=null;V.f=f;V.g=g;if(s)gen(f,g).spp.forEach(x=>x.o=x.id===s?1:0);dir=1;render();$("#app").scrollTop=0},
 ou(el){if(V.tab==="g")V.hs.push({u:V.u,f:V.f,g:V.g});else V.hs=[];V.tab="g";V.u=el.dataset.i;V.f=V.g=V.s=null;dir=1;render();$("#app").scrollTop=0},
 // [v1.3] criar e editar subfamília/tribo · [v2.1] campo "Dentro de" e exclusão que mantém os gêneros · [v2.4] criar dentro de um subgrupo (já sugere a categoria seguinte)
 addGrp(el){const[fi,pi]=el.dataset.i.split("|"),f=fam(fi),q=pi&&grById(f,pi);form("Novo agrupamento (subfamília, tribo...)",grForm(f),{r:q?RANKS[Math.min(RANKS.indexOf(q.r)+1,RANKS.length-1)]:RANKS[0],pa:q?grPath(f,q):NOPA},v=>{if(!v.n)return;f.grp.push({id:uid(),n:v.n,r:v.r,pa:grId(f,v.pa),nt:v.nt,tasks:[],nts:[]});f.o=1;done()})},
 editGrp(el){const[fi,gi]=el.dataset.i.split("|"),f=fam(fi),x=grById(f,gi);form("Editar agrupamento",grForm(f,x),{n:x.n,r:x.r,pa:x.pa?grLab(f,x.pa):NOPA,nt:x.nt},v=>{if(!v.n)return;Object.assign(x,{n:v.n,r:v.r,pa:grId(f,v.pa),nt:v.nt});done()},()=>rm("Agrupamento excluído (os gêneros foram mantidos)",()=>{f.g.forEach(g=>{if(g.gr===x.id)g.gr=x.pa||""});f.grp.forEach(y=>{if(y.pa===x.id)y.pa=x.pa||""});f.grp=f.grp.filter(y=>y!==x)}))},
 // [v1.0] criar e editar família e gênero · [v1.3] agrupamento do gênero · [v1.6] nova família abre e fecha as outras · [v2.1] ordem, autor e ano, confirmação ao excluir
 addFam(){form("Nova família",famForm,{ord:ORD[0][0]},v=>{if(!v.n)return;S.f.forEach(x=>x.o=0);S.f.push({id:uid(),n:v.n,ord:v.ord===OUTRA?"":v.ord,nt:v.nt,o:1,g:[],grp:[],tasks:[],nts:[]});done()})},
 editFam(el){const f=fam(el.dataset.i);form("Editar família",famForm,{n:f.n,ord:f.ord||OUTRA,nt:f.nt},v=>{if(!v.n)return;f.n=v.n;f.ord=v.ord===OUTRA?"":v.ord;f.nt=v.nt;done()},()=>conf("Excluir a família "+f.n+" e todos os seus "+f.g.length+" gênero(s), espécies e atividades?","Excluir",()=>rm("Família excluída",()=>{S.f=S.f.filter(x=>x!==f)})))},
 // [v2.3] gênero sem nome (un) e tipo de estudo das espécies (est); mudar o tipo atualiza as espécies sem tipo definido
 addGen(el){const[fi,xi]=el.dataset.i.split("|"),f=fam(fi),x=xi&&grById(f,xi);form("Novo gênero",gForm(f),{st:GST[0],p:PRIO[1],est:TPO[0][1],dsp:"1",gr:x?grPath(f,x):"(nenhum)"},v=>{if(!v.n)return;f.g.push({id:uid(),n:v.n,un:v.un?1:0,est:tpV(v.est),au:v.au,an:v.an,st:v.st,p:v.p,sp:v.sp,dist:v.dist,dsp:v.dsp?1:0,nt:v.nt,gr:grId(f,v.gr),tasks:[],spp:[],nts:[]});f.o=1;done()})},
 editGen(){const f=fam(V.f),g=gen(V.f,V.g);form("Editar gênero",gForm(f),{n:g.n,un:g.un?"1":"",au:g.au,an:g.an,st:g.st,p:g.p,est:tpL(g.est||TPO[0][0]),sp:g.sp,dist:g.dist,dsp:g.dsp?"1":"",nt:g.nt,gr:grLab(f,g.gr)},v=>{if(!v.n)return;const e0=g.est;Object.assign(g,{n:v.n,un:v.un?1:0,au:v.au,an:v.an,st:v.st,p:v.p,est:tpV(v.est),sp:v.sp,dist:v.dist,dsp:v.dsp?1:0,nt:v.nt,gr:grId(f,v.gr)});if(g.est!==e0)g.spp.forEach(s=>{if(!s.tp||s.tp===TPO[0][0])s.tp=g.est});done()},()=>conf("Excluir o gênero "+g.n+", com "+g.spp.length+" espécie(s) e todo o progresso?","Excluir",()=>rm("Gênero excluído",()=>{f.g=f.g.filter(x=>x!==g);V.g=null})))},
 // [v2.4] família: ver tudo numa tela ou por subgrupos
 fvw(el){const f=fam(el.dataset.i);f.vw=navMode(f)?"lista":"nav";saveUI();render()},
});
