const CACHE_NAME = 'allora-cache-v10';

// Lista de URLs para cache
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/imagens_app/img_versus.png',
  '/imagens_app/lunares.png',
  '/imagens_app/solares.png',
  '/imagens_app/verusX.png',
  '/imagens_app/zap.png',
  '/icons/icon-192.png',
  // Adicione aqui outros arquivos estáticos que você quer cachear
];

// Instalação do Service Worker e cache dos arquivos
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Força o Service Worker a se tornar ativo imediatamente
});

// Ativação do Service Worker e limpeza de caches antigos
self.addEventListener('activate', event => {
  console.log('Service Worker ativo');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  clients.claim(); // Assume o controle de todas as páginas abertas
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna a resposta cacheada ou faz a requisição à rede
        return response || fetch(event.request)
          .catch(() => {
            // Se a requisição falhar (offline), retorna uma resposta genérica
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
            return new Response('Offline: Recurso não disponível', { status: 404 });
          });
      })
  );
});
