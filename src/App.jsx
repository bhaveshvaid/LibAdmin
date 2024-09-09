import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

  
function App() {
  const announcements =[{title:'hello world', link:'http://google.com'},{title:'hello world 2', link:'http://google.com/hello'}]
  const [title,setTitle]= useState('')
  const [link,setLink]= useState('')
  const[announcementsHook, setAnnouncementsHook]=useState(announcements)
  


  const serverPush=async (announcementsHook)=>{
    console.log('Push hitted')
    // const request = JSON.stringify(announcementsHook)
    try {
      // console.log(request)
      axios.post('https://lib-server.vercel.app/admin/announcements', announcementsHook).then((res)=>{
          console.log(res)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const addAnnouncement=(title,link)=>{
    const obj = {
      title:title,
      link:link
    }
    setTitle('');
    setLink('');
    const announcementsHookNew=[...announcementsHook, obj]
    setAnnouncementsHook(announcementsHookNew)
    // announcements.concat(obj)
    // console.log(obj)
  }

  const delAnnouncement=(announcement)=>{
      var newArr=[];
      announcementsHook.forEach(element => {
        if(element.title!==announcement.title){newArr= [...newArr, element]};
      });
      setAnnouncementsHook(newArr);
  }
const checkAnnouncements= async ( )=>{
  const announcement = await axios.get("https://lib-server.vercel.app/announcements/get")
  console.log(announcement.data)
}

useEffect(()=>{
  // console.log(announcementsHook);
  checkAnnouncements();

},[announcementsHook])
  return (
    <>
      <div>
        Admin Portal for LibApp
      </div>
      <div>
        Announcements
        <div>
        <table border={2}>
                <tr>
                  <th>Title</th>
                  <th>Link</th>
                  <th>Action</th>
                  </tr>
          {announcementsHook.map((announcement)=>{
            return(<>
             <tr>
                  <td>{announcement.title}</td>
                <td><a>{announcement.link}</a></td>
                <td> 
                  <button onClick={()=>delAnnouncement(announcement)}>Delete</button>
                </td>
                </tr>
              <a></a>
            </>)
          })}

           </table>

           <div>
            <input type="text" placeholder='Title/Description' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <input type="text" placeholder='Link' value={link} onChange={(e)=>{setLink(e.target.value)}}/>

            <button onClick={()=>addAnnouncement(title,link)}>
              Add
            </button>
           </div>

        </div>
      </div>

      <div>
        <button onClick={()=>serverPush(announcementsHook)}>Push</button>
      </div>

      <div>
        The data that i am fetching
        <p>

        </p>
      </div>
    </>
  )
}

export default App