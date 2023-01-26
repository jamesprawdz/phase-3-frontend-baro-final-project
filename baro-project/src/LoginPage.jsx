import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";




export default function LoginPage ({ setLoggedInUser}){
    const navigate = useNavigate()

    const [userArray, setUserArray] = useState([])
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")




      //fetch user info
    const fetchUsers = async () => {
        const req = await fetch('http://localhost:9292/users')
        const res = await req.json()
        setUserArray(res)
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    
    function handlLogin(){
        let loginArray = userArray.filter((user) => {
            return user.username === usernameInput && user.password === passwordInput
        })[0]
        if (loginArray === undefined){
            alert("Incorrect Username or Password")
        }else{
            setLoggedInUser(loginArray)
            navigate('/home')
        }
    }

    function handleGuestLogin(){
        setLoggedInUser(undefined)
        navigate('/home')
    }
    
    

    return(

        <div className="login-background">
            <div className="login-div">
                <h1>Welcome to BarO</h1>   
                <Form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        handlLogin()
                    }} 
                >
                    <h3>Please Login</h3> 
                    <Form.Input fluid placeholder="User Name" onChange={(e) => setUsernameInput(e.target.value)}/>
                    <Form.Input fluid placeholder="Password" onChange={(e) => setPasswordInput(e.target.value)}/>
                    <Form.Button type="submit">Login</Form.Button>
                </Form>
                <button type="button" onClick={() => navigate('/home')}> Create and Account</button>
                <br/>
                <button type="button" onClick={() => handleGuestLogin()}> Continue as Guest</button>


                
            </div>
        </div>
    )



}