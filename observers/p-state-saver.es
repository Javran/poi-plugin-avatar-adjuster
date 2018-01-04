import _ from 'lodash'
import shallowEqual from 'shallowequal'
import {
  createSelector,
  createStructuredSelector,
} from 'reselect'
import { observer } from 'redux-observers'

import { extStateToPState, savePState } from '../p-state'
import {
  extSelector,
  readySelector,
} from '../selectors'

const pStateSelector = createSelector(
  extSelector,
  ext => extStateToPState(ext)
)

const debouncedSavePState = _.debounce(
  pState => setTimeout(() => savePState(pState)),
  500
)

const pStateSaver = observer(
  createStructuredSelector({
    ready: readySelector,
    pState: pStateSelector,
  }),
  (_dispatch, cur, prev) => {
    if (!cur.ready)
      return
    if (!shallowEqual(cur.pState, prev.pState)) {
      debouncedSavePState(cur.pState)
    }
  }
)

export { pStateSaver }
