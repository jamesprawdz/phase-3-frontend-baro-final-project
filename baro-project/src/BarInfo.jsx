import { useState,  useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function BarInfo({clickedBar}){
    const navigate = useNavigate()
    const [reviewArray, setReviewArray] = useState([])
    const [userArray, setUserArray] = useState([])


     //fetch user info
     const fetchUsers = async () => {
        const req = await fetch('http://localhost:9292/users')
        const res = await req.json()
        setUserArray(res)
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    


    //fetch review list
    const fetchReviews = async () => {
        const req = await fetch('http://localhost:9292/reviews')
        const res = await req.json()
        setReviewArray(res)
    }
    useEffect(() => {
        fetchReviews()
    }, [])
    if (!reviewArray[0]) return null

    
    //find on the reviews that belong to the bar that we are showing 
    const filteredReviewArray = reviewArray.filter((review) =>{
        return clickedBar.id === review.bar_id
    })


    console.log(reviewArray[0])
    
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
                            userArray={userArray}
                        />
                    )
                })}
            </div>

        </div>
    )
}




function BarReviewCard({review, userArray}){

    let reviewUser = userArray.filter((user) =>{
        return user.id === review.user_id
    })

    return(
        <div className="bar-review-card">
            <div className="review-author">{reviewUser[0].display_name}</div>
            <div className="review-rating">{review.star_rating}</div>
            <div className="review-body">{review.content}</div>            
        </div>
    )
}