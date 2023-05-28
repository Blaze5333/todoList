import React from 'react'
import "./todolist.css"
import axios from 'axios'
import { useState,useEffect} from 'react'
import{useSearchParams,useNavigate} from 'react-router-dom'
export default function Todolist(props) {
  // const location = useLocation()
  const navigate=useNavigate()
  const [queryParameters] =useSearchParams()
  // console.log(queryParameters.get('uid'))
  const [item, setitem] = useState('')
  const [todolist, settodolist] = useState()
  const [name, setname] = useState()
  const [image, setimage] = useState()
  let i=0;
  useEffect(() => {
     props.buttonfunc('Logout')
     
    axios.post('http://localhost:5000/info/listitem1',{"id":queryParameters.get('uid')},{headers: { 
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Content-Type':'application/x-www-form-urlencoded'
    },}).then((res)=>{
        if(res.data.error){
            navigate('/autherror')
        }
        else{
          let first,rest
            [first,...rest]=res.data.item
            settodolist(rest)
            setimage(res.data.image)
            setname(res.data.username)
        }
            
    }).catch((err)=>{
      console.log(err)
    })

  }, [])
  const handlechange=(e)=>{
    setitem(e.target.value)
  }
  return (
    <div>
    <img src={image} style={{"padding":"20px","borderRadius":"50%"}}></img>
    <h1 style={{"padding":"10px"}}>Hi! {name}</h1>
    <section class="vh-100" style={{backgroundColor: "#eee;"}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-9 col-xl-7">
        <div class="card rounded-3">
          <div class="card-body p-4">

            <h4 class="text-center my-3 pb-3">To Do App</h4>

            <form class="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2" action='http://localhost:5000/info/listitem' method='post'>
              <div class="col-12">
                <div class="form-outline">
                  <input type="text" id="form1" value={item} onChange={handlechange} class="form-control" name='item' />
                  <label class="form-label" for="form1">Enter a task here</label>
                </div>
              </div>

              <div class="col-12">
                <button type="submit" class="btn btn-primary">Save</button>
              </div>

            </form>

            <table class="table mb-4">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Todo item</th>
                  <th scope="col">Date and Time</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
              {todolist&&todolist.map((elem)=>{
                i++;
                return(
                <tr>
                <th scope="row">{i}</th>
                <td>{elem.item}</td>
                <td>{elem.date}</td>
                <td>
                 <form action='http://localhost:5000/info/deleteitem' method='post'>
                  <button type="submit" class="btn btn-danger" name={elem} >Finished</button>
                  </form>
                </td>
              </tr>)
              })}
                
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )}