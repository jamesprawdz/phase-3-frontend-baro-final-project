import { useState,  useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Home ({setClickedBar}){
    const navigate = useNavigate()
    const [barArray, setBarArray] = useState([])


    //fetch bars list
    const fetchBars = async () => {
        const req = await fetch('http://localhost:9292/bars')
        const res = await req.json()
        setBarArray(res)
    }
    useEffect(() => {
        fetchBars()
    }, [])  

     

    


    return(
        <div>
            {/* Test Buttons */}
            <h1>Home Page</h1>
            <button type="button" onClick={() => navigate('/')}> Sign Out</button>
            <button type="button" onClick={() => navigate('/about')}> About</button>
            <button type="button" onClick={() => navigate('/barinfo')}> Bar Info</button>
            <button type="button" onClick={() => navigate('/account')}> Account Info</button>
            <button type="button" onClick={() => navigate('/newcrawl')}> Create a Crawl</button>
            <button type="button" onClick={() => navigate('/crawllist')}> View all Crawls</button>


            {/* display the list of bars  */}
            <div className="bar-container">
                {barArray.map((bar) => {
                    return(
                        <BarCard
                            setClickedBar={setClickedBar}
                            key={bar.id}
                            bar={bar}                            
                        />
                    )
                })}
            </div>
        </div>
    )
}



function BarCard({setClickedBar, bar}) {
    const navigate = useNavigate()
    //states to hold the opacity if the cards when the mouse goes over them
    const [mouseOverImage, setMouseOverImage] = useState(1)
    const [mouseOverInfo, setMouseOverInfo] = useState(0)

    return (
        <div 
            className="bar-card"
            // fades and unfades the bar image and text when the mouse hovers over it
            onMouseOver={()=>(
                setMouseOverImage(.3),
                setMouseOverInfo(1)
            )}
            onMouseLeave={()=>(
                setMouseOverImage(1),
                setMouseOverInfo(0)
            )}
             onClick={() => (
                setClickedBar(bar),
                navigate('/barinfo')
                )}
            >
            {/* show this ifo when we mouse over the bar image */}
            <div className="bar-card-info" style={{opacity: mouseOverInfo}}>
                {bar.name}
                {bar.review}
                {bar.category}
                {bar.price}
            </div>
            <img 
                className="bar-card-image" 
                src="https://www.shareicon.net/data/256x256/2016/11/16/854564_bar_512x512.png" 
                alt={bar.name} 
                style={{opacity: mouseOverImage}} 
            />
        </div>
    )
}