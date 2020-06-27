import axios from "axios";


axios.defaults.withCredentials = true;

export default props=>{
    const [values,setValues] = React.useState({
        email:'',
        password:'',
    });


    const onChange = e=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value,
        })

    }


    const profileData  = async ()=>{
        const cookieres = await axios.get("/api/profile");
        console.log("res.dta = ",cookieres.data);
    }

    const logout = async ()=>{
        const logoutRes = await axios.get("/api/logout");
    }


    const submitForm = async ()=>{
  
        const res = await axios.post("/api/login",{
            ...values,
        });
        console.log("login  = ",res.data);
       
    }

    return(
        <div>
            <h2>
                Login
            </h2>

            <div>
                <input type="text" name="email" placeholder="Email" onChange={onChange} value={values.email}/>
                <input type="text" name="password" placeholder="Password" onChange={onChange} value={values.password}/>
                <button onClick={submitForm}>Login</button>

                <button onClick={profileData}>Fetch profile data</button>
                
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    )
}