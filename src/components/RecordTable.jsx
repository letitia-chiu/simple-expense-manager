import { useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteRecord } from '../api/record'
import { toast, handleDelete } from '../utils/helpers'
import { useApiErr } from '../utils/ApiErrorContext' 
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import StyledCell from './StyledCell'
import EditIcon from '../assets/edit.svg?react'
import DeleteIcon from '../assets/delete.svg?react'
import { 
  Table, Thead, Tbody, Tr, Th, Td,
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'
import toastMsg from '../utils/toast-messages'

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  padding: 0 8% 15vw;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
const ActionButton = styled.div`
  svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.subColor};
    cursor: pointer;
    &:hover {
      fill: ${({ theme }) => theme.mainColor};
    }
  }
`

function HeaderColumn({ column }) {
  return (
    <Th>
      <StyledCell justify={column.justify} width={column.width}>
        {column.name}
      </StyledCell>
    </Th>
  )
}

function RecordRow({ record }) {
  const [isDeleted, setIsDeleted] = useState(false)
  const { apiErrorHandler } = useApiErr()
  const recordTitle = record.title.length > 30 ? record.title.substring(0, 30) + '...' : record.title
  const locale = localStorage.getItem('lang') || 'en'

  const deleteRecordAsync = async (id) => {
    try {
      const res = await deleteRecord(id)
      if (res.success) {
        setIsDeleted(true)
        toast('success', toastMsg.delete[locale]?.success || 'Delete successfully')
      } else {
        apiErrorHandler(res, toastMsg.delete[locale]?.fail || 'Failed to delete')
      }
    } catch (err) {
      toast('error', err)
    }
  }

  // ** If row has been deleted, return nothing
  if (isDeleted) return

  return (
    <Tr>
      <Td>
        <StyledCell justify="center">
          {dayjs(record.date).format('M/D')}
        </StyledCell>
      </Td>
      <Td>
        <StyledCell>
          {recordTitle}
        </StyledCell>
      </Td>
      <Td>
        <StyledCell justify="center">
          {record.Category?.name || '(Uncategorized)'}
          </StyledCell>
      </Td>
      <Td>
        <StyledCell justify="center">
          {record.amount}
          </StyledCell>
      </Td>
      <Td>
        <StyledCell justify="space-around">
          <Link to={`/${record.isIncome ? 'income' : 'expense'}/${record.id}/edit`}>
            <ActionButton><EditIcon /></ActionButton>
          </Link>
          <ActionButton 
            onClick={() => handleDelete?.(record.id, deleteRecordAsync, locale)}
          >
            <DeleteIcon />
          </ActionButton>
        </StyledCell>
      </Td>
    </Tr>
  )
}

// ******** Main Function ******** //

function RecordTable({ records }) {
  // ** Define columns
  const columns = [
    { name: <FormattedMessage id="col.date" defaultMessage="Date"/>, justify: 'center' },
    { name: <FormattedMessage id="col.title" defaultMessage="Title"/>, width: '15vw' },
    { name: <FormattedMessage id="col.category" defaultMessage="Category"/>, justify: 'center' },
    { name: <FormattedMessage id="col.amount" defaultMessage="Amount"/>, justify: 'center' },
    { name: <FormattedMessage id="col.action" defaultMessage="Actions"/>, justify: 'center' }
  ]

  // ******** JSX return ******** //
  return (
    <Wrapper>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {columns.map((c, index) => (
              <HeaderColumn key={index} column={c} />
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {records.map(r => (
            <RecordRow key={r.id} record={r} />
          ))}
        </Tbody>
      </Table>
    </Wrapper>
  )
}

export default RecordTable
