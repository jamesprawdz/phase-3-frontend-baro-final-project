import { useNavigate } from "react-router-dom"

export default function Home (){
    const navigate = useNavigate()



    return(
        <div>
            <h1>Home Page</h1>
            <button type="button" onClick={() => navigate('/')}> Sign Out</button>
            <button type="button" onClick={() => navigate('/about')}> About</button>
            <button type="button" onClick={() => navigate('/barinfo')}> Bar Info</button>
            <button type="button" onClick={() => navigate('/account')}> Account Info</button>
            <button type="button" onClick={() => navigate('/newcrawl')}> Create a Crawl</button>
            <button type="button" onClick={() => navigate('/crawllist')}> View all Crawls</button>




        </div>
    )
}