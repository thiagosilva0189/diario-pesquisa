// =====================================================================
// Diário de Pesquisa — agenda.js: ABAS AGENDA E CONTAGEM
// Calendário do mês e itens de cada dia, repetições, tarefas sem data, etapas
// concluídas no calendário, escala de trabalho, feriados e contagens regressivas.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== AGENDA (calendário) =====
// [v1.8] Agenda: cores, formulário com "Incluir no Painel?" · [v2.1] data de conclusão (dc)
// [v2.4] data opcional (tarefa sem data), repetição (rp), dias concluídos (dd) e pulados (ex), ‼ e antecedência
const CL={blue:"Azul",green:"Verde",red:"Vermelho",orange:"Laranja",yellow:"Amarelo",purple:"Roxo",gray:"Cinza"};
let AGL=[];   // itens do dia selecionado (para tocar e editar)
// [v2.4] REPETIÇÃO de atividades da agenda: [código, texto]
const RPT=[["","Não repete"],["d","Todo dia"],["w","Toda semana"],["m","Todo mês"],["y","Todo ano"]];
const agForm=[{k:"t",l:"Atividade"},{k:"d",l:"Data (deixe em branco para uma tarefa sem data)",t:"date"},{k:"h",l:"Hora (opcional)",t:"time"},{k:"rp",l:"Repetir",t:"sel",o:RPT.map(x=>x[1])},{k:"rn",l:"Repetir a cada (1 = toda vez; 2 = a cada 2 dias, semanas, meses...)",t:"number"},{k:"ru",l:"Repetir até (opcional)",t:"date"},{k:"s",l:"Situação",t:"sel",o:STAT},{k:"p",l:"Prioridade",t:"sel",o:["Sem prioridade",...PRIO]},{k:"xi",l:"‼ Extremamente importante",t:"chk"},{k:"av",l:"Mostrar no Painel com antecedência de (dias)",t:"number"},{k:"col",l:"Cor no calendário",t:"sel",o:Object.values(CL)},{k:"pn",l:"Incluir no Painel?",t:"sel",o:["Sim","Não"]},{k:"nt",l:"Notas",t:"area"}];
function agSave(e,v){Object.assign(e,{t:v.t,d:v.d,h:v.h,s:v.s,p:PRIO.includes(v.p)?v.p:"",col:Object.keys(CL).find(k=>CL[k]===v.col)||"blue",pn:v.pn==="Sim"?1:0,nt:v.nt,xi:v.xi?1:0,av:Math.max(0,+v.av||0)||S.cfg.xi,dc:v.s===STAT[2]?(e.dc||(isDate(v.d)&&v.d<=today()?v.d:today())):""});
 const f=(RPT.find(x=>x[1]===v.rp)||RPT[0])[0];e.rp=f&&e.d?{f,n:Math.max(1,+v.rn||1),u:v.ru||""}:null;e.dd=e.dd||[];e.ex=e.ex||[];return e}
const agVals=e=>{const r=e.rp||{};return{t:e.t,d:e.d,h:e.h,rp:(RPT.find(x=>x[0]===(r.f||""))||RPT[0])[1],rn:String(r.n||1),ru:r.u||"",s:e.s,p:e.p||"Sem prioridade",xi:e.xi?"1":"",av:String(e.av||S.cfg.xi),col:CL[e.col]||CL.blue,pn:e.pn?"Sim":"Não",nt:e.nt}};
// [v2.4] REPETIÇÃO: datas em que a atividade acontece entre lo e hi (sem os dias pulados)
function occ(e,lo,hi){const r=e.rp,out=[],ex=new Set(e.ex||[]),n=Math.max(1,+r.n||1),s=e.d,end=r.u&&r.u<hi?r.u:hi;if(!s||s>end)return out;
 const y0=+s.slice(0,4),m0=+s.slice(5,7)-1,d0=+s.slice(8,10);
 for(let i=0;i<6000;i++){let ds;
  if(r.f==="d")ds=addD(s,i*n);else if(r.f==="w")ds=addD(s,i*n*7);
  else{const mm=r.f==="m"?m0+i*n:m0,yy=(r.f==="y"?y0+i*n:y0)+Math.floor(mm/12),M=((mm%12)+12)%12;if(d0>new Date(yy,M+1,0).getDate())continue;ds=yy+"-"+p2(M+1)+"-"+p2(d0)}   // dia 31 em mês de 30: pula
  if(ds>end)break;if(ds>=lo&&!ex.has(ds))out.push(ds)}
 return out}
const rptL=r=>{const n=+r.n||1;return(n===1?{d:"todo dia",w:"toda semana",m:"todo mês",y:"todo ano"}[r.f]:"a cada "+n+" "+{d:"dias",w:"semanas",m:"meses",y:"anos"}[r.f])+(r.u?" até "+fmt(r.u):"")};
const nextOcc=e=>occ(e,today(),addD(today(),800)).find(d=>!e.dd.includes(d))||"";   // próxima data ainda não concluída
// [v2.4] REGISTRO DO DIA: etapas concluídas (peças, estruturas, habitus, molecular, tipos) aparecem como ✓ no calendário
// [v2.5] + itens do checklist da espécie nova e do gênero novo (o do gênero fica numa linha do gênero)
function regItems(){const R={},ad=(v,w,f,g,s)=>{if(!isDate(v))return;const k=v+"|"+(s||g).id;(R[k]=R[k]||{d:v,f,g,s,c:{}}).c[w]=(R[k].c[w]||0)+1};
 S.f.forEach(f=>f.g.forEach(g=>{NVG.forEach(it=>ad(g.nv[it.k],"gênero novo",f,g,null));
  g.spp.forEach(s=>{const a=(v,w)=>ad(v,w,f,g,s);
  s.parts.forEach(p=>STEPS.forEach(x=>a(p[x[0]],"peças")));s.hab.forEach(h=>a(h.x,"habitus"));s.me.forEach(p=>STEPS_ME.forEach(x=>a(p[x[0]],"morfologia externa")));
  MOLA.forEach(x=>a(s.mol[x[0]],"molecular"));s.mol.ms.forEach(m=>MOLST.forEach(x=>a(m[x[0]],"molecular")));s.ty.L.forEach(r=>TYST.forEach(x=>a(r[x[0]],"material-tipo")));
  NVS.forEach(it=>a(s.nv[it.k],"espécie nova"))})}));
 return Object.values(R).map(r=>({d:r.d,t:"✓ "+(r.s?abbr(r.g,r.s.n):"Gênero "+r.g.n)+" — "+Object.keys(r.c).map(k=>k+" "+r.c[k]).join(" · "),col:"gray",k:"r",dn:1,sub:"Etapas concluídas · "+esc(r.g.n)+" · "+esc(r.f.n),x:{f:r.f,g:r.g,s:r.s}}))}
// [v1.8] tudo que tem data vai para a Agenda · [v2.2] eventos trazidos do Google Agenda
// [v2.4] repetições (lo..hi = período em que as datas são calculadas), tarefa sem data concluída aparece no dia em que
//        foi feita, ‼ dos extremamente importantes e registro das etapas concluídas
function agItems(lo,hi){ // tudo que tem data: atividades do app, prazos de preparação, contagens e atividades da agenda
 const L=[],td=today();lo=lo||addD(td,-400);hi=hi||addD(td,550);
 allT().forEach(x=>{const dn=x.t.s===STAT[2],d=dn&&x.t.dc?x.t.dc:x.t.d;if(d)L.push({d,t:x.t.t,col:dn?"gray":(x.t.p?pc(x.t.p):"blue"),k:"t",sub:where(x)+(dn&&x.t.d&&x.t.d!==d?" · prazo era "+fmt(x.t.d):""),dn,x,xi:x.t.xi,av:x.t.av})});   // [v2.3] concluída aparece (com ✓) no dia em que foi feita
 S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{if(s.d){const dn=!prepPend(s);L.push({d:s.d,t:(s.tp===ME?"Morfologia externa":"Dissecção e preparação")+" — "+abbr(g,s.n),col:dn?"gray":"orange",k:"p",sub:esc(g.n)+" · "+esc(f.n),dn,x:{f,g,s}})}})));
 S.cd.forEach(c=>L.push({d:c.d,h:c.h,t:"⏳ "+c.n,col:"purple",k:"c",sub:"Contagem regressiva",x:c}));
 S.ag.forEach(e=>{const sub=(e.gk?"Google Agenda"+(e.gc?" · "+esc(e.gc):""):"Agenda")+(e.p?" · prioridade "+e.p.toLowerCase():"")+(e.pn?" · no Painel":""),b={h:e.h,t:e.t,k:"a",x:e,xi:e.xi,av:e.av};
  if(e.rp&&e.rp.f&&e.d)occ(e,lo,hi).forEach(oc=>{const dn=e.dd.includes(oc);L.push(Object.assign({},b,{d:oc,oc,col:dn?"gray":e.col,sub:sub+" · repete "+rptL(e.rp),dn}))});   // [v2.4] cada dia da repetição
  else{const dn=e.s===STAT[2],d=e.d||(dn?e.dc:"");if(d)L.push(Object.assign({},b,{d,col:dn?"gray":e.col,sub:sub+(e.d?"":" · tarefa sem data"),dn}))}});
 // [v2.5] prazo de devolução dos empréstimos (‼, com a antecedência do aviso); devolvido fica com ✓ no dia da devolução
 S.emp.forEach(e=>{if(!e.dd)return;const dn=e.st===EST[2];L.push({d:dn&&e.dv?e.dv:e.dd,t:"Devolver empréstimo — "+empNome(e),col:dn?"gray":"yellow",k:"e",sub:"Empréstimo · "+esc(e.st.toLowerCase())+(e.cur?" · "+esc(e.cur):"")+(dn&&e.dv&&e.dv!==e.dd?" · prazo era "+fmt(e.dd):""),dn,x:e,xi:dn?0:1,av:e.av})});
 // [v2.6] prazo dos manuscritos (até submeter); depois de submetido fica com ✓ no dia do envio
 S.ms.forEach(m=>{if(!m.pz)return;const dn=m.st>=1;L.push({d:dn&&m.d1?m.d1:m.pz,t:(dn?"Manuscrito enviado — ":"Prazo do manuscrito — ")+m.t,col:dn?"gray":"blue",k:"m",sub:"Manuscrito · "+esc(MST[m.st].toLowerCase())+(m.rv?" · "+esc(m.rv):"")+(dn&&m.d1&&m.d1!==m.pz?" · prazo era "+fmt(m.pz):""),dn,x:m,xi:dn?0:1,av:30})});
 if(S.cfg.reg)L.push(...regItems());   // [v2.4]
 return L;
}
// abre o item tocado na Agenda ou no cartão "Hoje"
// [v2.1] (a Agenda abria os itens desde a v1.8; aqui virou uma função só, usada também pelo cartão Hoje) · [v2.4] repetição e registro
// [v2.5] empréstimo (abre a tela Empréstimos) e registro do gênero (sem espécie) · [v2.6] manuscrito (abre a tela Manuscritos)
function openIt(i){if(!i)return;if(i.k==="t")editTask(i.x.o||i.x.s||i.x.g,i.x.t);else if(i.k==="p"||i.k==="r")A.og({dataset:{i:i.x.f.id+"|"+i.x.g.id+"|"+(i.x.s?i.x.s.id:"")}});else if(i.k==="c")A.ecd({dataset:{i:i.x.id}});else if(i.k==="e")openEmp(i.x.id);else if(i.k==="m")openMs(i.x.id);else eagO(i.x,i.oc||"")}
// [v2.4] editar atividade da agenda; numa repetição dá para pular só aquele dia
function eagO(e,oc){const rp=e.rp&&e.rp.f;form("Editar atividade da agenda",agForm,agVals(e),v=>{if(!v.t)return toast("Informe a atividade");agSave(e,v);if(v.d)V.cal.d=v.d;done()},()=>rm(rp?"Atividade e repetições excluídas":"Atividade excluída",()=>{S.ag=S.ag.filter(x=>x!==e)}),rp?"Excluir todas":"",oc&&rp?[{l:"Pular só "+fmt(oc),f:()=>rm("Dia pulado",()=>{e.ex.push(oc)})}]:null)}
// ----- escala de trabalho e feriados -----
// [v1.9] escala do museu: ciclo de letras M/N/F a partir de uma data de referência
const ESN={M:"manhã",N:"noite",F:"folga"},ESC={M:"yellow",N:"purple",F:"green"};
const escForm=[{k:"pat",l:"Padrão do ciclo, uma letra por dia (M manhã, N noite, F folga)"},{k:"ref",l:"Data de referência",t:"date"},{k:"pos",l:"Em que dia do ciclo cai a data de referência (1 = primeiro dia do padrão)",t:"number"},{k:"on",l:"Mostrar a escala no calendário?",t:"sel",o:["Sim","Não"]}];
function escL(ds){const e=S.sc;if(!e||!e.on||!e.pat)return"";const n=e.pat.length;return e.pat[(((D8(ds)-D8(e.ref)+e.pos-1)%n)+n)%n]}
// [v2.1] quantos dias de folga (F) da escala existem de hoje até a data ds (incluindo as duas)
function folgas(ds){const e=S.sc,td=today();if(!e||!e.on||!e.pat||!ds||ds<td)return null;const L=e.pat.length,n=D8(ds)-D8(td)+1,i0=((D8(td)-D8(e.ref)+e.pos-1)%L+L)%L;let c=0;for(let i=0;i<L&&i<n;i++)if(e.pat[(i0+i)%L]==="F")c+=Math.floor((n-1-i)/L)+1;return c}
// feriados fixos (para incluir outro, acrescente ["MM-DD","Nome"] nesta lista)
// [v1.9] feriados nacionais + 25/01, 09/07 e 20/11; móveis calculados pela Páscoa (Carnaval, Sexta-feira Santa, Corpus Christi)
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

// ===== TELA DA AGENDA =====
// [v1.8] calendário do mês e itens do dia · [v1.9] escala no canto, feriados e domingos · [v1.10] legenda retrátil (sem lista de feriados do mês)
// [v2.2] botão "+ Google" em cada item e atalho para a tela Google Agenda
// [v2.3] círculo para marcar como concluída (✓) e ✓ nos dias com algo concluído
// [v2.4] repetições (↻), ‼, registro das etapas do dia e lista "Sem data"
function vAg(){
 const c=V.cal,M={},td=today(),H=S.cfg.fer?feriados(c.y):{},m0=c.y+"-"+p2(c.m+1)+"-01",m1=c.y+"-"+p2(c.m+1)+"-"+p2(new Date(c.y,c.m+1,0).getDate());
 agItems(addD(m0<c.d?m0:c.d,-1),addD(m1>c.d?m1:c.d,1)).forEach(i=>(M[i.d]=M[i.d]||[]).push(i));   // [v2.4] repetições só do mês mostrado
 const k0=new Date(c.y,c.m,1).getDay(),nd=new Date(c.y,c.m+1,0).getDate();
 let g="";for(let i=0;i<k0;i++)g+="<span></span>";
 for(let d=1;d<=nd;d++){const ds=c.y+"-"+p2(c.m+1)+"-"+p2(d),it=M[ds]||[],h=H[ds],l=escL(ds);
  g+=`<button class="cl${h?" hol":(k0+d-1)%7===0?" dom":""}${ds===td?" td":""}${ds===c.d?" sel":""}" data-a="agd" data-i="${ds}">${l?`<span class="sc ${l}">${esc(l)}</span>`:""}<b>${d}</b><span class="dots">${it.slice(0,4).map(i=>`<i class="dot ${i.dn?"ok":i.col}${i.xi&&!i.dn?" xi":""}"></i>`).join("")}${it.length>4?"+":""}</span></button>`}
 const day=(M[c.d]||[]).slice().sort((a,b)=>(a.k==="r")-(b.k==="r")||(a.h||"").localeCompare(b.h||""));AGL=day;
 const hd=S.cfg.fer?feriados(+c.d.slice(0,4))[c.d]:null,le=escL(c.d),nd2=S.ag.filter(e=>!e.d&&e.s!==STAT[2]);
 return`<div class="r" style="justify-content:space-between;margin-bottom:8px"><button class="sec" data-a="agm" data-i="-1">‹</button><b style="text-transform:capitalize">${new Date(c.y,c.m,1).toLocaleDateString("pt-BR",{month:"long",year:"numeric"})}</b><button class="sec" data-a="agm" data-i="1">›</button></div><div class="cg">${["D","S","T","Q","Q","S","S"].map(x=>`<small>${x}</small>`).join("")}${g}</div>`
 +`<div class="r" style="justify-content:space-between"><div class="grp">${fmt(c.d)}${c.d===td?" · hoje":""}</div><button class="lnk" data-a="agt">Ir para hoje</button></div><div>${hd?`<span class="chip orange">🎉 ${esc(hn(hd))}</span>`:""}${le?`<span class="chip ${ESC[le]||"gray"}">Escala: ${esc(ESN[le]||le)}</span>`:""}</div>`
 +(day.map((i,n)=>`<div class="card gen${i.k==="r"?" reg":""}" style="border-top:0" data-a="agi" data-i="${n}"><div class="r">${i.k==="t"||i.k==="a"?`<button class="agck ${i.dn?"on":i.col}" data-a="agck" data-i="${n}" title="${i.dn?"Desmarcar":"Marcar como concluída"}">${i.dn?"✓":""}</button>`:`<i class="dot ${i.k==="r"?"ok":i.col}"></i>`}<b class="g1">${i.xi&&!i.dn?'<span class="xib">‼</span> ':""}${i.oc?'<span class="rpi-i" title="Repete">↻</span> ':""}${esc(i.t)}</b><small>${i.h?esc(i.h):""}</small>${i.dn||i.k==="r"||i.x.gk||gAuto()?"":`<button class="gbtn" data-a="gcal" data-i="${n}" title="Adicionar ao Google Agenda">+ Google</button>`}</div><small>${i.sub}</small></div>`).join("")||'<div class="empty">Nada neste dia. Toque no + para criar uma atividade.</div>')
 +`<div class="r" style="justify-content:space-between"><div class="grp">Sem data (${nd2.length})</div><button class="lnk" data-a="addNd">+ Tarefa sem data</button></div>`   // [v2.4] tarefas sem data
 +(nd2.map(e=>`<div class="card gen" style="border-top:0" data-a="eag" data-i="${e.id}"><div class="r"><button class="agck ${e.col}" data-a="ndck" data-i="${e.id}" title="Marcar como concluída"></button><b class="g1">${e.xi?'<span class="xib">‼</span> ':""}${esc(e.t)}</b></div>${e.nt?`<small>${esc(e.nt)}</small>`:""}</div>`).join("")||'<div class="note" style="margin:0 2px 10px">Coisas que precisam ser feitas, mas sem dia marcado. Ao concluir, ficam no calendário do dia em que foram feitas.</div>')
 +'<div class="tools" style="margin-top:12px;flex-wrap:wrap"><button class="sec" data-a="escf">⚙ Escala de trabalho</button><button class="sec" data-a="tab" data-i="k">Google Agenda</button></div><details class="lg"><summary>Legenda</summary><p class="note">Escala no canto de cada dia (M manhã · N noite · F folga). Domingos em azul; feriados com o número em vermelho. Cores dos prazos: vermelho = prioridade alta, amarelo = média, verde = baixa, azul = sem prioridade, ✓ = concluída (atividades concluídas aparecem no dia em que foram feitas; toque no círculo para marcar ou desmarcar); laranja = dissecção/preparação; roxo = contagem regressiva; amarelo com ‼ = devolução de empréstimo; azul com ‼ = prazo de manuscrito; ‼ = extremamente importante; ↻ = repete (cada dia pode ser marcado ou pulado). Itens cinza com ✓ mostram as etapas feitas naquele dia (peças, habitus, molecular, checklist da espécie nova...). Atividades criadas na agenda usam a cor escolhida. Com a conta Google conectada (menu ⋮ › Google), tudo isso vai sozinho para a agenda “Diário de Pesquisa (app)”; sem ela, o botão + Google abre o Google Agenda com o item já preenchido; eventos trazidos do Google aparecem como “Google Agenda”.</p></details>';
}

// ===== CONTAGEM REGRESSIVA (aba Contagem) =====
// [v1.4] contagem regressiva: formatos, cálculo de anos/meses/dias e horas perto da data
const FM={ymd:"Anos, meses e dias",md:"Meses e dias",d:"Só dias"};
const cdT=c=>new Date(c.d+"T"+(c.h||"23:59")+":00");
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
// [v1.4] lista de contagens · [v2.1] folgas até a data
function vCd(){
 return S.cd.slice().sort((a,b)=>cdT(a)-cdT(b)).map(c=>{const fg=folgas(c.d);return`<div class="card cd" data-a="ecd" data-i="${c.id}"><div class="r"><b class="g1">${esc(c.n)}</b><span class="note">✎</span></div><div class="cdn ${cdSt(c)}" data-cd="${c.id}">${cdText(c)}</div><small>${fmt(c.d)}${c.h?" às "+esc(c.h):""} · ${FM[c.fm]}${fg!=null?" · "+pl(fg,"folga","folgas")+" até lá":""}</small>${c.nt?`<div class="note">${esc(c.nt)}</div>`:""}</div>`}).join("")||'<div class="empty">Nenhuma contagem ainda. Toque no + para criar (qualificação, submissão de artigo, defesa...).</div>';
}
const cdForm=[{k:"n",l:"Nome da atividade"},{k:"d",l:"Data",t:"date"},{k:"h",l:"Hora (opcional)",t:"time"},{k:"fm",l:"Formato da contagem",t:"sel",o:Object.values(FM)},{k:"hz",l:"Mostrar horas quando faltar menos de (dias; 0 = nunca)",t:"number"},{k:"nt",l:"Notas",t:"area"}];
const cdSave=(c,v)=>Object.assign(c,{n:v.n,d:v.d,h:v.h,fm:Object.keys(FM).find(k=>FM[k]===v.fm)||"ymd",hz:Math.max(0,+v.hz||0),nt:v.nt});
setInterval(()=>{if(V.tab==="c")tick()},20000);   // atualiza as contagens   // [v1.4]

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v1.4] criar e editar contagem regressiva
 addCd(){form("Nova contagem regressiva",cdForm,{fm:FM.ymd,hz:"7"},v=>{if(!v.n||!v.d)return toast("Informe o nome e a data");S.cd.push(cdSave({id:uid()},v));done()})},
 ecd(el){const c=S.cd.find(x=>x.id===el.dataset.i);form("Editar contagem",cdForm,{n:c.n,d:c.d,h:c.h,fm:FM[c.fm],hz:String(c.hz),nt:c.nt},v=>{if(!v.n||!v.d)return toast("Informe o nome e a data");cdSave(c,v);done()},()=>rm("Contagem excluída",()=>{S.cd=S.cd.filter(x=>x!==c)}))},
 // [v1.9] configurar a escala de trabalho
 escf(){const e=S.sc;form("Escala de trabalho",escForm,{pat:e.pat,ref:e.ref,pos:String(e.pos),on:e.on?"Sim":"Não"},v=>{const p=v.pat.toUpperCase().replace(/[^A-Z]/g,"");if(!p||!v.ref)return toast("Informe o padrão e a data de referência");S.sc={pat:p,ref:v.ref,pos:Math.min(p.length,Math.max(1,+v.pos||1)),on:v.on==="Sim"?1:0};done()})},
 // [v1.8] Agenda: mudar de mês, escolher dia, ir para hoje, abrir item, criar e editar atividade
 agm(el){const c=V.cal,d=new Date(c.y,c.m+(+el.dataset.i),1);c.y=d.getFullYear();c.m=d.getMonth();render()},
 agd(el){V.cal.d=el.dataset.i;render()},
 agt(){const s=today();V.cal={y:+s.slice(0,4),m:+s.slice(5,7)-1,d:s};render()},
 agi(el){openIt(AGL[+el.dataset.i])},
 // [v2.4] data opcional (nd = tarefa sem data), repetição e ‼
 addAg(el,nd){form(nd?"Nova tarefa sem data":"Nova atividade na agenda",agForm,{d:nd?"":V.cal.d,rp:RPT[0][1],rn:"1",s:STAT[0],col:CL.blue,pn:"Sim",av:String(S.cfg.xi)},v=>{if(!v.t)return toast("Informe a atividade");S.ag.push(agSave({id:uid(),dd:[],ex:[]},v));if(v.d){V.cal.d=v.d;V.cal.y=+v.d.slice(0,4);V.cal.m=+v.d.slice(5,7)-1}done()})},
 eag(el){const e=S.ag.find(x=>x.id===el.dataset.i);if(e)eagO(e,"")},
 // [v2.3] marcar/desmarcar como concluída direto na Agenda (fica no calendário com ✓, no dia em que foi feita)
 agck(el){const i=AGL[+el.dataset.i];if(!i)return;
  if(i.oc){const e=i.x,k=e.dd.indexOf(i.oc);if(k>=0)e.dd.splice(k,1);else e.dd.push(i.oc);save();render();return}   // [v2.4] repetição: marca só aquele dia
  const o=i.k==="t"?i.x.t:i.k==="a"?i.x:null;if(!o)return;
  if(o.s===STAT[2]){o.s=STAT[0];o.dc=""}else{o.s=STAT[2];o.dc=V.cal.d<=today()?V.cal.d:today()}
  save();render();if(o.s===STAT[2]&&o.dc!==V.cal.d)toast("Concluída hoje ("+fmt(o.dc)+")")},
 // [v2.4] tarefa sem data: concluir e criar
 ndck(el){const e=S.ag.find(x=>x.id===el.dataset.i);if(!e)return;e.s=STAT[2];e.dc=today();save();render();toast("Concluída hoje: fica no calendário de hoje")},
 addNd(){A.addAg(null,1)},
});
