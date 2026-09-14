const CACHE='workday-tracker-pwa-v1';
const ASSETS=['./','./index.html','./manifest.json','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return res}).catch(()=>caches.match('./index.html')))));
self.addEventListener('push',e=>{
  let data={title:'WorkDay Tracker',body:'You have a WorkDay update.'};
  try{if(e.data)data=e.data.json()}catch(_){if(e.data)data.body=e.data.text()}
  e.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:'./icons/icon-192.png',badge:'./icons/icon-180.png',data:data.data||{}}));
});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus' in c)return c.focus()}return clients.openWindow('./')}));});
