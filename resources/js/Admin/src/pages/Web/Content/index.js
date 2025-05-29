import React,{useEffect, useState} from 'react'
import ContentWrapper from '../../../components/shared/contentWrapper';
import { useParams } from 'react-router-dom';
import { useFetch } from "../../../hooks/request";
import HttpRequest from "../../../repositories";
import api from "../../../repositories/api";


const ContentPage = () => {
  let { slug } = useParams();
  const [response,setResponse] = useState({});
  const [content, setContent] = useState("")
  useEffect(()=>{
    HttpRequest.makeRequest(api.get_application_content.method, window.constants.api_base_url + api.get_application_content.url+'/'+slug, '').then(({data})=>{
        let api_url = data.data.api_url;
        if(api_url){
          HttpRequest.makeRequest('GET', api_url, '')
          .then(((res) => setContent(res?.data?.content)))
        }
        else{
          setContent(data?.data?.content)
        }
    })
  },[])

  return (
      <section className="main-content d-flex ">
        <div className='row'>
          <div className="col-sm-12">
          {
          !window._.isEmpty(content) &&
          <>
          <div
             dangerouslySetInnerHTML={{__html: content}}
          />
          </>  
          }
          
          </div>
        </div>
      </section>
     

  )
}

export default React.memo(ContentPage);