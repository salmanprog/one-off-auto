import React from 'react'
import ContentWrapper from '../../components/shared/contentWrapper';
import Form from '../../components/shared/Form'

function AddFaq() {
    return (
        <div className='m-3'>
            <ContentWrapper title={"Add New FAQ"}>
                <div className='mx-4 my-3'>
                    <Form form='faq' />
                </div>
            </ContentWrapper>
        </div>
    )
}

export default AddFaq;