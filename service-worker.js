self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) {}
  const title = data.title || 'My WorkDay';
  const options = {
    body: data.body || 'WorkDay notification',
    icon: './icons/icon-180.png',
    badge: './icons/icon-180.png',
    data: { url: data.url || './' },
    tag: data.tag || 'my-workday'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || './';
  event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list => {
    for (const client of list) if ('focus' in client) return client.focus();
    return clients.openWindow(url);
  }));
});
