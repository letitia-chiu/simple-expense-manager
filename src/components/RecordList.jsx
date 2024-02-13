import styled from '@emotion/styled'
import RecordItem from './RecordItem'

const Wrapper = styled.div`
  flex: 1;
  width: 95%;
  margin-top: 10px;
  margin-bottom: 130px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

function RecordList({ records }) {
  return (
    <Wrapper>
      {records.map(record => (
        <RecordItem key={record.id} record={record}/>
      ))}
    </Wrapper>
  )
}

export default RecordList
