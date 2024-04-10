import { useState } from 'react'
import axios from "axios";

const Profile = props => {

  const [profileData, setProfileData] = useState(null)
  
  const getData = () => {
    axios({
      method: "GET",
      url:"/profile",
      baseURL: 'http://127.0.0.1:5000',
      headers: {
        Authorization: 'Bearer ' + props.token
      }
    })
    .then((response) => {
      const res = response.data
      res.access_token && props.setToken(res.access_token)
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

    console.log(localStorage)

  return (
    <div className="Profile">
      <p>To get your profile details: </p>
      <button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }
    </div>
  );
}

export default Profile;