import { useNavigate } from "react-router-dom";

export default function CreateABarCrawl(){
    const navigate = useNavigate()



    return(
        <div>
            <h1>Here you can choose the bars for your crawl</h1>
            <button type="button" onClick={() => navigate('/home')}> Home</button>
        </div>
    )
}