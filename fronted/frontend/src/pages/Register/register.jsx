import "./register.css";
import { useState } from "react";//usestate is used to manage the state of the form inputs
import { useNavigate } from "react-router-dom";/*usenavigate is used to navigate to different routes programmatically*/
import BASE_URL from "../../services/api"; //BASE_URL is the base URL for the API endpoints, imported from a separate file for better maintainability

function Register() {//the Register component is a functional component that renders the registration form and handles the registration logic

 const navigate = useNavigate();

 const [form,setForm] = useState({

   name:"",
   email:"",
   password:"",
   age:"",
   role:"admin"

 });

 const handleChange = (e)=>{

   setForm({
     ...form,
     [e.target.name]:e.target.value
   });

 };

 const handleSubmit = async(e)=>{

   e.preventDefault();//preventDefault is used to prevent the default form submission behavior, which would cause a page reload

   const response =
   await fetch(
    `${BASE_URL}/register`,
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    }
   );

   const data =
   await response.json();

   alert(data.message);

   navigate("/");

 };

 return(

  <div class="register-container">

   <h2>Register</h2>

   <form
    onSubmit={handleSubmit}
   >

    <input
     name="name"
     placeholder="Name"
     onChange={handleChange}
    />

    <input
     name="email"
     placeholder="Email"
     onChange={handleChange}
    />

    <input
     name="password"
     placeholder="Password"
     onChange={handleChange}
    />

    <input
     name="age"
     placeholder="Age"
     onChange={handleChange}
    />

    <button>
      Register
    </button>
    <p>
 Already have an account?
 <a href="/login">
  Login
 </a>
</p>

   </form>

  </div>

 );

}

export default Register;