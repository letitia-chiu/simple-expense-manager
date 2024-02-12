import styled from '@emotion/styled'
import LogoutIcon from '../assets/logout.svg?react'
import NavTab from './NavTab'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.foregroundColor};
  position: absolute;
  bottom: 0;
  width: 100%;
  min-width: 300px;
  height: 120px;
  padding: 30px 10px;
  display: flex;
  

  @media screen and (min-width: 960px) {
    position: unset;
  }
`

const Navbrand = styled.div`
  color: ${({ theme }) => theme.mainTextColor};
  font-size: 18px;
  font-weight: 700;
  line-height: 60px;
  display: none;
  margin: 0 20px;

  @media screen and (min-width: 960px) {
    display: block;
  }
`

const Tabs = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
`

const UserLogout = styled.div`
  color: ${({ theme }) => theme.mainTextColor};
  font-size: 18px;
  font-weight: 700;
  display: none;
  margin: 0 20px;
  min-width: 150px;

  svg {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
    fill: ${({ theme }) => theme.mainTextColor};
    cursor: pointer;

    &:hover {
      fill: ${({ theme }) => theme.mainColor};
    }
  }

  @media screen and (min-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

function Navbar({ isMobile }) {
  return (
    <Wrapper>
      <Navbrand>Simple Expense Manager</Navbrand>
      <Tabs>
        <NavTab isActive={true} type="income"/>
        <NavTab type="expense"/>
        <NavTab type="report"/>
        {isMobile && <NavTab type="setting"/>}
        {!isMobile && <NavTab type="category"/>}
      </Tabs>
      <UserLogout>
        <LogoutIcon />
        <p>Hi, user1</p>
      </UserLogout>
    </Wrapper>
  )
}

export default Navbar
