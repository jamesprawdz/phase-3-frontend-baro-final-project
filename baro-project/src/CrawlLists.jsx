import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CrawlList() {
    const navigate = useNavigate()
    const [crawlArray, setCrawlArray] = useState([])

    //fetch crawl list
    const fetchCrawls = async () => {
        const req = await fetch('')
        const res = await req.json()
        setCrawlArray(res)
    }
    useEffect(() => {
        fetchCrawls()
    }, []) 



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


    return(
        <div className="bar-crawl">
            <div className="crawl-name">{crawl.name}</div>

        </div>
    )
}