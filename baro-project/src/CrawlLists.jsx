import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CrawlList() {
    const navigate = useNavigate()
    const [crawlArray, setCrawlArray] = useState([])
        

    //fetch the array of all the crawls
    const fetchCrawls = async () => {
        const req = await fetch('http://localhost:9292/crawl_list')
        const res = await req.json()
        setCrawlArray(res)
    }
    useEffect(() => {
        fetchCrawls()
    }, []) 
    //halts the code untill we finish fetching 
    if (!crawlArray[0]) return null
    

    return(
        <div>
            <h1>Here is a list of created crawls</h1>
            <button type="button" onClick={() => navigate('/home')}> Home</button>

            <div className="bar-crawl-container">
                {crawlArray.map((crawl) => {
                    return(
                        <BarCrawl
                            key={crawl.id}
                            crawl={crawl}
                        />
                    )
                })}
            </div>
        </div>
    )
}


function BarCrawl(crawl){   

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

    if (!barArray[0]) return null

    let barCrawlIDArray = crawl.crawl.bar_crawl_bars.split(',').map(Number)


    let barCrawlArray = []
    let barCrawlDummy = null

    barCrawlIDArray.map((id)=>{
        barCrawlDummy = barArray.filter((bar) =>{
            return bar.id === id
        })
        barCrawlArray.push(barCrawlDummy)
    })

    console.log(crawl)

    return(
        <div className="bar-crawl">
            <div className="crawl-name">Crawl Name: {crawl.crawl.bar_crawl_name}</div>
            {/* <div>Crawl Made by: {crawl.crawl.user?.username}</div> */}
            <div>Bars in this Crawl:</div>
            {barCrawlArray.map((bar) => {
                return(
                    <CrawlBar bar={bar}/>
                )
            })}
            <br></br>
        </div>
    )
}

function CrawlBar({bar}){
    return(
        <div>
            <div className="crawl-bar"> {bar[0].name} </div>            
        </div>
    )
}