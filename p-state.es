import { ensureDirSync, readJsonSync, writeJsonSync } from 'fs-extra'
import { join } from 'path-extra'

const latestVersion = '0.0.1'

const extStateToPState = ({ui, shipAvatar}) => ({
  ui,
  shipAvatar,
  $version: latestVersion,
})

const getPStateFilePath = () => {
  const {APPDATA_PATH} = window
  const path = join(APPDATA_PATH,'avatar-adjuster')
  ensureDirSync(path)
  return join(path,'p-state.json')
}

const savePState = pState => {
  const path = getPStateFilePath()
  try {
    writeJsonSync(path,pState)
  } catch (err) {
    console.error('Error while writing to p-state file', err)
  }
}

const updatePState = oldPState => {
  if (oldPState.$version === latestVersion)
    return oldPState
  // eslint-disable-next-line prefer-const
  let newPState = oldPState

  if (newPState.$version === latestVersion) {
    setTimeout(() => savePState(newPState))
    return newPState
  }

  throw new Error('failed to update the p-state')
}

const loadPState = () => {
  try {
    return updatePState(readJsonSync(getPStateFilePath()))
  } catch (err) {
    if (err.syscall !== 'open' || err.code !== 'ENOENT') {
      console.error('Error while loading config', err)
    }
  }
  return null
}

export { extStateToPState, savePState, loadPState }
