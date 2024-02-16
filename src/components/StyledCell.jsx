import styled from '@emotion/styled'

function StyledCell({ justify, width, children }) {
  const Wrapper = styled.div`
    display: flex;
    overflow-x: scroll;
    justify-content: ${justify};
    width: ${width};
    color: ${({ theme }) => theme.mainTextColor};
    ::-webkit-scrollbar {
      display: none;
    }
  `

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default StyledCell
