import styled from '@emotion/styled'

import NavTab from './NavTab'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.foregroundColor};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120px;
  padding: 30px 10px;
  display: flex;
  justify-content: space-between;
`

function Navbar() {
  return (
    <Wrapper>
      <NavTab isActive={true} type="income"/>
      <NavTab type="expense"/>
      <NavTab type="report"/>
      <NavTab type="setting"/>
    </Wrapper>
  )
}

export default Navbar
