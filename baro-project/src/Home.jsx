import { BentoTwoTone } from "@mui/icons-material"
import { useState,  useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Home ({setClickedBar, setBarCrawlData}){
    const navigate = useNavigate()
    const [barArray, setBarArray] = useState([])

    const [crawlArray, setCrawlArray] = useState([])


    //fetch bars list
    const fetchBars = async () => {
        const req = await fetch('http://localhost:9292/bars')
        const res = await req.json()
        setBarArray(res)
    }
    useEffect(() => {
        fetchBars()
    }, [])  


     function handleCreateCrawlClick(){
        const crawlBarIDArray = crawlArray.map((bar) => {
            return bar.id
        })
        let stringcrawlBarIDArray = crawlBarIDArray.toString()
        setBarCrawlData(stringcrawlBarIDArray)
        navigate('/newcrawl')        
     }


     
    return(
        <div className="homepage">
            {/* Test Buttons */}
            <div className="nav-bar">
                <button type="button" onClick={() => navigate('/')}> Sign Out</button>
                <button type="button" onClick={() => navigate('/about')}> About</button>
                <button type="button" onClick={() => navigate('/account')}> Account Info</button>
                <button type="button" onClick={() => navigate('/newcrawl')}> Create a Crawl</button>
                <button type="button" onClick={() => navigate('/crawllist')}> View all Crawls</button>
            </div>
            <img className="home-image" src="https://citizenside.com/wp-content/uploads/2022/12/bar-hopping-1-1170x780.jpg" />
            <h1 className="title">BarO</h1>
            <div className="welcome-message">
            <h3>Welcome To BarO</h3>
            <p className="description">The goal of BarO is to enhance your bar hopping experience to the MAX,</p>
            <p className= "description">so you will have a night to remember!</p>
            </div>
                <div className="bar-crawl-container">
                    <div className="bar-crawl-list">
                    {crawlArray.map((bar) => {
                        return(
                            <div>
                            <BarCard
                                type={'crawl'}
                                setClickedBar={setClickedBar}
                                key={bar.id}
                                bar={bar}
                                crawlArray={crawlArray}
                                setCrawlArray={setCrawlArray}                            
                            />
                            <h1 className="crawl-arrow">----></h1>
                            </div>
                        )
                    })}
                    </div>
                <button className="bar-crawl-button"
                    onClick={() => setCrawlArray([])}
                >Clear Crawl
                </button>
                <button 
                    className="bar-crawl-button"
                    onClick={() => handleCreateCrawlClick()}
                >Create Crawl
                </button>

            </div>


            {/* display the list of bars  */}
            <div className="bar-container">
                {barArray.map((bar) => {
                    return(
                        <BarCard
                            type={"main"}
                            setClickedBar={setClickedBar}
                            crawlArray={crawlArray}
                            setCrawlArray={setCrawlArray}
                            key={bar.id}
                            bar={bar}                            
                        />
                    )
                })}
            </div>
        </div>
    )
}



function BarCard({type, setClickedBar, crawlArray, setCrawlArray, bar}) {
    const navigate = useNavigate()
    //states to hold the opacity if the cards when the mouse goes over them
    const [mouseOverImage, setMouseOverImage] = useState(1)
    const [mouseOverInfo, setMouseOverInfo] = useState(0)

    function handleClick(bar){
        if(type === "main"){            
            setClickedBar(bar)
            navigate('/barinfo')
        }
    }

    return (
        <div className={type === "main" ? "bar-card" : "crawl-card"} >
            <div 
                className={type === "main" ? "bar-card-inner" : "crawl-card-inner"} 
                // fades and unfades the bar image and text when the mouse hovers over it
                onMouseOver={()=>(
                    setMouseOverImage(.3),
                    setMouseOverInfo(1)
                )}
                onMouseLeave={()=>(
                    setMouseOverImage(1),
                    setMouseOverInfo(0)
                )}                
                onClick={() => handleClick(bar)}
                >
                {/* show this ifo when we mouse over the bar image */}
                <div className="bar-card-info" style={{opacity: mouseOverInfo}}>
                    {bar.name}<br></br>
                    {bar.review}<br></br>
                    {bar.category}<br></br>
                    {bar.price}
                </div>
                <img 
                    className="bar-card-image" 
                    src="https://www.shareicon.net/data/256x256/2016/11/16/854564_bar_512x512.png" 
                    alt={bar.name} 
                    style={{opacity: mouseOverImage}} 
                />
            </div>
            {type === "main"
                ?<button 
                className="bar-card-button"
                onClick={() => (
                    setCrawlArray([...crawlArray, bar])
                    )}
            >Add To Crawl
            </button>
            :<div></div>
            }
        </div>
    )
}