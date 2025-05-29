import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import ContentWrapper from '../../components/shared/contentWrapper';
import Form from '../../components/shared/Form'

function EditFaq() {

  let location = useLocation();
  let { slug } = useParams();
  let headers = window.helpers.getRequestHeaders(`${window.api.faq.url}/${slug}`, 'PUT', 'update_faqs');
  console.log('EditFaq----------------->', headers)
  let { state, makeRequest } = window.useHttp('custom_headers', 'form', headers);

  return (
    <div className='m-3'>
      <ContentWrapper title={"Edit FAQ"}>
        <div className='mx-4 my-3'>
          <Form onFinish={makeRequest} form='faq' initialValues={location.state} />
        </div>
      </ContentWrapper>
    </div>
  )
}

export default EditFaq;