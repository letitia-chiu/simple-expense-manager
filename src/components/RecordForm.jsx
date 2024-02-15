import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecord, postRecord, patchRecord, deleteRecord } from '../api/record'
import { getCategories } from '../api/category'
import { toast, handleDelete } from '../utils/helpers'
import dayjs from 'dayjs'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, NumberInput, NumberInputField, Select,
  Button, ButtonGroup, IconButton, Stack
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons'

// ******** Main Function ******** //

function RecordForm({ type, recordId }) {
  const navigate = useNavigate()

  // ** Input useState
  const [categories, setCategories] = useState([])
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [amount, setAmount] = useState('')
  const inputComplete = title && amount

  // ** Async functions
  const getRecordAsync = async () => {
    try {
      const res = await getRecord(recordId)
      if (res.success) {
        // Check if income/expense matched
        const recordType = res.record.isIncome ? 'income' : 'expense'
        if (recordType !== type) {
          toast('error', 'Route error', `This record is not ${type}`)
          return navigate(`/${recordType}`)
        }

        // Set form value
        setDate(res.record.date)
        setTitle(res.record.title)
        setAmount(res.record.amount)
        setCategoryId(res.record.categoryId)
      } else {
        // Handle error message
        const message = res.message || ''
        toast('error', 'Loading Failed', message)
        navigate(`/${type}`)
      }
    } catch (err) {
      toast('error', err)
    }
  }
  
  const getCategoriesAsync = async () => {
    try {
      const res = await getCategories(type)
      if (res.success) return setCategories(res.categories)

      // Handle error message
      const message = res.message || ''
      toast('error', 'Loading Failed', message)
    } catch (err) {
      toast('error', err)
    }
  }

  const createRecord = async (payload) => {
    try {
      payload.isIncome = type === 'income'
      const res = await postRecord(payload)
      if (res.success) {
        toast('success', 'Add record successfully')
        return navigate(`/${type}`)
      } else {
        // Handle error message
        const message = res.message || ''
        toast('error', 'Failed to add record', message)
      }
    } catch (err) {
      toast('error', err)
    }
  }

  const editRecord = async (payload) => {
    try {
      const res = await patchRecord(recordId, payload)
      if (res.success) {
        toast('success', 'Edit record successfully')
        return navigate(`/${type}`)
      } else {
        // Handle error message
        const message = res.message || ''
        toast('error', 'Failed to edit record', message)
      }
    } catch (err) {
      toast('error', err)
    }
  }

  const deleteRecordAsync = async (id) => {
    try {
      const res = await deleteRecord(id)
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

  // ** Submit function
  const handleSave = () => {
    // Validate user input
    if (!inputComplete) return

    // Pack user input
    const payload = { date, title, amount, categoryId }

    // Edit if recordId exists, else create new record
    if (recordId) {
      editRecord(payload)
    } else {
      createRecord(payload)
    }
  }

  // ** Get data from API when page first loads
  useEffect(() => {
    // Get categories from API
    getCategoriesAsync()

    // Get record data if recordId exists
    if (recordId) getRecordAsync()

  }, [recordId])

  // ******** JSX return ******** //
  return (
    <Stack w='90%' my={3} spacing={5}>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input
          type='date'
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type='text'
          placeholder='Enter title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder='Select category'
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
        >
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Amount</FormLabel>
        <NumberInput value={amount}>
          <NumberInputField
            placeholder='Enter amount'
            onChange={e => setAmount(e.target.value)}
          />
        </NumberInput>
      </FormControl>

      <FormControl isInvalid={!inputComplete}>
        <FormErrorMessage><InfoOutlineIcon mr={2}/>Title & amount is required</FormErrorMessage>
      </FormControl>

      <ButtonGroup justifyContent='end' spacing={5} mt={5}>
        {recordId && <IconButton
          colorScheme='red'
          aria-label='Delete'
          icon={<DeleteIcon />}
          mr={5}
          onClick={() => handleDelete?.(recordId, deleteRecordAsync)}
        />}
        <Button 
          leftIcon={<CheckIcon />}
          colorScheme='purple'
          variant='solid'
          onClick={handleSave}
          isDisabled={!inputComplete}
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

export default RecordForm
