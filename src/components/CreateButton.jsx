import styled from '@emotion/styled'
import AddIcon from '../assets/add.svg?react'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  position: absolute;
  bottom: 100px; 
  z-index: 999;
  cursor: pointer;
  svg {
    width: 40px;
    height: 40px;
    fill: ${({ theme }) => theme.mainColor};
  }
  p {
    color: ${({ theme }) => theme.mainColor};
    font-size: 14px;
    font-weight: 700;
    margin-top: 8px;
    display: none;
  }

  @media screen and (min-width: 960px) {
    bottom: 8%;
    right: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      display: block;
    }
  }
`

function CreateButton({ link }) {
  return (
    <Link to={link} style={{width: '40px'}}>
      <Wrapper>
        <AddIcon />
        <p>Add Record</p>
      </Wrapper>
    </Link>
  )
}

export default CreateButton