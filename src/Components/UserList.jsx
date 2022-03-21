import React, { useEffect, useState } from 'react'
import "./UserList.css"

const UserList = () => 
{
  const [userList,setUserList]=useState([])
  
    
  
  useEffect(()=>{
      fetch("http://localhost:3004/user")
      .then(res=>res.json())
      .then(data=>setUserList(data))
    },[])

  
  
  const loadData=()=>{
    fetch("http://localhost:3004/user")
    .then(res=>res.json())
    .then(data=>setUserList(data))
  }
function removeItem(id)
{


   fetch("http://localhost:3004/user/"+id,{
    method:"DELETE",
    headers: {
      'Content-Type': 'application/json',
    }
  }) 

  loadData()

}
const Ascending=()=>{
     userList.sort(dynamicsort("salary","desc"))
}



function dynamicsort(property,order) {
  var sort_order = 1;
  if(order === "desc"){
      sort_order = -1;
  }
  return function (a, b){
      
      if(a[property] < b[property]){
              return -1 * sort_order;
   
      }else if(a[property] > b[property]){
              return 1 * sort_order;

      }else{
              return 0 * sort_order;
      }
  }
}

  return (
    <div>
    <div>
      <button >Show All Departments</button>
      <button>Show Marketing</button>
      <button>Show HR</button>
      <button>Show IT</button>
      <button>Show Finance</button>
      <button>Show Marketing</button>
    </div> 
   
   <div>
    <button onClick={Ascending}>Sort By Salary Ascending</button>

      <button>Sort By Salary Descending</button>
    </div>



    {
      userList.map((ele)=>{
        return (<div className='card'>

           <div>Name:{ele.names}</div>
           <div>Gender:{ele.gender}</div>
           <div>Department:{ele.department}</div>
           <div>Role:{ele.role}</div>
           <div>Salary:{ele.salary}</div>

           <button onClick={()=>removeItem(ele.id)}>delete</button>
        </div>)
      }) 
    }
        
    </div>
     
    
  )
}

export default UserList;