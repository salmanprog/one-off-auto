import React from 'react'
import ContentWrapper from '../../components/shared/contentWrapper';
import Table from '../../components/shared/table';
import { faqs } from '../../config/data/columns'

function Faqs() {

  let { state } = window.useHttp('get_faq')

  return (
    <div className='m-3'>
      <ContentWrapper title={"FAQ's"}>
        <div className='mx-4 my-3'>
          <Table actions={['edit', 'view']} columns={faqs} data={state?.data} />
        </div>
      </ContentWrapper>
    </div>
  )
}

export default React.memo(Faqs)