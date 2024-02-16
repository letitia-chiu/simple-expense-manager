import {
  HeaderWrapper,
  HeaderContent,
  HeaderTitleWrapper,
  HeaderTitle,
} from './header-parts'

const pageTitle = {
  income: "Add New Income",
  expense: "Add New Expense",
  category: "Categories",
  createCategory: "Add New Category",
  editCategory: "Edit Category",
  setting: "Setting"
}

function PlainHeader({ page, isEdit }) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderTitleWrapper>
          <HeaderTitle>{isEdit ? 'Edit Record' : pageTitle[page]}</HeaderTitle>
        </HeaderTitleWrapper>
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default PlainHeader
