/* Bump BUILD for every published change to index.html/manifest/icons. */
'use strict';
const BUILD='1.10.0-20261109-1';
const PREFIX='cardfolio-shell:'+encodeURIComponent(self.registration.scope)+':';
const CACHE=PREFIX+BUILD;
const ROOT=new URL('./',self.registration.scope);
const FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];
const ALLOWED=new Set(FILES.map(path=>new URL(path,ROOT).href));
self.addEventListener('install',event=>{
 // Atomic precache; a failed download leaves the old active version in place.
 event.waitUntil((async()=>{const cache=await caches.open(CACHE);try{await cache.addAll(FILES.map(path=>new Request(new URL(path,ROOT),{cache:'reload'})))}catch(err){await caches.delete(CACHE);throw err}})());
 // A new worker waits until the user installs the update or all old tabs close.
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);await self.clients.claim()})());
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==ROOT.origin)return;
 // Only exact application files are cached. JSON, exports, arbitrary downloads,
 // other paths, requests with queries and all POSTs pass straight through.
 if(request.mode==='navigate'&&(url.pathname===ROOT.pathname||url.pathname===ROOT.pathname+'index.html')){
  event.respondWith((async()=>{const cache=await caches.open(CACHE);const shell=await cache.match(new URL('./index.html',ROOT).href);return shell||fetch(request)})());return;
 }
 if(url.search||!ALLOWED.has(url.href))return;
 event.respondWith((async()=>{const cache=await caches.open(CACHE);return await cache.match(request)||fetch(request)})());
});
