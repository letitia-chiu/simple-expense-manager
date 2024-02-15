import {
  Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon, Box,
  Button, ButtonGroup
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const CategoryItem = ({ category }) => {
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
          <Button leftIcon={<EditIcon />} colorScheme='blue'>Edit</Button>
          <Button leftIcon={<DeleteIcon />} colorScheme='red'>Delete</Button>
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