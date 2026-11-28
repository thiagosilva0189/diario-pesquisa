// =====================================================================
// Diário de Pesquisa — menu.js: TELAS DO MENU ⋮
// Configurações, Sobre o app, Backup e restauração, Modelos e Organizar
// (arrastar e A–Z).
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== CONFIGURAÇÕES =====
// [v2.4] AVISOS pelo Google Agenda: minutos antes do início (00:00) do dia do prazo
const REM=[["","Não avisar"],["360","Na véspera, às 18h"],["900","Na véspera, às 9h"],["2340","2 dias antes, às 9h"],["9540","1 semana antes, às 9h"]];
// [v2.4] CONFIGURAÇÕES: liga e desliga partes do app (ficam nos dados, então valem também no outro aparelho)
// [v2.5] novas seções da espécie (vêm da lista SECS) e cartão Novidades taxonômicas
function vCfg(){const c=S.cfg,sw=(k,l,d,on,a)=>`<label class="sw"><span><b>${l}</b>${d?`<small>${d}</small>`:""}</span><input type="checkbox" data-a="${a||"cfg"}" data-i="${k}"${(on===undefined?c[k]:on)?" checked":""}><i></i></label>`;
 const sel=(k,l,O)=>`<label class="kl">${l}<select data-c="cfg" data-i="${k}">${O.map(([v,t])=>`<option value="${v}"${String(c[k])===v?" selected":""}>${t}</option>`).join("")}</select></label>`;
 return`<p class="note">Escolha o que aparece no app. As escolhas vão junto na sincronização, então valem também no outro aparelho.</p>`
 +`<div class="grp">Seções da espécie</div><div class="card kbox">${SECS.map(([k,l])=>sw("s"+k,l)).join("")}</div>`
 +`<div class="grp">Preparação e modelos</div><div class="card kbox">${sw("sug","Sugestões do modelo","botões de 1 clique para atividades, peças, estruturas, habitus e marcadores")}${sw("na","Etapa “não será realizada”","o 2º toque numa caixinha deixa a etapa opaca: ela sai da contagem")}</div>`
 +`<div class="grp">Famílias</div><div class="card kbox">${sel("grpv","Exibição dos subgrupos (cada família pode mudar no botão Ver tudo / Ver por subgrupo)",[["lista","Lista completa (tudo numa tela)"],["nav","Por subgrupos (cada um abre em nova tela)"]])}</div>`
 +`<div class="grp">Painel</div><div class="card kbox">${sw("hoje","Cartão Hoje")}${sw("fila","Fila de bancada","o que falta dissecar, montar, ilustrar e fotografar, com marcação rápida")}${sw("rit","Ritmo e previsão","etapas por semana e quando cada espécie fica pronta; também nos gêneros e espécies")}${sw("prod","Produção")}${sw("nvt","Novidades taxonômicas","nº de atos nomenclaturais por tipo (sp. nov., syn. nov....), com a lista de táxons")}<label class="kl">Antecedência padrão dos itens ‼ Extremamente importantes (dias)<input type="number" min="0" data-c="cfgn" data-i="xi" value="${esc(c.xi)}"></label></div>`
 +`<div class="grp">Calendário</div><div class="card kbox">${sw("esc","Escala de trabalho","letras M/N/F no canto de cada dia",S.sc.on,"cfgesc")}${sw("fer","Feriados")}${sw("reg","Etapas concluídas no calendário","peças, estruturas, habitus, molecular e tipos aparecem como ✓ no dia em que foram feitos")}</div>`
 +`<div class="grp">Notificações</div><div class="card kbox">${sel("rem","Avisar sobre prazos (pelo app Google Agenda)",REM)}<p class="note">Os avisos chegam pelo Google Agenda do celular. Para isso, conecte a conta (menu ⋮ › Google), deixe ligado “Enviar para o Google” e, no app Google Agenda, deixe visível a agenda “${CALN}”. Itens ‼ Extremamente importantes ganham também um aviso com a antecedência deles (às 9h; o Google aceita até 4 semanas antes).</p></div>`;
}

// ===== SOBRE O APP E BACKUP =====
// [v1.10] tela "Sobre o app" (texto atualizado na v2.1, na v2.2, na v2.4 e na v2.5)
function vAbout(){
 let nG=0,nS=0;S.f.forEach(f=>{nG+=f.g.length;f.g.forEach(g=>nS+=g.spp.length)});
 return`<h2>Diário de Pesquisa</h2><p class="note">Sistemática e taxonomia · versão ${VERSAO}</p><p>Aplicativo pessoal para organizar o doutorado: famílias, gêneros e espécies, atividades e subatividades, prazos, escala de trabalho, agenda e diário de notas.</p><div class="grp">Seus dados</div><p>${S.f.length} famílias · ${nG} gêneros · ${nS} espécies.<br>${SY.on?"Ficam salvos neste aparelho e numa cópia no seu Google Drive ("+esc(SY.email||"conta conectada")+"), sincronizada entre os aparelhos.":"Ficam salvos apenas neste aparelho. Para usar no celular e no computador, conecte sua conta em menu ⋮ › Google."} Faça backups de vez em quando (menu ⋮ › Backup e restauração).</p><div class="grp">Abas</div><p><b>Grupos</b>: famílias, subgrupos, gêneros e espécies (atos nomenclaturais, checklist da espécie nova e do gênero novo, material-tipo, material próprio e de empréstimo, distribuição, habitus, dissecção, morfologia externa, dados moleculares, atividades e notas).<br><b>Painel</b>: hoje, fila de bancada, ritmo e previsão, produção, novidades taxonômicas, em execução, prazos e gêneros potenciais.<br><b>Agenda</b>: calendário com prazos, escala e feriados.<br><b>Contagem</b>: contagens regressivas.</p><div class="grp">Menu ⋮</div><p><b>Fila de bancada</b>: tudo o que falta dissecar, montar em lâmina, ilustrar, fotografar e examinar, para marcar com um toque.<br><b>Pranchas</b>: figuras ligadas às peças das espécies, etapas da prancha, numeração e legenda automática.<br><b>Manuscritos</b>: da redação à publicação, com atos nomenclaturais e pranchas de cada um.<br><b>Matrizes</b>: morfológicas (caracteres codificados em cada terminal) e moleculares (marcadores de cada terminal, ligados aos dados moleculares das espécies).<br><b>Empréstimos</b>: material de outras coleções, prazos de devolução e prorrogações.<br><b>Linha do tempo</b>: etapas grandes do doutorado em barras e marcos.<br><b>Relatório</b>: o que foi concluído num período e o relatório de progresso (para o orientador ou em PDF).<br><b>Organizar</b>: arrastar famílias, gêneros e espécies ou pôr em ordem alfabética.<br><b>Google</b>: sincronização entre aparelhos (Google Drive) e ligação com o Google Agenda.<br><b>Modelos</b>: atividades, peças, estruturas e marcadores de 1 clique.<br><b>Configurações</b>: seções da espécie, sugestões, Painel, calendário e avisos.<br><b>Tema</b>: automático, claro ou escuro.</p><div class="grp">Uso offline</div><p>Depois da primeira abertura funciona sem internet e pode ser instalado na tela inicial. Com internet, atualiza sozinho para a versão mais nova.</p>`;
}
// [v1.1] tela de backup (copiar) e restauração (colar)
function vBackup(){return`<p class="note">Seus dados ficam salvos só neste aparelho, dentro do navegador. Copie o backup abaixo de vez em quando e guarde em lugar seguro (e-mail, Drive...).</p><textarea id="bkp" readonly style="min-height:160px">${esc(JSON.stringify(S,null,1))}</textarea><div class="tools" style="margin-top:8px"><button class="sec" data-a="copy">Copiar backup</button></div><div class="grp">Restaurar</div><textarea id="imp" placeholder="Cole aqui um backup (substitui tudo)"></textarea><div class="tools" style="margin-top:8px"><button class="dng" data-a="imp">Restaurar backup</button></div>`+outraH()}   // [v2.3] + versão guardada na sincronização

// ===== MODELOS (botões de 1 clique) =====
// [v1.2] tela Modelos: peças, posições de habitus e atividades padrão (incluir/excluir/restaurar)
function vTpl(){
 const sec=(k,t)=>`<div class="grp">${t}</div>`+S.tpl[k].map((n,i)=>`<div class="r" style="justify-content:space-between"><span>${esc(n)}</span><button class="ic" data-a="tdel" data-i="${k}|${i}">✕</button></div>`).join("")+`<input class="addsub" style="margin:6px 0;width:100%" data-tadd="${k}" placeholder="+ adicionar (Enter)">`;
 return `<p class="note">Modelos usados nos botões de 1 clique. Mudar aqui não altera o que já foi adicionado às espécies e gêneros. Para subitens, use › ou > (ex.: Terminália ♂ > T8).</p>`+sec("parts","Peças de dissecção (espécie)")+sec("me","Estruturas de morfologia externa (espécie)")+sec("hab","Posições de habitus (espécie)")+sec("mk","Marcadores moleculares (espécie)")+`<div class="grp">Atividades padrão</div>`+S.tpl.tk.map((k,i)=>`<div class="card gen" style="border-top:0" data-a="tke" data-i="${i}"><b>${esc(k.t)}</b><div><span class="chip">${esc(k.c)}</span><span class="chip blue">${LV[k.lv]}</span></div></div>`).join("")+`<div class="tools"><button class="sec" data-a="tka">+ Atividade padrão</button><button class="dng" data-a="treset">Restaurar padrão</button></div>`;
}
// [v1.2] campos da atividade padrão (modelo)
const kForm=[{k:"t",l:"Atividade"},{k:"c",l:"Categoria",t:"sel",o:CATS},{k:"lv",l:"Vale para",t:"sel",o:Object.values(LV)},{k:"b",l:"Subatividades (separadas por vírgula)"}];
const kSave=(k,v)=>{k.t=v.t;k.c=v.c;k.lv=Object.keys(LV).find(x=>LV[x]===v.lv);k.b=v.b?v.b.split(",").map(x=>x.trim()).filter(Boolean):[]};
// ----- [v2.1] ORGANIZAR: arrastar pela alça e ordem alfabética -----
const HD=`<span class="hd" data-a="nop" aria-label="Arrastar">${GRIP}</span>`;
function vOrg(){
 return`<p class="note">Arraste pela alça de pontinhos para mudar a posição. <b>A–Z</b> põe aquela lista em ordem alfabética. Toque no nome para ver o que tem dentro.</p><div class="r"><div class="grp">Famílias</div><button class="lnk" data-a="az" data-i="f">A–Z</button></div><div class="ol" data-k="f">`
 +S.f.map(f=>{const op=V.oF===f.id;return`<div class="oi" data-id="${f.id}"><div class="or" data-a="oF" data-i="${f.id}">${HD}${ordIco(f)}<b>${esc(f.n)}</b><small>${pl(f.g.length,"gênero","gêneros")}</small><span class="oc">${op?"▾":"▸"}</span></div>${op?orgF(f):""}</div>`}).join("")+`</div>`;
}
function orgF(f){ // gêneros da família, uma lista por agrupamento
 let h="";
 [null].concat(grAll(f)).forEach(x=>{const gs=f.g.filter(g=>x?g.gr===x.id:!grById(f,g.gr));if(!gs.length)return;
  h+=`<div class="osec"><div class="r"><small class="g1">${x?esc(grPath(f,x)):"Gêneros"}</small><button class="lnk" data-a="az" data-i="g|${f.id}|${x?x.id:""}">A–Z</button></div><div class="ol" data-k="g" data-p="${f.id}">`
  +gs.map(g=>{const op=V.oG===g.id;return`<div class="oi" data-id="${g.id}"><div class="or" data-a="oG" data-i="${g.id}">${HD}<b>${gnH(g)}</b><small>${g.spp.length} spp.</small><span class="oc">${op?"▾":"▸"}</span></div>${op?orgG(g):""}</div>`}).join("")+`</div></div>`});
 return`<div class="osub">${h||'<div class="note">Nenhum gênero.</div>'}</div>`;
}
function orgG(g){
 if(!g.spp.length)return'<div class="osub"><div class="note">Nenhuma espécie.</div></div>';
 return`<div class="osub"><div class="r"><small class="g1">Espécies</small><button class="lnk" data-a="az" data-i="s|${g.id}">A–Z</button></div><div class="ol" data-k="s" data-p="${g.id}">`+g.spp.map(s=>`<div class="oi" data-id="${s.id}"><div class="or">${HD}<b>${spH(g,s)}${authH(s)}</b></div></div>`).join("")+`</div></div>`;
}
// coloca os itens "ids" na nova ordem, ocupando as mesmas posições que eles tinham na lista arr
function reorderArr(arr,ids){const pos=[];arr.forEach((x,i)=>{if(ids.includes(x.id))pos.push(i)});const it=ids.map(id=>arr.find(x=>x.id===id));pos.forEach((p,j)=>arr[p]=it[j])}
const listArr=(k,p)=>k==="f"?S.f:k==="g"?(fam(p)||{}).g:k==="s"?(gById(p)||{}).spp:null;
// ----- [v2.1] arrastar para reordenar (tela Organizar) -----
let DR=null;   // item sendo arrastado
document.addEventListener("pointerdown",e=>{
 const h=e.target.closest(".hd");if(!h||DR)return;
 const it=h.closest(".oi"),ls=it.parentElement,r=it.getBoundingClientRect(),ph=document.createElement("div");
 e.preventDefault();ph.className="oph";ph.style.height=r.height+"px";ls.insertBefore(ph,it);   // "buraco" onde o item vai cair
 Object.assign(it.style,{position:"fixed",left:r.left+"px",top:r.top+"px",width:r.width+"px",zIndex:40});it.classList.add("drg");
 DR={it,ls,ph,dy:e.clientY-r.top,y:e.clientY,v:0,id:e.pointerId};
 try{h.setPointerCapture(e.pointerId)}catch(_){}
 DR.t=setInterval(()=>{if(DR&&DR.v){pane.scrollTop+=DR.v;dmove()}},16);   // rola a tela perto das bordas
});
function dmove(){const d=DR;d.it.style.top=(d.y-d.dy)+"px";
 let before=null;for(const s of d.ls.children){if(s===d.it||!s.classList.contains("oi"))continue;const r=s.getBoundingClientRect();if(d.y<r.top+r.height/2){before=s;break}}
 if(before)d.ls.insertBefore(d.ph,before);else d.ls.appendChild(d.ph);
 const a=pane.getBoundingClientRect();d.v=d.y<a.top+70?-9:d.y>a.bottom-70?9:0}
document.addEventListener("pointermove",e=>{if(!DR||e.pointerId!==DR.id)return;DR.y=e.clientY;dmove()});
function dend(){if(!DR)return;const d=DR;DR=null;clearInterval(d.t);d.ls.insertBefore(d.it,d.ph);d.ph.remove();d.it.removeAttribute("style");d.it.classList.remove("drg");
 const ids=[...d.ls.children].filter(x=>x.classList.contains("oi")).map(x=>x.dataset.id),arr=listArr(d.ls.dataset.k,d.ls.dataset.p);
 if(arr){reorderArr(arr,ids);save()}}
document.addEventListener("pointerup",dend);document.addEventListener("pointercancel",dend);

// [v2.4] listas e números da tela Configurações
document.addEventListener("change",e=>{const el=e.target,c=el.dataset&&el.dataset.c;
 if(c==="cfg"){S.cfg[el.dataset.i]=el.value;save()}
 if(c==="cfgn"){S.cfg[el.dataset.i]=Math.max(0,+el.value||0);save()}});
// [v1.2] Enter no campo "+ adicionar" da tela Modelos · [v2.3] peças e estruturas aceitam subitens (Grupo > item)
document.addEventListener("keydown",e=>{
 const el=e.target,v=el.value&&el.value.trim();if(e.key!=="Enter"||!v||!el.dataset.tadd)return;
 S.tpl[el.dataset.tadd].push(["parts","me"].includes(el.dataset.tadd)?pNorm(v):v);
 save();render();const n=document.querySelector(`[data-tadd="${el.dataset.tadd}"]`);if(n)n.focus();
});

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v1.2] tela Modelos: excluir item, nova/editar atividade padrão, restaurar
 tdel(el){const[k,i]=el.dataset.i.split("|");rm("Item do modelo removido",()=>{S.tpl[k].splice(+i,1)})},
 tka(){form("Nova atividade padrão",kForm,{c:CATS[0],lv:LV.gs},v=>{if(!v.t)return;const k={};kSave(k,v);S.tpl.tk.push(k);done()})},
 tke(el){const i=+el.dataset.i,k=S.tpl.tk[i];form("Editar atividade padrão",kForm,{t:k.t,c:k.c,lv:LV[k.lv],b:k.b.join(", ")},v=>{if(!v.t)return;kSave(k,v);done()},()=>rm("Atividade padrão excluída",()=>{S.tpl.tk.splice(i,1)}))},
 treset(){conf("Restaurar todos os modelos para o padrão?","Restaurar",()=>rm("Modelos restaurados",()=>{S.tpl=defTpl()}))},
 // [v1.1] copiar backup e restaurar · [v2.1] confirmação e "Desfazer" na restauração
 copy(){const t=$("#bkp"),ok=()=>toast("Backup copiado"),fb=()=>{try{document.execCommand("copy")?ok():toast("Selecione o texto e copie manualmente")}catch(e){toast("Selecione o texto e copie manualmente")}};t.focus();t.select();t.setSelectionRange(0,t.value.length);if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t.value).then(ok,fb);else fb()},
 imp(){let o;try{o=JSON.parse($("#imp").value);if(!o||!Array.isArray(o.f))throw 0}catch(e){return toast("Backup inválido")}conf("Restaurar este backup? Tudo o que está no app agora será substituído.","Restaurar",()=>rm("Backup restaurado",()=>{S=o}))},
 // [v2.4] configurações
 cfg(el){S.cfg[el.dataset.i]=el.checked?1:0;save()},
 cfgesc(el){S.sc.on=el.checked?1:0;save()},
 // [v2.1] organizar
 ordG(){const r={tab:"g",f:V.f,g:V.g,u:null};V.oF=V.f;V.oG=V.g;go("o");V.ret=r},
 oF(el){const i=el.dataset.i;V.oF=V.oF===i?null:i;V.oG=null;render()},
 oG(el){const i=el.dataset.i;V.oG=V.oG===i?null:i;render()},
 az(el){const[k,p,x]=el.dataset.i.split("|");let a,ids;
  if(k==="f"){a=S.f;ids=a.map(o=>o.id)}
  else if(k==="g"){const f=fam(p);a=f.g;ids=a.filter(g=>x?g.gr===x:!grById(f,g.gr)).map(g=>g.id)}
  else{a=gById(p).spp;ids=a.map(o=>o.id)}
  const nm=id=>nz(a.find(o=>o.id===id).n);
  ids.sort((u,v)=>nm(u).localeCompare(nm(v),"pt"));reorderArr(a,ids);save();render();toast("Em ordem alfabética")},
});
