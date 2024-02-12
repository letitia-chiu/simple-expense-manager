import styled from '@emotion/styled'
import IncomeIcon from '../assets/income.svg?react'
import ExpenseIcon from '../assets/expense.svg?react'
import ReportIcon from '../assets/report.svg?react'
import SettingIcon from '../assets/setting.svg?react'
import CategoryIcon from '../assets/category.svg?react'

const Wrapper = styled.div`
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.subColor};

  svg {
    width: 30px;
    height: 30px;
    fill: ${({ theme }) => theme.subColor};
    margin-bottom: 8px;
  }

  &.active {
    border-bottom: 2px solid;
    color: ${({ theme }) => theme.mainColor};
    svg {
      fill: ${({ theme }) => theme.mainColor};
    }
  }
`

const tabIcon = {
  income: <IncomeIcon />,
  expense: <ExpenseIcon />,
  report: <ReportIcon />,
  setting: <SettingIcon />,
  category: <CategoryIcon />
}

const tabTitle = {
  income: 'Income',
  expense: 'Expense',
  report: 'Report',
  setting: 'Setting',
  category: 'Categories'
}

function NavTab({ isActive, type }) {
  return (
    <Wrapper className={isActive && 'active'}>
      {tabIcon[type]}
      <p>{tabTitle[type]}</p>
    </Wrapper>
  )
}

export default NavTab