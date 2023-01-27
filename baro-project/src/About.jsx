import { useNavigate } from "react-router-dom"


export default function About(){
    const navigate = useNavigate()



    return(
        <div>
            <h1>BarO </h1>
            <p>A phase 3 project made by Tomer, James P, and Avi</p>
            <button type="button" onClick={() => navigate('/home')}> Home</button>
        </div>        
    )
}
