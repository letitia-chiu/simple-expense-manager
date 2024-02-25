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
import { FormattedMessage } from 'react-intl'
import toastMsg from '../utils/toast-messages'

// ******** Main Function ******** //

function CategoryForm({ categoryId }) {
  const navigate = useNavigate()
  const { apiErrorHandler } = useApiErr()
  const locale = localStorage.getItem('lang') || 'en'

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
        toast('success', toastMsg.add[locale]?.success || 'Add successfully')
        return navigate('/category')
      } else {
        // Handle error message
        apiErrorHandler(res, toastMsg.add[locale]?.fail || 'Failed to add')
      }
    } catch (err) {
      toast('error', err)
    }
  }

  const editCategory = async (payload) => {
    try {
      const res = await patchCategory(categoryId, payload)
      if (res.success) {
        toast('success', toastMsg.edit[locale]?.success || 'Edit successfully')
        return navigate('/category')
      } else {
        // Handle error message
        apiErrorHandler(res, toastMsg.edit[locale]?.fail || 'Failed to edit')
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
        <FormLabel>
          <FormattedMessage id="col.categoryName" defaultMessage="Category Name"/>
        </FormLabel>
        <FormattedMessage id="categoryName.placeholder" defaultMessage="Enter category name">
          {msg => (
            <Input
              type='text'
              value={name}
              placeholder={msg}
              onChange={e => setName(e.target.value)}
            />
          )}
        </FormattedMessage>
      </FormControl>

      <FormControl>
        <FormLabel>
          <FormattedMessage id="type" defaultMessage="Type"/>
        </FormLabel>
        <RadioGroup 
          onChange={setIsIncome}
          value={isIncome}
          isDisabled={categoryId && true}
        >
          <Stack direction='row' spacing={8} mt={3}>
            <Radio size='lg' value='false'>
              <FormattedMessage id="expense" defaultMessage="Expense"/>
            </Radio>
            <Radio size='lg' value='true'>
              <FormattedMessage id="income" defaultMessage="Income"/>
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <FormControl isInvalid={!name}>
        <FormErrorMessage>
          <InfoOutlineIcon mr={2}/>
          <FormattedMessage id="categoryForm.msg" defaultMessage="Category name is required" />
        </FormErrorMessage>
      </FormControl>

      <ButtonGroup justifyContent='end' spacing={5} mt={5}>
        <Button 
          leftIcon={<CheckIcon />}
          colorScheme='purple'
          variant='solid'
          onClick={handleSave}
          isDisabled={!name}
        >
          <FormattedMessage id="save" defaultMessage="Save"/>
        </Button>
        <Button 
          leftIcon={<CloseIcon />}
          colorScheme='purple'
          variant='outline'
          onClick={() => navigate(-1)}
        >
          <FormattedMessage id="cancel" defaultMessage="Cancel"/>
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default CategoryForm
