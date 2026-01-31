// הוסיפי את זה בראש הקובץ sw.js
/* eslint-disable */

const CACHE_NAME = "game-cache-v1";

self.addEventListener('install', (event) => {
    // מדלג על המתנה כדי שהעדכון יקרה מיד
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // כאן התיקון - לפעמים clients עובד ישירות בלי self
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});