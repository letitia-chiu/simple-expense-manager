import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import StyledCell from './StyledCell'
import EditIcon from '../assets/edit.svg?react'
import DeleteIcon from '../assets/delete.svg?react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
  const handleDelete = (id) => {
    if (!id) return
    console.log('Delete record id', id)
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
          {record.Category.name}
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
          <ActionButton onClick={() => handleDelete(record.id)}>
            <DeleteIcon />
          </ActionButton>
        </StyledCell>
      </Td>
    </Tr>
  )
}

const columns = [
  {
    name: 'Date',
    justify: 'center'
  },
  {
    name: 'Title',
    width: '15vw'
  },
  {
    name: 'Category',
    justify: 'center'
  },
  {
    name: 'Amount',
    justify: 'center'
  },
  {
    name: 'Actions',
    justify: 'center'
  }
]

function RecordTable({ records }) {
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
