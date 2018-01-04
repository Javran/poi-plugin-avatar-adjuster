const { config } = window

const windowURL = `file://${__dirname}/index.html`

const bounds = config.get('plugin.avatarAdjusterWindow.bounds') || {
  x: config.get('poi.window.x', 0),
  y: config.get('poi.window.y', 0),
  width: 850,
  height: 650,
}

const windowOptions = {
  ...bounds,
}

const useEnv = true
const realClose = true

export {
  windowOptions,
  windowURL,
  useEnv,
  realClose,
}
