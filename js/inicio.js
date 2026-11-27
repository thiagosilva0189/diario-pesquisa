// =====================================================================
// Diário de Pesquisa — inicio.js: DESENHAR A TELA E LIGAR TUDO (é o último a carregar)
// Troca de abas e render(), cliques (data-a="nome" chama A.nome), deslizar
// entre abas, botão voltar do Android, tema e início do app.
// Ordem dos arquivos e histórico de versões: js/versao.js
// =====================================================================

// ===== TROCA DE TELAS E DESENHO DA TELA (render) =====
// [v2.0] fechar o menu ⋮ (o menu ganhou itens a cada versão: Sobre v1.10, Relatório/Organizar/Tema v2.1, Google Agenda v2.2)
const closeMenu=()=>{$("#menu").hidden=true;$("#scrim").hidden=true;syncHist()};
// ----- abas, deslize e animação -----
// [v2.0?] troca de aba com animação para o lado certo · lista de telas: r e o [v2.1], k [v2.2]
const TABS=["g","p","a","c","e","x","r","o","k","m","b","z","s"];   // [v2.4] z = Configurações · [v2.5] e = Empréstimos, x = Matrizes
let dir=0;
function go(t){dir=Math.sign(TABS.indexOf(t)-TABS.indexOf(V.tab));V.tab=t;V.g=null;V.s=null;V.u=null;V.ret=null;V.hs=[];render();$("#app").scrollTop=0}
// títulos das telas: Backup b [v1.1] · Modelos m [v1.2] · Contagem c [v1.4] · Agenda a [v1.8] · Sobre s [v1.10] · Relatório r e Organizar o [v2.1] · Google Agenda k [v2.2]
const TTL={m:"Modelos",b:"Backup",s:"Sobre o app",a:"Agenda",c:"Contagens regressivas",r:"Relatório",o:"Organizar",k:"Google",z:"Configurações",e:"Empréstimos",x:"Matrizes de caracteres"};   // [v2.3] k = conta Google · [v2.5] e, x
// [v1.0] desenha a tela atual · [v2.0] título na barra, seta de voltar, botão + flutuante e animação de entrada
function render(){
 document.querySelectorAll("#tabs button").forEach(b=>b.classList.toggle("on",b.dataset.i===V.tab));
 const a=$("#app");
 a.innerHTML=V.tab==="g"?(V.u?vSup():V.g?vGen():vGroups()):V.tab==="p"?vDash():V.tab==="a"?vAg():V.tab==="c"?vCd():V.tab==="m"?vTpl():V.tab==="s"?vAbout():V.tab==="r"?vRep():V.tab==="o"?vOrg():V.tab==="k"?vK():V.tab==="z"?vCfg():V.tab==="e"?vEmp():V.tab==="x"?vMx():vBackup();   // [v2.5] Empréstimos e Matrizes
 if(V.tab==="g"&&!V.g&&!V.u)list();
 const sub=V.tab==="g"&&(V.g||V.u);                       // dentro de um gênero ou espécie?
 $("#bk").hidden=!(sub||"mbsrokzex".includes(V.tab));
 $("#ttl").textContent=TTL[V.tab]||(V.u?(V.u==="*"?"Atividades gerais":fam(V.u.split("|")[0]).n):!sub?"Diário de Pesquisa":fam(V.f).n);
 const su=V.tab==="g"&&V.u&&V.u.includes("|")?supOwn():null;   // [v2.4] numa tela de subgrupo, o + cria gênero nele
 const fa=V.tab==="a"?"addAg":V.tab==="c"?"addCd":V.tab==="e"?"addEmp":V.tab==="x"?"addMx":V.tab==="g"?(V.u?(su&&su.r?"addGen":""):(V.g?"addSp":"addFam")):"";   // ação do botão flutuante +
 $("#fab").hidden=!fa;$("#fab").dataset.a=fa;$("#fab").dataset.i=su&&su.r?V.u:"";
 a.classList.remove("in-l","in-r");
 if(dir){void a.offsetWidth;a.classList.add(dir>0?"in-r":"in-l");dir=0}
 syncHist();
}

// ===== AÇÕES DESTA PARTE (botões com data-a="...") =====
Object.assign(A,{
 tab(el){const r={tab:V.tab,f:V.f,g:V.g,u:V.u},t=el.dataset.i;closeMenu();go(t);if("mbsrokzex".includes(t)&&r.tab!==t)V.ret=r},   // [v2.1] lembra de onde veio
 // [v1.0] voltar · [v2.0] seta de voltar na barra · [v2.1] volta para a tela de onde veio (V.ret) · menu ⋮
 back(){V.g=null;V.s=null;render()},
 navback(){if(V.tab!=="g"){const r=V.ret;if(r){go(r.tab);V.f=r.f;V.g=r.g;V.u=r.u;dir=-1;render()}else go("g");return}const p=V.hs.pop();if(p){V.u=p.u;V.f=p.f;V.g=p.g}else{V.u=null;V.g=null}dir=-1;render()},   // [v2.4] volta pelo caminho (gênero › subgrupo › família)
 menu(){const o=$("#menu").hidden;$("#menu").hidden=!o;$("#scrim").hidden=!o;syncHist()},
 // [v2.1] tema
 theme(el){const t=el.dataset.i;try{t?localStorage.setItem(THK,t):localStorage.removeItem(THK)}catch(e){}applyTheme(t)}
});

// ===== CLIQUES E TECLAS =====
// [v1.6] descobre em qual aba de espécie foi o clique (para várias espécies abertas ao mesmo tempo)
["click","keydown"].forEach(ev=>document.addEventListener(ev,e=>{const w=e.target.closest&&e.target.closest("[data-sp]");V.ow=w?w.dataset.sp:null},true));   // qual espécie (aba) recebeu o clique/tecla
// [v1.0] um só "ouvinte" de cliques chama a ação do botão (data-a): toque em data-a="nome" → A.nome
document.addEventListener("click",e=>{const el=e.target.closest("[data-a]");if(el&&A[el.dataset.a]){if(el.type!=="checkbox")e.preventDefault&&0;A[el.dataset.a](el)}});
// deslizar com o dedo: a tela acompanha o gesto e troca com animação suave
// [v2.0?] deslizar entre as abas principais (Grupos, Painel, Agenda, Contagem) e para voltar
let tx=0,ty=0,tt=0,mode=0;   // mode: 0 = indefinido, 1 = horizontal, -1 = vertical/ignorar
const MAIN=["g","p","a","c"];
const swTarget=dx=>{const i=MAIN.indexOf(V.tab);if(i<0)return dx>0?"back":null;if(!i&&(V.g||V.u))return dx>0?"back":null;return MAIN[i+(dx<0?1:-1)]||null};
pane.addEventListener("touchstart",e=>{const t=e.touches[0];tx=t.clientX;ty=t.clientY;tt=Date.now();mode=e.target.closest("input,textarea,select,.hd")?-1:0;pane.style.transition="none"},{passive:true});
pane.addEventListener("touchmove",e=>{
 const t=e.touches[0],dx=t.clientX-tx,dy=t.clientY-ty;
 if(!mode&&(Math.abs(dx)>10||Math.abs(dy)>10))mode=Math.abs(dx)>Math.abs(dy)*1.5?1:-1;
 if(mode!==1)return;
 pane.style.transform=`translateX(${dx*(swTarget(dx)?0.55:0.12)}px)`;   // sem destino: só uma leve resistência
 pane.style.opacity=1-Math.min(Math.abs(dx)/500,0.4);
},{passive:true});
function release(e){
 if(mode!==1)return;
 const dx=(e.changedTouches?e.changedTouches[0].clientX:tx)-tx,alvo=swTarget(dx),rapido=Math.abs(dx)/(Date.now()-tt+1)>0.5;
 if(alvo&&(Math.abs(dx)>90||(rapido&&Math.abs(dx)>40))){
  pane.style.transition="transform .16s ease-in,opacity .16s ease-in";   // sai deslizando...
  pane.style.transform=`translateX(${dx<0?-70:70}px)`;pane.style.opacity=0;
  setTimeout(()=>{pane.style.transition="none";pane.style.transform="";pane.style.opacity="";   // ...e a nova tela entra
   if(alvo==="back")A.navback();else go(alvo)},160);
 }else{pane.style.transition="transform .28s cubic-bezier(.2,.8,.2,1),opacity .28s";pane.style.transform="";pane.style.opacity=""}   // volta suavemente
 mode=0;
}
pane.addEventListener("touchend",release,{passive:true});
pane.addEventListener("touchcancel",release,{passive:true});
// ----- [v2.1] botão/gesto "voltar" do Android: fecha janela, menu ou volta de tela -----
const modalOn=()=>$("#modal").classList.contains("on");
const canBack=()=>modalOn()||!$("#menu").hidden||V.tab!=="g"||!!(V.g||V.u);
let skipPop=0;
function syncHist(){const st=history.state&&history.state.app;if(canBack()&&!st)history.pushState({app:1},"");else if(!canBack()&&st&&!skipPop){skipPop=1;history.back()}}
addEventListener("popstate",()=>{if(skipPop){skipPop=0;syncHist();return}if(modalOn())closeM();else if(!$("#menu").hidden)closeMenu();else if(canBack())A.navback();syncHist()});
// ----- [v2.1] tema: automático (segue o celular), claro ou escuro -----
function applyTheme(t){const r=document.documentElement;if(t)r.dataset.theme=t;else delete r.dataset.theme;
 const dk=t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches),m=$('meta[name="theme-color"]');if(m)m.content=dk?"#0a1610":"#12301f";
 document.querySelectorAll("#thm button").forEach(b=>b.classList.toggle("on",b.dataset.i===(t||"")))}
const temaAtual=()=>{try{return localStorage.getItem(THK)||""}catch(e){return""}};
try{matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>applyTheme(temaAtual()))}catch(e){}

// ===== INÍCIO (primeira vez que a tela é desenhada) =====
applyTheme(temaAtual());   // [v2.1]
render();   // [v1.0]
syncUI();if(SY.on)syncLater(700);   // [v2.3] sincroniza logo ao abrir (se o acesso do Google ainda vale)

// ===== MODO OFFLINE / INSTALÁVEL (registra o service worker) =====
// [v1.1] registra o sw.js para o app funcionar sem internet
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
