// =====================================================================
// Diário de Pesquisa — relatorio.js: RELATÓRIO DO PERÍODO
// O que foi concluído num período (para copiar ou compartilhar), correção das
// datas de conclusão e "Concluídas sem data". O modo "Relatório de progresso"
// (números do período e situação atual, para o orientador) fica em progresso.js.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ----- [v2.1] RELATÓRIO do período: o que foi concluído (datas guardadas a partir desta versão) -----
// [v2.4] cada item guarda onde está a sua data (ref), para corrigir tocando nele; inclui material-tipo e molecular;
//        e a seção "Concluídas sem data" (feitas antes de o diário guardar datas)
let REPI=[];   // [v2.4] refs dos itens mostrados (o número do item é a posição aqui)
const rf=(o,k,lab)=>({lab,v:o[k],set:d=>{o[k]=d}});
const MOLR=[["a","a","Tecido (amostra)","tecido separado"],["e","e","Extração de DNA","DNA extraído"]];   // [4] = texto no relatório
// [v2.5] checklist da espécie nova e do gênero novo (itens marcados à mão) e empréstimos (C.e)
// [v2.6] manuscritos (mudanças de situação, C.m) e etapas das pranchas
const nvRep=L=>L.filter(it=>!it.so).map(it=>[it.k,"",it.l,it.l.replace(/\s*\(.*\)$/,"").replace(/^./,c=>c.toLowerCase())]);   // "Registro no ZooBank (LSID)" → "registro no ZooBank"
function repData(a,b){
 const inR=v=>isDate(v)&&v>=a&&v<=b,G=[],C={t:0,b:0,p:0,h:0,n:0,e:0,m:0};
 const add=(key,lh,lt,d,th,tt,c,q,r)=>{let g=G.find(x=>x.key===key);if(!g)G.push(g={key,lh,lt,it:[]});g.it.push({d,th,tt,r:r||[]});C[c]+=q||1};
 const tk=(key,lh,lt,o)=>{
  o.tasks.forEach(t=>{if(inR(t.dc))add(key,lh,lt,t.dc,"Atividade concluída: <b>"+esc(t.t)+"</b>","Atividade concluída: "+t.t,"t",1,[rf(t,"dc","Atividade: "+t.t)]);
   t.b.forEach(x=>{if(inR(x.x))add(key,lh,lt,x.x,"Subitem concluído: "+esc(x.t)+' <span class="note">('+esc(t.t)+")</span>","Subitem concluído: "+x.t+" ("+t.t+")","b",1,[rf(x,"x","Subitem: "+x.t)])})});
  (o.nts||[]).forEach(n=>{if(inR(n.d))add(key,lh,lt,n.d,"Nota: "+esc(n.tx),"Nota: "+n.tx,"n",1,[rf(n,"d","Nota")])})};
 // etapas agrupadas por dia: "Peças: Antena (dissecada, lâmina montada); Labro (dissecada)"
 const st=(key,lh,lt,L,ST,nm,lab,c)=>{const P={};L.forEach(p=>ST.forEach(x=>{const v=p[x[0]];if(inR(v)){const z=P[v]=P[v]||{n:{},r:[]},w=x[3]||x[2].toLowerCase();(z.n[nm(p)]=z.n[nm(p)]||[]).push(w);z.r.push(rf(p,x[0],nm(p)+" — "+w))}}));
  Object.keys(P).forEach(d=>{const t=Object.keys(P[d].n).map(n=>n+" ("+P[d].n[n].join(", ")+")").join("; ");add(key,lh,lt,d,lab+": "+esc(t),lab+": "+t,c,P[d].r.length,P[d].r)})};
 tk("ge","Atividades gerais","Atividades gerais",S.ge);
 S.f.forEach(f=>{
  tk(f.id,esc(f.n),f.n,f);
  f.grp.forEach(x=>tk(x.id,esc(grl(x))+" · "+esc(f.n),grl(x)+" ("+f.n+")",x));
  f.g.forEach(g=>{const gh=gl(g)+" · "+esc(f.n),gt="Gênero "+g.n+(auth(g)?" "+auth(g):"")+" ("+f.n+")";
   tk(g.id,gh,gt,g);
   st(g.id,gh,gt,[g.nv],nvRep(NVG),()=>"checklist","Gênero novo","p");   // [v2.5]
   g.spp.forEach(s=>{const nm=fullSp(g,s),lh=spH(g,s,1)+" · "+esc(f.n),lt=nm+(auth(s)?" "+auth(s):"")+" ("+f.n+")",K=s.id;
    st(K,lh,lt,[s.nv],nvRep(NVS),()=>"checklist","Espécie nova","p");     // [v2.5]
    st(K,lh,lt,s.parts,STEPS,p=>p.n,"Peças","p");
    st(K,lh,lt,s.hab,[["x","x","fotografado"]],p=>p.n,"Habitus","h");
    st(K,lh,lt,s.me,STEPS_ME,p=>p.n,"Morfologia externa","p");   // [v2.3]
    st(K,lh,lt,s.ty.L,TYST,r=>tyK(s,r),"Material-tipo","p");      // [v2.4]
    st(K,lh,lt,[s.mol],MOLR,()=>"Amostra","Molecular","p");          // [v2.4]
    st(K,lh,lt,s.mol.ms,MOLST,m=>m.m,"Molecular","p");
    tk(K,lh,lt,s)})})});
 S.ag.forEach(e=>{if(inR(e.dc))add("ag","Agenda","Agenda",e.dc,"Concluída: <b>"+esc(e.t)+"</b>","Concluída: "+e.t,"t",1,[rf(e,"dc","Agenda: "+e.t)]);
  (e.dd||[]).forEach((d,j)=>{if(inR(d))add("ag","Agenda","Agenda",d,"Concluída (repetição): <b>"+esc(e.t)+"</b>","Concluída (repetição): "+e.t,"t",1,[{lab:"Agenda: "+e.t,v:d,set:nd=>{e.dd[j]=nd}}])})});   // [v2.4]
 // [v2.5] empréstimos: pedido, recebimento, prorrogações e devolução
 S.emp.forEach(e=>{const nm=empNome(e),it=(k,l)=>{if(inR(e[k]))add("emp","Empréstimos","Empréstimos",e[k],l+": <b>"+esc(nm)+"</b>",l+": "+nm,"e",1,[rf(e,k,l+": "+nm)])};
  it("dp","Empréstimo solicitado");it("dr","Empréstimo recebido");it("dv","Empréstimo devolvido");
  e.pr.forEach(p=>{if(inR(p.d))add("emp","Empréstimos","Empréstimos",p.d,"Prorrogação: <b>"+esc(nm)+"</b> (novo prazo "+fmt(p.nd)+")","Prorrogação: "+nm+" (novo prazo "+fmt(p.nd)+")","e",1,[rf(p,"d","Prorrogação: "+nm)])})});
 // [v2.6] manuscritos: submetido, revisão recebida, aceito e publicado · pranchas: imagens tratadas, montada e legenda revisada
 const MSR=["","Manuscrito submetido","Revisão recebida","Manuscrito aceito","Manuscrito publicado"];
 S.ms.forEach(m=>[1,2,3,4].forEach(i=>{const d=m["d"+i];if(inR(d))add("ms","Manuscritos","Manuscritos",d,MSR[i]+": <b>"+esc(m.t)+"</b>",MSR[i]+": "+m.t,"m",1,[rf(m,"d"+i,MSR[i]+": "+m.t)])}));
 S.pr.forEach(P=>PRS.forEach(([k,l])=>{if(inR(P[k]))add("pr","Pranchas","Pranchas",P[k],l+": <b>"+esc(P.n)+"</b>",l+": "+P.n,"p",1,[rf(P,k,l+": "+P.n)])}));
 G.forEach(g=>g.it.sort((x,y)=>x.d.localeCompare(y.d)));return{G,C};
}
// [v2.4] CONCLUÍDAS SEM DATA: atividades, subitens e etapas marcados como feitos sem data guardada
function undData(){const G=[],add=(lh,lab,r)=>{if(r.length)G.push({lh,lab,r})};
 const tkU=(lh,o)=>{const r=[];o.tasks.forEach(t=>{if(t.s===STAT[2]&&!isDate(t.dc))r.push(rf(t,"dc","Atividade: "+t.t));t.b.forEach(x=>{if(x.x&&!isDate(x.x))r.push(rf(x,"x","Subitem: "+x.t+" ("+t.t+")"))})});add(lh,"Atividades e subitens",r)};
 const stU=(lh,L,ST,nm,lab)=>{const r=[];L.forEach(p=>ST.forEach(x=>{const v=p[x[0]];if(isD(v)&&!isDate(v))r.push(rf(p,x[0],nm(p)+" — "+(x[3]||x[2].toLowerCase())))}));add(lh,lab,r)};
 tkU("Atividades gerais",S.ge);
 S.f.forEach(f=>{tkU(esc(f.n),f);f.grp.forEach(x=>tkU(esc(grl(x))+" · "+esc(f.n),x));
  f.g.forEach(g=>{tkU(gl(g)+" · "+esc(f.n),g);g.spp.forEach(s=>{const lh=spH(g,s,1)+" · "+esc(f.n);tkU(lh,s);
   stU(lh,s.parts,STEPS,p=>p.n,"Peças");stU(lh,s.hab,[["x","x","fotografado"]],p=>p.n,"Habitus");stU(lh,s.me,STEPS_ME,p=>p.n,"Morfologia externa");
   stU(lh,s.ty.L,TYST,r=>tyK(s,r),"Material-tipo");stU(lh,[s.mol],MOLR,()=>"Amostra","Molecular");stU(lh,s.mol.ms,MOLST,m=>m.m,"Molecular")})})});
 S.ag.forEach(e=>{if(e.s===STAT[2]&&!isDate(e.dc))add("Agenda","Atividade da agenda",[rf(e,"dc","Agenda: "+e.t)])});
 return G}
// [v2.4] janela para informar/corrigir datas de conclusão (uma ou várias de uma vez)
function datForm(R){const one=R.length===1,F=(one?[]:[{k:"all",l:"Usar a mesma data para todos (opcional)",t:"date"}]).concat(R.map((r,i)=>({k:"d"+i,l:r.lab,t:"date"}))),Vv={};R.forEach((r,i)=>Vv["d"+i]=isDate(r.v)?r.v:"");
 form(one?"Data de conclusão":"Datas de conclusão",F,Vv,v=>{let n=0;R.forEach((r,i)=>{const o=isDate(r.v)?r.v:"",d=v["d"+i]!==o?v["d"+i]:(v.all||"");if(isDate(d)&&d!==o){r.set(d);n++}});done();if(n)toast(pl(n,"data atualizada","datas atualizadas"))})}
// [v2.6] dois modos na mesma tela: o que foi concluído no período e o relatório de progresso (progresso.js)
const rmSeg=()=>`<div class="qtabs rpm noprint">${[["p","Concluídas no período"],["g","Progresso"]].map(([i,l])=>`<button class="${(V.rm==="g"?"g":"p")===i?"on":""}" data-a="rpm" data-i="${i}">${l}</button>`).join("")}</div>`;
function vRep(){if(V.rm==="g")return rmSeg()+vProg();
 const r=V.rp,{G,C}=repData(r.a,r.b),P=[["7","7 dias"],["m","Este mês"],["mp","Mês passado"],["x","Escolher"]];REPI=[];const ref=x=>(REPI.push(x),REPI.length-1);
 const ch=(n,a,b,c)=>n?`<span class="chip ${c}">${pl(n,a,b)}</span>`:"",U=undData();
 return rmSeg()+`<div class="seg">${P.map(([i,l])=>`<button class="${r.k===i?"on":""}" data-a="rpk" data-i="${i}">${l}</button>`).join("")}</div>`
 +(r.k==="x"?`<div class="rpd"><label>De<input type="date" data-rp="a" value="${r.a}"></label><label>Até<input type="date" data-rp="b" value="${r.b}"></label></div>`:"")
 +`<h2 class="rph">${fmt(r.a)} a ${fmt(r.b)}</h2><div>${ch(C.t,"atividade concluída","atividades concluídas","green")}${ch(C.b,"subitem","subitens","")}${ch(C.p,"etapa concluída","etapas concluídas","blue")}${ch(C.h,"habitus","habitus","purple")}${ch(C.n,"nota","notas","yellow")}${ch(C.e,"registro de empréstimo","registros de empréstimos","orange")}${ch(C.m,"registro de manuscrito","registros de manuscritos","blue")}</div>`
 +(G.map(g=>`<div class="card rpg"><b>${g.lh}</b>${g.it.map(i=>`<div class="rpi" data-a="rpe" data-i="${ref(i.r)}"><small>${fmt(i.d).slice(0,5)}</small><span>${i.th}</span></div>`).join("")}</div>`).join("")||'<div class="empty">Nada registrado neste período.</div>')
 +(G.length?`<p class="note">Toque num item para corrigir a data.</p><div class="tools"><button class="pri" data-a="rpc">Copiar relatório</button>${navigator.share?'<button class="sec" data-a="rps">Compartilhar</button>':""}</div>`:"")
 +(U.length?`<div class="grp">Concluídas sem data (${U.reduce((n,u)=>n+u.r.length,0)})</div><p class="note">Coisas marcadas como feitas antes de o diário guardar datas. Toque para informar quando foram feitas: passam a contar no relatório do período e aparecem no calendário.</p>`
  +U.map(u=>`<div class="card rpg und" data-a="rpe" data-i="${ref(u.r)}"><b>${u.lh}</b><div class="rpi"><small>${u.r.length}</small><span>${esc(u.lab)}: ${esc(u.r.slice(0,4).map(x=>x.lab.replace(/^(Atividade|Subitem|Agenda): /,"")).join("; "))}${u.r.length>4?"…":""}</span></div></div>`).join(""):"");
}
function repText(){const r=V.rp,{G}=repData(r.a,r.b);return"Relatório de atividades — "+fmt(r.a)+" a "+fmt(r.b)+"\n"+G.map(g=>"\n"+g.lt+"\n"+g.it.map(i=>"  • "+fmt(i.d).slice(0,5)+" — "+i.tt).join("\n")).join("\n")}

// [v2.1] datas "De" e "Até" do relatório
document.addEventListener("change",e=>{const el=e.target;
 if(el.dataset&&el.dataset.rp&&el.value){V.rp[el.dataset.rp]=el.value;render()}});

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.4] tocar num item para corrigir a data de conclusão
 rpe(el){const R=REPI[+el.dataset.i];if(R&&R.length)datForm(R)},
 // [v2.1] relatório
 rpk(el){const k=el.dataset.i,td=today(),r=V.rp;r.k=k;if(k==="7"){r.a=addD(td,-6);r.b=td}else if(k==="m"){r.a=td.slice(0,8)+"01";r.b=td}else if(k==="mp"){const z=addD(td.slice(0,8)+"01",-1);r.a=z.slice(0,8)+"01";r.b=z}render()},
 rpc(){copyText(repText(),"Relatório copiado")},
 rps(){navigator.share({title:"Relatório de atividades",text:repText()}).catch(()=>{})},
});
