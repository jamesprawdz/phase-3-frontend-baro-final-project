import { useNavigate } from "react-router-dom";

export default function CrawlList() {
    const navigate = useNavigate()



    return(
        <div>
            <h1>Here is a list of created crawls</h1>
            <button type="button" onClick={() => navigate('/home')}> Home</button>

        </div>
    )
}