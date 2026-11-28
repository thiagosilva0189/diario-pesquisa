// =====================================================================
// Diário de Pesquisa — progresso.js: RELATÓRIO DE PROGRESSO E LINHA DO TEMPO
// Relatório de progresso (tela Relatório › Progresso: números do período,
// situação atual, andamento por gênero, matrizes, etapas por mês, próximos
// prazos e observações; vira PDF pela impressão) e linha do tempo do
// doutorado (etapas em barras e marcos, com as contagens regressivas).
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== RELATÓRIO DE PROGRESSO =====
// [v2.6] período: este semestre, este ano, desde uma data ou tudo
const RGP=[["s","Semestre"],["y","Ano"],["d","Desde…"],["t","Tudo"]];
function rgPer(){const td=today(),y=td.slice(0,4),k=V.rg;
 if(k==="y")return[y+"-01-01",td];
 if(k==="d")return[isDate(S.rpt.a)?S.rpt.a:addD(td,-90),td];
 if(k==="t")return["0000-01-01",td];
 return[+td.slice(5,7)<=6?y+"-01-01":y+"-07-01",td]}
// números do período (etapas e atividades com data dentro dele) e etapas de bancada por mês (M)
function rgData(a,b){const inR=v=>isDate(v)&&v>=a&&v<=b,N={d:0,l:0,i:0,f:0,h:0,e:0,t:0,mk:0},M={};
 const cm=v=>{if(inR(v)){const k=v.slice(0,7);M[k]=(M[k]||0)+1}};
 allT().forEach(x=>{if(x.t.s===STAT[2]&&inR(x.t.dc))N.t++});
 S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{
  s.parts.forEach(p=>STEPS.forEach(x=>{const v=p[x[0]];if(inR(v))N[x[0]]++;cm(v)}));
  s.me.forEach(p=>STEPS_ME.forEach(x=>{const v=p[x[0]];if(inR(v))N[x[0]]++;cm(v)}));
  s.hab.forEach(h=>{if(inR(h.x))N.h++;cm(h.x)});
  s.mol.ms.forEach(m=>{if(inR(m.l))N.mk++})})));
 S.ag.forEach(e=>{if(e.s===STAT[2]&&inR(e.dc))N.t++;(e.dd||[]).forEach(d=>{if(inR(d))N.t++})});
 return{N,M}}
// situação atual: espécies prontas, atos (publicados), pranchas prontas, manuscritos submetidos e publicados
function rgNow(){let sp=0,sok=0;S.f.forEach(f=>f.g.forEach(g=>g.spp.forEach(s=>{if(s.parts.length||s.hab.length||s.me.length){sp++;if(!prepPend(s))sok++}})));
 const AT=atAll();return{sp,sok,at:AT.length,ap:AT.filter(x=>msPub(atMs(x))).length,pr:S.pr.length,prk:S.pr.filter(p=>prSt(p).cur<0).length,ms:S.ms.length,mss:S.ms.filter(m=>m.st>=1).length,msp:S.ms.filter(m=>m.st===4).length}}
// gêneros com algo a fazer: [gênero, feitos, total]
const rgGen=()=>{const R=[];S.f.forEach(f=>f.g.forEach(g=>{const[d,n]=units(g);if(n)R.push({f,g,d,n})}));return R};
// próximos prazos (até 6)
const rgNext=()=>agItems().filter(i=>!i.dn&&i.k!=="r"&&i.d>=today()&&!(i.k==="a"&&i.x.gk)).sort((x,y)=>x.d.localeCompare(y.d)).slice(0,6);
// meses do período (no máximo os últimos 12) com as etapas de bancada de cada um
function rgMonths(a,b,M){const L=[];let y=+b.slice(0,4),m=+b.slice(5,7);const lo=a.slice(0,7);
 for(let i=0;i<12;i++){const k=y+"-"+p2(m);if(k<lo&&L.length)break;L.unshift({k,n:M[k]||0});if(--m<1){m=12;y--}}return L}
const MES=["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
function vProg(){const[a,b]=rgPer(),k=V.rg,{N,M}=rgData(a,b),Z=rgNow(),G=rgGen(),X=rgNext(),ML=rgMonths(k==="t"?addD(b,-334):a,b,M),mx=Math.max(1,...ML.map(x=>x.n));
 const kp=(v,l,c)=>`<div${c?` class="${c}"`:""}><b>${v}</b><span>${l}</span></div>`,fr=(d,n)=>d+"<small>/"+n+"</small>";
 let h=`<div class="seg noprint">${RGP.map(([i,l])=>`<button class="${k===i?"on":""}" data-a="rpp" data-i="${i}">${l}</button>`).join("")}</div>`;
 if(k==="d")h+=`<div class="rpd noprint"><label>Desde<input type="date" data-rg="a" value="${esc(a)}"></label></div>`;
 h+=`<div class="rgh"><h2 class="rph">Relatório de progresso</h2><small>${k==="t"?"Todo o período registrado":fmt(a)+" a "+fmt(b)} · gerado em ${fmt(today())}</small></div>`;
 h+=`<div class="stl">No período</div><div class="kp">${kp(N.d,"peças dissecadas")}${kp(N.l,"lâminas montadas")}${kp(N.i,"ilustrações")}${kp(N.f+N.h,"fotografias (peças, estruturas e habitus)")}${kp(N.t,"atividades concluídas")}${N.mk?kp(N.mk,"marcadores alinhados"):kp(N.e,"estruturas examinadas")}</div>`;
 h+=`<div class="stl">Situação atual</div><div class="kp">${kp(fr(Z.sok,Z.sp),"espécies com preparação completa")}${kp(Z.at,"atos nomenclaturais"+(Z.ap?" · "+Z.ap+" publicados":""),Z.ap?"ok":"")}${Z.pr?kp(fr(Z.prk,Z.pr),"pranchas prontas"):""}${Z.ms?kp(fr(Z.mss,Z.ms),"manuscritos submetidos"+(Z.msp?" · "+Z.msp+" publicados":"")):""}</div>`;
 if(G.length)h+=`<div class="stl">Andamento por gênero</div><div class="card pad">${G.map(x=>`<div class="gb2" data-a="og" data-i="${x.f.id}|${x.g.id}"><b>${gnH(x.g)}</b><div class="mb"><span style="width:${Math.round(x.d/x.n*100)}%"></span></div><small>${Math.round(x.d/x.n*100)}%</small></div>`).join("")}</div>`;
 if(S.mx.length)h+=`<div class="stl">Matrizes</div><div class="card pad">${S.mx.map(m=>`<div class="gb2 stk" data-a="mxop" data-i="${m.id}"><b>${esc(m.n)}</b><div class="mb"><span style="width:${mxPct(m)}%"></span></div><small>${mxPct(m)}%</small></div>`).join("")}</div>`;
 h+=`<div class="stl">Etapas de bancada por mês</div><div class="card pad"><div class="wk">${ML.map((x,i)=>`<div class="${i===ML.length-1?"cur":""}" title="${x.n}"><i style="height:${Math.round(x.n/mx*100)}%">${x.n?`<small>${x.n}</small>`:""}</i></div>`).join("")}</div><div class="wkm">${ML.map(x=>`<span>${MES[+x.k.slice(5,7)-1]}</span>`).join("")}</div></div>`;
 h+=`<div class="stl">Próximos prazos</div><div class="card pad">${X.map(i=>`<div class="hj" style="cursor:default"><i class="dot ${i.col}"></i><span class="g1">${esc(i.t)}</span><small>${fmt(i.d)}</small></div>`).join("")||'<p class="note" style="margin:0">Nenhum prazo marcado.</p>'}</div>`;
 h+=`<div class="r" style="justify-content:space-between"><div class="stl">Observações e próximos passos</div><button class="lnk noprint" data-a="rpn">✎ Editar</button></div><div class="card pad">${S.rpt.nt?esc(S.rpt.nt).replace(/\n/g,"<br>"):'<span class="note">Toque em Editar para escrever o que vem a seguir (vai junto no PDF).</span>'}</div>`;
 return h+`<div class="tools noprint" style="flex-wrap:wrap"><button class="pri" data-a="rpx">Gerar PDF</button><button class="sec" data-a="rpy">Copiar texto</button>${navigator.share?'<button class="sec" data-a="rpw">Compartilhar</button>':""}</div><p class="note noprint">Gerar PDF abre a impressão do aparelho: escolha “Salvar como PDF”.</p>`}
// [v2.6] versão em texto (copiar ou compartilhar)
function progTxt(){const[a,b]=rgPer(),{N}=rgData(a,b),Z=rgNow();
 const L=["Relatório de progresso — "+(V.rg==="t"?"todo o período":fmt(a)+" a "+fmt(b)),"","No período:","  • "+N.d+" peças dissecadas, "+N.l+" lâminas montadas, "+N.i+" ilustrações, "+(N.f+N.h)+" fotografias","  • "+N.t+" atividades concluídas"+(N.mk?", "+N.mk+" marcadores alinhados":""),"","Situação atual:","  • Espécies com preparação completa: "+Z.sok+" de "+Z.sp,"  • Atos nomenclaturais: "+Z.at+(Z.ap?" ("+Z.ap+" publicados)":"")];
 if(Z.pr)L.push("  • Pranchas prontas: "+Z.prk+" de "+Z.pr);if(Z.ms)L.push("  • Manuscritos submetidos: "+Z.mss+" de "+Z.ms+(Z.msp?" ("+Z.msp+" publicados)":""));
 const G=rgGen();if(G.length)L.push("","Andamento por gênero:",...G.map(x=>"  • "+x.g.n+": "+Math.round(x.d/x.n*100)+"%"));
 if(S.mx.length)L.push("","Matrizes:",...S.mx.map(m=>"  • "+m.n+": "+mxPct(m)+"%"));
 const X=rgNext();if(X.length)L.push("","Próximos prazos:",...X.map(i=>"  • "+fmt(i.d)+" — "+i.t));
 if(S.rpt.nt)L.push("","Observações e próximos passos:",S.rpt.nt);
 return L.join("\n")}

// ===== LINHA DO TEMPO DO DOUTORADO (menu ⋮) =====
// [v2.6] etapas (início e fim) e marcos (só uma data); as contagens regressivas entram como marcos
const TLQ=[["Disciplinas",0],["Revisão dos gêneros",0],["Filogenia",0],["Qualificação",1],["Redação da tese",0],["Defesa",1]];   // sugestões (1 = marco)
let TLL=[];   // atividades mostradas na etapa aberta (para tocar e abrir)
function tlRows(){const R=S.tl.filter(e=>isDate(e.a)).map(e=>({e,n:e.n,a:e.a,b:isDate(e.b)?e.b:e.a,m:!isDate(e.b),k:e.id}));
 if(S.cfg.tlcd)S.cd.forEach(c=>{if(isDate(c.d))R.push({c,n:c.n,a:c.d,b:c.d,m:1,k:"c"+c.id})});
 return R.sort((x,y)=>x.a.localeCompare(y.a)||x.m-y.m)}
const durTxt=n=>n<60?pl(n,"dia","dias"):pl(Math.round(n/30.44),"mês","meses");
// detalhe da etapa aberta: datas, quanto já passou e as atividades com prazo dentro dela
function tlDet(r){const td=today();let h=`<div class="tld">`;
 if(r.m)h+=`<small>${fmt(r.a)} · ${rel(r.a)}</small>`;
 else{const t=D8(r.b)-D8(r.a)+1,el=Math.min(t,Math.max(0,D8(td)-D8(r.a)+1));h+=`<small>${fmt(r.a)} a ${fmt(r.b)} · ${durTxt(t)} · ${Math.round(el/t*100)}% do tempo passou</small><div class="mb" style="margin:6px 0 2px"><span style="width:${Math.round(el/t*100)}%"></span></div>`}
 TLL=agItems(r.a,r.b).filter(i=>i.d>=r.a&&i.d<=r.b&&i.k!=="r"&&!(r.c&&i.k==="c"&&i.x===r.c)).sort((x,y)=>x.d.localeCompare(y.d)).slice(0,10);
 h+=TLL.length?`<div class="stl">Atividades com prazo nesta etapa</div>`+TLL.map((i,n)=>`<div class="hj" data-a="tli" data-i="${n}"><i class="dot ${i.dn?"ok":i.col}"></i><span class="g1">${esc(i.t)}</span><small>${fmt(i.d).slice(0,5)}</small></div>`).join(""):`<p class="note" style="margin:6px 0 0">Nenhuma atividade com prazo nesse período.</p>`;
 if(r.e&&r.e.nt)h+=`<p class="note">${esc(r.e.nt)}</p>`;
 return h+`<div class="tools"><button class="sec" data-a="${r.e?"tle":"ecd"}" data-i="${r.e?r.e.id:r.c.id}">${r.e?"Editar etapa":"Editar contagem"}</button></div></div>`}
function vTl(){const R=tlRows(),td=today(),have=new Set(S.tl.map(e=>nz(e.n)));
 const quick=TLQ.filter(([n])=>!have.has(nz(n))).map(([n,m])=>`<button class="chip" data-a="tlq" data-i="${m}">+ ${esc(n)}</button>`).join("");
 let h=`<p class="note">Etapas grandes do doutorado em barras e marcos (◆). Toque numa etapa para ver as atividades com prazo nela.</p>`;
 if(!R.length)h+=`<div class="empty">Nenhuma etapa ainda. Toque no + ou numa sugestão abaixo.</div>`;
 else{const ds=R.map(r=>r.a).concat(R.map(r=>r.b),[td]).sort(),y0=+ds[0].slice(0,4),y1=+ds[ds.length-1].slice(0,4),A0=D8(y0+"-01-01"),Z0=D8((y1+1)+"-01-01"),pc=d=>(D8(d)-A0)/(Z0-A0)*100,ny=y1-y0+1,now=pc(td);
  const grid=`background:repeating-linear-gradient(90deg,transparent 0 calc(100%/${ny} - 1px),var(--line) calc(100%/${ny} - 1px) calc(100%/${ny}))`,Y=[];for(let y=y0;y<=y1;y++)Y.push(y);
  h+=`<div class="card tl"><div class="tlh"><span class="tll"></span><div class="tly">${Y.map(y=>`<span>${y}</span>`).join("")}<b style="left:${now}%">hoje</b></div></div>`
  +R.map(r=>{const op=V.tlo===r.k,dn=r.b<td,cur=r.a<=td&&r.b>=td;
   const mk=r.m?`<b class="tmk${dn?" dn":""}" style="left:${pc(r.a)}%"></b>`:`<i class="${dn?"dn":cur?"cur":""}" style="left:${pc(r.a)}%;width:${Math.max(1.5,pc(addD(r.b,1))-pc(r.a))}%"></i>`;
   return`<div class="tlr${op?" op":""}" data-a="tlo" data-i="${r.k}"><span class="tll">${esc(r.n)}${r.c?' <small class="mut">⏳</small>':""}</span><div class="tlt" style="${grid}">${mk}<i class="now" style="left:${now}%"></i></div></div>`+(op?tlDet(r):"")}).join("")+`</div>`;
  h+=`<p class="note">Cinza = concluída · verde-escuro = em andamento · verde-claro = futura · ◆ marco · linha vermelha = hoje.</p>`}
 if(quick)h+=`<div class="stl">Sugestões</div><div>${quick}</div>`;
 return h+`<label class="sw" style="margin-top:12px"><span><b>Contagens regressivas como marcos</b><small>qualificação, defesa e outras datas da aba Contagem</small></span><input type="checkbox" data-a="tlc"${S.cfg.tlcd?" checked":""}><i></i></label>`}
function tlForm(e,nv,mk){form(nv?(mk?"Novo marco":"Nova etapa"):"Editar etapa",[{k:"n",l:"Nome"},{k:"a",l:mk?"Data":"Início (ou data do marco)",t:"date"},{k:"m",l:"É um marco (só uma data, sem fim)",t:"chk"},{k:"b",l:"Fim da etapa",t:"date"},{k:"nt",l:"Notas",t:"area"}],{n:e.n,a:e.a,b:e.b,m:(nv?mk:!e.b)?"1":"",nt:e.nt},v=>{
 if(!v.n||!v.a)return toast("Informe o nome e a data");if(!v.m&&(!v.b||v.b<v.a))return toast("Informe um fim depois do início (ou marque como marco)");
 Object.assign(e,{n:v.n,a:v.a,b:v.m?"":v.b,nt:v.nt});if(nv){S.tl.push(e);V.tlo=e.id}done()},nv?null:()=>rm("Etapa excluída",()=>{S.tl=S.tl.filter(x=>x!==e)}))}

// [v2.6] data "Desde" do relatório de progresso
document.addEventListener("change",e=>{const el=e.target;if(el.dataset&&el.dataset.rg&&isDate(el.value)){S.rpt.a=el.value;saveUI();render()}});

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.6] relatório: modo (concluídas no período ou progresso), período, observações, PDF, copiar e compartilhar
 rpm(el){V.rm=el.dataset.i;render()},
 rpp(el){V.rg=el.dataset.i;render()},
 rpn(){form("Observações e próximos passos",[{k:"nt",l:"Texto (vai no relatório e no PDF)",t:"area"}],{nt:S.rpt.nt},v=>{S.rpt.nt=v.nt;done()})},
 rpx(){window.print()},
 rpy(){copyText(progTxt(),"Relatório copiado")},
 rpw(){navigator.share({title:"Relatório de progresso",text:progTxt()}).catch(()=>{})},
 // [v2.6] linha do tempo: criar, sugestões, abrir/fechar etapa, editar, abrir atividade, contagens como marcos
 addTl(){tlForm({id:uid(),n:"",a:"",b:"",nt:""},1,0)},
 tlq(el){const q=TLQ.find(([n])=>el.textContent.includes(n));if(q)tlForm({id:uid(),n:q[0],a:"",b:"",nt:""},1,q[1])},
 tlo(el){V.tlo=V.tlo===el.dataset.i?null:el.dataset.i;render()},
 tle(el){const e=S.tl.find(x=>x.id===el.dataset.i);if(e)tlForm(e)},
 tli(el){openIt(TLL[+el.dataset.i])},
 tlc(el){S.cfg.tlcd=el.checked?1:0;save();render()},
});
