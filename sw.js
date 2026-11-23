// Service worker: guarda os arquivos do app no aparelho para funcionar offline.
// IMPORTANTE: sempre que você alterar qualquer arquivo do app, troque o número
// da versão abaixo (diario-v3 -> diario-v3 ...). Sem isso o celular continua
// mostrando a versão antiga guardada.
const CACHE = "diario-v3";
const ARQUIVOS = [
  "./", "index.html", "style.css", "app.js",
  "manifest.webmanifest", "icon-192.png", "icon-512.png"
];

// Instalação: baixa e guarda todos os arquivos.
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)));
  self.skipWaiting();
});

// Ativação: apaga guardados de versões antigas.
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(nomes.filter((n) => n !== CACHE).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Pedidos: responde com o que está guardado; se não tiver, busca na internet.
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
