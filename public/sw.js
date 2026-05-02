
self.addEventListener('install', (event) => {
  console.log('Vikas Setu Service Worker installed.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Vikas Setu Service Worker activated.');
});

self.addEventListener('fetch', (event) => {
  // Minimal fetch listener to satisfy PWA installation criteria
});
