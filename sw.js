// Service worker: deixa o app funcionar offline.
// Estratégia "rede primeiro": com internet, sempre busca a versão mais nova dos
// arquivos (e guarda uma cópia); sem internet, usa a cópia guardada.
//
// [v1.1] arquivo criado quando o app ficou independente (instalável e offline).
// O nome do CACHE ganha +1 a cada atualização entregue, para o celular trocar a
// cópia antiga pela nova: diario-v13 corresponde à versão 2.3 do app.
// (Histórico completo de versões: topo do app.js.)
const CACHE = "diario-v13";   // v13: versão 2.3 (conta Google, morfologia externa)
const ARQUIVOS = [
  "./", "index.html", "style.css", "app.js",
  "manifest.webmanifest", "icon-192.png", "icon-512.png"
];

// Instalação: guarda uma cópia de todos os arquivos (ignorando o cache do navegador).
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      c.addAll(ARQUIVOS.map((u) => new Request(u, { cache: "reload" })))
    )
  );
  self.skipWaiting();
});

// Ativação: apaga cópias de versões antigas e assume o controle.
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(nomes.filter((n) => n !== CACHE).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Pedidos: tenta a internet; se der certo, atualiza a cópia; se falhar, usa a cópia.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // [v2.3] pedidos ao Google (login, Drive, Agenda) vão direto pela internet, sem passar pela cópia
  if (new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request.url, { cache: "no-cache" })
      .then((resp) => {
        const copia = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copia));
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});
