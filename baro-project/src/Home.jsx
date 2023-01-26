import { BentoTwoTone } from "@mui/icons-material"
import { useState,  useEffect } from "react"
import { useNavigate } from "react-router-dom"


export default function Home ({setClickedBar, setBarCrawlData, setLoggedInUser}){
    const navigate = useNavigate()
    //states list 
    const [barArray, setBarArray] = useState([])
    const [crawlArray, setCrawlArray] = useState([])

    //fetch all the bars 
    const fetchBars = async () => {
        const req = await fetch('http://localhost:9292/bars')
        const res = await req.json()
        setBarArray(res)
    }
    useEffect(() => {
        fetchBars()
    }, [])  

    //function so when we create a crawl, we save the ID's of the bar that we will have on the crawl 
    //as a string and pass it to the new crawl page through states
     function handleCreateCrawlClick(){
        //make an array of the ID's of the bars in the crawl
        const crawlBarIDArray = crawlArray.map((bar) => {
            return bar.id
        })
        //turn that array into a string
        let stringcrawlBarIDArray = crawlBarIDArray.toString()
        //set the state of the barCrawlData to the string of the ID's of the bars in the crawl
        setBarCrawlData(stringcrawlBarIDArray)
        //navigate to the new crawl page
        navigate('/newcrawl')        
     }

     //function to log out by setting the state of the logged in user to undefined
     //and navigating back to the login page
     function logOut(){
        setLoggedInUser(undefined)
        navigate('/')
     }

     
    return(
        <div>
            {/* Test Buttons */}
            <h1>Home Page</h1>
            <button type="button" onClick={() => logOut()}> Sign Out</button>
            <button type="button" onClick={() => navigate('/about')}> About</button>
            <button type="button" onClick={() => navigate('/account')}> Account Info</button>
            <button type="button" onClick={() => navigate('/crawllist')}> View all Crawls</button>


            <div className="bar-crawl-container">
                <div className="bar-crawl-list">
                    {/* show all the bars that were added to the crawl array */}
                    {crawlArray.map((bar) => {
                        return(
                            <BarCard
                                type={'crawl'}
                                setClickedBar={setClickedBar}
                                key={bar.id}
                                bar={bar}
                                crawlArray={crawlArray}
                                setCrawlArray={setCrawlArray}                            
                            />
                        )
                    })}
                </div>
                <button 
                    className="bar-crawl-button"
                    onClick={() => setCrawlArray([])}
                >Clear Crawl
                </button>
                <button 
                    className="bar-crawl-button"
                    onClick={() => handleCreateCrawlClick()}
                >Create Crawl
                </button>

            </div>


            {/* display all the bars  */}
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

    //if you click on the bar card, it will navigate to the bar info page
    //and then send the info of that clicked bar to the bar info page with states
    function handleClick(bar){
        if(type === "main"){            
            setClickedBar(bar)
            navigate('/barinfo')
        }
    }

    return (
        //change the class name depending on if it is a main bar card or a crawl bar card
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
                //if you click on the bar card, it will navigate to the bar info page                
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
                    src={bar.image} 
                    alt={bar.name} 
                    style={{opacity: mouseOverImage}} 
                />
            </div>
            {/* show the button to add to a crawl only if we are a main bar card */}
            {type === "main"
                ?<button 
                className="bar-card-button"
                onClick={() => (
                    setCrawlArray([...crawlArray, bar])
                    )}
            >Add To Crawl
            </button>
            :<></>
            }
        </div>
    )
}