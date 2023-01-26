import { useState,  useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Account ({loggedInUser}){
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
    if (!reviewArray[0]) return null


    const filteredUserReviewArray = reviewArray.filter((review) =>{
        if (loggedInUser === undefined){
            return null
        }
        return loggedInUser.id === review.user_id
    })


    if (loggedInUser === undefined){
        return(
            <div>
                <h1>Please Log in or Create an Account</h1>
                <br></br>
                <button type="button" onClick={() => navigate('/home')}> Home</button>
            </div>
        )
    }
    else{
        return(
            <div>
                <h1> Account  Info</h1>
                <button type="button" onClick={() => navigate('/home')}> Home</button>
                <div className="user-text">User:  {loggedInUser.display_name}</div>
                <div className="user-text">Display Name:  {loggedInUser.username}</div>
                <div className="user-text">Password:  {loggedInUser.password}</div>
                <div className="user-review-container">
                    <h2>Your Reviews</h2>
                    {filteredUserReviewArray.map((review) => {
                    return (
                        <UserReviewCard
                            key={review.bar_id}
                            review={review}
                        />
                    )
                })}                    
                </div>
            </div>
        )
    }
}

function UserReviewCard({review}){
    return(
        <div className="user-review-card">
            <div className="user-review-bar">{review.bar.name}</div>
            <div className="review-rating">{review.star_rating}</div>
            <div className="review-body">{review.content}</div>            
        </div>
    )
}