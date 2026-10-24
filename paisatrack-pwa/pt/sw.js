const V='pt-v1',FILES=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method==='POST'&&u.pathname.endsWith('/share-target')){e.respondWith((async()=>{const fd=await r.formData(),f=fd.get('shot'),c=await caches.open('shared');if(f)await c.put('shared-shot',new Response(f));return Response.redirect(new URL('index.html?shared=1',self.registration.scope).href,303)})());return}
 if(r.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(x=>{const k=x.clone();caches.open(V).then(c=>c.put(r,k));return x}).catch(()=>caches.match(r,{ignoreSearch:true})))});
