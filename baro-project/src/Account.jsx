import { useNavigate } from "react-router-dom";

export default function Account (){
    const navigate = useNavigate()




    return(
        <div>
            <h1> Account  Info</h1>
            <button type="button" onClick={() => navigate('/home')}> Home</button>
        </div>
    )
}