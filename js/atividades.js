// =====================================================================
// Diário de Pesquisa — atividades.js: ATIVIDADES E DIÁRIO DE NOTAS
// Atividades (subitens, situação, prazo, prioridade, ‼) e notas datadas, iguais
// em todos os níveis: atividades gerais, família, subgrupo, gênero e espécie.
// Também a lista de todas as atividades, usada no Painel, na Agenda e no Relatório.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== ATIVIDADES =====
// [v1.0] campos da atividade · [v1.2] categorias conforme o nível · [v1.3] seções/subitens · [v1.5] prioridade e prazo · [v2.1] data de conclusão · [v2.4] ‼ e antecedência
const tForm=(c,nw,o)=>[{k:"t",l:"Atividade"},{k:"c",l:"Categoria",t:"sel",o:!c||catsFor(o).includes(c)?catsFor(o):[c,...catsFor(o)]},{k:"s",l:"Situação",t:"sel",o:STAT},{k:"p",l:"Prioridade",t:"sel",o:["Sem prioridade",...PRIO]},{k:"d",l:"Prazo",t:"date"},{k:"xi",l:"‼ Extremamente importante",t:"chk"},{k:"av",l:"Mostrar no Painel com antecedência de (dias)",t:"number"}].concat(nw?[]:[{k:"dc",l:"Data de conclusão (preenchida sozinha ao concluir)",t:"date"}],[{k:"nt",l:"Notas",t:"area"}]).concat(nw?[{k:"b",l:"Seções / subitens (separados por vírgula, opcional)"}]:[]);
// [v1.0] cartão da atividade com subatividades · [v1.3] "+ seção ou subitem" na escrita · [v1.5] chips de prioridade e prazo (vermelho se atrasado) · [v2.1] chip ✓ com a data de conclusão
function taskH(t){
 const k=STAT.indexOf(t.s),over=t.d&&t.d<today()&&k<2,sd=t.b.filter(x=>x.x).length;
 return`<div class="task s${k}${t.xi&&k<2?" xi":""}"><div class="r"><button class="st k${k}" data-a="cy" data-i="${t.id}" title="Alternar situação">${["○","◐","●"][k]}</button><div class="g1"><b>${esc(t.t)}</b><div>${t.xi?'<span class="chip xi">‼ Extremamente importante</span>':""}<span class="chip">${esc(t.c)}</span>${t.p?`<span class="chip ${pc(t.p)}">Prioridade ${esc(t.p.toLowerCase())}</span>`:""}<button class="chip ${t.d?(over?"red":"blue"):""}" data-a="dd" data-i="${t.id}">📅 ${t.d?fmt(t.d):"+ prazo"}</button>${k===2&&t.dc?`<span class="chip green">✓ ${fmt(t.dc)}</span>`:""}${t.b.length?`<span class="chip">${sd}/${t.b.length}</span>`:""}</div></div><button class="ic" data-a="et" data-i="${t.id}">✎</button></div>${t.nt?`<div class="note" style="margin:4px 0 0 46px">${esc(t.nt)}</div>`:""}<ul>${t.b.map(x=>`<li><label><input type="checkbox" data-a="sb" data-i="${t.id}|${x.id}"${x.x?" checked":""}><span class="${x.x?"dn":""}">${esc(x.t)}</span></label><span><button class="ic" data-a="es" data-i="${t.id}|${x.id}">✎</button><button class="ic" data-a="ds" data-i="${t.id}|${x.id}">✕</button></span></li>`).join("")}</ul><input class="addsub" data-sub="${t.id}" placeholder="${WR.includes(t.c)?"+ seção ou subitem (Enter)":"+ subatividade (Enter)"}"></div>`;
}
// [v1.0] todas as atividades (para Painel/Agenda): gêneros · [v1.2] espécies · [v1.3] gerais, família e subgrupos
const allT=()=>{const r=[];S.ge.tasks.forEach(t=>r.push({u:"*",o:S.ge,t}));S.f.forEach(f=>{f.tasks.forEach(t=>r.push({f,u:f.id,o:f,t}));f.grp.forEach(x=>x.tasks.forEach(t=>r.push({f,u:f.id+"|"+x.id,o:x,t})));f.g.forEach(g=>{g.tasks.forEach(t=>r.push({f,g,t}));g.spp.forEach(s=>s.tasks.forEach(t=>r.push({f,g,s,t})))})});return r};
// [v1.0] "onde está" cada atividade · [v1.3] gerais/família/subgrupo · [v1.8] itens da Agenda
const where=x=>x.ag?"Atividade da agenda":x.u?(x.u==="*"?"Atividades gerais":(x.o.r?esc(grl(x.o))+" · ":"")+esc(x.f.n)):(x.s?spH(x.g,x.s):gnH(x.g))+" · "+esc(x.f.n);   // [v2.3] nomes sem itálico quando não nomeados
// [v1.2] nível de quem tem a atividade (espécie, gênero) e categorias permitidas · [v1.3] nível família/geral
const lvOf=o=>o.parts?"s":o.spp?"g":"f";
const catsFor=o=>{const l=lvOf(o||own());return l==="f"?CATS:CATS.filter(c=>!(l==="s"?ONLY_G:ONLY_S).includes(c))};
function qadd(o){ // atividades do modelo que ainda não estão em o (1 clique)
 if(!S.cfg.sug)return"";   // [v2.4] sugestões desligadas nas Configurações
 const lv=lvOf(o),have=o.tasks.map(t=>t.t);
 const c=S.tpl.tk.filter(k=>k.lv.includes(lv)&&!have.includes(k.t));
 return c.length?`<div class="grp">Adicionar do modelo (1 clique)</div><div>${c.map(k=>chip("tq",S.tpl.tk.indexOf(k),k.t)).join("")}</div>`:"";
}
// [v1.0] atividades agrupadas por situação · [v1.2] + modelos de 1 clique
function tasksH(o){
 let h="";[1,0,2].forEach(k=>{const ts=o.tasks.filter(t=>t.s===STAT[k]);if(ts.length)h+=`<div class="grp">${STAT[k]} (${ts.length})</div>`+ts.map(taskH).join("")});
 return h+qadd(o)+`<div class="tools" style="margin-top:8px"><button class="sec" data-a="addTask">+ Atividade própria</button></div>`;
}
// [v1.3] seções/subitens digitados separados por vírgula
const sp=s=>s?s.split(",").map(x=>x.trim()).filter(Boolean):[];
// [v1.8] editar atividade tocada na Agenda (antes ficava só dentro de "et") · [v2.1] data de conclusão e Desfazer
function editTask(g,t){form("Editar atividade",tForm(t.c,0,g),{t:t.t,c:t.c,s:t.s,d:t.d,dc:t.dc,nt:t.nt,p:t.p||"Sem prioridade",xi:t.xi?"1":"",av:String(t.av||S.cfg.xi)},v=>{if(!v.t)return;Object.assign(t,{t:v.t,c:v.c,s:v.s,d:v.d,nt:v.nt,p:PRIO.includes(v.p)?v.p:"",xi:v.xi?1:0,av:Math.max(0,+v.av||0)||S.cfg.xi,dc:v.s===STAT[2]?(v.dc||t.dc||today()):""});done()},()=>rm("Atividade excluída",()=>{g.tasks=g.tasks.filter(x=>x!==t)}))}

// ===== DIÁRIO DE NOTAS =====
// [v2.1] diário de notas datadas (gênero, espécie, família, subgrupo e atividades gerais)
const ntForm=[{k:"d",l:"Data",t:"date"},{k:"tx",l:"Nota",t:"area"}];
function notesH(o,bare){   // [v2.4] bare = sem o título (quando já está dentro de uma seção)
 const L=(o.nts||[]).slice().sort((a,b)=>b.d.localeCompare(a.d));
 return(bare?`<div class="r" style="justify-content:flex-end"><button class="lnk" data-a="addNt">+ Nota</button></div>`:`<div class="r" style="justify-content:space-between"><div class="grp">Diário de notas (${L.length})</div><button class="lnk" data-a="addNt">+ Nota</button></div>`)
 +(L.map(n=>`<div class="nt" data-a="eNt" data-i="${n.id}"><small>${fmt(n.d)}</small><div>${esc(n.tx).replace(/\n/g,"<br>")}</div></div>`).join("")||'<div class="note" style="margin:0 2px 8px">Anotações com data: observações, decisões, dúvidas...</div>');
}
// [v1.0] Enter no campo "+ subatividade" adiciona e mantém o cursor no campo
document.addEventListener("keydown",e=>{const el=e.target;if(e.key==="Enter"&&el.dataset&&el.dataset.sub&&el.value.trim()){const t=own().tasks.find(x=>x.id===el.dataset.sub);t.b.push({id:uid(),t:el.value.trim(),x:0});save();render();const n=document.querySelector(`[data-sub="${t.id}"]`);if(n)n.focus()}});

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v1.5] prazo da atividade (chip 📅)
 dd(el){const t=own().tasks.find(x=>x.id===el.dataset.i);form("Prazo da atividade",[{k:"d",l:"Prazo",t:"date"}],{d:t.d},v=>{t.d=v.d;done()},t.d?()=>{t.d="";done()}:null,"Remover prazo")},
 // [v1.3] editar subitem/seção (nome e posição na lista)
 es(el){const[a,b]=el.dataset.i.split("|"),t=own().tasks.find(x=>x.id===a),i=t.b.findIndex(s=>s.id===b),x=t.b[i];form("Editar subitem",[{k:"t",l:"Nome"},{k:"p",l:"Posição na lista",t:"sel",o:t.b.map((_,j)=>String(j+1))}],{t:x.t,p:String(i+1)},v=>{if(!v.t)return;x.t=v.t;t.b.splice(i,1);t.b.splice(Math.max(0,Math.min(+v.p-1,t.b.length)),0,x);done()},()=>rm("Subitem excluído",()=>{t.b.splice(i,1)}))},
 // [v1.2] atividade do modelo em 1 clique
 tq(el){const k=S.tpl.tk[+el.dataset.i];own().tasks.push(mk(k.t,k.c,STAT[0],"","",k.b));save();render()},
 // [v1.0] atividades: criar, editar, alternar situação (○ ◐ ●), marcar e excluir subatividade
 // [v1.3] seções/subitens já no formulário · [v1.5] prioridade e prazo · [v2.1] datas de conclusão (para o Relatório)
 addTask(){const g=own();form("Nova atividade",tForm(0,1),{c:catsFor()[0],s:STAT[0],av:String(S.cfg.xi)},v=>{if(!v.t)return;const t=mk(v.t,v.c,v.s,v.d,v.nt,sp(v.b),PRIO.includes(v.p)?v.p:"");t.xi=v.xi?1:0;t.av=Math.max(0,+v.av||0)||S.cfg.xi;if(t.s===STAT[2])t.dc=today();g.tasks.push(t);done()})},
 et(el){const g=own();editTask(g,g.tasks.find(x=>x.id===el.dataset.i))},
 cy(el){const t=own().tasks.find(x=>x.id===el.dataset.i);t.s=STAT[(STAT.indexOf(t.s)+1)%3];t.dc=t.s===STAT[2]?today():"";save();render()},
 sb(el){const[a,b]=el.dataset.i.split("|"),x=own().tasks.find(t=>t.id===a).b.find(s=>s.id===b);x.x=el.checked?today():0;save();render()},
 ds(el){const[a,b]=el.dataset.i.split("|"),t=own().tasks.find(t=>t.id===a);rm("Subitem excluído",()=>{t.b=t.b.filter(s=>s.id!==b)})},
 // [v2.1] diário de notas
 addNt(){const o=own();form("Nova nota",ntForm,{d:today()},v=>{if(!v.tx)return;o.nts.push({id:uid(),d:v.d||today(),tx:v.tx});done()})},
 eNt(el){const o=own(),n=o.nts.find(x=>x.id===el.dataset.i);form("Editar nota",ntForm,{d:n.d,tx:n.tx},v=>{if(!v.tx)return;n.d=v.d||n.d;n.tx=v.tx;done()},()=>rm("Nota excluída",()=>{o.nts=o.nts.filter(x=>x!==n)}))},
});
