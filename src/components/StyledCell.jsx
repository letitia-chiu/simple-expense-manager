import styled from '@emotion/styled'

function StyledCell({ justify, width, children }) {
  const Wrapper = styled.div`
    display: flex;
    justify-content: ${justify};
    width: ${width};
    color: ${({ theme }) => theme.mainTextColor};
  `

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default StyledCell
