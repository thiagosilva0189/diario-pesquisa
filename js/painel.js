// =====================================================================
// Diário de Pesquisa — painel.js: ABA PAINEL
// Cartões ‼ Extremamente importantes, Hoje e Produção; subabas Em execução,
// Prazos e Potenciais.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// [v2.1] linha de prazo: "em 12 dias · 5 folgas" (ou "atrasado 3 dias")
const dlH=(d,dn)=>{if(!d||dn)return"";const fg=folgas(d);return`<div class="dl${d<today()?" late":""}">${rel(d)}${fg!=null?" · "+pl(fg,"folga","folgas"):""}</div>`};
// [v1.0] cartão de atividade no Painel · [v1.5] prioridade e prazo · [v1.8] itens da Agenda · [v2.1] linha de prazo e folgas
const item=x=>`<div class="card gen" style="border-top:0" data-a="${x.ag?"eag":x.u?"ou":"og"}" data-i="${x.ag?x.ag.id:x.u||x.f.id+"|"+x.g.id+"|"+(x.s?x.s.id:"")}"><b>${x.t.xi?'<span class="xib">‼</span> ':""}${esc(x.t.t)}</b><div><span class="chip">${esc(x.t.c)}</span>${x.t.p?`<span class="chip ${pc(x.t.p)}">Prioridade ${esc(x.t.p.toLowerCase())}</span>`:""}${x.t.d?`<span class="chip ${x.t.d<today()?"red":"blue"}">📅 ${fmt(x.t.d)}</span>`:""}</div>${dlH(x.t.d,x.t.s===STAT[2])}<small>${where(x)}</small></div>`;
// [v1.10] subabas do Painel
const PT=[["x","Em execução"],["p","Prazos"],["g","Potenciais"]];
// [v1.0] Painel: gêneros por situação, em execução e potenciais · [v1.5] prazos em ordem cronológica + prazo de preparação das espécies
// [v1.8] atividades da Agenda marcadas "Incluir no Painel" · [v1.10] subabas · [v2.1] cartão Hoje e Produção no topo
// [v2.4] cartão ‼ Extremamente importantes; Hoje e Produção podem ser desligados nas Configurações
// [v2.5] cartão Novidades taxonômicas (nomenclatura.js), depois da Produção
function vDash(){
 const T=allT(),G=[];S.f.forEach(f=>f.g.forEach(g=>G.push({f,g})));
 const rp=e=>e.rp&&e.rp.f,ag=S.ag.filter(e=>e.pn).map(e=>({ag:e,t:{t:e.t,c:"Agenda",d:rp(e)?nextOcc(e):e.d,s:rp(e)?STAT[0]:e.s,p:e.p,xi:e.xi}})),prep=[];   // [v2.4] repetição: próxima data
 G.forEach(x=>x.g.spp.forEach(s=>{if(s.d&&prepPend(s))prep.push({f:x.f,g:x.g,s,t:{t:prepName(s),c:s.tp===ME?ME:"Dissecção",d:s.d,s:STAT[0]}})}));   // [v2.3] nome conforme o tipo de estudo
 const L={
  x:T.concat(ag).filter(x=>x.t.s===STAT[1]),
  p:T.concat(prep,ag).filter(x=>x.t.d&&x.t.s!==STAT[2]).sort((a,b)=>a.t.d.localeCompare(b.t.d)),
  g:G.filter(x=>x.g.st==="Potencial").sort((a,b)=>PRIO.indexOf(a.g.p)-PRIO.indexOf(b.g.p))
 };
 const pg=x=>`<div class="card gen" style="border-top:0" data-a="og" data-i="${x.f.id}|${x.g.id}"><b>${gl(x.g)}</b> <small>${esc(x.f.n)}</small><div><span class="chip ${pc(x.g.p)}">Prioridade ${esc(x.g.p.toLowerCase())}</span></div></div>`;
 const k=PT.some(a=>a[0]===V.pt)?V.pt:"x",vazio={x:"Nada em execução.",p:"Nenhum prazo definido.",g:"Nenhum gênero potencial."};
 return xiH()+(S.cfg.hoje?hojeH():"")+(S.cfg.prod?prodH():"")+(S.cfg.nvt?nvtH():"")+`<div class="grp">Gêneros e atividades</div><div>${GST.map(s=>`<span class="chip ${gc(s)}">${s}: ${G.filter(x=>x.g.st===s).length}</span>`).join("")}</div><div class="seg">${PT.map(([i,l])=>`<button class="${i===k?"on":""}" data-a="ptab" data-i="${i}">${l} (${L[i].length})</button>`).join("")}</div>`
 +(L[k].map(k==="g"?pg:item).join("")||`<div class="empty">${vazio[k]}</div>`);
}
// [v2.1] cartão "Hoje" no topo do Painel: escala, feriado, atrasados e próximos 7 dias
let HJL=[];
function hojeH(){
 const td=today(),lim=addD(td,7),hd=S.cfg.fer?feriados(+td.slice(0,4))[td]:null,le=escL(td);   // [v2.4] feriados podem ser desligados
 // [v2.4] dias passados de repetições e eventos trazidos do Google não viram "atrasados"
 const L=agItems().filter(i=>!i.dn&&i.d<=lim&&!(i.d<td&&(i.k==="c"||i.oc||(i.k==="a"&&i.x.gk)))).sort((a,b)=>a.d.localeCompare(b.d)||(a.h||"").localeCompare(b.h||""));
 const late=L.filter(i=>i.d<td),up=L.filter(i=>i.d>=td),mais=Math.max(0,late.length-5)+Math.max(0,up.length-7);
 HJL=late.slice(0,5).concat(up.slice(0,7));
 const dia=new Date(td+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
 return`<div class="card hoje"><div class="hj-h"><b>${esc(dia)}</b>${le?`<span class="chip ${ESC[le]||"gray"}">Escala: ${esc(ESN[le]||le)}</span>`:""}${hd?`<span class="chip orange">🎉 ${esc(hn(hd))}</span>`:""}${late.length?`<span class="chip red">${pl(late.length,"atrasada","atrasadas")}</span>`:""}</div>`
 +(HJL.map((i,n)=>`<div class="hj${i.d<td?" late":""}" data-a="hji" data-i="${n}"><i class="dot ${i.col}"></i><span class="g1">${i.xi?'<span class="xib">‼</span> ':""}${esc(i.t)}</span><small>${rel(i.d)}${i.h?" "+esc(i.h):""}</small></div>`).join("")||'<div class="note" style="padding:4px 0 8px">Nada atrasado nem com prazo nos próximos 7 dias.</div>')
 +`<div class="hj-f">${mais?`<small>+${mais} na aba Prazos ou na Agenda</small>`:"<span></span>"}<button class="lnk" data-a="tab" data-i="r">Relatório do período ›</button></div></div>`;
}
// [v2.4] cartão "‼ Extremamente importantes" no topo do Painel: cada item aparece com a antecedência escolhida nele
// [v2.5] inclui os prazos de devolução dos empréstimos (com a antecedência do aviso de cada um)
let XIL=[];
function xiH(){const td=today(),L=[];
 allT().forEach(x=>{if(x.t.xi&&x.t.s!==STAT[2])L.push({t:x.t.t,d:x.t.d||"",av:x.t.av,x})});
 S.ag.forEach(e=>{if(!e.xi)return;if(e.rp&&e.rp.f){const d=nextOcc(e);if(d)L.push({t:e.t,d,av:e.av,e,oc:d})}else if(e.s!==STAT[2])L.push({t:e.t,d:e.d||"",av:e.av,e})});
 S.emp.forEach(e=>{if(e.st!==EST[2]&&e.dd)L.push({t:"Devolver empréstimo — "+empNome(e),d:e.dd,av:e.av,emp:e})});
 XIL=L.filter(i=>!i.d||D8(i.d)-D8(td)<=(+i.av||S.cfg.xi)).sort((a,b)=>(a.d||"9999").localeCompare(b.d||"9999"));
 return XIL.length?`<div class="card xic"><div class="xic-h">‼ Extremamente importantes</div>${XIL.map((i,n)=>`<div class="hj${i.d&&i.d<td?" late":""}" data-a="xii" data-i="${n}"><span class="g1">${esc(i.t)}</span><small>${i.d?rel(i.d)+" · "+fmt(i.d):"sem data"}</small></div>`).join("")}</div>`:""}
// [v2.1] números de produção (peças, habitus, espécies prontas e atividades) · [v2.4] sem as etapas "não será realizada"; marcadores
// [v2.5] % de células codificadas de cada matriz (até 4; tocar abre a matriz)
function prodH(){
 const c={d:0,l:0,i:0,f:0},N={d:0,l:0,i:0,f:0},PL=["Peças dissecadas","Em lâmina","Ilustradas","Fotografadas"];let hb=0,hn=0,sp=0,sok=0,ma=0,mt=0;
 S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{if(s.parts.length||s.hab.length||s.me.length){sp++;if(!prepPend(s))sok++}
  s.parts.forEach(p=>STEPS.forEach(x=>{const v=p[x[0]];if(!isNA(v)){N[x[0]]++;if(isD(v))c[x[0]]++}}));
  s.hab.forEach(h=>{if(!isNA(h.x)){hn++;if(isD(h.x))hb++}});
  s.mol.ms.forEach(m=>{if(!isNA(m.l)){mt++;if(isD(m.l))ma++}})})));
 const T=allT(),td=T.filter(x=>x.t.s===STAT[2]).length,tile=(v,t,l)=>`<div><b>${v}<small>/${t}</small></b><span>${l}</span></div>`;
 return`<div class="grp">Produção</div><div class="stats">${STEPS.map((x,i)=>tile(c[x[0]],N[x[0]],PL[i])).join("")}</div><div class="stats${mt?"":" s3"}">${tile(hb,hn,"Habitus fotografados")}${tile(sok,sp,"Espécies com preparação completa")}${mt?tile(ma,mt,"Marcadores alinhados"):""}${tile(td,T.length,"Atividades concluídas")}</div>`
 +(S.mx.length?`<div class="stats s${Math.min(4,S.mx.length)} mxst">${S.mx.slice(0,4).map(m=>`<div data-a="mxop" data-i="${m.id}"><b>${mxPct(m)}<small>%</small></b><span>Matriz ${esc(m.n)}</span></div>`).join("")}</div>`:"");
}

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v1.10] trocar a subaba do Painel
 ptab(el){V.pt=el.dataset.i;render()},
 // [v2.1] abrir um item do cartão Hoje
 hji(el){openIt(HJL[+el.dataset.i])},
 // [v2.4] abrir um item do cartão ‼ Extremamente importantes
 xii(el){const i=XIL[+el.dataset.i];if(!i)return;if(i.emp)return openEmp(i.emp.id);if(i.x)editTask(i.x.o||i.x.s||i.x.g,i.x.t);else eagO(i.e,i.oc||"")},
});
