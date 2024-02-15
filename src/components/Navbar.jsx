import styled from '@emotion/styled'
import LogoutIcon from '../assets/logout.svg?react'
import NavTab from './NavTab'
import { useAuth } from '../utils/AuthContext'
import { toast } from '../utils/helpers'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.foregroundColor};
  position: absolute;
  bottom: 0;
  width: 100%;
  min-width: 300px;
  height: 120px;
  padding: 30px 10px;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 960px) {
    position: unset;
    justify-content: space-between;
    height: 100px;
    padding: 20px 10px;
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
  max-width: 600px;
`

const UserLogout = styled.div`
  color: ${({ theme }) => theme.mainTextColor};
  font-size: 16px;
  font-weight: 700;
  display: none;
  margin: 0 20px;
  min-width: 150px;
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
    fill: ${({ theme }) => theme.subColor};
  }

  &:hover {
    color: ${({ theme }) => theme.mainColor};
    svg {
      fill: ${({ theme }) => theme.mainColor};
    }
  }

  @media screen and (min-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

function Navbar({ isMobile, page }) {
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
    toast('success', "You've logout!")
  }

  return (
    <Wrapper>
      <Navbrand>Simple Expense Manager</Navbrand>
      <Tabs>
        <NavTab isActive={page === 'income'} type="income"/>
        <NavTab isActive={page === 'expense'} type="expense"/>
        <NavTab isActive={page === 'report'} type="report"/>
        {isMobile ? <NavTab isActive={page === 'setting'} type="setting"/> : <NavTab isActive={page === 'category'} type="category"/> }
      </Tabs>
      <UserLogout>
        <LogoutIcon onClick={() => handleLogout()}/>
        <p>Hi, user1</p>
      </UserLogout>
    </Wrapper>
  )
}

export default Navbar
