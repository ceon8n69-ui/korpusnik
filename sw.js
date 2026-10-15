const C='mast-v3';
const CORE=['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./icon-192.png','./icon-512.png','./mebel/','./plitka/',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.allSettled(CORE.map(u=>c.add(u)))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>(k.startsWith('korpusnik-')||k.startsWith('mast-'))&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url); if(u.pathname.includes('/svarka/')) return; // у «Сварщика» свой service worker
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp)); return res;}).catch(()=>caches.match(r).then(h=>h||caches.match(u.pathname.endsWith('/')?u.pathname+'index.html':'./index.html'))));return;}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp));} return res;})));
});
