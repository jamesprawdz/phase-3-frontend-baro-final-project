import { useNavigate } from "react-router-dom";
;



export default function LoginPage (){
    const navigate = useNavigate()


    return(

        <div className="login-background">
            <div className="login-div">
                <h1>Welcome to BarO</h1>   
                <form >
                    <h3>Please Login</h3> 
                    <input
                        type="text"
                        name="username"
                        placeholder="User Name"
                    /> 
                    <br/>
                     <input
                        type="text"
                        name="password"
                        placeholder="Password"
                    /> 
                    <br/>
                    <input
                        type="submit"
                        name="submit"
                        className="submit"
                    />
                </form>
                <button type="button" onClick={() => navigate('/home')}> Create and Account</button>
                <br/>
                <button type="button" onClick={() => navigate('/home')}> Continue as Guest</button>


                
            </div>
        </div>
    )



}