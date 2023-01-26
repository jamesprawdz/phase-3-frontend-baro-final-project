import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewCrawl(barCrawlData){
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

    
    if (!barArray[0]) return null


    const barCrawlString = barCrawlData?.barCrawlData
    let barCrawlIDArray = barCrawlString.split(',').map(Number)
    
    let barCrawlArray = []
    let barCrawlDummy = null

    barCrawlIDArray.map((id)=>{
        barCrawlDummy = barArray.filter((bar) =>{
            return bar.id === id
        })
        barCrawlArray.push(barCrawlDummy)
    })

    // console.log(barCrawlArray)


    return(
        <div>
            <h1>Here you can choose the bars for your crawl</h1>
            <button type="button" onClick={() => navigate('/home')}> Home</button>
            {barCrawlArray.map((bar) => {
                return(
                    <CrawlBar bar={bar}/>
                )
            })}
        </div>
    )
}


function CrawlBar({bar}){
    // {console.log(bar.name)}
    return(
        <div>
            You are going to {bar[0].name}
        </div>
    )
}