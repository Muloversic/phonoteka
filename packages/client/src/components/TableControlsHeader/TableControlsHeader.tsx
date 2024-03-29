import React, { useState } from 'react'
import { ActionButton } from '../UI/MuiUI/Buttons.styled/ActionButton.styled'
import CreateBandModal from '../Modals/CreateBandModal/CreateBandModal'
import CreateTrackModal from '../Modals/CreateTrackModal/CreateTrackModal'

const TableControlsHeader = () => {
  const [openCreateBand, setOpenCreateBand] = useState<boolean>(false)
  const [openCreateTrack, setOpenCreateTrack] = useState<boolean>(false)
  return (
    <div className="table-controls-header">
      <ActionButton onClick={() => setOpenCreateBand(true)}>Create band</ActionButton>
      <ActionButton onClick={() => setOpenCreateTrack(true)}>Create track</ActionButton>
      <CreateBandModal handleCloseModal={setOpenCreateBand} openModal={openCreateBand} />
      {openCreateTrack && (
        <CreateTrackModal handleCloseModal={setOpenCreateTrack} openModal={openCreateTrack} />
      )}
    </div>
  )
}

export default TableControlsHeader
