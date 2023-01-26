import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function LoginPage (){
    const navigate = useNavigate()

    const [toggleLogin,  setToggleLogin] = useState(false);
    
    const handleToggle = () => {
        setToggleLogin(!toggleLogin);
    }

    return(
        <div className="login-background">
            <div className="login-div">
                <h1 className="welcome">BarO</h1>
                <h2 className="motto">Bar Hoping Made Easy</h2>
                {/*<img src="" />*/}
                <button className="start-btn" onClick={handleToggle}>Begin Hopping</button>
                { toggleLogin ? <div className="form-popup">
                    <div className="form-div">
                        <form className="login-form">
                        <button className="exit-form" onClick={handleToggle}>End Your Journey</button>
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
                        <br/>
                        <button type="button" onClick={() => navigate('/home')}> Create an Account</button>
                        <br/>
                        <button type="button" onClick={() => navigate('/home')}> Continue as Guest</button>
                        </form> 
                    </div>
                </div>: null}


                
            </div>
        </div>
    )



}