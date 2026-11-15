/* Servis çalışanı: uygulamayı telefona kurulabilir yapar ve internetsiz çalıştırır.
   - Uygulamanın kendi dosyaları kurulumda önbelleğe alınır (sesler dahil).
   - PDF'ler ve yazı tipleri ilk açıldıklarında önbelleğe alınır; sonra internetsiz açılır.
   - 3D modelleri uygulamanın kendisi ayrıca saklar (bp3d-v2).
   Uygulamayı güncellediğinde aşağıdaki SURUM değerini değiştir; telefonlar yeni dosyaları alır. */
const SURUM = 'anatomia-v4';
const KABUK = ['./', 'index.html', 'kaslar.js', 'kaynaklar.js', 'model3d.js', 'yerler.js', 'pdf/liste.js',
  'manifest.webmanifest', 'ikon/ikon-192.png', 'ikon/ikon-512.png', 'sesler1.js', 'sesler2.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SURUM).then(c => Promise.all(KABUK.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('anatomia-') && k !== SURUM).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const kendi = url.origin === self.location.origin;
  const yazitipi = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!kendi && !yazitipi) return;                 // 3D modeller vb.: uygulama kendi yönetir
  if (req.headers.has('range')) return;            // PDF görüntüleyicinin parça istekleri doğrudan ağa gitsin
  const sayfa = kendi && (req.mode === 'navigate' || /\.(html|js|webmanifest)$/.test(url.pathname));
  e.respondWith((async () => {
    const cache = await caches.open(SURUM);
    const hit = await cache.match(req, { ignoreSearch: kendi });
    const agdan = () => fetch(req).then(r => { if (r && r.ok && r.status === 200) cache.put(req, r.clone()).catch(() => {}); return r; });
    if (sayfa) {                                    // uygulama dosyaları: önce ağ (güncel kalsın), olmazsa önbellek
      try { return await agdan(); } catch (err) { if (hit) return hit; throw err; }
    }
    return hit || agdan();                          // PDF, simge, yazı tipi: önce önbellek
  })());
});
