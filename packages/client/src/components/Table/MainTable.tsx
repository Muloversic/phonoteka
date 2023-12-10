import React, { useState, useEffect } from 'react'
import { Table } from '@mui/material'

import { useMainTable } from './useMainTable'

import TableHeadContent from './TableComponents/TableHeadContent'
import TableBodyContent from './TableComponents/TableBodyContent'
import AdditionalTableHeader from './TableComponents/AdditionalTableHeader'
import RemoveTableModalWindow from './TableComponents/RemoveTableModalWindow'

import { ETableSort } from '../../variables/eNums'
import { rowsData, IRowData } from '../../variables/testFetchData'

import {
  MainTableContainer,
  MainTablePagination,
} from '../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'

const MainTable = () => {
  const { stableSort, getComparator } = useMainTable()

  const [orderDirection, setOrderDirection] = useState<ETableSort>(ETableSort.asc)
  const [valueToOrderBy, setValueToOrderBy] = useState<string>('name')
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [page, rowsPerPage])

  // handles for table sorting

  const handleRequestSort = (event: React.MouseEvent, property: string) => {
    const isAscending: boolean = valueToOrderBy === property && orderDirection === ETableSort.asc
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? ETableSort.desc : ETableSort.asc)
  }

  // handles for table pagination

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }

  // handles for table checkboxes

  const handleSelectedAllClick = (checked: boolean) => {
    if (checked) {
      const newSelectedCheckbox = rowsData.map(item => item.id)
      setSelectedCheckbox(newSelectedCheckbox)
    } else {
      setSelectedCheckbox([])
    }
  }

  const handleCheckboxClick = (checked: boolean, itemId: number) => {
    if (checked) {
      setSelectedCheckbox(prevSelected => [...prevSelected, itemId])
    } else {
      setSelectedCheckbox(prevSelected => prevSelected.filter(id => id !== itemId))
    }
  }

  // handles for modal window

  const handleOpenModalWindow = () => {
    setOpenModal(true)
  }

  const handleCloseModalWindow = () => {
    setOpenModal(false)
  }

  const handleAgreeRemoveItems = () => {
    handleCloseModalWindow()
    alert('Need delete items on server')
  }

  // data from server after sorting with pagination

  // this will be simplified in future with right backend data - .slice + comparator
  const tableRowData: IRowData[] = stableSort(
    rowsData,
    getComparator(orderDirection, valueToOrderBy),
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  // if you need to remove checkboxes for the entire list of data and put them on the current pagination page, throw tableRowData in TableHeadContent instead of rowsData

  return (
    <MainTableContainer>
      <AdditionalTableHeader
        selectedCheckbox={selectedCheckbox}
        handleOpenModalWindow={handleOpenModalWindow}
      />

      <RemoveTableModalWindow
        openModal={openModal}
        handleCloseModalWindow={handleCloseModalWindow}
        handleAgreeRemoveItems={handleAgreeRemoveItems}
      />

      <Table>
        <TableHeadContent
          orderDirection={orderDirection}
          valueToOrderBy={valueToOrderBy}
          handleRequestSort={handleRequestSort}
          rowsData={rowsData}
          selectedCheckbox={selectedCheckbox}
          handleSelectedAllClick={handleSelectedAllClick}
        />
        <TableBodyContent
          tableRowData={tableRowData}
          selectedCheckbox={selectedCheckbox}
          handleCheckboxClick={handleCheckboxClick}
        />
      </Table>
      <MainTablePagination
        rowsPerPageOptions={[10, 15, 20, 50, rowsData.length]}
        component="div"
        count={rowsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        labelRowsPerPage={null}
        showFirstButton={true}
        showLastButton={true}
      />
    </MainTableContainer>
  )
}

export default MainTable
