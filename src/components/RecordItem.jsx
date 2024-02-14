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
  return (
    <Link to={`/edit/${record.id}`}>
    <RecordWrapper>
      <RecordDate>{dayjs(record.date).format('M/D')}</RecordDate>
      <RecordMain>
        <RecordTitle>{record.title}</RecordTitle>
        <RecordCategory>{record.Category.name}</RecordCategory>
      </RecordMain>
      <RecordAmount>{record.amount}</RecordAmount>
    </RecordWrapper>
    </Link>
  )
}

export default RecordItem
