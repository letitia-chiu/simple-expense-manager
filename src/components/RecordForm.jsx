import { useState } from 'react'
import dayjs from 'dayjs'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, NumberInput, NumberInputField, Select,
  Button, ButtonGroup, IconButton, Stack
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons'

const dummyCat = [
  {
    id: 6,
    name: 'Salary'
  },
  {
    id: 7,
    name: 'Bonus'
  }
]

// ******** Main Function ******** //

function RecordForm({ page, record }) {

  // ** Input useState
  const [dateInput, setDateInput] = useState(() => record?.date || dayjs().format('YYYY-MM-DD'))
  const [titleInput, setTitleInput] = useState(() => record?.title || '')
  const [categoryInput, setCategoryInput] = useState(() => record?.categoryId || '')
  const [amountInput, setAmountInput] = useState(() => record?.amount || '')

  // ** Input validation useState
  const [titleInvalid, setTitleInvalid] = useState(false)
  const [amountInvalid, setAmountInvalid] = useState(false)
  
  // ** Input change handlers
  const handleDateChange = e => {
    setDateInput(e.target.value)
  }  

  const handleTitleChange = e => {
    setTitleInput(e.target.value)
    setTitleInvalid(false)
  } 

  const handleCategoryChange = e => {
    setCategoryInput(e.target.value)
  }  

  const handleAmountChange = e => {
    setAmountInput(e.target.value)
    setAmountInvalid(false)
  }

  // ** Submit function
  const handleSave = () => {
    // Validate user input
    if (!titleInput || titleInput.trim().length === 0) return setTitleInvalid(true)
    if (!amountInput) return setAmountInvalid(true)

    // Pack user input
    const payload = {
      title: titleInput,
      amount: amountInput,
      categoryId: categoryInput,
      date: dateInput,
      isIncome: page === 'income'
    }

    // Edit if record exists, else create new record
    if (record) {
      console.log('Edit:', payload)
    } else {
      console.log('Create:', payload)
    }
  }

  // ** Delete function
  const handleDelete = () => {
    console.log('Delete')
  }

  // ******** JSX return ******** //
  return (
    <Stack w='90%' my={3} spacing={5}>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input
          type='date'
          value={dateInput} 
          onChange={handleDateChange}
        />
      </FormControl>

      <FormControl isInvalid={titleInvalid}>
        <FormLabel>Title</FormLabel>
        <Input
          type='text'
          placeholder='Enter title'
          value={titleInput}
          onChange={handleTitleChange}
        />
        {titleInvalid && <FormErrorMessage>Title is required.</FormErrorMessage>}
      </FormControl>

      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select
          placeholder='Select category'
          value={categoryInput}
          onChange={handleCategoryChange}
        >
          {dummyCat.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl isInvalid={amountInvalid}>
        <FormLabel>Amount</FormLabel>
        <NumberInput
          value={amountInput}
        >
          <NumberInputField
            placeholder='Enter amount'
            onChange={handleAmountChange}
          />
        </NumberInput>
        {amountInvalid && <FormErrorMessage>Amount is required.</FormErrorMessage>}
      </FormControl>

      <ButtonGroup justifyContent='end' spacing={5} mt={5}>
        {record && <IconButton
          colorScheme='red'
          aria-label='Delete'
          icon={<DeleteIcon />}
          mr={5}
          onClick={handleDelete}
        />}
        <Button 
          leftIcon={<CheckIcon />}
          colorScheme='purple'
          variant='solid'
          onClick={handleSave}
        >
          Save
        </Button>
        <Button 
          leftIcon={<CloseIcon />}
          colorScheme='purple'
          variant='outline'
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default RecordForm
