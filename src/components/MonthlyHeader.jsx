import styled from '@emotion/styled'
import PrevIcon from '../assets/prev.svg?react'
import NextIcon from '../assets/next.svg?react'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.foregroundColor};
  width: 100%;
  min-width: 300px;
  height: 120px;
  padding: 50px 10px 10px;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 960px) {
    background-color: unset;
    height: 100px;
    padding: 10px;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 700px;

  @media screen and (min-width: 960px) {
    max-width: 1000px;
    padding: 0 20px;
    border-bottom: 1px solid ${({ theme }) => theme.mainTextColor};
  }
`

const TitleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  color: ${({ theme }) => theme.mainTextColor};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`

const Subtitle = styled.div`
  color: ${({ theme }) => theme.subTextColor};
  font-size: 14px;
  font-weight: 500;
`

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

const NextMonth = styled.div``

function MonthlyHeader({ isMobile }) {
  return (
    <Wrapper>
      <Content>
        <MonthSwitch>
          <PrevIcon />
          {!isMobile && 'prev month'}
        </MonthSwitch>

        <TitleWrapper>
          <Title>Income</Title>
          <Subtitle>Jan 2024</Subtitle>
        </TitleWrapper>

        <MonthSwitch>
          {!isMobile && 'next month'}
          <NextIcon />
        </MonthSwitch>
      </Content>
    </Wrapper>
  )
}

export default MonthlyHeader