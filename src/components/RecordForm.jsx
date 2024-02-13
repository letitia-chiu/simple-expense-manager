import { useState } from 'react'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, NumberInput, NumberInputField, Select,
  Button, ButtonGroup, Stack
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

function RecordForm({ mode, page }) {
  let isError = false

  return (
    <Stack w='90%' my={3} spacing={5}>
      <FormControl>
        <FormLabel>Date</FormLabel>
        <Input type="date" defaultValue={dayjs().format('YYYY-MM-DD')}/>
      </FormControl>

      <FormControl isInvalid={isError}>
        <FormLabel>Title</FormLabel>
        <Input type='text' placeholder='Enter title' />
        {isError && 
          <FormErrorMessage>Title is required.</FormErrorMessage>
        }
      </FormControl>

      <FormControl>
        <FormLabel>Category</FormLabel>
        <Select placeholder='Select category'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </FormControl>

      <FormControl isInvalid={isError}>
        <FormLabel>Amount</FormLabel>
        <NumberInput>
          <NumberInputField placeholder='Enter amount'/>
        </NumberInput>
        {isError && 
          <FormErrorMessage>Amount is required.</FormErrorMessage>
        }
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
