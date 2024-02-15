import { Link, useNavigate } from 'react-router-dom'
import { deleteRecord } from '../api/record'
import { toast, handleDelete } from '../utils/helpers'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import StyledCell from './StyledCell'
import EditIcon from '../assets/edit.svg?react'
import DeleteIcon from '../assets/delete.svg?react'
import { 
  Table, Thead, Tbody, Tr, Th, Td, TableContainer 
} from '@chakra-ui/react'

const Wrapper = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: center;
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
  const navigate = useNavigate()
  const deleteRecordAsync = async () => {
    try {
      const res = await deleteRecord(recordId)
      if (res.success) {
        toast('success', 'Delete record successfully')
        return navigate(`/${type}`)
      } else {
        // Handle error message
        const message = res.message || ''
        toast('error', 'Failed to delete record', message)
      }
    } catch (err) {
      toast('error', err)
    }
  }

  return (
    <Tr>
      <Td>
        <StyledCell justify="center">
          {dayjs(record.date).format('M/D')}
        </StyledCell>
      </Td>
      <Td>
        <StyledCell>
          {record.title}
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
            onClick={() => handleDelete?.(record.id, deleteRecordAsync)}
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
    { name: 'Date', justify: 'center' },
    { name: 'Title', width: '15vw' },
    { name: 'Category', justify: 'center' },
    { name: 'Amount', justify: 'center' },
    { name: 'Actions', justify: 'center' }
  ]

  // ******** JSX return ******** //
  return (
    <Wrapper>
      <TableContainer w="100%" maxWidth="960px">
        <Table variant='simple'>
          <Thead>
            <Tr>
              {columns.map(c => (
                <HeaderColumn key={c.name} column={c} />
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {records.map(r => (
              <RecordRow key={r.id} record={r} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  )
}

export default RecordTable
