import _ from 'lodash'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Avatar } from 'views/components/etc/avatar'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { modifyObject } from 'subtender'

import { PTyp } from '../ptyp'
import Slider from '../assets/rc-slider.min'
import { mapDispatchToProps } from '../store'
import {
  getControlLockFuncSelector,
  getMarginMagicFuncSelector,
} from '../selectors'

class ShipAvatarControlImpl extends PureComponent {
  static propTypes = {
    mstId: PTyp.number.isRequired,
    controlLock: PTyp.bool.isRequired,
    toggleControlLock: PTyp.func.isRequired,
    marginMagic: PTyp.object.isRequired,
    // note: avoid using this directly, use this.modifyMarginMagic instead.
    modifyMarginMagic: PTyp.func.isRequired,
  }

  modifyMarginMagic = which => newVal => {
    const {mstId, controlLock, modifyMarginMagic} = this.props
    modifyMarginMagic(
      mstId,
      controlLock ? _.flow(
        modifyObject('normal', () => newVal),
        modifyObject('damaged', () => newVal)
      ) : modifyObject(which, () => newVal)
    )
  }

  render() {
    const {mstId, controlLock, toggleControlLock, marginMagic} = this.props
    const height = 60
    const width = Math.round(height*1.85)
    return (
      <div
        style={{
          marginLeft: 10,
          marginTop: 5,
          display: 'grid',
          grid: `auto / ${width}px 6em 5em 1fr `,
          alignItems: 'center',
        }}
        className="avatar-contrl">
        <div
          style={{
            gridArea: '1 / 1 / span 1 / span 1',
            zIndex: -1,
          }}
        >
          <Avatar
            mstId={mstId} height={60}
            marginMagic={marginMagic.normal}
          />
        </div>
        <div
          style={{
            gridArea: '2 / 1 / span 1 / span 1',
            zIndex: -1,
          }}
        >
          <Avatar
            mstId={mstId} height={60} isDamaged
            marginMagic={marginMagic.damaged}
          />
        </div>
        <Button
          onClick={() => toggleControlLock(mstId)}
          style={{
            gridArea: '1 / 2 / span 2 / span 1',
            justifySelf: 'center', alignSelf: 'center',
            height: '3em',
          }}
        >
          <FontAwesome name={controlLock ? 'link' : 'unlink'} />
        </Button>
        <div
          style={{
            gridArea: '1 / 3 / span 1 / span 1',
            fontWeight: 'bold',
            fontSize: '120%',
          }}
        >
          {marginMagic.normal}
        </div>
        <div
          style={{
            gridArea: '2 / 3 / span 1 / span 1',
            fontWeight: 'bold',
            fontSize: '120%',
          }}
        >
          {marginMagic.damaged}
        </div>
        <Slider
          style={{
            gridArea: '1 / 4 / span 1 / span 1',
          }}
          value={marginMagic.normal}
          onChange={this.modifyMarginMagic('normal')}
          min={0}
          max={2}
          step={0.001}
        />
        <Slider
          style={{
            gridArea: '2 / 4 / span 1 / span 1',
          }}
          value={marginMagic.damaged}
          onChange={this.modifyMarginMagic('damaged')}
          min={0}
          max={2}
          step={0.001}
        />
      </div>
    )
  }
}

const ShipAvatarControl = connect(
  (state, props) => {
    const {mstId} = props
    return {
      controlLock: getControlLockFuncSelector(state)(mstId),
      marginMagic: getMarginMagicFuncSelector(state)(mstId),
    }
  },
  mapDispatchToProps
)(ShipAvatarControlImpl)

export { ShipAvatarControl }
