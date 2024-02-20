import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategory, postCategory, patchCategory } from '../api/category'
import { useApiErr } from '../utils/ApiErrorContext' 
import { toast } from '../utils/helpers'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, Radio, RadioGroup, Button, ButtonGroup, Stack
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, InfoOutlineIcon } from '@chakra-ui/icons'

// ******** Main Function ******** //

function CategoryForm({ categoryId }) {
  const navigate = useNavigate()
  const { apiErrorHandler } = useApiErr()

  // ** Input useState
  const [name, setName] = useState('')
  const [isIncome, setIsIncome] = useState('false')

  // ** Async functions
  const getCategoryAsync = async () => {
    try {
      const res = await getCategory(categoryId)
      if (res.success) {
        setName(res.category.name)
        setIsIncome(res.category.isIncome ? 'true' : 'false')
      } else {
        apiErrorHandler(res)
        navigate('/category')
      }
    } catch (err) {
      toast('error', err)
    }
  }

  const createCategory = async (payload) => {
    try {
      const res = await postCategory(payload)
      if (res.success) {
        toast('success', 'Add category successfully')
        return navigate('/category')
      } else {
        // Handle error message
        apiErrorHandler(res, 'Failed to add category')
      }
    } catch (err) {
      toast('error', err)
    }
  }

  const editCategory = async (payload) => {
    try {
      const res = await patchCategory(categoryId, payload)
      if (res.success) {
        toast('success', 'Edit category successfully')
        return navigate('/category')
      } else {
        // Handle error message
        apiErrorHandler(res, 'Failed to edit category')
      }
    } catch (err) {
      toast('error', err)
    }
  }

  // ** Submit function
  const handleSave = () => {
    // Validate user input
    if (!name) return

    // Pack user input
    const payload = { name, isIncome }

    // Edit if categoryId exists, else create new category
    if (categoryId) {
      editCategory(payload)
    } else {
      createCategory(payload)
    }
  }

  // ** Get data from API when page first loads
  useEffect(() => {
    // Get category data if categoryId exists
    if (categoryId) getCategoryAsync()
  }, [categoryId])

  // ******** JSX return ******** //
  return (
    <Stack w='90%' my={3} spacing={8}>
      <FormControl>
        <FormLabel>Category name</FormLabel>
        <Input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Type</FormLabel>
        <RadioGroup 
          onChange={setIsIncome}
          value={isIncome}
          isDisabled={categoryId && true}
        >
          <Stack direction='row' spacing={8} mt={3}>
            <Radio size='lg' value='false'>Expense</Radio>
            <Radio size='lg' value='true'>Income</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <FormControl isInvalid={!name}>
        <FormErrorMessage><InfoOutlineIcon mr={2}/>Category name is required</FormErrorMessage>
      </FormControl>

      <ButtonGroup justifyContent='end' spacing={5} mt={5}>
        <Button 
          leftIcon={<CheckIcon />}
          colorScheme='purple'
          variant='solid'
          onClick={handleSave}
          isDisabled={!name}
        >
          Save
        </Button>
        <Button 
          leftIcon={<CloseIcon />}
          colorScheme='purple'
          variant='outline'
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default CategoryForm