import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "semantic-ui-react";




export default function LoginPage ({ setLoggedInUser}){
    const navigate = useNavigate()
    //states used
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
    
    //handles setting who the logged in user is finding if there is a user name 
    //and password that match on the user array
    function handlLogin(){
        let loginArray = userArray.filter((user) => {
            return user.username === usernameInput && user.password === passwordInput
        })[0]
        //if there is no user name and password that match then alert the user
        if (loginArray === undefined){
            alert("Incorrect Username or Password")
        //if there is a match we set the logged in user to the user that matched and go to the home page
        }else{
            setLoggedInUser(loginArray)
            navigate('/home')
        }
    }
    //if the user wants to continue as a guest we set the logged in user to undefined and go
    // to the home page
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