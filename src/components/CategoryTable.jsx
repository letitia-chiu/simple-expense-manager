import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, handleDelete } from '../utils/helpers'
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

function CategoryRow({ category }) {
  const [isDeleted, setIsDeleted] = useState(false)

  // const deleteRecordAsync = async (id) => {
  //   try {
  //     const res = await deleteRecord(id)
  //     if (res.success) {
  //       setIsDeleted(true)
  //       toast('success', 'Delete record successfully')
  //     } else {
  //       // Handle error message
  //       const message = res.message || ''
  //       toast('error', 'Failed to delete record', message)
  //     }
  //   } catch (err) {
  //     toast('error', err)
  //   }
  // }

  // ** If row has been deleted, return nothing
  if (isDeleted) return

  return (
    <Tr>
      <Td>
        <StyledCell>
          {category.name}
        </StyledCell>
      </Td>
      <Td>
        <StyledCell justify="space-around">
          <Link to={`/category/${category.id}/edit`}>
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

function CategoryTable({ categories }) {
  // ** Define columns
  const columns = [
    { name: 'Category Name' },
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
            {categories.map(c => (
              <CategoryRow key={c.id} category={c} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Wrapper>
  )
}

export default CategoryTable
