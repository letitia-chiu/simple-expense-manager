import {
  HeaderWrapper,
  HeaderContent,
  HeaderTitleWrapper,
  HeaderTitle,
} from './header-parts'
import { FormattedMessage } from 'react-intl'

const pageTitle = {
  edit: <FormattedMessage id="editRecord" defaultMessage="Edit Record"/>,
  income: <FormattedMessage id="addIncome" defaultMessage="Add New Income"/>,
  expense: <FormattedMessage id="addExpense" defaultMessage="Add New Expense"/>,
  category: <FormattedMessage id="categories" defaultMessage="Categories"/>,
  createCategory: <FormattedMessage id="addCategory" defaultMessage="Add Category"/>,
  editCategory: <FormattedMessage id="editCategory" defaultMessage="Edit Category"/>,
  setting: <FormattedMessage id="setting" defaultMessage="Setting"/>
}

function PlainHeader({ page, isEdit }) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderTitleWrapper>
          <HeaderTitle>{isEdit ? pageTitle.edit : pageTitle[page]}</HeaderTitle>
        </HeaderTitleWrapper>
      </HeaderContent>
    </HeaderWrapper>
  )
}

export default PlainHeader
