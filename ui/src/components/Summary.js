import React, {useState,useEffect} from 'react'
import {Client} from '@elastic/elasticsearch'

const client = new Client({
  node: 'http://37.61.219.29:9200',
});
const Summary = () => {

    const [crawlers, setCrawlers]=useState([])
    const [fields, setFields]=useState([])
   
    const cleanContent=(lista)=>{
        strResult= ''
        lista.forEach(obj=>{
            strResult=strResult+ list[i]["key"].toString()
            if (i != list.length()-1){
                strResult += (" - ")
            }
        })
    }

    const get_fields =async()=>{ 
        const fields=await client.search({
      index:'de_index_cct',
      body: {"size": 0,
      "query": {"match": {
          "crawler": crawler
      }},
      "_source": ["source", "crawler", "type", "project", "pub_date", "crawler_type"],

      "aggs": {
          "sources": {
              "terms": {
                  "field": field,
                  "size": 100
              }
          }
      }},
    })
    return fields["aggregations"]["sources"]["buckets"]
  };

useEffect(() => {

      const get_crawlers=async()=>{ 
          const crawlers= await client.search({
        index:'de_index_cct',
        body: {
          size: 0,
          aggs: {
            sources: {
              terms: {
                field: "crawler",
                size: 10000
              },
            },
          },
        },
      })
      return crawlers["aggregations"]["sources"]["buckets"]
    };
      setCrawlers(get_crawlers())



      
 
}, [crawlers, fields])


    return (
        <div>
            <table class="table">
        <thead>
            <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
        <th scope="col">Handle</th>
        </tr>
    </thead>
  <tbody>
            {client.ping()? crawlers.map(crawler=>{
                 projects = get_otherFields(client, crawler["key"], "project")
                 crawler_types = get_otherFields(client, crawler["key"], "crawler_type")
                 sources = get_otherFields(client, crawler["key"], "source")
                 pub_date = get_otherFields(client, crawler["key"], "pub_date")
                 isPubDate = "No"
                 if (pub_date.length() > 0){
                     isPubDate = "Yes"
                 }
                 return ( <tr>
                    <th scope="row">{crawler['key']}</th>
                    <td>{cleanContent(projects)}</td>
                    <td>{cleanContent(sources)}</td>
                    <td>{cleanContent(crawler_types)}</td>
                    <td>{isPubDate}</td>
                  </tr>)
            }):<p>Loading...</p>}
            </tbody>
            </table>
        </div>
    )
}

export default Summary
