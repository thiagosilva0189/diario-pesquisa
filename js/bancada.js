// =====================================================================
// Diário de Pesquisa — bancada.js: FILA DE BANCADA E RITMO
// Fila de bancada (o que vem a seguir em todas as espécies: dissecar, montar
// lâmina, ilustrar, fotografar, examinar e habitus), ritmo de trabalho
// (etapas por semana e por folga) e previsão de término no Painel, no gênero
// e na espécie.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== FILA DE BANCADA =====
// [v2.6] filas (código, nome) e o texto do aviso ao marcar cada etapa
const FQ=[["d","Dissecar"],["l","Lâmina"],["i","Ilustrar"],["f","Fotografar"],["e","Examinar"],["h","Habitus"]];
const FQV={d:"dissecada",l:"lâmina montada",i:"ilustrada",f:"fotografada",e:"examinada",x:"fotografado"};
const filaOn=s=>s.st!=="Pausado"&&s.st!=="Concluído";   // espécies pausadas ou concluídas ficam de fora
// itens de uma fila (gid = só um gênero): [{f,g,s,L:[{a: lista, i: posição, k: etapa, n: nome, pv: data da etapa anterior}]}]
// ordem: prioridade da espécie, depois prazo
function filaItems(q,gid){const R=[];
 S.f.forEach(f=>f.g.forEach(g=>{if(gid&&gid!==g.id)return;g.spp.forEach(s=>{if(!filaOn(s))return;const L=[];
  if(S.cfg.sdp)s.parts.forEach((p,i)=>{
   if(q==="d"&&!p.d)L.push({a:"parts",i,k:"d",n:p.n,pv:""});
   if(q==="l"&&isD(p.d)&&!p.l)L.push({a:"parts",i,k:"l",n:p.n,pv:p.d});
   if((q==="i"||q==="f")&&isD(p.d)&&p.l&&!p[q])L.push({a:"parts",i,k:q,n:p.n,pv:isDate(p.l)?p.l:p.d})});   // ilustrar/fotografar: depois da lâmina (ou "não será montada")
  if(S.cfg.sme)s.me.forEach((p,i)=>{
   if(q==="e"&&!p.e)L.push({a:"me",i,k:"e",n:p.n,pv:""});
   if((q==="i"||q==="f")&&isD(p.e)&&!p[q])L.push({a:"me",i,k:q,n:p.n+" (estrutura)",pv:p.e})});
  if(S.cfg.shb&&q==="h")s.hab.forEach((h,i)=>{if(!h.x)L.push({a:"hab",i,k:"x",n:"Habitus "+h.n.toLowerCase(),pv:""})});
  if(L.length)R.push({f,g,s,L})})}));
 return R.sort((a,b)=>PRIO.indexOf(a.s.p)-PRIO.indexOf(b.s.p)||(a.s.d||"9999").localeCompare(b.s.d||"9999"))}
const filaN=(q,gid)=>filaItems(q,gid).reduce((n,x)=>n+x.L.length,0);
// [v2.6] tela Fila de bancada (menu ⋮ e Painel): escolhe a fila, filtra por gênero e marca direto
function vFila(){const C={};FQ.forEach(([k])=>{C[k]=filaN(k,V.fqg)});
 const q=FQ.some(([k])=>k===V.fq)?V.fq:(FQ.find(([k])=>C[k])||FQ[0])[0];V.fq=q;
 const G=[];S.f.forEach(f=>f.g.forEach(g=>{if(g.spp.some(filaOn))G.push(g)}));
 let h=`<div class="qtabs">${FQ.map(([k,l])=>`<button class="${k===q?"on":""}" data-a="fq" data-i="${k}">${l}<b>${C[k]}</b></button>`).join("")}</div>`;
 if(G.length>1)h+=`<label class="kl">Gênero<select data-c="fqg"><option value="">Todos os gêneros</option>${G.map(g=>`<option value="${g.id}"${g.id===V.fqg?" selected":""}>${esc(g.n)}</option>`).join("")}</select></label>`;
 const R=filaItems(q,V.fqg),nm=(FQ.find(x=>x[0]===q)||FQ[0])[1].toLowerCase();
 h+=R.map(x=>`<div class="card fila"><div class="fl-h" data-a="og" data-i="${x.f.id}|${x.g.id}|${x.s.id}"><span>${spH(x.g,x.s)}${x.s.d?` <span class="chip ${x.s.d<today()?"red":"blue"}">📅 ${fmt(x.s.d)}</span>`:""}</span><small>${pl(x.L.length,"item","itens")} ›</small></div>`
  +x.L.map(it=>`<div class="r flr"><button class="tc" data-a="fqk" data-i="${x.s.id}|${it.a}|${it.i}|${it.k}" title="Marcar como feita hoje" aria-label="Marcar ${esc(it.n)}"></button><span class="g1">${esc(it.n)}</span><small>${it.pv&&isDate(it.pv)?"desde "+fmt(it.pv).slice(0,5):""}</small></div>`).join("")+`</div>`).join("")
  ||`<div class="empty">Nada para ${nm} agora.</div>`;
 return h+`<p class="note">Toque na caixinha quando terminar: a etapa fica marcada com a data de hoje (como na espécie) e o item passa para a fila seguinte. Toque no nome da espécie para abri-la. Espécies pausadas ou concluídas ficam de fora.</p>`}
// [v2.6] cartão do Painel: quanto há em cada fila (tocar abre a fila)
function filaH(){const C=FQ.map(([k,l])=>[k,l,filaN(k,"")]).filter(x=>x[2]);
 return`<div class="grp">Fila de bancada</div><div class="card pad">${C.length?`<div class="qtabs" style="margin:0">${C.map(([k,l,n])=>`<button data-a="fqo" data-i="${k}">${l}<b>${n}</b></button>`).join("")}</div>`:`<p class="note" style="margin:0">Nada pendente na bancada.</p>`}</div>`}

// ===== RITMO E PREVISÃO =====
// [v2.6] datas das etapas de bancada já feitas (peças, estruturas e habitus)
function benchDates(){const D=[];S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{
 s.parts.forEach(p=>STEPS.forEach(x=>{if(isDate(p[x[0]]))D.push(p[x[0]])}));
 s.me.forEach(p=>STEPS_ME.forEach(x=>{if(isDate(p[x[0]]))D.push(p[x[0]])}));
 s.hab.forEach(h=>{if(isDate(h.x))D.push(h.x)})})));return D}
const wkStart=d=>addD(d,-((new Date(d+"T12:00:00").getDay()+6)%7));   // segunda-feira da semana
const escOn=()=>!!(S.sc&&S.sc.on&&S.sc.pat);
const nf1=x=>(Math.round(x*10)/10).toLocaleString("pt-BR");          // 5.2 → "5,2"
const fmtS=d=>d.slice(0,4)===today().slice(0,4)?fmt(d).slice(0,5):fmt(d).slice(0,6)+d.slice(2,4);   // "12/12" ou "12/03/27"
// ritmo das últimas 8 semanas: W = etapas em cada semana (barras), pw = por semana, pf = por folga (com a escala)
function ritmo(){const td=today(),D=benchDates(),from=addD(wkStart(td),-49),W=[];
 for(let i=0;i<8;i++){const a=addD(from,7*i),b=addD(a,6);W.push({a,n:D.filter(d=>d>=a&&d<=b).length})}
 const R=D.filter(d=>d>=from&&d<=td),first=D.length?D.reduce((m,d)=>d<m?d:m):td,st=first>from?first:from,days=D8(td)-D8(st)+1;
 let fo=0;if(escOn())for(let d=st;d<=td;d=addD(d,1))if(escL(d)==="F")fo++;
 return{W,n:R.length,all:D.length,pw:R.length/Math.max(1,days/7),pf:fo?R.length/fo:0}}
// etapas de bancada que faltam na espécie (as "não será realizada" não contam) e se ela já começou
function benchRest(s){let n=0;const c=(L,ST)=>{const[d,t]=cntDN(L,ST);n+=t-d};if(S.cfg.sdp)c(s.parts,STEPS);if(S.cfg.sme)c(s.me,STEPS_ME);if(S.cfg.shb)c(s.hab,[["x"]]);return n}
const benchGo=s=>s.parts.some(p=>STEPS.some(x=>isD(p[x[0]])))||s.me.some(p=>STEPS_ME.some(x=>isD(p[x[0]])))||s.hab.some(h=>isD(h.x));
// quando terminam n etapas no ritmo R: contando só as folgas (com a escala) ou os dias corridos · null = sem ritmo
function fcDate(n,R){const td=today();if(n<=0)return{d:td,fo:0};
 if(escOn()&&R.pf>0){const need=Math.ceil(n/R.pf);let d=td,k=0;for(let i=0;i<3000;i++){if(escL(d)==="F"&&++k>=need)return{d,fo:need};d=addD(d,1)}return null}
 return R.pw>0?{d:addD(td,Math.ceil(n/R.pw*7)),fo:0}:null}
const fcTxt=fc=>fc?"≈ "+fmtS(fc.d)+(fc.fo?" · "+pl(fc.fo,"folga","folgas"):""):"sem ritmo";
// previsão de cada espécie começada (ou com prazo), uma depois da outra: primeiro as de prazo mais cedo, depois por prioridade
function prevList(R){const L=[];S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{if(!filaOn(s))return;const n=benchRest(s);if(n&&(benchGo(s)||s.d))L.push({f,g,s,n})})));
 L.sort((a,b)=>(a.s.d||"9999").localeCompare(b.s.d||"9999")||PRIO.indexOf(a.s.p)-PRIO.indexOf(b.s.p));
 let acc=0;L.forEach(x=>{acc+=x.n;x.fc=fcDate(acc,R);x.late=!!(x.s.d&&x.fc&&x.fc.d>x.s.d)});return L}
// [v2.6] cartão do Painel: barras das últimas 8 semanas e previsão de término
function ritH(){const R=ritmo();let h=`<div class="grp">Ritmo e previsão</div><div class="card pad">`;
 if(!R.all)return h+`<p class="note" style="margin:0">Marque etapas de bancada (peças, estruturas, habitus) para o app calcular seu ritmo e prever quando cada espécie fica pronta.</p></div>`;
 const mx=Math.max(1,...R.W.map(w=>w.n));
 h+=`<div><span class="big">${nf1(R.pw)}</span> <small>etapas por semana${R.pf?" · "+nf1(R.pf)+" por folga":""}</small></div>`
 +`<div class="wk">${R.W.map((w,i)=>`<div class="${i===7?"cur":""}" title="semana de ${fmt(w.a)}: ${w.n}"><i style="height:${Math.round(w.n/mx*100)}%">${w.n?`<small>${w.n}</small>`:""}</i></div>`).join("")}</div><div class="wkx"><span>${fmt(R.W[0].a).slice(0,5)}</span><span>esta semana</span></div>`;
 const P=prevList(R);
 if(P.length){h+=`<div class="stl">Previsão de término</div>`+P.slice(0,V.rto?999:5).map(x=>`<div class="prv" data-a="og" data-i="${x.f.id}|${x.g.id}|${x.s.id}"><div class="g1"><b>${spH(x.g,x.s)}</b><small>faltam ${pl(x.n,"etapa","etapas")}${x.s.d?" · prazo "+fmt(x.s.d):""}</small></div><span class="chip ${!x.fc?"gray":x.late?"red":"green"}">${fcTxt(x.fc)}</span></div>`
  +(x.late?`<div class="rwarn">‼ No ritmo atual, o prazo de ${spH(x.g,x.s)} (${fmt(x.s.d)}) não fecha.</div>`:"")).join("");
  // por gênero: tudo o que falta nas espécies (sem a ordem acima)
  const G=[];S.f.forEach(f=>f.g.forEach(g=>{const n=g.spp.filter(filaOn).reduce((a,s)=>a+benchRest(s),0);if(n&&g.spp.some(benchGo))G.push({f,g,n})}));
  if(G.length>1||(G.length===1&&P.length>1))h+=G.sort((a,b)=>b.n-a.n).slice(0,4).map(x=>{const fc=fcDate(x.n,R);return`<div class="prv" data-a="og" data-i="${x.f.id}|${x.g.id}"><div class="g1"><b>${gl(x.g)}</b><small>todas as espécies · faltam ${pl(x.n,"etapa","etapas")}</small></div><span class="chip ${fc?"blue":"gray"}">${fcTxt(fc)}</span></div>`}).join("");
  h+=`<p class="note" style="margin:8px 0 0">${P.length>5?`<button class="lnk" data-a="rto" style="padding:2px 0">${V.rto?"Mostrar menos":"Ver todas ("+P.length+")"}</button><br>`:""}Previsão fazendo as espécies nesta ordem (prazo, depois prioridade)${escOn()?", contando só as folgas da escala":""}.</p>`}
 return h+`</div>`}
// [v2.6] linha de previsão no gênero e na espécie
function fcLineG(g){if(!S.cfg.rit)return"";const n=g.spp.filter(filaOn).reduce((a,s)=>a+benchRest(s),0);if(!n||!benchDates().length)return"";const fc=fcDate(n,ritmo());
 return`<div class="fcl">Bancada: faltam ${pl(n,"etapa","etapas")} nas espécies${fc?` · ${fcTxt(fc)} no ritmo atual`:""}</div>`}
function fcLineS(s){if(!S.cfg.rit||!filaOn(s))return"";const n=benchRest(s);if(!n||!benchDates().length)return"";const fc=fcDate(n,ritmo()),late=!!(s.d&&fc&&fc.d>s.d);
 return`<div class="fcl${late?" late":""}">Bancada: faltam ${pl(n,"etapa","etapas")}${fc?` · ${fcTxt(fc)} no ritmo atual`:""}${late?" · o prazo ("+fmt(s.d)+") não fecha":""}</div>`}

// [v2.6] gênero escolhido na Fila de bancada
document.addEventListener("change",e=>{const el=e.target;if(el.dataset&&el.dataset.c==="fqg"){V.fqg=el.value;render()}});

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.6] fila de bancada: escolher a fila, marcar a etapa (com Desfazer) e abrir a fila a partir do Painel
 fq(el){V.fq=el.dataset.i;render()},
 fqk(el){const[id,a,i,k]=el.dataset.i.split("|"),x=spById(id),o=x&&x.s[a]&&x.s[a][+i];if(!o)return;rm(o.n+": "+FQV[k],()=>{o[k]=today()})},
 fqo(el){const r={tab:V.tab,f:V.f,g:V.g,u:V.u};V.fq=el.dataset.i;go("f");if(r.tab!=="f")V.ret=r},
 // [v2.6] previsão: mostrar todas as espécies
 rto(){V.rto=!V.rto;render()},
});
