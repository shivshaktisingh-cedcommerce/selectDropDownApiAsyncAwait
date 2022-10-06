
import React, { useEffect, useState } from 'react';
import {Select} from '@shopify/polaris';
import {Button} from '@shopify/polaris';
import {TextField} from '@shopify/polaris';
import SkeletonExample from './Skeletonpage';
import {ProgressBar} from '@shopify/polaris';
import uuid from 'react-uuid';

const Component1 = () => {
    console.disableYellowBox = true;
    const[data , setData]=useState([]);
    const[count , setCount]=useState([])
    const[dis , setDis]=useState(true)
    const[options1 , setOptions1]=useState([])
    const[selected1, setSelected1] = useState([]);
    const[maindata , setMaindata]=useState([])
    const[loading , setLoading]=useState(false)
    const[selected, setSelected] = useState([]);
    const[bodydata , setBodydata]=useState({
            target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
            selected: [],
            user_id:"63329d7f0451c074aa0e15a8",
            target: {
                marketplace: "amazon",
                shopId: "530"
            }
    })
    var leafnode = {
        target_marketplace: "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
        user_id:"63329d7f0451c074aa0e15a8",
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
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw`,
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
               let tempobj={label:"" , value:"" , disabled:false }
               tempobj.label = res.data[property][p].label;
               tempobj.value = res.data[property][p].label+uuid();
               t1.push(tempobj) 
           }          
        }
        setCount([...count , 1])
        setOptions1(prev=>[...prev ,t1])} )
      }   
    }

    const handler1=()=>{
      setDis(true)
      setCount([...count , 1])
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
                  setBodydata({...leafnode})
                  setSelected([...selected , value])
                  setFlag(1)
            }
        })
    };

    const delete_fun=(id)=>{
        var countlength = count.length;
        var selected1length = selected1.length
       var t = [...options1];
       t[0].map((d)=>{
           if(d.disabled===true && selected1[id]===d.value){
            d.disabled=false
           }
       })
       var t1 = [...selected1]
       var t3 =[...count]
       t1.splice(id , 1)
       t3.splice(id , 1)
       setOptions1([...t])
       setSelected1([...t1])
       setCount([...t3])
       if(Number(id) === Number(selected1length) && id< countlength){
        setDis(false)
       } 
    }

    const handleSelectChange1=(value)=>{
       console.log(value) 
      setSelected1([...selected1  , value])
      setDis(false)
      let t1 = [];   
        options1[0].map((d)=>{
            let z = d;
            if(value===z.value){
                 z.disabled=true
            }
            t1.push(z)            
        })
         setOptions1([t1])
    }

    useEffect(() => {
        handler()
    },[bodydata])
    return (
        <div className="outer_main_div_class">
            {loading &&     <ProgressBar progress={90} />}
            <div className="inner_main_div_class">
                <p>Primary Category</p>
              <div className="selecttag_1">{ 
                data && data.map((d , i)=>{
                   return( <div className="selecttag_1" key={uuid()}>
                          <Select key={uuid()}
                             placeholder='select'
                             options={data[i]}
                             onChange={handleSelectChange}
                             value={selected[i]}
                           />
                           </div>
                   ) 
                })
              }</div>
        { loading && <SkeletonExample/>}

              <div className="second_div_class">
                <div>
                    {count && count.map((d , i)=>{
                        return(
                            <div className="selecttag_2" key={i}>
                            <Select
                             id={i} 
                             placeholder='select'
                             options={options1[0]}
                             onChange={handleSelectChange1}
                             value={selected1[i]}
                           />
                            <TextField />
                            <Button plain id={i} onClick={()=>delete_fun(i)}>delete</Button>
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