// =====================================================================
// Diário de Pesquisa — google.js: GOOGLE
// Arquivos .ics (trazer e levar eventos), conta Google: sincronização pelo
// Google Drive e ligação com o Google Agenda (com avisos e repetições).
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ----- [v2.2] GOOGLE AGENDA: trazer eventos (arquivo .ics ou .zip exportado do Google) e enviar itens -----
const MARCA="[Diário de Pesquisa]";   // marca nos eventos enviados pelo app (assim eles não voltam duplicados)
const plain=h=>{const d=document.createElement("div");d.innerHTML=String(h||"").replace(/<br\s*\/?>/gi,"\n");return d.textContent};
const icsUnesc=s=>s.replace(/\\n/gi,"\n").replace(/\\([,;\\])/g,"$1");
// lê o texto do .ics e devolve o nome da agenda e a lista de eventos (cada campo = {v: valor, p: parâmetros})
function icsParse(txt){
 const L=txt.replace(/\r\n?/g,"\n").replace(/\n[ \t]/g,"").split("\n"),evs=[];let ev=null,sub=0,cal="";
 for(const ln of L){
  if(ln==="BEGIN:VEVENT"){ev={};sub=0;continue}
  if(ln==="END:VEVENT"){if(ev)evs.push(ev);ev=null;continue}
  if(ev&&/^BEGIN:/.test(ln)){sub++;continue}          // ignora blocos internos (ex.: lembretes VALARM)
  if(ev&&/^END:/.test(ln)){sub--;continue}
  const m=ln.match(/^([A-Za-z0-9-]+)((?:;[^:;=]+=(?:"[^"]*"|[^:;]*))*):(.*)$/);if(!m)continue;
  const nm=m[1].toUpperCase(),pr={};m[2].split(";").slice(1).forEach(x=>{const k=x.indexOf("=");pr[x.slice(0,k).toUpperCase()]=x.slice(k+1).replace(/^"|"$/g,"")});
  if(!ev){if(nm==="X-WR-CALNAME")cal=icsUnesc(m[3]);continue}
  if(sub>0)continue;
  if(nm==="EXDATE"){(ev.EXDATE=ev.EXDATE||[]).push(...m[3].split(",").map(v=>({v,p:pr})));continue}
  if(!(nm in ev))ev[nm]={v:m[3],p:pr};
 }
 return{cal,evs};
}
// hora "de parede" num fuso (TZID) convertida para um Date
function tzDate(Y,Mo,D,H,Mi,Se,tz){const g=Date.UTC(Y,Mo-1,D,H,Mi,Se);try{const p={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(g)).forEach(x=>p[x.type]=x.value);return new Date(g-(Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second)-g))}catch(e){return new Date(Y,Mo-1,D,H,Mi,Se)}}
// data e hora de um campo (DTSTART etc.) no fuso deste celular: {d:"AAAA-MM-DD", h:"HH:MM" ou "", all: dia inteiro?}
function icsWhen(o){
 const m=o&&o.v.trim().match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})?(Z)?)?$/);if(!m)return null;
 const[,Y,Mo,D,H,Mi,Se,Z]=m;if(!H||o.p.VALUE==="DATE")return{d:Y+"-"+Mo+"-"+D,h:"",all:1};
 const dt=Z?new Date(Date.UTC(+Y,+Mo-1,+D,+H,+Mi,+(Se||0))):o.p.TZID?tzDate(+Y,+Mo,+D,+H,+Mi,+(Se||0),o.p.TZID):new Date(+Y,+Mo-1,+D,+H,+Mi,+(Se||0));
 return{d:dt.getFullYear()+"-"+p2(dt.getMonth()+1)+"-"+p2(dt.getDate()),h:p2(dt.getHours())+":"+p2(dt.getMinutes()),all:0};
}
// eventos que se repetem (RRULE): gera as ocorrências até a data lim ("AAAAMMDD")
function rrExpand(st,rr,lim,exd){
 const m=st.v.match(/^(\d{4})(\d{2})(\d{2})(T\d{4,6}Z?)?$/);if(!m)return[st];
 const R={};rr.split(";").forEach(x=>{const[k,v]=x.split("=");R[k.toUpperCase()]=v||""});
 const fr=R.FREQ,iv=Math.max(1,+R.INTERVAL||1),cnt=R.COUNT?+R.COUNT:1e9,un=R.UNTIL?R.UNTIL.slice(0,8):"99999999",DW=["SU","MO","TU","WE","TH","FR","SA"],tail=m[4]||"";
 const s0=Date.UTC(+m[1],+m[2]-1,+m[3]),d0=new Date(s0),ymd=t=>{const d=new Date(t);return""+d.getUTCFullYear()+p2(d.getUTCMonth()+1)+p2(d.getUTCDate())},k0=ymd(s0);
 const ex=new Set((exd||[]).map(e=>e.v.slice(0,8))),bd=(R.BYDAY||"").split(",").filter(Boolean),out=[];let n=0;
 const push=t=>{const k=ymd(t);if(k<k0)return true;if(k>un||n>=cnt||k>lim)return false;n++;if(!ex.has(k))out.push({v:k+tail,p:st.p});return true};
 const nDias=(Y,M)=>new Date(Date.UTC(Y,M+1,0)).getUTCDate();
 for(let i=0;i<20000;i++){
  if(fr==="DAILY"){if(!push(s0+i*iv*864e5))break}
  else if(fr==="WEEKLY"){const w0=s0-d0.getUTCDay()*864e5+i*iv*7*864e5,ds=bd.length?bd.map(x=>DW.indexOf(x.slice(-2))).sort():[d0.getUTCDay()];if(!ds.every(k=>push(w0+k*864e5)))break}
  else if(fr==="MONTHLY"||fr==="YEARLY"){
   const yr=d0.getUTCFullYear()+(fr==="YEARLY"?i*iv:0),ms=fr==="YEARLY"?(R.BYMONTH?R.BYMONTH.split(",").map(x=>+x-1):[d0.getUTCMonth()]):[d0.getUTCMonth()+i*iv];let ok=true;
   for(const mm of ms){const Y=yr+Math.floor(mm/12),M=((mm%12)+12)%12,nd=nDias(Y,M);let ds;
    if(R.BYMONTHDAY)ds=R.BYMONTHDAY.split(",").map(x=>+x>0?+x:nd+(+x)+1);
    else if(bd.length)ds=bd.flatMap(x=>{const o=parseInt(x)||0,wd=DW.indexOf(x.slice(-2)),all=[];for(let d=1;d<=nd;d++)if(new Date(Date.UTC(Y,M,d)).getUTCDay()===wd)all.push(d);return o>0?[all[o-1]]:o<0?[all[all.length+o]]:all});
    else ds=[d0.getUTCDate()];
    if(!ds.filter(d=>d&&d<=nd).sort((a,b)=>a-b).every(d=>push(Date.UTC(Y,M,d)))){ok=false;break}}
   if(!ok)break}
  else{out.push(st);break}
 }
 return out;
}
// junta os eventos dos arquivos na Agenda do app, sem duplicar (cada evento do Google tem um código UID)
function icsImport(files,o){
 const lim=addD(o.from,366).replace(/-/g,""),r={n:0,u:0,x:0,cals:[]};
 files.forEach(f=>{
  const{cal,evs}=icsParse(f.text),cn=cal||f.name.replace(/\.(ics|txt)$/i,""),M=new Map(),seen=new Set(),canc=e=>e.STATUS&&/CANCELLED/i.test(e.STATUS.v);r.cals.push(cn);
  evs.forEach(e=>{if(e["RECURRENCE-ID"]||!e.DTSTART||!e.UID)return;const u=e.UID.v;
   if(/^diario-/.test(u)||(e.DESCRIPTION&&icsUnesc(e.DESCRIPTION.v).includes(MARCA)))return;   // enviado pelo próprio app
   (e.RRULE?rrExpand(e.DTSTART,e.RRULE.v,lim,e.EXDATE):[e.DTSTART]).forEach(x=>{const w=icsWhen(x);if(w)M.set(e.RRULE?u+"|"+w.d:u,{e,w})})});
  evs.forEach(e=>{if(!e["RECURRENCE-ID"]||!e.UID)return;const z=icsWhen(e["RECURRENCE-ID"]),k=e.UID.v+"|"+(z&&z.d),w=e.DTSTART&&icsWhen(e.DTSTART);   // ocorrência alterada ou cancelada
   if(canc(e)||!w)M.delete(k);else M.set(k,{e,w})});
  M.forEach(({e,w},k)=>{if(canc(e)||w.d<o.from)return;seen.add(k);
   const t=e.SUMMARY?icsUnesc(e.SUMMARY.v):"(sem título)",loc=e.LOCATION?icsUnesc(e.LOCATION.v):"",ds=e.DESCRIPTION?plain(icsUnesc(e.DESCRIPTION.v)).trim():"";
   let fim="";if(w.all&&e.DTEND){const z=icsWhen(e.DTEND);if(z&&z.d>addD(w.d,1))fim="Até "+fmt(addD(z.d,-1))}
   const nt=[fim,loc&&"Local: "+loc,ds].filter(Boolean).join("\n"),a=S.ag.find(x=>x.gk===k&&x.gc===cn);
   if(a){Object.assign(a,{t,d:w.d,h:w.h,nt});r.u++}   // já existia: atualiza (mantém situação, prioridade, cor e Painel)
   else{S.ag.push({id:uid(),t,d:w.d,h:w.h,s:STAT[0],p:"",col:o.col,pn:0,nt,gk:k,gc:cn});r.n++}});
  if(o.rm){const n0=S.ag.length;S.ag=S.ag.filter(x=>!(x.gk&&x.gc===cn&&x.d>=o.from&&!seen.has(x.gk)));r.x+=n0-S.ag.length}
 });
 return r;
}
// abre um .zip (exportação de todas as agendas) e devolve os arquivos .ics de dentro
async function unzip(buf){
 const b=new Uint8Array(buf),dv=new DataView(buf),td=new TextDecoder(),out=[];let e=b.length-22;
 while(e>=0&&dv.getUint32(e,true)!==0x06054b50)e--;if(e<0)throw new Error("zip");
 let p=dv.getUint32(e+16,true);
 for(let i=0,n=dv.getUint16(e+10,true);i<n;i++){
  if(dv.getUint32(p,true)!==0x02014b50)break;
  const meth=dv.getUint16(p+10,true),csz=dv.getUint32(p+20,true),nl=dv.getUint16(p+28,true),off=dv.getUint32(p+42,true),name=td.decode(b.subarray(p+46,p+46+nl));
  p+=46+nl+dv.getUint16(p+30,true)+dv.getUint16(p+32,true);
  if(!/\.ics$/i.test(name))continue;
  const lo=off+30+dv.getUint16(off+26,true)+dv.getUint16(off+28,true),data=b.subarray(lo,lo+csz);
  const raw=meth===0?data:meth===8?new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer()):null;
  if(raw)out.push({name:name.split("/").pop(),text:td.decode(raw)});
 }
 return out;
}
async function lerAgenda(file){
 try{
  const buf=await file.arrayBuffer(),b=new Uint8Array(buf);
  const files=(b[0]===0x50&&b[1]===0x4b?await unzip(buf):[{name:file.name,text:new TextDecoder().decode(b)}]).filter(f=>/BEGIN:VCALENDAR/.test(f.text));
  if(!files.length)return toast("Arquivo não reconhecido. Use o .ics ou .zip exportado do Google Agenda.");
  let r;rm(()=>`${pl(r.n,"novo","novos")} · ${pl(r.u,"atualizado","atualizados")}${r.x?" · "+pl(r.x,"removido","removidos"):""}`,()=>{r=icsImport(files,V.kf);V.kres=r});
 }catch(e){toast("Não foi possível ler o arquivo")}
}
// envio: link que abre o Google Agenda com o evento preenchido (1 hora se tiver horário; senão, dia inteiro)
const gTit=i=>i.t.replace(/^⏳\s*/,"");
const gNt=i=>{const x=i.k==="t"?i.x.t:i.k==="p"?null:i.x;return x&&x.nt?x.nt:""};
const gDet=i=>MARCA+" "+plain(i.sub)+(gNt(i)?"\n\n"+gNt(i):"");
const stamp=dt=>dt.getFullYear()+p2(dt.getMonth()+1)+p2(dt.getDate())+"T"+p2(dt.getHours())+p2(dt.getMinutes())+"00";
function gUrl(i){
 let dates;if(i.h){const a=new Date(i.d+"T"+i.h+":00");dates=stamp(a)+"/"+stamp(new Date(a.getTime()+36e5))}else dates=i.d.replace(/-/g,"")+"/"+addD(i.d,1).replace(/-/g,"");
 let tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
 return"https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent(gTit(i))+"&dates="+dates+(i.h&&tz?"&ctz="+encodeURIComponent(tz):"")+"&details="+encodeURIComponent(gDet(i));
}
// [v2.3] corrigido: o ";" agora é protegido como "\;" (antes podia cortar o título no Google)
// envio em lote: arquivo .ics com todos os prazos de hoje em diante (para importar no Google pelo computador)
const icsEsc=s=>String(s).replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\r?\n/g,"\\n");
const icsFold=l=>{let o="";while(l.length>70){o+=l.slice(0,70)+"\r\n ";l=l.slice(70)}return o+l};
function icsExport(){
 const td=today(),now=new Date().toISOString().replace(/[-:]/g,"").slice(0,15)+"Z",z=dt=>dt.toISOString().replace(/[-:]/g,"").slice(0,15)+"Z";
 const L=agItems().filter(i=>!i.dn&&i.d>=td&&!i.oc&&!(i.k==="a"&&i.x.gk));
 // [v2.4] repetição: um evento só, com a regra (RRULE), como no Google
 S.ag.forEach(e=>{if(!e.gk&&e.rp&&e.rp.f&&e.d&&(!e.rp.u||e.rp.u>=td))L.push({d:e.d,h:e.h,t:e.t,k:"a",x:e,sub:"Agenda · repete "+rptL(e.rp),rr:1})});
 const ev=L.map(i=>{const id=i.k==="t"?i.x.t.id:i.k==="p"?"prep-"+i.x.s.id:i.k==="e"?"emp-"+i.x.id:i.k==="m"?"ms-"+i.x.id:i.x.id;let dt;   // [v2.5] empréstimos · [v2.6] manuscritos
  if(i.h){const a=new Date(i.d+"T"+i.h+":00");dt=["DTSTART:"+z(a),"DTEND:"+z(new Date(a.getTime()+36e5))]}else dt=["DTSTART;VALUE=DATE:"+i.d.replace(/-/g,""),"DTEND;VALUE=DATE:"+addD(i.d,1).replace(/-/g,"")];
  if(i.rr)dt.push(...rrLines(i.x,1));
  return["BEGIN:VEVENT","UID:diario-"+id+"@diario-pesquisa","DTSTAMP:"+now,...dt,"SUMMARY:"+icsEsc(gTit(i)),"DESCRIPTION:"+icsEsc(gDet(i)),"END:VEVENT"].map(icsFold).join("\r\n")});
 return{n:L.length,txt:["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Diario de Pesquisa//PT-BR","CALSCALE:GREGORIAN","X-WR-CALNAME:Diário de Pesquisa",...ev,"END:VCALENDAR"].join("\r\n")+"\r\n"};
}
function baixar(nome,txt,tipo){const u=URL.createObjectURL(new Blob([txt],{type:tipo})),a=document.createElement("a");a.href=u;a.download=nome;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000)}
// [v2.2] tela do Google Agenda · [v2.3] conta Google (Drive + Agenda); arquivos .ics ficam como alternativa
function vK(){
 const k=V.kf,G={};S.ag.forEach(e=>{if(e.gk)G[e.gc||"?"]=(G[e.gc||"?"]||0)+1});
 let h=`<div class="grp">Conta Google</div><div class="card kbox">`;
 if(!SY.on)h+=`<p>Entre com sua conta Google para <b>sincronizar</b> os dados entre o celular e o computador e para <b>ligar</b> a Agenda do app ao Google Agenda.</p><p class="note">Os dados ficam numa pasta escondida do seu Google Drive, que só este app acessa. Entre com a mesma conta em todos os aparelhos. Na primeira vez o Google avisa que o app não foi verificado: toque em Avançado › Acessar Diário de Pesquisa.</p><button class="pri kfile" data-a="gcon">Entrar com Google</button>`;
 else h+=`<p><b>${esc(SY.email||"Conta Google conectada")}</b><br><small>${GBUSY?"Sincronizando...":"Última sincronização: "+quando(SY.at)}${GERR?" · problema: "+esc(GERR):""}</small></p>${tokOk()?"":`<p class="note">O acesso do Google vence depois de cerca de 1 hora. Toque em Sincronizar agora (ou na faixa do alto) para renovar.</p>`}<div class="tools"><button class="pri" data-a="sync">Sincronizar agora</button><button class="sec" data-a="gdes">Desconectar</button></div><p class="note">Enquanto o acesso vale, cada mudança vai sozinha para o Drive e para o Google Agenda em poucos segundos; ao abrir o app, ele traz o que mudou no outro aparelho.</p>`;
 h+=`</div>`;
 if(SY.on&&SY.cal){
  h+=`<div class="grp">Google Agenda</div><div class="card kbox"><label class="kck"><input type="checkbox" data-a="gpush"${S.gg.push?" checked":""}><span>Enviar para o Google os prazos, as atividades com data, as preparações e as contagens, numa agenda própria chamada “${CALN}”. O que você muda, conclui ou apaga aqui é atualizado lá.</span></label><p class="kl">Trazer para o calendário do app os eventos destas agendas:</p>`
  +(S.gg.cals.length?S.gg.cals.map(c=>`<label class="kck"><input type="checkbox" data-a="gsrc" data-i="${esc(c.id)}"${S.gg.src.includes(c.id)?" checked":""}><span>${esc(c.n)}${c.p?" (principal)":""}</span></label>`).join(""):`<p class="note">Toque em Sincronizar agora para carregar a lista das suas agendas.</p>`)
  +`<label class="kl">Cor dos eventos trazidos<select id="gcol">${Object.keys(CL).map(c=>`<option value="${c}"${c===(S.gg.col||"blue")?" selected":""}>${CL[c]}</option>`).join("")}</select></label><p class="note">Vêm os eventos dos últimos 60 dias e do próximo ano. Edite esses eventos no Google; aqui você pode marcar como concluído, mudar a cor ou pôr no Painel. Se já tinha trazido eventos por arquivo .ics, use “Remover todos os eventos trazidos” (no fim desta tela) para não ficarem repetidos.</p></div>`;
 }else if(SY.on)h+=`<p class="note">A permissão do Google Agenda não foi dada. Para ligar a agenda, desconecte e entre de novo marcando a permissão da Agenda.</p>`;
 h+=`<details class="lg kd"><summary>Sem conta conectada: arquivos .ics</summary>`;
 h+=`<div class="grp">Trazer do Google Agenda</div><div class="card kbox"><ol class="kst"><li>No <b>computador</b>, abra o Google Agenda. Em “Minhas agendas”, passe o mouse na agenda › ⋮ › <b>Configurações e compartilhamento</b> › <b>Exportar agenda</b>. (Pelo app do Google não dá para exportar.)</li><li>Mande o arquivo baixado (.ics, ou .zip se exportou todas) para o celular: Drive, e-mail, WhatsApp...</li><li>Escolha o arquivo aqui. Pode repetir sempre que quiser atualizar: o que já veio é atualizado, não duplicado.</li></ol>`
 +`<label class="kl">Trazer eventos a partir de<input type="date" id="kfrom" value="${esc(k.from)}"></label><label class="kl">Cor no calendário<select id="kcol">${Object.keys(CL).map(c=>`<option value="${c}"${c===k.col?" selected":""}>${CL[c]}</option>`).join("")}</select></label>`
 +`<label class="kck"><input type="checkbox" id="krm"${k.rm?" checked":""}><span>Ao atualizar, remover os eventos que foram apagados no Google</span></label><label class="pri kfile">Escolher arquivo .ics ou .zip<input type="file" id="icsf"></label>`
 +(V.kres?`<p class="kres">Última importação (${esc(V.kres.cals.join(", "))}): ${pl(V.kres.n,"novo","novos")}, ${pl(V.kres.u,"atualizado","atualizados")}${V.kres.x?", "+pl(V.kres.x,"removido","removidos"):""}.</p>`:"")+`</div>`
 +`<div class="grp">Levar para o Google Agenda</div><div class="card kbox"><p>Na aba <b>Agenda</b>, toque num dia: cada item tem o botão <span class="gbtn" style="pointer-events:none">+ Google</span>, que abre o Google Agenda com o evento já preenchido. É só salvar.</p><p class="note">Para mandar todos os prazos de uma vez, gere o arquivo abaixo e importe no Google Agenda pelo computador (Configurações › Importar e exportar). Use de preferência uma agenda criada só para isso: para atualizar depois, é só apagá-la e importar de novo.</p><button class="sec" data-a="icsx">Gerar arquivo com os prazos (.ics)</button></div>`;
 h+=`</details>`;
 return h+(Object.keys(G).length?`<div class="grp">Eventos trazidos do Google</div><div class="card kbox">${Object.keys(G).map(c=>`<div class="r" style="justify-content:space-between;min-height:36px"><span>${esc(c)}</span><small>${pl(G[c],"evento","eventos")}</small></div>`).join("")}<button class="dng" data-a="kclr" style="margin-top:8px">Remover todos os eventos trazidos</button></div>`:"");
}
// ----- [v2.3] CONTA GOOGLE: sincronização pelo Google Drive e ligação direta com o Google Agenda -----
// Não há servidor: o app pede ao Google uma chave de acesso (token) que vale cerca de 1 hora.
// Com ela, guarda todos os dados num arquivo escondido do seu Drive (pasta do app: não aparece no Drive)
// e conversa com o Google Agenda. Quando a chave vence, um toque em "Sincronizar" pede outra.
const GID="1051160223290-i8l8egjeqhp5246u05mfphu26fshpskq.apps.googleusercontent.com";   // ID do cliente (Google Cloud)
const GSC="https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/calendar";   // permissões pedidas
const GAPI="https://www.googleapis.com",DRV="/drive/v3/files",CAPI="/calendar/v3";
const ARQ="diario-dados.json";                                                     // nome do arquivo no Drive
const CALN="Diário de Pesquisa (app)",CALD="Agenda criada pelo app Diário de Pesquisa";   // agenda do app no Google
const GCC={red:"11",orange:"6",yellow:"5",green:"10",blue:"9",purple:"3",gray:"8"};       // cores do app → cores do Google
const SYK="diario-sync";   // configuração da sincronização deste aparelho (fica fora do backup)
let SY={on:0,email:"",cal:0,last:0,at:0,tok:"",exp:0,dev:"",pick:""};
try{Object.assign(SY,JSON.parse(localStorage.getItem(SYK))||{})}catch(e){}
if(!SY.dev)SY.dev=uid();
let GTC=null,GCB=null,GBUSY=0,GQ=0,GTM=0,GERR="";   // login do Google, o que fazer depois do login, sincronizando?, pedido na fila, temporizador, último problema
const sySave=()=>{try{localStorage.setItem(SYK,JSON.stringify(Object.assign({},SY,{pick:""})))}catch(e){}};
const tokOk=()=>!!SY.tok&&Date.now()<SY.exp-60e3;   // a chave ainda vale (com 1 minuto de folga)?
const gAuto=()=>!!(SY.on&&SY.cal&&S.gg.push);          // os prazos vão sozinhos para o Google?
const tzN=()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||"America/Sao_Paulo"}catch(e){return"America/Sao_Paulo"}};
const isoL=dt=>dt.getFullYear()+"-"+p2(dt.getMonth()+1)+"-"+p2(dt.getDate())+"T"+p2(dt.getHours())+":"+p2(dt.getMinutes())+":00";
const hex=s=>[...String(s)].map(c=>c.charCodeAt(0).toString(16).padStart(2,"0")).join("");
// pede a chave de acesso: abre a janelinha do Google (por isso precisa vir de um toque na tela)
function gLogin(then){
 const go=window.google&&google.accounts&&google.accounts.oauth2;
 if(!go)return toast(navigator.onLine?"O login do Google ainda está carregando. Tente de novo.":"Sem internet");
 if(!GTC)GTC=go.initTokenClient({client_id:GID,scope:GSC,callback:r=>GCB&&GCB(r),
  error_callback:e=>{const t=e&&e.type;GERR=t==="popup_closed"?"":"login";syncUI();if(t==="popup_failed_to_open")toast("O navegador bloqueou a janela do Google. Toque em Sincronizar.")}});
 GCB=r=>{
  if(!r||r.error){GERR="login";syncUI();return toast("Não foi possível entrar")}
  const sc=r.scope||"";
  if(!sc.includes("drive.appdata")){GERR="sem permissão do Drive";syncUI();return toast("Permita o acesso ao Google Drive para sincronizar")}
  SY.tok=r.access_token;SY.exp=Date.now()+(+r.expires_in||3600)*1e3;SY.cal=sc.includes("auth/calendar")?1:0;GERR="";sySave();then&&then()};
 GTC.requestAccessToken(SY.email?{prompt:"",hint:SY.email}:{prompt:"consent"});
}
// chamada às APIs do Google com a chave de acesso (devolve o JSON da resposta)
async function gF(path,o={}){
 const r=await fetch(path.startsWith("http")?path:GAPI+path,Object.assign({},o,{headers:Object.assign({Authorization:"Bearer "+SY.tok},o.headers||{})}));
 if(r.status===401){SY.tok="";SY.exp=0;sySave();const e=new Error("auth");e.st=401;throw e}   // chave vencida
 if(r.status===204)return null;
 const tx=await r.text();let b=tx;try{b=tx?JSON.parse(tx):null}catch(e){}
 if(!r.ok){const e=new Error((b&&b.error&&b.error.message)||"HTTP "+r.status);e.st=r.status;throw e}
 return b;
}
// lista longa, em várias páginas
async function gList(url,key){let out=[],pt="";do{const r=await gF(url+(url.includes("?")?"&":"?")+"maxResults=250"+(pt?"&pageToken="+encodeURIComponent(pt):""));out=out.concat((r&&r[key])||[]);pt=r&&r.nextPageToken}while(pt);return out}
// faz vários pedidos ao mesmo tempo (n de cada vez)
async function runJobs(J,n){let i=0;const w=async()=>{while(i<J.length)await J[i++]()};await Promise.all(Array.from({length:Math.min(n,J.length)},w))}
// ---- DRIVE: um arquivo com todos os dados; appProperties.t = horário da última mudança ----
async function dFind(){const r=await gF(`${DRV}?spaces=appDataFolder&q=${encodeURIComponent(`name='${ARQ}' and trashed=false`)}&fields=files(id,appProperties)&pageSize=10`);return(r&&r.files&&r.files[0])||null}
async function dUp(id){   // envia os dados (cria o arquivo na primeira vez)
 const B="dp"+uid()+uid(),pr={t:String(S.t||0),dev:SY.dev},meta=id?{appProperties:pr}:{name:ARQ,parents:["appDataFolder"],appProperties:pr};
 const body="--"+B+"\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n"+JSON.stringify(meta)+"\r\n--"+B+"\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n"+JSON.stringify(S)+"\r\n--"+B+"--";
 return gF(`/upload/drive/v3/files${id?"/"+id:""}?uploadType=multipart&fields=id`,{method:id?"PATCH":"POST",headers:{"Content-Type":"multipart/related; boundary="+B},body});
}
// quando os dois lados mudaram, a versão que não ficou é guardada aqui (aparece em Backup)
function guardaOutra(o,de){try{localStorage.setItem("diario-outra",JSON.stringify({t:Date.now(),de,data:o}))}catch(e){}}
const outraV=()=>{try{return JSON.parse(localStorage.getItem("diario-outra"))}catch(e){return null}};
function outraH(){const O=outraV();return O&&O.data?`<div class="grp">Versão guardada na sincronização</div><p class="note">Quando havia mudanças dos dois lados, o app ficou com uma versão e guardou a outra aqui (${esc(O.de)}, ${quando(O.t)}).</p><div class="tools"><button class="sec" data-a="outra">Restaurar a versão guardada</button></div>`:""}
// compara este aparelho com o Drive: manda, traz ou (1ª vez com dados dos dois lados) pergunta
async function driveSync(){
 const f=await dFind(),lt=S.t||0;
 if(!f){await dUp("");SY.last=lt;return"up"}
 const rt=+((f.appProperties||{}).t||0),lc=lt!==SY.last,rc=rt!==SY.last;   // mudou aqui? mudou no Drive?
 if(!rc&&!lc)return"";
 if(!rc){await dUp(f.id);SY.last=lt;return"up"}
 const R=await gF(`${DRV}/${f.id}?alt=media`);
 if(!R||!Array.isArray(R.f))throw new Error("arquivo do Drive inválido");
 const keep=!lc?"drive":SY.pick||(SY.last?(lt>rt?"local":"drive"):"");   // mudou dos dois lados: fica a mais recente
 SY.pick="";
 if(!keep){const e=new Error("pick");e.rt=rt;throw e}
 if(keep==="local"){guardaOutra(R,"a que estava no Drive");await dUp(f.id);SY.last=lt;return"conf-up"}
 if(lc)guardaOutra(S,"a que estava neste aparelho");
 S=R;S.t=rt;fix();persist();SY.last=rt;return lc?"conf-down":"down";
}
// ---- GOOGLE AGENDA ----
// lista as agendas da conta (para escolher de quais trazer eventos) e acha a agenda do app
async function gCals(){
 const L=await gList(`${CAPI}/users/me/calendarList?fields=items(id,summary,summaryOverride,description,primary),nextPageToken`,"items");
 const mine=L.find(c=>c.id===S.gg.cal)||L.find(c=>c.description===CALD);
 S.gg.cal=mine?mine.id:"";
 S.gg.cals=L.filter(c=>c!==mine).map(c=>({id:c.id,n:c.summaryOverride||c.summary||c.id,p:c.primary?1:0}));
 S.gg.src=S.gg.src.filter(id=>S.gg.cals.some(c=>c.id===id));
}
// [v2.4] REGRA DE REPETIÇÃO (RRULE + dias pulados), usada no Google e no arquivo .ics
// utc=1 (arquivo .ics): horários em UTC, sem precisar descrever o fuso; no Google vai o fuso do aparelho
const zU=dt=>dt.toISOString().replace(/[-:]/g,"").slice(0,15)+"Z";
function rrLines(e,utc){const r=e.rp,R=["RRULE:FREQ="+{d:"DAILY",w:"WEEKLY",m:"MONTHLY",y:"YEARLY"}[r.f]+(r.n>1?";INTERVAL="+r.n:"")+(r.u?";UNTIL="+(e.h?zU(new Date(r.u+"T23:59:59")):r.u.replace(/-/g,"")):"")];   // UNTIL com hora: fim do dia local, em UTC
 if(e.ex.length)R.push(!e.h?"EXDATE;VALUE=DATE:"+e.ex.map(d=>d.replace(/-/g,"")).join(","):utc?"EXDATE:"+e.ex.map(d=>zU(new Date(d+"T"+e.h+":00"))).join(","):"EXDATE;TZID="+tzN()+":"+e.ex.map(d=>d.replace(/-/g,"")+"T"+e.h.replace(":","")+"00").join(","));
 return R}
// o que deve existir na agenda do app no Google: tudo que tem data no app (menos o que veio do próprio Google)
// [v2.4] com AVISOS (lembretes do Google: o das Configurações + o da antecedência dos ‼) e REPETIÇÕES num evento só
function gWant(){
 const tz=tzN(),W=new Map(),rem=S.cfg.rem;
 const rmd=(dn,xi,av,hm)=>{const o=[];if(!dn){if(rem!=="")o.push(+rem+hm);if(xi)o.push((+av||S.cfg.xi)*1440-540+hm)}   // ‼: "av" dias antes, às 9h
  return{useDefault:false,overrides:[...new Set(o.map(m=>Math.min(40320,Math.max(0,m))))].sort((a,b)=>a-b).slice(0,5).map(m=>({method:"popup",minutes:m}))}};   // o Google aceita até 4 semanas antes
 const when=(d,h)=>{if(h){const a=new Date(d+"T"+h+":00");return[{dateTime:isoL(a),timeZone:tz},{dateTime:isoL(new Date(a.getTime()+36e5)),timeZone:tz},+h.slice(0,2)*60+ +h.slice(3,5)]}return[{date:d},{date:addD(d,1)},0]};
 agItems().forEach(i=>{if(i.k==="r"||(i.k==="a"&&(i.x.gk||(i.x.rp&&i.x.rp.f))))return;
  const key=i.k==="t"?"t"+i.x.t.id:i.k==="p"?"p"+i.x.s.id:i.k==="c"?"c"+i.x.id:i.k==="e"?"e"+i.x.id:i.k==="m"?"m"+i.x.id:"a"+i.x.id,[st,en,hm]=when(i.d,i.h);   // [v2.5] e = empréstimo · [v2.6] m = manuscrito
  W.set("dpq0"+hex(key),{summary:(i.dn?"✓ ":"")+gTit(i),description:gDet(i),start:st,end:en,colorId:GCC[i.dn?"gray":i.col]||"9",reminders:rmd(i.dn,i.xi,i.av,hm)})});   // código fixo por item: nunca duplica
 S.ag.forEach(e=>{if(e.gk||!e.rp||!e.rp.f||!e.d)return;const[st,en,hm]=when(e.d,e.h),i={t:e.t,k:"a",x:e,sub:"Agenda · repete "+rptL(e.rp)};   // [v2.4] repetição: um evento com regra (RRULE)
  W.set("dpq0"+hex("a"+e.id),{summary:gTit(i),description:gDet(i),start:st,end:en,colorId:GCC[e.col]||"9",recurrence:rrLines(e),reminders:rmd(0,e.xi,e.av,hm)})});
 return W;
}
const evSig=e=>{const t=o=>o?(o.date||String(o.dateTime||"").slice(0,16)):"",r=e.reminders||{};return[e.summary||"",e.description||"",e.colorId||"",t(e.start),t(e.end),(e.recurrence||[]).join(";"),r.useDefault?"d":(r.overrides||[]).map(o=>+o.minutes).sort((a,b)=>a-b).join(",")].join("|")};
// envia: cria, atualiza ou apaga eventos na agenda do app no Google, para ficar igual ao app
async function gPush(){
 const h={"Content-Type":"application/json"};
 if(!S.gg.cal){const c=await gF(`${CAPI}/calendars`,{method:"POST",headers:h,body:JSON.stringify({summary:CALN,description:CALD,timeZone:tzN()})});S.gg.cal=c.id;S.t=Date.now();persist()}
 const cal=encodeURIComponent(S.gg.cal),W=gWant();let have;
 try{have=await gList(`${CAPI}/calendars/${cal}/events?showDeleted=false&timeZone=${encodeURIComponent(tzN())}&fields=items(id,summary,description,colorId,start,end,recurrence,reminders),nextPageToken`,"items")}
 catch(e){if(e.st===404||e.st===410){S.gg.cal="";return gPush()}throw e}   // a agenda foi apagada no Google: cria de novo
 const H=new Map(have.map(e=>[e.id,e])),J=[];
 W.forEach((ev,id)=>{const o=H.get(id);if(!o||evSig(o)!==evSig(ev))J.push(()=>gPut(cal,id,ev,!o))});
 H.forEach((e,id)=>{if(id.startsWith("dpq0")&&!id.includes("_")&&!W.has(id))J.push(()=>gF(`${CAPI}/calendars/${cal}/events/${id}`,{method:"DELETE"}).catch(x=>{if(x.st!==404&&x.st!==410)throw x}))});   // só apaga o que o app criou (e nunca um dia avulso de repetição, "_")
 await runJobs(J,4);return J.length;
}
async function gPut(cal,id,ev,nw){   // cria (ou, se já existiu e foi apagado, revive) e atualiza
 const h={"Content-Type":"application/json"},b=JSON.stringify(Object.assign({id,status:"confirmed"},ev)),u=`${CAPI}/calendars/${cal}/events`;
 if(!nw)return gF(`${u}/${id}`,{method:"PUT",headers:h,body:b});
 try{return await gF(u,{method:"POST",headers:h,body:b})}catch(e){if(e.st===409)return gF(`${u}/${id}`,{method:"PUT",headers:h,body:b});throw e}
}
// data e hora de um evento do Google no fuso deste aparelho
const gWhen=o=>{if(!o)return null;if(o.date)return{d:o.date,h:""};if(!o.dateTime)return null;const t=new Date(o.dateTime);if(isNaN(t))return null;return{d:t.getFullYear()+"-"+p2(t.getMonth()+1)+"-"+p2(t.getDate()),h:p2(t.getHours())+":"+p2(t.getMinutes())}};
// traz: eventos das agendas escolhidas entram na Agenda do app (sem duplicar; os apagados lá saem daqui)
async function gPull(){
 const a=addD(today(),-60),b=addD(today(),366),r={n:0,u:0,x:0};
 for(const id of S.gg.src){
  const c=S.gg.cals.find(x=>x.id===id),cn=c?c.n:id,seen=new Set();let L;
  try{L=await gList(`${CAPI}/calendars/${encodeURIComponent(id)}/events?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(a+"T00:00:00Z")}&timeMax=${encodeURIComponent(b+"T00:00:00Z")}&fields=items(id,status,summary,location,description,start,end),nextPageToken`,"items")}
  catch(e){if(e.st===404)continue;throw e}
  L.forEach(e=>{if(e.status==="cancelled")return;const w=gWhen(e.start);if(!w)return;
   const ds=e.description?plain(e.description).trim():"";if(ds.includes(MARCA))return;   // enviado pelo próprio app (botão + Google)
   const k="g:"+e.id;seen.add(k);
   let fim="";if(e.start.date&&e.end&&e.end.date&&e.end.date>addD(e.start.date,1))fim="Até "+fmt(addD(e.end.date,-1));
   const t=e.summary||"(sem título)",nt=[fim,e.location&&"Local: "+e.location,ds].filter(Boolean).join("\n"),x=S.ag.find(y=>y.gk===k&&y.gi===id);
   if(x){if(x.t!==t||x.d!==w.d||x.h!==w.h||x.nt!==nt||x.gc!==cn){Object.assign(x,{t,d:w.d,h:w.h,nt,gc:cn});r.u++}}   // mantém situação, cor e Painel
   else{S.ag.push({id:uid(),t,d:w.d,h:w.h,s:STAT[0],p:"",col:S.gg.col||"blue",pn:0,nt,gk:k,gc:cn,gi:id});r.n++}});
  const n0=S.ag.length;S.ag=S.ag.filter(y=>!(y.gi===id&&y.d>=a&&!seen.has(y.gk)));r.x+=n0-S.ag.length;
 }
 const n0=S.ag.length;S.ag=S.ag.filter(y=>!y.gi||S.gg.src.includes(y.gi));r.x+=n0-S.ag.length;   // agendas desmarcadas: tira os eventos delas
 return r;
}
// ---- SINCRONIZAR: Drive (dados) → Agenda (trazer e enviar) → Drive de novo, se algo mudou ----
async function syncNow(user){
 if(!SY.on)return;
 if(!navigator.onLine){GERR="sem internet";syncUI();if(user)toast("Sem internet: sincroniza quando a conexão voltar");return}
 if(!tokOk()){syncUI();if(user)gLogin(()=>syncNow(1));return}   // pede a chave de novo (só com um toque)
 if(GBUSY){GQ=1;return}
 GBUSY=1;GERR="";syncUI();
 const t0=S.t;let r="";
 try{
  r=await driveSync();
  if(SY.cal){
   if(user||!S.gg.cals.length){await gCals();if(!S.gg.ini){S.gg.ini=1;const pr=S.gg.cals.find(c=>c.p);if(pr&&!S.gg.src.length)S.gg.src=[pr.id];S.t=Date.now();persist()}}   // 1ª vez: já traz a agenda principal
   if(S.gg.src.length||S.ag.some(y=>y.gi)){const p=await gPull();if(p.n||p.u||p.x){S.t=Date.now();persist()}}
   if(S.gg.push)await gPush();
  }
  if((S.t||0)!==SY.last)await driveSync();
  SY.at=Date.now();
  if(r==="conf-up"||r==="conf-down")toast("Havia mudanças nos dois aparelhos: ficou a mais recente; a outra está em Backup");
  else if(user)toast("Sincronizado");
 }catch(e){
  if(e.message==="pick"){GBUSY=0;syncUI();return pickModal(e.rt)}
  GERR=e.message==="auth"?"":e.message||"erro";
  if(e.message!=="auth"&&user)toast("Erro ao sincronizar: "+GERR);
 }
 GBUSY=0;sySave();syncUI();
 if(S.t!==t0||r==="down"||r==="conf-down")softRender();
 if(GQ){GQ=0;syncLater(1000)}
}
// sincroniza daqui a pouco (junta várias mudanças seguidas num envio só); espera a janela de formulário fechar
function syncLater(ms){clearTimeout(GTM);GTM=setTimeout(()=>{if(modalOn())return syncLater(3000);syncNow()},ms==null?4000:ms)}
// nuvem no alto e faixa "Toque para sincronizar"
function syncUI(){
 const b=$("#sy"),bar=$("#sbar");if(!b)return;
 b.hidden=!SY.on;b.className=GBUSY?"busy":!tokOk()?"need":GERR?"err":"ok";
 b.title=GBUSY?"Sincronizando...":!tokOk()?"Toque para sincronizar":GERR?"Problema: "+GERR:"Sincronizado "+quando(SY.at);
 if(bar)bar.hidden=!(SY.on&&!tokOk()&&!GBUSY);
 if(V.tab==="k"&&!modalOn())softRender();
}
// redesenha sem atrapalhar quem está digitando
function softRender(){const ae=document.activeElement;if(ae&&$("#app").contains(ae)&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)){ae.addEventListener("blur",()=>setTimeout(render,60),{once:true});return}render()}
// 1ª sincronização neste aparelho com dados dos dois lados: qual versão usar?
function pickModal(rt){
 $("#modal").innerHTML=`<div class="sheet"><h3>Já há dados no Drive</h3><p>Seu Google Drive tem dados do app (última mudança ${esc(quando(rt))}) e este aparelho também. Qual versão usar daqui em diante? A outra fica guardada em Backup.</p><div class="r"><button class="pri" data-a="sypick" data-i="drive">Usar os do Drive</button><button class="sec" data-a="sypick" data-i="local">Usar os deste aparelho</button></div></div>`;
 $("#modal").classList.add("on");cb=null;syncHist();
}
// sincroniza ao voltar para o app e quando a internet volta
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&SY.on)syncLater(400)});
addEventListener("online",()=>{if(SY.on)syncLater(400)});

// [v2.2] opções da importação de arquivo .ics · [v2.3] cor dos eventos trazidos do Google
document.addEventListener("change",e=>{const el=e.target;
 if(el.id==="kfrom"&&el.value)V.kf.from=el.value;if(el.id==="kcol")V.kf.col=el.value;if(el.id==="krm")V.kf.rm=el.checked?1:0;
 if(el.id==="icsf"&&el.files&&el.files[0]){lerAgenda(el.files[0]);el.value=""}
 if(el.id==="gcol"){S.gg.col=el.value;save()}});

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 // [v2.3] conta Google: entrar, sincronizar, desconectar, opções da agenda, escolha na 1ª sincronização, versão guardada
 gcon(){gLogin(async()=>{try{const a=await gF("/drive/v3/about?fields=user(emailAddress)");SY.email=(a&&a.user&&a.user.emailAddress)||SY.email}catch(e){}SY.on=1;sySave();render();syncNow(1)})},
 sync(){if(!SY.on){closeMenu();go("k");return}syncNow(1)},
 gdes(){conf("Desconectar a conta Google neste aparelho? Os dados continuam aqui e no Drive; a sincronização só volta quando você entrar de novo.","Desconectar",()=>{Object.assign(SY,{on:0,tok:"",exp:0,email:"",last:0,cal:0,at:0});GERR="";sySave();closeM();render();syncUI()})},
 gpush(el){S.gg.push=el.checked?1:0;save()},
 gsrc(el){const id=el.dataset.i;S.gg.src=S.gg.src.filter(x=>x!==id).concat(el.checked?[id]:[]);save()},
 sypick(el){SY.pick=el.dataset.i;closeM();syncNow(1)},
 outra(){conf("Trocar os dados atuais pela versão guardada? Os atuais ficam guardados no lugar dela.","Restaurar",()=>{const O=outraV();if(!O||!O.data)return closeM();rm("Versão guardada restaurada",()=>{guardaOutra(S,"a que estava em uso antes de restaurar");S=O.data})})},
 // [v2.2] Google Agenda
 gcal(el){const i=AGL[+el.dataset.i];if(i)window.open(gUrl(i),"_blank")},
 icsx(){const r=icsExport();if(!r.n)return toast("Nenhum prazo de hoje em diante");baixar("diario-prazos-"+today()+".ics",r.txt,"text/calendar");toast(pl(r.n,"prazo","prazos")+" no arquivo")},
 kclr(){conf("Remover da Agenda todos os eventos trazidos do Google Agenda? (No Google nada muda.)","Remover",()=>rm("Eventos do Google removidos",()=>{S.ag=S.ag.filter(x=>!x.gk)}))},
});
