import { useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCategory } from '../api/category'
import { useApiErr } from '../utils/ApiErrorContext' 
import { toast, handleDelete } from '../utils/helpers'
import styled from '@emotion/styled'
import StyledCell from './StyledCell'
import EditIcon from '../assets/edit.svg?react'
import DeleteIcon from '../assets/delete.svg?react'
import { 
  Table, Thead, Tbody, Tr, Th, Td, TableContainer 
} from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'
import toastMsg from '../utils/toast-messages'

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
  const { apiErrorHandler } = useApiErr()
  const locale = localStorage.getItem('lang') || 'en'

  const deleteCategoryAsync = async (id) => {
    try {
      const res = await deleteCategory(id)
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
            onClick={() => handleDelete?.(category.id, deleteCategoryAsync, locale)}
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
    { name: <FormattedMessage id="col.categoryName" defaultMessage="Category name"/> },
    { name: <FormattedMessage id="col.action" defaultMessage="Actions"/>, justify: 'center' }
  ]

  // ******** JSX return ******** //
  return (
    <Wrapper>
      <TableContainer w="100%" maxWidth="960px">
        <Table variant='simple'>
          <Thead>
            <Tr>
              {columns.map((c, index) => (
                <HeaderColumn key={index} column={c} />
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
