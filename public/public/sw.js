if(!self.define){const s=async s=>{if("require"!==s&&(s+=".js"),!n[s]&&(await new Promise(async e=>{if("document"in self){const n=document.createElement("script");n.src=s,document.head.appendChild(n),n.onload=e}else importScripts(s),e()}),!n[s]))throw new Error(`Module ${s} didn’t register its module`);return n[s]},e=async(e,n)=>{const i=await Promise.all(e.map(s));n(1===i.length?i[0]:i)};e.toUrl=s=>`./${s}`;const n={require:Promise.resolve(e)};self.define=(e,i,c)=>{n[e]||(n[e]=new Promise(async n=>{let r={};const o={uri:location.origin+e.slice(1)},a=await Promise.all(i.map(e=>"exports"===e?r:"module"===e?o:s(e))),t=c(...a);r.default||(r.default=t),n(r)}))}}define("./sw.js",["./workbox-eb42688b"],(function(s){"use strict";s.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/_app.js",revision:"5dd475df10c9af03cf6201128e0c1e4f"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/_error.js",revision:"fff08caec50689c517ff9b807ec2f53f"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/about-us.js",revision:"32385d339540656efe62811ef37da4b3"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/account-recovery.js",revision:"e05059e1444d4b9449dba28a61f8aaa4"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/application-list/[id].js",revision:"e1267836bdaa1ba2685009b10618470a"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/book-lessons/[id].js",revision:"aa2fb62684202e58869d18fd458a7bbd"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/build-profile/[step].js",revision:"971214bcd106a8b26819c78096d9e18e"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/build-request/[step].js",revision:"e7d7b845fdade3fab4241edd228b93db"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/contact-us.js",revision:"085b3de6265c0fa8d5af2a8cb4411e6f"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/dashboard.js",revision:"87fbddd40eec63632fdd9fe4bcc1c4f4"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/faq-instructors.js",revision:"a6c769af62369aebac8c8eadf8f06295"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/faq-parents-students.js",revision:"439c1f0274ea469ceda2158598a0dda0"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/forgot-password.js",revision:"b2a2cc8f67c3174114789dc99f4785c1"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/forgot-password/[token].js",revision:"f2a2a17f47e45d328de57979bcd75b0e"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/grade-lesson.js",revision:"26397169a3b9f9021b1aa3bae1ac119b"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/how-it-works-instructors.js",revision:"922af7d820549515439abb8ff2e07500"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/how-it-works-parents-students.js",revision:"1a58942185b5e07b215f0f2f2ba13fed"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/index.js",revision:"485f6ec2e578e69f930bcbc15bd127d0"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/instructor-policy.js",revision:"b49ef570beb602cc0a1621b50cc5bac0"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/instructors.js",revision:"2be4020d394ca3b97c9aeb45d3f82bbe"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/lesson-packages.js",revision:"32c9f43d4a1eabf1b29d2fbf4395c358"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/login.js",revision:"387a2f643789c9b7e2756f659ada364f"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/privacy-policy.js",revision:"ad6985e21d9f49638467e464a93c1fa7"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/profile/[id].js",revision:"3a5eb370df9ca5e4402a2c576d6d382c"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/referral/[token].js",revision:"11b31d15656f019b890eb7b2bf43a79d"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/registration-instructor.js",revision:"2a967e52a5848cc8f5cae2aab08e9f1e"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/registration-parent-student.js",revision:"055a755a9444b659b17aa73e0e888dfb"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/registration-parent.js",revision:"b77ae898057e8cf4c3e30cc4ffe1a541"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/registration-student.js",revision:"c1ea4031b6d3e09e676db1f512c86d76"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/registration.js",revision:"094baf0e455a748a452f8da544e2ccf7"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/request/[id].js",revision:"00d3d4e48251970385522687fcbdc13b"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/requests.js",revision:"ee0ae54daef9a3fd2db1f6188bbafa22"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/student-policy.js",revision:"5c62a9ff0a47ffe556078ff5f6dde0f3"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/terms-of-use.js",revision:"7120c6ac668907b2d136504e550a7485"},{url:"/_next/static/U_PgL7c61sjQ9uno0QBIr/pages/vetting-process.js",revision:"89410a853328367a1a9b9c6b37f9f8a9"},{url:"/_next/static/chunks/40.839890bd16ba11a59d03.js",revision:"f68f8bb17b1237234251541710129fb0"},{url:"/_next/static/chunks/41.2171b07340043686e592.js",revision:"d5fd3e71d74330ce40e08f5e6453a31c"},{url:"/_next/static/chunks/42.0cfe1353d6394a336414.js",revision:"e3f23d03945033b7800b2782b068ab99"},{url:"/_next/static/chunks/43.70e88e7d614acee6fd82.js",revision:"cb3ffdfe27f16ce01fc6a81029ff906a"},{url:"/_next/static/chunks/44.412a1cb01ad02221f6c9.js",revision:"96e2d3ec91e3f841344e5259da122bfb"},{url:"/_next/static/chunks/45.2e3cc61c53f5ffbfdd1b.js",revision:"6254c8f23af59eb64013c471617f703a"},{url:"/_next/static/chunks/46.22202dae4791c80dd6db.js",revision:"ddffe50deb096c96c3713ef597d881e6"},{url:"/_next/static/chunks/47.274174fca91978e8473d.js",revision:"2dcf80835a5cb7c63d77501def467647"},{url:"/_next/static/chunks/48.35c6209735e92d4dc2b7.js",revision:"c78a87172b4deed4c300a6f894554da1"},{url:"/_next/static/chunks/commons.02f87d16fd0fd2ed27e8.js",revision:"2942b20573344a75b33acc354c32fd7c"},{url:"/_next/static/chunks/styles.6e134c5b5d218dad8969.js",revision:"f959828b27ad1e187ffbbe370e9f0d78"},{url:"/_next/static/css/styles.28147022.chunk.css",revision:"86cf2c8c04530e864d2a5638ff460a97"},{url:"/_next/static/css/styles.28147022.chunk.css.map",revision:"d8afda96e6bde241047b96fa07ee5ecc"},{url:"/_next/static/runtime/main-28dd94dd6854eb50e43d.js",revision:"39be963115ebb13f273cc74efc1dca27"},{url:"/_next/static/runtime/polyfills-6189996d8221825e3ca9.js",revision:"77f45a169daa7b8426d0c647abd1fd66"},{url:"/_next/static/runtime/webpack-fc54f61c30711ce0851b.js",revision:"2968fdd0a2cdfec89183e8da790429d5"},{url:"/browserconfig.xml",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/android-icon-144x144.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/android-icon-192x192.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/android-icon-36x36.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/android-icon-48x48.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/android-icon-72x72.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/android-icon-96x96.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-114x114.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-120x120.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-144x144.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-152x152.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-180x180.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-57x57.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-60x60.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-72x72.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-76x76.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon-precomposed.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/apple-icon.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/favicon-16x16.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/favicon-32x32.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/favicon-96x96.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/favicon.ico",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/favicon.svg",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/icon-128x128.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/icon-144x144.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/icon-152x152.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/icon-192x192.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/icon-384x384.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/icon-512x512.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/icon-72x72.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/icon-96x96.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/ms-icon-144x144.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/ms-icon-150x150.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/ms-icon-310x310.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/images/icons/ms-icon-70x70.png",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/manifest.json",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/public/sw.js",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/public/sw.js.map",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/public/workbox-eb42688b.js",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/public/workbox-eb42688b.js.map",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/sw.js",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/sw.js.map",revision:"U_PgL7c61sjQ9uno0QBIr"},{url:"/workbox-eb42688b.js.map",revision:"U_PgL7c61sjQ9uno0QBIr"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new s.CacheFirst({cacheName:"font-awesome",plugins:[new s.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),s.registerRoute(/.*/i,new s.StaleWhileRevalidate({cacheName:"others",plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
//# sourceMappingURL=sw.js.map
