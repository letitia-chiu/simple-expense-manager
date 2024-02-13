import { useState } from 'react'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, NumberInput, NumberInputField, Select,
  Button, ButtonGroup, Stack
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

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

function RecordForm({ page, record }) {
  const [dateInput, setDateInput] = useState(() => record?.date || dayjs().format('YYYY-MM-DD'))
  const handleDateChange = e => {
    setDateInput(e.target.value)
  }

  const [titleInput, setTitleInput] = useState(() => record?.title || '')
  const handleTitleChange = e => {
    setTitleInput(e.target.value)
  }

  const [categoryInput, setCategoryInput] = useState(() => record?.categoryId || '')
  const handleCategoryChange = e => {
    setCategoryInput(e.target.value)
  }

  const [amountInput, setAmountInput] = useState(() => record?.amount || '')
  const handleAmountChange = e => {
    setAmountInput(e.target.value)
  }

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

      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type='text'
          placeholder='Enter title'
          value={titleInput}
          onChange={handleTitleChange}
        />
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

      <FormControl>
        <FormLabel>Amount</FormLabel>
        <NumberInput
          value={amountInput}
        >
          <NumberInputField
            placeholder='Enter amount'
            onChange={handleAmountChange}
          />
        </NumberInput>
      </FormControl>

      <ButtonGroup justifyContent='end' spacing={5} mt={5}>
        <Button leftIcon={<CheckIcon />} colorScheme='purple' variant='solid'>
          Save
        </Button>
        <Button leftIcon={<CloseIcon />} colorScheme='purple' variant='outline'>
          Cancel
        </Button>
      </ButtonGroup>
    </Stack>
  )
}

export default RecordForm
