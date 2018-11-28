const server = require('fastify')()
const fetch = require('node-fetch')

let latest
let lastDate

const check = async () => {
  console.log('Refreshing!')
  const init = lastDate ? { headers: { 'If-Modified-Since': lastDate.toGMTString() } } : {}
  const res = await fetch('https://api.github.com/repos/Bjornskjald/miscord/releases/latest', init)
  if (res.status === 304) return console.log('304')
  const json = await res.json()
  latest = json.name
  console.log('Setting latest:', json.name)
  lastDate = new Date()
}

check()
setInterval(check, 5000)

const getURL = (ver, os) => `https://github.com/miscord/miscord/releases/download/v${ver}/miscord-${ver}-${os}.zip`

server.get('/linux.zip', async (req, res) => res.redirect(getURL(latest, 'linux')))
server.get('/linux32.zip', async (req, res) => res.redirect(getURL(latest, 'linux32')))
server.get('/mac.zip', async (req, res) => res.redirect(getURL(latest, 'mac')))
server.get('/macapp.zip', async (req, res) => res.redirect(getURL(latest, 'macapp')))
server.get('/win.zip', async (req, res) => res.redirect(getURL(latest, 'win')))
server.get('/win32.zip', async (req, res) => res.redirect(getURL(latest, 'win32')))

server.listen(8833)