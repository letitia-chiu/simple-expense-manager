import {
  Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon, Box,
  Button, ButtonGroup
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { deleteCategory } from '../api/category'
import { toast, handleDelete } from '../utils/helpers'

const CategoryItem = ({ category }) => {
  const [isDeleted, setIsDeleted] = useState(false)

  const deleteCategoryAsync = async (id) => {
    try {
      const res = await deleteCategory(id)
      if (res.success) {
        setIsDeleted(true)
        toast('success', 'Delete category successfully')
      } else {
        // Handle error message
        const message = res.message || ''
        toast('error', 'Failed to delete category', message)
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
            {category.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <ButtonGroup size='sm' spacing={5} my={3}>
          <Link to={`/category/${category.id}/edit`}>
            <Button leftIcon={<EditIcon />} colorScheme='blue'>Edit</Button>
          </Link>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme='red'
            onClick={() => handleDelete?.(category.id, deleteCategoryAsync)}
          >Delete</Button>
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