import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

const RecordWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
`

const RecordDate = styled.div`
  width: 15%;
  text-align: center;
  line-height: 60px;
`

const RecordMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px 8px;
  border-left: 1px solid;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.borderColor};
`

const RecordTitle = styled.div`
  color: ${({ theme }) => theme.mainTextColor};
  font-size: 18px;
  font-weight: 600;
`

const RecordCategory = styled.div`
  color: ${({ theme }) => theme.subTextColor};
  font-size: 14px;
  font-weight: 400;
`

const RecordAmount = styled.div`
  width: 25%;
  text-align: center;
  line-height: 60px;
`

function RecordItem({ record }) {
  const recordTitle = record.title.length > 20 ? record.title.substring(0, 20) + '...' : record.title
  let categoryName = ''
  if (record.Category?.name) {
    if (record.Category.name.length > 20) {
      categoryName = record.Category.name.substring(0, 20) + '...'
    } else {
      categoryName = record.Category.name
    }
  }

  return (
    <Link to={`/${record.isIncome ? 'income' : 'expense'}/${record.id}/edit`}>
    <RecordWrapper>
      <RecordDate>{dayjs(record.date).format('M/D')}</RecordDate>
      <RecordMain>
        <RecordTitle>{recordTitle}</RecordTitle>
        <RecordCategory>{categoryName || '(Uncategorized)'}</RecordCategory>
      </RecordMain>
      <RecordAmount>{record.amount}</RecordAmount>
    </RecordWrapper>
    </Link>
  )
}

export default RecordItem
