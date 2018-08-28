import {
  modifyObject, not,
  mkSimpleReducer,
} from 'subtender'
import { bindActionCreators } from 'redux'
import { store } from 'views/create-store'

const defaultControlLock = true
const defaultMarginMagic = {normal: 0.555, damaged: 0.555}
const defaultBacks = 0

const initState = {
  ui: {
    // controlLocks[mstId] = <boolean>, default to true
    controlLocks: {},
  },
  shipAvatar: {
    // marginMagics[mstId] = {normal, damaged}, default to defaultMarginMagic
    marginMagics: {},
    // backs[mstId] = <number>, default to defaultBacks
    backs: {},
  },
}

const tyReady = '@@poi-plugin-avatar-adjuster@Ready'
const tyModify = '@@poi-plugin-avatar-adjuster@Modify'

const reducer = mkSimpleReducer(
  initState,
  tyModify,
  tyReady,
)

const actionCreators = {
  ready: newState => ({
    type: tyReady,
    newState,
  }),
  modify: modifier => ({
    type: tyModify,
    modifier,
  }),
  toggleControlLock: mstId =>
    actionCreators.modify(
      modifyObject(
        'ui',
        modifyObject(
          'controlLocks',
          modifyObject(
            mstId, not
          )
        )
      )
    ),
  modifyMarginMagic: (mstId, modifier) =>
    actionCreators.modify(
      modifyObject(
        'shipAvatar',
        modifyObject(
          'marginMagics',
          modifyObject(
            mstId, (data = defaultMarginMagic) => modifier(data)
          )
        )
      )
    ),
  modifyBacks: (mstId, data) =>
    actionCreators.modify(
      modifyObject(
        'shipAvatar',
        modifyObject(
          'backs',
          modifyObject(
            mstId, () => data
          )
        )
      )
    ),
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const boundActionCreators =
  mapDispatchToProps(store.dispatch)

export {
  initState,
  defaultControlLock,
  defaultMarginMagic,
  defaultBacks,
  reducer,
  actionCreators,
  mapDispatchToProps,
  boundActionCreators,
}
