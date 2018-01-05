import _ from 'lodash'
import { createSelector } from 'reselect'
import { constSelector, extensionSelectorFactory } from 'views/utils/selectors'
import { initState, defaultControlLock, defaultMarginMagic } from './store'

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

window.dumpMarginMagics = () => {
  const {getStore} = window
  const state = getStore()
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(marginMagicsSelector(state)))
}

export {
  shipMstIdsSelector,
  extSelector,
  uiSelector,
  shipAvatarSelector,
  readySelector,
  getControlLockFuncSelector,
  getMarginMagicFuncSelector,
}
