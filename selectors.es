import _ from 'lodash'
import { createSelector } from 'reselect'
import { constSelector, extensionSelectorFactory } from 'views/utils/selectors'
import { initState, defaultControlLock, defaultMarginMagic, defaultBacks } from './store'

const shipMstIdsSelector = createSelector(
  constSelector,
  ({$ships}) => {
    const allMstIds = _.values($ships).map(x => x.api_id)
    return allMstIds.filter(
      mstId =>
        // exclude abyssal
        mstId <= 1500 &&
        // exclude special CG
        ('api_sortno' in $ships[mstId])
    )
  }
)

const extSelector = createSelector(
  extensionSelectorFactory('poi-plugin-avatar-adjuster'),
  ext => _.isEmpty(ext) ? initState : ext)

const mkExtPropSelector = _.memoize(propName =>
  createSelector(extSelector, ext => ext[propName]))

const readySelector =
  mkExtPropSelector('ready')

const uiSelector =
  mkExtPropSelector('ui')

const shipAvatarSelector =
  mkExtPropSelector('shipAvatar')

const controlLocksSelector = createSelector(
  uiSelector,
  ui => ui.controlLocks
)

const marginMagicsSelector = createSelector(
  shipAvatarSelector,
  sa => sa.marginMagics
)

const backsSelector = createSelector(
  shipAvatarSelector,
  sa => sa.backs
)

const getControlLockFuncSelector = createSelector(
  controlLocksSelector,
  controlLocks => mstId =>
    (mstId in controlLocks) ? controlLocks[mstId] : defaultControlLock
)

const getMarginMagicFuncSelector = createSelector(
  marginMagicsSelector,
  mm => mstId =>
    (mstId in mm) ? mm[mstId] : defaultMarginMagic
)

const getBacksFuncSelector = createSelector(
  backsSelector,
  (backs = {}) => mstId =>
    (mstId in backs) ? backs[mstId] : defaultBacks
)

window.dumpData = () => {
  const {getStore} = window
  const dump = shipAvatarSelector(getStore())
  if (dump.marginMagics) {
    Object.keys(dump.marginMagics).forEach(key => {
      if (dump.marginMagics[key].damaged === 0.555) {
        delete dump.marginMagics[key].damaged
      }
      if (dump.marginMagics[key].normal === 0.555) {
        delete dump.marginMagics[key].normal
      }
      if (Object.keys(dump.marginMagics[key]).length === 0) {
        delete dump.marginMagics[key]
      }
    })
  }
  if (dump.backs) {
    Object.keys(dump.backs).forEach(key => {
      if (dump.backs[key] === 0) {
        delete dump.marginMagics[key]
      }
    })
  }
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(dump))
}

export {
  shipMstIdsSelector,
  extSelector,
  uiSelector,
  shipAvatarSelector,
  readySelector,
  getControlLockFuncSelector,
  getMarginMagicFuncSelector,
  getBacksFuncSelector,
}
