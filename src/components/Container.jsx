import styled from '@emotion/styled'

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
export default Container
