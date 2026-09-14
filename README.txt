WORKDAY TRACKER — iPhone PWA setup

Upload all files/folders in this package to the root of the GitHub Pages repository:
- index.html
- manifest.json
- service-worker.js
- icons/icon-180.png
- icons/icon-192.png
- icons/icon-512.png

After GitHub Pages publishes, open the HTTPS site on iPhone in Safari and use:
Share -> Add to Home Screen -> Open as Web App -> Add.

The notification button in this build requests iPhone web-app notification permission.
Remote push notifications (including delivery when the app is not open) require a push server/VAPID subscription endpoint; that is the next integration step.
