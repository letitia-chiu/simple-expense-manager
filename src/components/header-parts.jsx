import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
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

const HeaderContent = styled.div`
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

const HeaderTitleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderTitle = styled.div`
  color: ${({ theme }) => theme.mainTextColor};
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
`

const HeaderSubtitle = styled.div`
  color: ${({ theme }) => theme.subTextColor};
  font-size: 14px;
  font-weight: 500;
`

export {
  HeaderWrapper,
  HeaderContent,
  HeaderTitleWrapper,
  HeaderTitle,
  HeaderSubtitle
}
