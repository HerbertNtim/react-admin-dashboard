import { Form, Input, Modal, Select } from "antd"
import CompanyList from "./list"
import { useModalForm, useSelect } from "@refinedev/antd"
import { useGo } from "@refinedev/core"
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutations"
import { USERS_SELECT_QUERY } from "@/graphql/queries"
import SelectOptionWithAvatar from "@/components/select-with-option-avatar"
import { GetFieldsFromList } from "@refinedev/nestjs-query"
import { UsersSelectQuery } from "@/graphql/types"

const CreateCompany = () => {
  const go = useGo()

  const goToListPage = () => {
    go({
      to: { resource: 'companies', action: 'list' },
      options: { keepQuery: true },
      type: 'replace'
    })
  }

  const { modalProps, formProps } = useModalForm({
    action: 'create',
    defaultVisible: true,
    resource: 'companies',
    redirect: false,
    mutationMode: 'pessimistic',
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION
    }
  })

  const { selectProps, queryResult } = useSelect<GetFieldsFromList<UsersSelectQuery>>({
    resource: 'users',
    optionLabel: 'name',
    meta: {
      gqlQuery: USERS_SELECT_QUERY
    }
  })

  return (
    <CompanyList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToListPage}
        title='Create Company'
        width={512}
      >
        <Form {...formProps} layout='vertical' >
          <Form.Item
            label="Company Name"
            name='name'
            rules={[{ required: true }]}
          >
            <Input placeholder='Enter Company Name Here' />
          </Form.Item>
          <Form.Item
            label='Sales Owner'
            name='salesOwnerId'
            rules={[{ required: true }]}
          >
            <Select 
              placeholder='Select Owner'
              {...selectProps}
              options={
                queryResult.data?.data.map((user) => ({
                  value: user.id,
                  label: (
                    <SelectOptionWithAvatar 
                      name={user.name}
                      avatarUrl={user.avatarUrl ?? undefined}
                    />
                  )
                })) ?? []
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </CompanyList>
  )
}

export default CreateCompany