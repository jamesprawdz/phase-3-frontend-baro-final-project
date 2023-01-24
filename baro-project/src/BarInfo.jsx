import { useNavigate } from "react-router-dom";

export default function BarInfo(){
    const navigate = useNavigate()

    return(
        <div>
            <h1>Bar Info</h1>
            <button type="button" onClick={() => navigate('/home')}> Home</button>
        </div>
    )
}