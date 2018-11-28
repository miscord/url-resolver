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

const getURL = os => `https://github.com/miscord/miscord/releases/download/v${latest}/miscord-${latest}-${os}.zip`

server.get('/download/linux.zip', async (req, res) => res.redirect(getURL('linux')))
server.get('/download/linux32.zip', async (req, res) => res.redirect(getURL('linux32')))
server.get('/download/mac.zip', async (req, res) => res.redirect(getURL('mac')))
server.get('/download/macapp.zip', async (req, res) => res.redirect(getURL('macapp')))
server.get('/download/win.zip', async (req, res) => res.redirect(getURL('win')))
server.get('/download/win32.zip', async (req, res) => res.redirect(getURL('win32')))

server.listen(8833)
