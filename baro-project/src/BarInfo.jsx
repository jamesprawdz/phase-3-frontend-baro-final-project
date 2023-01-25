import { useState,  useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function BarInfo({clickedBar}){
    const navigate = useNavigate()
    const [reviewArray, setReviewArray] = useState([])

    //fetch review list
    const fetchReviews = async () => {
        const req = await fetch('http://localhost:9292/reviews')
        const res = await req.json()
        setReviewArray(res)
    }
    useEffect(() => {
        fetchReviews()
    }, [])
    //find on the reviews that belong to the bar that we are showing 
    const filteredReviewArray = reviewArray.filter((review) =>{
        return clickedBar.id === review.bar_id
    })



    
    return(
        <div>
            {/* Test info and buttons */}
            <h1>Bar Info</h1>
            <button type="button" onClick={() => navigate('/home')}> Home</button>

            <h1 className="bar-info-name">{clickedBar.name}</h1>
            <img className="bar-info-name" src={clickedBar.image} alt={clickedBar.name}/>
            <h2 className="bar-info-rating">{clickedBar.rating}</h2>
            <h2 className="bar-info-category">{clickedBar.category}</h2>
            <h2 className="bar-info-location">{clickedBar.location}</h2>
            <h2 className="bar-info-price">{clickedBar.price}</h2>
            <h2 className="bar-info-closing-time">{clickedBar.closing_time}</h2>


            <div className="bar-reivew-container">
                {filteredReviewArray.map((review) => {
                    return (
                        <BarReviewCard
                            key={review.user_id}
                            review={review}
                        />
                    )
                })}
            </div>

        </div>
    )
}




function BarReviewCard({review}){
    return(
        <div className="bar-review-card">
            <div className="review-author">{review.user?.username}</div>
            <div className="review-rating">{review.star_rating}</div>
            <div className="review-body">{review.content}</div>            
        </div>
    )
}