import {
  Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon, Box,
  Button, ButtonGroup
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { deleteCategory } from '../api/category'
import { useApiErr } from '../utils/ApiErrorContext' 
import { toast, handleDelete } from '../utils/helpers'
import { FormattedMessage } from 'react-intl'
import toastMsg from '../utils/toast-messages'

const CategoryItem = ({ category }) => {
  const [isDeleted, setIsDeleted] = useState(false)
  const { apiErrorHandler } = useApiErr()
  const categoryName = category.name.length > 20 ? category.name.substring(0, 20) + '...' : category.name
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
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex='1' textAlign='left'>
            {categoryName}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <ButtonGroup size='sm' spacing={5} my={3}>
          <Link to={`/category/${category.id}/edit`}>
            <Button leftIcon={<EditIcon />} colorScheme='blue'>
              <FormattedMessage id="edit" defaultMessage="edit"/>
            </Button>
          </Link>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme='red'
            onClick={() => handleDelete?.(category.id, deleteCategoryAsync, locale)}
          >
            <FormattedMessage id="delete" defaultMessage="Delete"/>
          </Button>
        </ButtonGroup>
      </AccordionPanel>
    </AccordionItem>
  )
}

function CategoryList({ categories }) {
 return (
  <Accordion allowToggle>
    {categories.map(c => (
      <CategoryItem key={c.id} category={c} />
    ))}
  </Accordion>
 )
}

export default CategoryList