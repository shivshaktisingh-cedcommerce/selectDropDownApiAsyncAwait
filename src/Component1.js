
import React, { useEffect, useState } from 'react';
import {Select} from '@shopify/polaris';
import {Button} from '@shopify/polaris';
import {TextField} from '@shopify/polaris';
import SkeletonExample from './Skeletonpage';

const Component1 = () => {
    const[data , setData]=useState([]);
    const[currentval , setCurrentval]=useState('')
    const[dis , setDis]=useState(true)
    const[options1 , setOptions1]=useState([])
    const[selected1, setSelected1] = useState([]);
    const[maindata , setMaindata]=useState([])
    // const[maindata1, setMaindata1]=useState({})
    const[loading , setLoading]=useState(false)
    const[selected, setSelected] = useState([]);
    const[bodydata , setBodydata]=useState({
            target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
            selected: [],
            target: {
                marketplace: "amazon",
                shopId: "530"
            }
    })
    var leafnode = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        data:{
           barcode_exemption:false ,
           browser_node_id:"",
           category:"",
           sub_category:""
        } ,
        source: {
           marketplace: "amazon",
           shopId: "530"
          } ,
    
        target: {
         marketplace: "amazon",
         shopId: "530"
        }
    }
  
    const[flag , setFlag]=useState(0)
   
    var url = "https://multi-account.sellernext.com/home/public/connector/profile/getAllCategory/";
    var url1 = "https://multi-account.sellernext.com/home/public/connector/profile/getCategoryAttributes/";
    var obj = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            appTag: "amazon_sales_channel",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjMzMjlkN2YwNDUxYzA3NGFhMGUxNWE4Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY0OTg4NjM3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2Q3ZDlkYjgyM2I5MTVhMzc0NTA3NSJ9.eZKlcA00P9R_hw-ThPqMP1G_ntdht2hoh2Sx9FhfFXsw1725An17BDLLEA5GYGEXr-vtrUMoWq2E7_sRAkFvvbBrEljQenYRUH0VxIdgFvUk3ptoh9_x63ZhOpS2LhW0v5G16fZiY4StoArQZ3TVRrzqf9b5ZGVrlxh7RjR6oZEzLg6UHqPdYXn5o1J0FdoyCndaDo8y3XwNBPUJU1BqnVMxeYYFnYlxWCpH1jq8IjSrP1YSQARMZhAfqrxuN73utQMwf5EYR4_2fM8Iz-LiwN7wVkRkoj7hDTeQtVx_736tycu6f4lLf03CZ0mxzrbAXuifl3eJsHKso0lgL4UxPg`,
            "Ced-Source-Id": 500,
            "Ced-Source-Name": "shopify",
            "Ced-Target-Id": 530,
            "Ced-Target-Name": "amazon"
        },
        body:JSON.stringify({...bodydata})
    }
    const handler = async()=>{

        let t=[];
       if(flag===0){
        setLoading(true)
        await fetch(url , obj)
        .then((res)=>res.json())
        .then((res)=>{
         res.data.map((d)=>{
        t.push({label:d.name , value:d.name})
        setLoading(false)
       }); 
       setMaindata(res.data)
    })
       setData(prev=>[...prev , t])  

       }
       if(flag===1){
        setLoading(true)
       await fetch(url1 , obj)
        .then((res)=>res.json())
        .then((res)=>{
        setFlag(2)
        var t1=[];
        setLoading(false)
        for(const property in res.data){
           for(const p in res.data[property]){
               let tempobj={label:"" , value:"" , disabled:false}
                tempobj.label = res.data[property][p].label;
                tempobj.value = res.data[property][p].label;
                t1.push(tempobj) 
           }          
        }
       setOptions1(prev=>[...prev ,t1])} )
      }   
    }

    const handler1=()=>{
      setDis(true)
        let t1 = [];
       
        options1[selected1.length - 1].map((d)=>{
            let z = d;
            if(currentval===z.value){
                 z.disabled=true
            }
            t1.push(z)            
        })
         setOptions1(prev=>[...prev ,t1])

    }

    const handleSelectChange = (value) => {
        var parentid=bodydata;
        maindata.map((d)=>{
            if(d.name===value && d.hasChildren===true){
                    parentid.selected = d.parent_id;
                    setBodydata({...parentid})
                    setSelected([...selected , value])
            } 
            if( d.name===value && d.hasChildren===false){
                leafnode.data.category=Object.entries(d.category)[1][1]
                leafnode.data.browser_node_id=d.browseNodeId
                leafnode.data.sub_category=Object.entries(d.category)[0][1]
                // console.log(leafnode)
                setBodydata({...leafnode})
                setSelected([...selected , value])
                setFlag(1)
            }
        })
    };

    const delete_fun=(e)=>{
       console.log(e.target.id)
       var t = [...options1];
       t[e.target.id].map((d)=>{
           if(d.disabled===true && selected1[e.target.id]===d.value){
            d.disabled=false
           }
       })
       var t1 = [...selected1]
       t.splice(e.target.id  ,1)
       t1.splice(e.target.id , 1)
       setOptions1([...t])
       setSelected1([...t1])

    }

    const handleSelectChange1=(value)=>{
      setSelected1([...selected1 , value])
      setDis(false)
      setCurrentval(value)
    }
    console.log(options1)
    // console.log(selected1.length)

    useEffect(() => {
        handler()
    },[bodydata])
    return (
        <div className="outer_main_div_class">
            <div className="inner_main_div_class">
                <p>Primary Category</p>
              { 
                data && data.map((d , i)=>{
                   return(
                          <Select key={i}
                             placeholder='select'
                             options={data[i]}
                             onChange={handleSelectChange}
                             value={selected[i]}
                           />
                   ) 
                })
              }
        { loading && <SkeletonExample/>}

              <div>
                <div>
                    {options1 && options1.map((d , i)=>{
                        return(
                            <div className="selecttag_2">
                            <Select key={i}
                             placeholder='select'
                             options={options1[i]}
                             onChange={handleSelectChange1}
                             value={selected1[i]}
                           />
                            <TextField />
                            <button id={i} onClick={delete_fun}>delete</button>
                           </div>
                        )
                    })
                    }
            
                </div>
                {flag===2?<Button primary onClick={handler1} disabled={dis}>Add product</Button>:""}
              </div>
            
            </div>
            
        </div>
    )
}
export default Component1