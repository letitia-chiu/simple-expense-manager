import styled from '@emotion/styled'
import IncomeIcon from '../assets/income.svg?react'
import ExpenseIcon from '../assets/expense.svg?react'
import ReportIcon from '../assets/report.svg?react'
import SettingIcon from '../assets/setting.svg?react'
import CategoryIcon from '../assets/category.svg?react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

const Wrapper = styled.div`
  width: 80px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.subColor};
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
    fill: ${({ theme }) => theme.subColor};
    margin-bottom: 8px;
  }

  &.active {
    border-bottom: 2px solid;
  }
  &.active, &:hover {
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
  income: <FormattedMessage id="income" defaultMessage="Income" />,
  expense: <FormattedMessage id="expense" defaultMessage="Expense" />,
  report: <FormattedMessage id="report" defaultMessage="Report" />,
  setting: <FormattedMessage id="setting" defaultMessage="Setting" />,
  category: <FormattedMessage id="categories" defaultMessage="Categories" />
}

const tabLink = {
  income: '/income',
  expense: '/expense',
  report: '/report',
  setting: '/setting',
  category: '/category'
}

function NavTab({ isActive, type }) {
  return (
    <Link to={tabLink[type]}>
      <Wrapper className={isActive && 'active'}>
        {tabIcon[type]}
        <p>{tabTitle[type]}</p>
      </Wrapper>
    </Link>
  )
}

export default NavTab