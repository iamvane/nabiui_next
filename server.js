const { createServer } = require('http')
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const compression = require('compression');
const server = express();

server.use(compression());

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname === '/sw.js' || pathname.startsWith('/workbox-')) {
      const filePath = join(__dirname, '.next', pathname)
      app.serveStatic(req, res, filePath)
    } else {
      handle(req, res, parsedUrl)
    }
  });
  server.use((req, res, next) => {
    const hostname = req.hostname === 'www.nabimusic.com' ? 'nabimusic.com' : req.hostname;

    if (req.headers['x-forwarded-proto'] === 'http' || req.hostname === 'www.app.domain.com') {
      res.redirect(301, `https://${hostname}${req.url}`);
      return;
    }

    res.setHeader('strict-transport-security', 'max-age=31536000; includeSubDomains; preload');
    next();
  });

  server.get('*', (req, res) => handle(req, res));

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});
