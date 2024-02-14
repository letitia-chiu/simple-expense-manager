import styled from '@emotion/styled'
import PrevIcon from '../assets/prev.svg?react'
import NextIcon from '../assets/next.svg?react'
import {
  HeaderWrapper,
  HeaderContent,
  HeaderTitleWrapper,
  HeaderTitle,
  HeaderSubtitle
} from './header-parts'

const MonthSwitch = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.mainTextColor};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.mainTextColor};
    width: 30px;
    hight: 30px;
    margin: 0 10px;
  }

  &:hover {
    color: ${({ theme }) => theme.mainColor};
    svg {
      fill: ${({ theme }) => theme.mainColor};
    }
  }
`

const pageTitle = {
  income: "Income",
  expense: "Expense",
  report: "Report"
}

function MonthlyHeader({ isMobile, page, month, switchMonth }) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <MonthSwitch
          onClick={() => switchMonth?.('prev')}
        >
          <PrevIcon />
          {!isMobile && 'prev month'}
        </MonthSwitch>

        <HeaderTitleWrapper>
          <HeaderTitle>{pageTitle[page]}</HeaderTitle>
          <HeaderSubtitle>{month}</HeaderSubtitle>
        </HeaderTitleWrapper>

        <MonthSwitch
          onClick={() => switchMonth?.('next')}
        >
          {!isMobile && 'next month'}
          <NextIcon />
        </MonthSwitch>
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default MonthlyHeader