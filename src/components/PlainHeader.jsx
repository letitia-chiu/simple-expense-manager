import {
  HeaderWrapper,
  HeaderContent,
  HeaderTitleWrapper,
  HeaderTitle,
} from './header-parts'

const pageTitle = {
  income: "Add New Income",
  expense: "Add New Expense"
}

function PlainHeader({ page }) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderTitleWrapper>
          <HeaderTitle>{pageTitle[page]}</HeaderTitle>
        </HeaderTitleWrapper>
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default PlainHeader
