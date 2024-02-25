import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRecord, postRecord, patchRecord, deleteRecord } from '../api/record'
import { getCategories } from '../api/category'
import { useApiErr } from '../utils/ApiErrorContext' 
import { toast, handleDelete } from '../utils/helpers'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import {
  FormControl, FormLabel, FormErrorMessage,
  Input, NumberInput, NumberInputField, Select,
  Button, ButtonGroup, IconButton, Stack
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { FormattedMessage } from 'react-intl'
import toastMsg from '../utils/toast-messages'

const Wrapper = styled.div`
  flex: 1;
  width: 95%;
  margin-top: 10px;
  margin-bottom: 130px;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 960px) {
    margin-bottom: 20px;
    max-width: 1000px;
  }
`


// ******** Main Function ******** //

function RecordForm({ type, recordId }) {
  const navigate = useNavigate()
  const { apiErrorHandler } = useApiErr()
  const locale = localStorage.getItem('lang') || 'en'

  // ** Input useState
  const [categories, setCategories] = useState([])
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [amount, setAmount] = useState('')
  const inputComplete = title && amount && !isNaN(amount)

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
        apiErrorHandler(res)
        navigate(`/${type}`)
      }
    } catch (err) {
      toast('error', err)
    }
  }
  
  const getCategoriesAsync = async () => {
    try {
      const res = await getCategories(type)
      if (res.success) {
        setCategories(res.categories)
      } else {
        apiErrorHandler(res)
      }
    } catch (err) {
      toast('error', err)
    }
  }

  const createRecord = async (payload) => {
    try {
      payload.isIncome = type === 'income'
      const res = await postRecord(payload)
      if (res.success) {
        toast('success', toastMsg.add[locale]?.success || 'Add successfully')
        return navigate(`/${type}`)
      } else {
        apiErrorHandler(res, toastMsg.add[locale]?.fail || 'Failed to add')
      }
    } catch (err) {
      toast('error', err)
    }
  }

  const editRecord = async (payload) => {
    try {
      const res = await patchRecord(recordId, payload)
      if (res.success) {
        toast('success', toastMsg.edit[locale]?.success || 'Edit successfully')
        return navigate(`/${type}`)
      } else {
        apiErrorHandler(res, toastMsg.edit[locale]?.fail || 'Failed to edit')
      }
    } catch (err) {
      toast('error', err)
    }
  }

  const deleteRecordAsync = async (id) => {
    try {
      const res = await deleteRecord(id)
      if (res.success) {
        toast('success', toastMsg.delete[locale]?.success || 'Delete successfully')
        return navigate(`/${type}`)
      } else {
        apiErrorHandler(res, toastMsg.delete[locale]?.fail || 'Failed to delete')
      }
    } catch (err) {
      toast('error', err)
    }
  }

  // ** Submit function
  const handleSave = () => {
    // Validate user input
    if (!inputComplete) return
    if (isNaN(amount)) return

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
    <Wrapper>
      <Stack w='90%' my={3} spacing={5}>
        <FormControl>
          <FormLabel>
            <FormattedMessage id="col.date" defaultMessage="Date"/>
          </FormLabel>
          <Input
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>
            <FormattedMessage id="col.title" defaultMessage="Title"/>
          </FormLabel>
          <FormattedMessage 
            id="title.placeholder"
            defaultMessage="Enter title"
          >
            {msg => (
              <Input 
                type='text'
                placeholder={msg}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            )}
          </FormattedMessage>
        </FormControl>

        <FormControl>
          <FormLabel>
            <FormattedMessage id="col.category" defaultMessage="Category"/>
          </FormLabel>
          <FormattedMessage 
            id="category.placeholder"
            defaultMessage="Select category"
          >
            {msg => (
              <Select
                placeholder={msg}
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
            )}
          </FormattedMessage>
          
        </FormControl>

        <FormControl isInvalid={isNaN(amount)}>
          <FormLabel>
            <FormattedMessage id="col.amount" defaultMessage="Amount"/>
          </FormLabel>
          <FormattedMessage id="amount.placeholder" defaultMessage="Enter amount">
            {msg => (
              <NumberInput value={amount}>
                <NumberInputField
                  placeholder={msg}
                  onChange={e => setAmount(e.target.value)}
                />
              </NumberInput>
            )}
          </FormattedMessage>
          <FormErrorMessage>
            <InfoOutlineIcon mr={2}/>
            <FormattedMessage id="recordForm.msg.nan" defaultMessage="Amount should be number"/>
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!inputComplete}>
          <FormErrorMessage>
            <InfoOutlineIcon mr={2}/>
            <FormattedMessage id="recordForm.msg.incomplete" defaultMessage="Title & amount is required"/>
          </FormErrorMessage>
        </FormControl>

        <ButtonGroup justifyContent='end' spacing={5} mt={5}>
          {recordId && <IconButton
            colorScheme='red'
            aria-label='Delete'
            icon={<DeleteIcon />}
            mr={5}
            onClick={() => handleDelete?.(recordId, deleteRecordAsync, locale)}
          />}
          <Button 
            leftIcon={<CheckIcon />}
            colorScheme='purple'
            variant='solid'
            onClick={handleSave}
            isDisabled={!inputComplete}
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
    </Wrapper>
  )
}

export default RecordForm
