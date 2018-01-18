import { createStructuredSelector } from 'reselect'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { shipMstIdsSelector } from '../selectors'
import { PTyp } from '../ptyp'
import { ShipAvatarControl } from './ship-avatar-control'
import { UPagination } from './u-pagination'

const itemsPerPage = 20

class AvatarAdjusterImpl extends PureComponent {
  static propTypes = {
    mstIds: PTyp.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
    }
  }

  handleSelectPage = activePage =>
    this.setState({activePage})

  render() {
    const {mstIds} = this.props
    const pageRange = Math.ceil(mstIds.length / itemsPerPage)
    const {activePage} = this.state
    const beginInd = (activePage-1)*itemsPerPage
    const endInd = Math.min(beginInd+itemsPerPage-1, mstIds.length-1)
    const focusingMstIds = mstIds.slice(beginInd, endInd+1)

    const pgComponent = (
      <UPagination
        style={{
          marginBottom: '1em',
          alignSelf: 'center',
        }}
        currentPage={activePage}
        totalPages={pageRange}
        onChange={this.handleSelectPage}
      />
    )

    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {pgComponent}
        {
          focusingMstIds.map(mstId =>
            (<ShipAvatarControl mstId={mstId} key={mstId} />)
          )
        }
        {pgComponent}
      </div>
    )
  }
}

const AvatarAdjuster = connect(
  createStructuredSelector({
    mstIds: shipMstIdsSelector,
  })
)(AvatarAdjusterImpl)

export { AvatarAdjuster }
