// =====================================================================
// Diário de Pesquisa — especie.js: ESPÉCIE
// Formulário e tela da espécie em seções retráteis: material-tipo, distribuição,
// habitus, dissecção (peças D L I F), morfologia externa e dados moleculares.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== LISTAS FIXAS DA ESPÉCIE =====
// [v2.4] MATERIAL-TIPO (Código Internacional de Nomenclatura Zoológica): tipo primário e, quando existe, a série secundária
const TYP=["Holótipo","Lectótipo","Neótipo","Síntipos"];
const TYS={"Holótipo":"Parátipos","Lectótipo":"Paralectótipos"};   // neótipo e síntipos não têm tipos secundários
const TYST=[["img","Img","Imagem disponível"],["ex","Ex","Examinado"],["f","F","Fotografado"],["d","D","Dissecado"]];
const SEXO=["Não informado","♂","♀","♂ e ♀"];
// [v2.4] DADOS MOLECULARES: amostra e extração (uma vez por espécie) e, para cada marcador, amplificação, sequenciamento e alinhamento
const MOLA=[["a","Tecido (amostra)"],["e","Extração de DNA"]];
const MOLST=[["p","P","Amplificação"],["s","S","Sequenciamento"],["l","L","Alinhamento"]];
const LAB="Sequenciado por mim (laboratório)",GBK="Baixado do GenBank",OUTRO="Outro (digitar abaixo)";
// [v2.4] seções da espécie, na ordem em que aparecem (cada uma pode ser desligada nas Configurações)
const SECS=[["ty","Material-tipo"],["di","Distribuição geográfica"],["hb","Imagens de habitus"],["dp","Dissecção e preparação das peças"],["me","Morfologia externa"],["mo","Dados moleculares"],["ta","Atividades da espécie"],["nt","Diário de notas"]];

// ===== TELA DA ESPÉCIE (seções retráteis) =====
// [v1.8] chips da espécie: situação e prioridade · resumo da espécie fechada: material e dissecção [v1.2], prazo [v1.5]
const spSt=s=>`<span class="chip ${gc(s.st)}">${esc(s.st)}</span><span class="chip ${pc(s.p)}">Prioridade ${esc((s.p||"").toLowerCase())}</span>`;
const spChips=s=>`${spSt(s)}${s.ex?`<span class="chip">${esc(s.ex)}</span>`:""}<span class="chip blue">${esc(tpChip(s.tp))}</span>${s.d?`<span class="chip ${s.d<today()?"red":"blue"}">📅 ${fmt(s.d)}</span>`:""}`;
// [v1.2] espécie: material, dissecção completa/parcial, peças (D L I F), + Completa ♂/♀ e habitus
// [v1.5] prazo da preparação · [v1.6] passa a abrir como aba dentro do gênero · [v1.8] situação e prioridade · [v2.1] diário de notas
// [v2.3] tipo de estudo (dissecção ou só morfologia externa), peças em subitens e seção Morfologia externa
// [v2.3] tabela de peças (dissecção) ou de estruturas (morfologia externa), com grupos e subitens
// a = ação da caixinha, d = ação de remover, leg = legenda das colunas · [v2.4] caixinha de 3 estados (tcB)
function pTab(L,ST,a,d,leg){
 const cols=`grid-template-columns:1fr repeat(${ST.length},38px) 36px`;let last="";
 let h=`<div class="card"><div class="pg note" style="${cols}"><span></span>${ST.map(x=>`<span style="text-align:center">${x[1]}</span>`).join("")}<span></span></div>`;
 L.forEach((p,i)=>{const[g,sb]=pSplit(p.n);if(g&&g!==last)h+=`<div class="pg pgh">${esc(g)}</div>`;last=g;
  h+=`<div class="pg${g?" psub":""}" style="${cols}"><span>${esc(g?sb:p.n)}</span>${ST.map(x=>tcB(a,i,x[0],p[x[0]],x[2])).join("")}<button class="ic" data-a="${d}" data-i="${i}">✕</button></div>`});
 return h+`<div class="note" style="padding:6px 10px">${leg}</div></div>`;
}
// [v2.4] SEÇÃO RETRÁTIL da espécie: cabeçalho com resumo; aberta/fechada fica guardado na própria espécie (s.op)
function accH(s,k,title,sum,body){if(!S.cfg["s"+k])return"";const op=!!(s.op&&s.op[k]);
 return`<div class="acc${op?" open":""}"><button class="acc-h" data-a="sec" data-i="${s.id}|${k}"><b>${title}</b><small>${sum}</small><span>${op?"▾":"▸"}</span></button>${op?`<div class="acc-b">${body()}</div>`:""}</div>`}
const sumDN=(L,ST)=>{const[d,n]=cntDN(L,ST);return n?d+"/"+n+" feitas":L.length?"nada a fazer":"vazio"};
const naLeg=()=>S.cfg.na?" · 2º toque: não será realizada":"";
// [v2.4] espécie: Material-tipo › Distribuição › Habitus › Dissecção › Morfologia externa › Molecular › Atividades › Notas
function vSp(s){
 const isME=s.tp===ME,sug=S.cfg.sug,hp=s.parts.map(p=>p.n),hh=s.hab.map(x=>x.n),hm=s.me.map(x=>x.n),hk=s.mol.ms.map(m=>m.m);
 const fp=S.tpl.parts.filter(n=>!hp.includes(n)),fh=S.tpl.hab.filter(n=>!hh.includes(n)),fm=S.tpl.me.filter(n=>!hm.includes(n)),fk=S.tpl.mk.filter(n=>!hk.includes(n));
 let h=`<div>${spSt(s)}${s.ex?`<span class="chip">Material: ${esc(s.ex)}</span>`:""}<span class="chip blue">${esc(tpChip(s.tp))}</span>${s.d?`<span class="chip ${s.d<today()?"red":"blue"}">📅 ${isME?"Prazo do estudo":"Prazo da preparação"}: ${fmt(s.d)}</span>`:""}</div>${s.nt?`<p class="note">${esc(s.nt)}</p>`:""}${prog(s)}<div class="tools" style="margin-top:10px"><button class="sec" data-a="editSp">Editar / excluir espécie</button></div>`;
 h+=accH(s,"ty","Material-tipo",tySum(s),()=>tyH(s));
 h+=accH(s,"di","Distribuição geográfica",esc(areas(s.dist).join("; "))||"não informada",()=>distH(s));
 h+=accH(s,"hb","Imagens de habitus",sumDN(s.hab,[["x"]]),()=>habH(s,fh,sug));
 if(!isME||s.parts.length)h+=accH(s,"dp","Dissecção e preparação das peças",sumDN(s.parts,STEPS),()=>dpH(s,fp,sug,isME));   // [v2.3] escondida na espécie só de morfologia externa
 if(isME||s.me.length)h+=accH(s,"me","Morfologia externa",sumDN(s.me,STEPS_ME),()=>meH(s,fm,sug,isME));
 h+=accH(s,"mo","Dados moleculares",molSum(s),()=>molH(s,fk,sug));
 h+=accH(s,"ta","Atividades da espécie",pl(s.tasks.filter(t=>t.s!==STAT[2]).length,"em aberto","em aberto"),()=>tasksH(s));
 h+=accH(s,"nt","Diário de notas",pl(s.nts.length,"nota","notas"),()=>notesH(s,1));
 return h;
}
// [v1.2] imagens de habitus · [v2.4] caixinha de 3 estados
function habH(s,fh,sug){return s.hab.map((x,i)=>`<div class="r hbr">${tcB("hb",i,"x",x.x,"Fotografada")}<span class="g1${isNA(x.x)?" mut":""}">${esc(x.n)}</span><button class="ic" data-a="dh" data-i="${i}">✕</button></div>`).join("")
 +(sug&&fh.length?`<div>${fh.map(n=>chip("ah",n)).join("")}</div>`:"")+`<input class="addsub" style="margin:6px 0;width:100%" data-hab="1" placeholder="+ outra posição de habitus (Enter)">`+(s.hab.length?`<div class="note" style="padding:4px 2px">Toque na caixinha quando fotografar${naLeg()}</div>`:"")}
// [v1.2] dissecção: peças (D L I F), + Completa ♂/♀ · [v2.3] subitens · [v2.4] dentro da seção retrátil
function dpH(s,fp,sug,isME){let h="";
 if(s.tp==="Parcial")h+=`<div class="note">Dissecção parcial: adicione só as peças que vai retirar.</div>`;
 if(s.parts.length)h+=pTab(s.parts,STEPS,"pt","dp","D dissecada · L lâmina montada · I ilustrada · F fotografada"+naLeg());
 if(!isME){h+=`<div class="tools" style="margin-top:8px;flex-wrap:wrap"><button class="sec" data-a="apall" data-i="M">+ Completa ♂</button><button class="sec" data-a="apall" data-i="F">+ Completa ♀</button></div>`;
  if(sug&&fp.length)h+=`<div>${fp.map(n=>chip("ap",n)).join("")}</div>`;
  h+=`<input class="addsub" style="margin:6px 0;width:100%" data-pa="1" placeholder="+ outra peça (Enter) · subitem: Grupo > peça">`}
 return h}
// [v2.3] morfologia externa (E I F) · [v2.4] dentro da seção retrátil
function meH(s,fm,sug,isME){let h="";
 if(isME&&!s.me.length)h+=`<div class="note">Estudo sem dissecção: adicione as estruturas externas que vai examinar, ilustrar e fotografar.</div>`;
 if(s.me.length)h+=pTab(s.me,STEPS_ME,"mt","dm","E examinada · I ilustrada · F fotografada"+naLeg());
 if(fm.length)h+=`<div class="tools" style="margin-top:8px"><button class="sec" data-a="amall">+ Todas as estruturas</button></div>`+(sug?`<div>${fm.map(n=>chip("am",n)).join("")}</div>`:"");
 return h+`<input class="addsub" style="margin:6px 0;width:100%" data-me="1" placeholder="+ outra estrutura (Enter)">`}

// ===== MATERIAL-TIPO =====
// [v2.4] MATERIAL-TIPO: nome de cada linha conforme o tipo primário (Holótipo/Parátipos, Lectótipo/Paralectótipos...)
const tyK=(s,r)=>r.r==="s"?(TYS[s.ty.pr]||"Outros exemplares da série"):(s.ty.pr||"Tipo");
function tySum(s){const t=s.ty;if(!t.pr)return t.lt?"localidade-tipo: "+esc(t.lt):"não informado";const P=t.L.filter(r=>r.r==="p"),Q=t.L.filter(r=>r.r==="s");
 return esc(t.pr+(P.some(r=>r.dep)?" ("+P.map(r=>r.dep).filter(Boolean).join(", ")+")":"")+(Q.length?" + "+tyK(s,Q[0]).toLowerCase():""))}
const tyDesc=r=>[r.n&&r.n!=="1"?r.n+" ex.":"",r.sx&&r.sx!==SEXO[0]?r.sx:"",r.dep].filter(Boolean).join(" · ");
function tyH(s){const t=s.ty,sec=TYS[t.pr],cols=`grid-template-columns:1fr repeat(${TYST.length},38px) 36px`;
 let h=`<label class="kl">Tipo primário<select data-c="typr" data-s="${s.id}"><option value=""${t.pr?"":" selected"}>Não informado / não localizado</option>${TYP.map(x=>`<option${x===t.pr?" selected":""}>${x}</option>`).join("")}</select></label>`;
 if(t.pr){
  h+=`<div class="card"><div class="pg note" style="${cols}"><span></span>${TYST.map(x=>`<span style="text-align:center">${x[1]}</span>`).join("")}<span></span></div>`
  +t.L.map((r,i)=>`<div class="pg" style="${cols}"><button class="tyl" data-a="tye" data-i="${i}"><b>${esc(tyK(s,r))}</b><small>${esc(tyDesc(r))||"toque para informar quantidade, sexo e depositário"}</small></button>${TYST.map(x=>tcB("tyc",i,x[0],r[x[0]],x[2])).join("")}<button class="ic" data-a="tyd" data-i="${i}">✕</button></div>`).join("")
  +`<div class="note" style="padding:6px 10px">Img imagem disponível · Ex examinado · F fotografado · D dissecado${naLeg()}</div></div>`;
  h+=`<div class="tools" style="flex-wrap:wrap">${t.pr==="Síntipos"?`<button class="sec" data-a="tya" data-i="p">+ Síntipos (outro depositário)</button>`:""}${sec?`<button class="sec" data-a="tya" data-i="s">+ ${sec}</button>`:""}</div>`;
  if(!sec)h+=`<p class="note">${t.pr==="Neótipo"?"O neótipo não tem tipos secundários.":"Síntipos são todos tipos primários. Se um lectótipo for designado, mude para Lectótipo: os demais passam a paralectótipos."}</p>`;
 }
 return h+`<div class="tyx" data-a="tyi"><div><small>Localidade-tipo</small><span>${esc(t.lt)||"—"}</span></div><div><small>Observações</small><span>${esc(t.nt)||"—"}</span></div><b>✎</b></div>`}
// [v2.4] muda o tipo primário: garante a linha do primário e ajusta as outras (sem apagar nada)
function setPr(s,v){const t=s.ty;t.pr=v;if(v){
 if(!t.L.some(r=>r.r==="p"))t.L.unshift({id:uid(),r:"p",n:v==="Síntipos"?"":"1",sx:SEXO[0],dep:""});
 if(v==="Síntipos")t.L.forEach(r=>r.r="p");                       // síntipos: todos são primários
 else t.L.filter(r=>r.r==="p").slice(1).forEach(r=>r.r="s")}      // só um holótipo, lectótipo ou neótipo
 save();render()}
function tyForm(s,r,nv){   // nv = linha nova: só entra na lista ao salvar
 form(tyK(s,r),[{k:"n",l:"Quantidade de exemplares"},{k:"sx",l:"Sexo",t:"sel",o:SEXO},{k:"dep",l:"Depositário (sigla da coleção, ex.: MZSP, NHMUK, MNHN)"},{k:"nt",l:"Observação (ex.: designado por..., etiquetas, condição)",t:"area"}],{n:r.n,sx:r.sx||SEXO[0],dep:r.dep,nt:r.nt},v=>{Object.assign(r,{n:v.n,sx:v.sx,dep:v.dep,nt:v.nt});if(nv)s.ty.L.push(r);done()},nv?null:()=>rm("Linha do material-tipo removida",()=>{s.ty.L=s.ty.L.filter(y=>y!==r)}))}

// ===== DISTRIBUIÇÃO GEOGRÁFICA =====
// [v2.4] DISTRIBUIÇÃO GEOGRÁFICA da espécie; a do gênero junta a manual e (se marcado) a das espécies
const gDist=g=>uniqA(areas(g.dist).concat(g.dsp?[].concat(...g.spp.map(s=>areas(s.dist))):[]));
const distChips=L=>L.map(a=>`<span class="chip dist">${esc(a)}</span>`).join("");
function distH(s){const L=areas(s.dist);return(L.length?`<div>${distChips(L)}</div>`:`<p class="note">Ainda não informada.</p>`)+`<div class="tools"><button class="sec" data-a="edi">${L.length?"Editar distribuição":"+ Informar distribuição"}</button></div>`}

// ===== DADOS MOLECULARES =====
// [v2.4] DADOS MOLECULARES: amostra/extração, voucher e marcadores (os baixados do GenBank só têm alinhamento)
function molSum(s){const m=s.mol;if(!m.ms.length)return isD(m.e)?"DNA extraído":isD(m.a)?"amostra separada":"nenhum marcador";
 return esc(m.ms.map(x=>x.m+(isD(x.l)?" ✓":"")).join(", "))}
function molH(s,fk,sug){const m=s.mol,cols=`grid-template-columns:1fr repeat(3,38px) 36px`;
 let h=`<div class="card molc">${MOLA.map(([k,l])=>`<div class="r molr">${tcB("moa",0,k,m[k],l)}<span class="g1">${l}</span><small>${isDate(m[k])?fmt(m[k]):""}</small></div>`).join("")}<div class="r molr" data-a="mov"><span class="g1"><small>Voucher / código do extrato</small><br>${esc(m.v)||"—"}</span><b class="note">✎</b></div></div>`;
 if(m.ms.length)h+=`<div class="card"><div class="pg note" style="${cols}"><span>Marcador</span>${MOLST.map(x=>`<span style="text-align:center">${x[1]}</span>`).join("")}<span></span></div>`
  +m.ms.map((x,i)=>`<div class="pg" style="${cols}"><button class="tyl" data-a="mke" data-i="${i}"><b>${esc(x.m)}</b><small>${x.g?"GenBank"+(x.acc?" "+esc(x.acc):""):x.acc?"depositado: "+esc(x.acc):"laboratório"}</small></button>${x.g?'<span class="tc gb">GB</span><span class="tc gb">GB</span>':MOLST.slice(0,2).map(y=>tcB("mkc",i,y[0],x[y[0]],y[2])).join("")}${tcB("mkc",i,"l",x.l,"Alinhamento")}<button class="ic" data-a="mkd" data-i="${i}">✕</button></div>`).join("")
  +`<div class="note" style="padding:6px 10px">P amplificação (PCR; em genoma: biblioteca) · S sequenciamento · L alinhamento · GB baixado do GenBank${naLeg()}</div></div>`;
 if(sug&&fk.length)h+=`<div>${fk.map(n=>chip("mka",n)).join("")}</div>`;
 return h+`<div class="tools"><button class="sec" data-a="mkf">+ Marcador (outro ou do GenBank)</button></div>`}
const mkForm=()=>[{k:"m",l:"Marcador",t:"sel",o:S.tpl.mk.concat([OUTRO])},{k:"mo",l:"Outro marcador (se escolheu “Outro”)"},{k:"src",l:"Origem",t:"sel",o:[LAB,GBK]},{k:"acc",l:"Nº de acesso no GenBank (opcional)"}];

// ===== PRAZO DA PREPARAÇÃO E FORMULÁRIO DA ESPÉCIE =====
// [v1.5] a preparação da espécie ainda tem peça ou habitus pendente?
const prepPend=s=>!(s.parts.length+s.hab.length+(s.me||[]).length)||s.parts.some(p=>STEPS.some(x=>!p[x[0]]))||(s.me||[]).some(p=>STEPS_ME.some(x=>!p[x[0]]))||s.hab.some(h=>!h.x);   // [v2.3] inclui morfologia externa
// [v2.3] nome do prazo da espécie conforme o tipo de estudo
const prepName=s=>s.tp===ME?"Estudo da morfologia externa":"Dissecção e preparação das peças";
// [v1.2] campos da espécie (nome, material, dissecção, notas) · [v1.5] prazo · [v1.8] situação e prioridade · [v2.1] autor, ano e combinação
// [v2.3] caixinha "espécie sem nome" e "Tipo de estudo" (dissecção completa/parcial ou só morfologia externa)
const sForm=[{k:"n",l:"Nome da espécie (só o epíteto, ex.: punctatus; sem nome: sp. 1, sp. nov. A)"},{k:"un",l:"Espécie ainda sem nome (sp., sp. nov., morfoespécie): o nome não fica em itálico",t:"chk"},{k:"au",l:"Autor (opcional)"},{k:"an",l:"Ano (opcional)"},{k:"cb",l:"Combinação",t:"sel",o:CBO},{k:"ex",l:"Material disponível (ex.: 3 ♂, 2 ♀)"},{k:"tp",l:"Tipo de estudo",t:"sel",o:TPO.map(x=>x[1])},{k:"d",l:"Prazo da preparação ou do estudo",t:"date"},{k:"st",l:"Situação",t:"sel",o:GST},{k:"p",l:"Prioridade",t:"sel",o:PRIO},{k:"nt",l:"Notas",t:"area"}];

// [v2.4] tipo primário do material-tipo (lista de escolha)
document.addEventListener("change",e=>{const el=e.target,c=el.dataset&&el.dataset.c;
 if(c==="typr"){const s=spc(V.f,V.g,el.dataset.s);if(s)setPr(s,el.value)}});
// [v1.2] Enter no campo "+ outra posição de habitus" · [v2.3] também estruturas e peças avulsas (subitem: Grupo > peça)
document.addEventListener("keydown",e=>{
 const el=e.target,v=el.value&&el.value.trim();if(e.key!=="Enter"||!v)return;
 if(el.dataset.hab)own().hab.push({n:v,x:0});else if(el.dataset.me)pAdd(own().me,pNorm(v));else if(el.dataset.pa)pAdd(own().parts,pNorm(v));else return;
 save();render();const n=document.querySelector(el.dataset.hab?"[data-hab]":el.dataset.me?"[data-me]":"[data-pa]");if(n)n.focus();
});

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v1.6] abrir/fechar a aba de uma espécie (abrir uma fecha as outras)
 backg(){V.s=null;render()},
 os(el){const g=gen(V.f,V.g),s=g.spp.find(x=>x.id===el.dataset.i);if(s.o)s.o=0;else{g.spp.forEach(x=>x.o=0);s.o=1}saveUI();render()},
 // [v1.2] criar e editar espécie · [v1.8] situação e prioridade · [v2.1] autor, ano, combinação e confirmação ao excluir
 // [v2.3] espécie sem nome (un), tipo de estudo vindo do gênero e estruturas de morfologia externa (me)
 addSp(){const g=gen(V.f,V.g);form("Nova espécie",sForm,{tp:tpL(g.est||TPO[0][0]),st:GST[0],p:PRIO[1],cb:CBO[0]},v=>{if(!v.n)return;g.spp.push({id:uid(),n:v.n,un:v.un||SPUN.test(v.n)?1:0,au:v.au,an:v.an,cn:v.cb===CBO[1]?1:0,ex:v.ex,tp:tpV(v.tp),d:v.d,st:v.st,p:v.p,nt:v.nt,parts:[],hab:[],me:[],tasks:[],nts:[]});done()})},
 editSp(){const g=gen(V.f,V.g),s=own();form("Editar espécie",sForm,{n:s.n,un:s.un?"1":"",au:s.au,an:s.an,cb:s.cn?CBO[1]:CBO[0],ex:s.ex,tp:tpL(s.tp),d:s.d,st:s.st,p:s.p,nt:s.nt},v=>{if(!v.n)return;Object.assign(s,{n:v.n,un:v.un||SPUN.test(v.n)?1:0,au:v.au,an:v.an,cn:v.cb===CBO[1]?1:0,ex:v.ex,tp:tpV(v.tp),d:v.d,st:v.st,p:v.p,nt:v.nt});done()},()=>conf("Excluir a espécie "+s.n+" e todo o seu progresso?","Excluir",()=>rm("Espécie excluída",()=>{g.spp=g.spp.filter(x=>x!==s);V.s=null})))},
 // [v1.2] peças (marcar etapa, remover, adicionar, dissecção completa ♂/♀) e habitus
 pt(el){const[i,k]=el.dataset.i.split("|"),p=own().parts[+i];p[k]=nxt(p[k]);save();render()},   // [v2.1] guarda a data em vez de 1 · [v2.4] 3 estados
 dp(el){const o=own(),i=+el.dataset.i;rm("Peça removida",()=>{o.parts.splice(i,1)})},
 ap(el){pAdd(own().parts,el.dataset.i);save();render()},   // [v2.3] entra junto do seu grupo
 apall(el){const s=own(),x=el.dataset.i==="M"?"♀":"♂";S.tpl.parts.forEach(n=>{if(!n.includes(x)&&!s.parts.some(p=>p.n===n))pAdd(s.parts,n)});save();render()},
 // [v2.3] morfologia externa: marcar etapa, remover, adicionar uma ou todas as estruturas
 mt(el){const[i,k]=el.dataset.i.split("|"),p=own().me[+i];p[k]=nxt(p[k]);save();render()},
 dm(el){const o=own(),i=+el.dataset.i;rm("Estrutura removida",()=>{o.me.splice(i,1)})},
 am(el){pAdd(own().me,el.dataset.i);save();render()},
 amall(){const s=own();S.tpl.me.forEach(n=>{if(!s.me.some(p=>p.n===n))pAdd(s.me,n)});save();render()},
 hb(el){const h=own().hab[+el.dataset.i.split("|")[0]];h.x=nxt(h.x);save();render()},
 dh(el){const o=own(),i=+el.dataset.i;rm("Posição de habitus removida",()=>{o.hab.splice(i,1)})},
 ah(el){own().hab.push({n:el.dataset.i,x:0});save();render()},
 // [v2.4] seções retráteis da espécie
 sec(el){const[id,k]=el.dataset.i.split("|"),s=spc(V.f,V.g,id);if(!s)return;s.op=s.op||{};s.op[k]=s.op[k]?0:1;saveUI();render()},
 // [v2.4] material-tipo: editar linha, nova linha, etapa (3 estados), excluir, localidade-tipo e observações
 tye(el){const s=own(),r=s.ty.L[+el.dataset.i];if(r)tyForm(s,r)},
 tya(el){tyForm(own(),{id:uid(),r:el.dataset.i,n:"",sx:SEXO[0],dep:""},1)},
 tyc(el){const[i,k]=el.dataset.i.split("|"),r=own().ty.L[+i];r[k]=nxt(r[k]);save();render()},
 tyd(el){const s=own(),i=+el.dataset.i;rm("Linha do material-tipo removida",()=>{s.ty.L.splice(i,1)})},
 tyi(){const s=own();form("Material-tipo",[{k:"lt",l:"Localidade-tipo",t:"area"},{k:"nt",l:"Observações (designação, condição do exemplar, etiquetas...)",t:"area"}],{lt:s.ty.lt,nt:s.ty.nt},v=>{s.ty.lt=v.lt;s.ty.nt=v.nt;done()})},
 // [v2.4] distribuição da espécie
 edi(){const s=own();form("Distribuição geográfica",[{k:"dist",l:"Áreas, separadas por ponto e vírgula ou uma por linha (ex.: Brasil: SP, RJ; Argentina: Misiones)",t:"area"}],{dist:s.dist},v=>{s.dist=v.dist;done()})},
 // [v2.4] dados moleculares: amostra/extração, voucher e marcadores
 moa(el){const k=el.dataset.i.split("|")[1],m=own().mol;m[k]=nxt(m[k]);save();render()},
 mov(){const s=own();form("Voucher / código do extrato",[{k:"v",l:"Código (ex.: voucher DNA-0123, nº da extração)"}],{v:s.mol.v},v=>{s.mol.v=v.v;done()})},
 mkc(el){const[i,k]=el.dataset.i.split("|"),m=own().mol.ms[+i];m[k]=nxt(m[k]);save();render()},
 mka(el){own().mol.ms.push({id:uid(),m:el.dataset.i,g:0,acc:""});save();render()},
 mkf(){const s=own();form("Novo marcador",mkForm(),{m:S.tpl.mk[0],src:LAB},v=>{const m=v.m===OUTRO?v.mo:v.m;if(!m)return toast("Informe o marcador");s.mol.ms.push({id:uid(),m,g:v.src===GBK?1:0,acc:v.acc});done()})},
 mke(el){const s=own(),x=s.mol.ms[+el.dataset.i];if(!x)return;const inL=S.tpl.mk.includes(x.m);form("Editar marcador",mkForm(),{m:inL?x.m:OUTRO,mo:inL?"":x.m,src:x.g?GBK:LAB,acc:x.acc},v=>{const m=v.m===OUTRO?v.mo:v.m;if(!m)return toast("Informe o marcador");Object.assign(x,{m,g:v.src===GBK?1:0,acc:v.acc});if(x.g){x.p=0;x.s=0}done()},()=>rm("Marcador removido",()=>{s.mol.ms=s.mol.ms.filter(y=>y!==x)}))},
 mkd(el){const s=own(),i=+el.dataset.i;rm("Marcador removido",()=>{s.mol.ms.splice(i,1)})},
});
