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
    if (!reviewArray[0]) return null

    
    //find on the reviews that belong to the bar that we are showing 
    const filteredReviewArray = reviewArray.filter((review) =>{
        return clickedBar.id === review.bar_id
    })

    const handleUpdateReview = (updatedReviewObj) => {
        const updatedReview = reviewArray.map((review) => {
            if (review.id === updatedReviewObj.id) {
                return updatedReviewObj;
        } else {
            return review;
          }
        });
        setReviewArray(updatedReview)
    }
    console.log(clickedBar.id)

    
    
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
                            onUpdateReview={handleUpdateReview}
                        />
                    )
                })}
            </div>

        </div>
    )
}




function BarReviewCard({id, review, onUpdateReview}){
    const [reviewBody, setReviewBody] = useState("")

    const handleReviewEdit = (e) => {
        e.preventDefault();

         fetch(`http://localhost:9292/reviews/${id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: reviewBody
            })
        })
        .then((r) => r.json())
        .then((updatedReview) => onUpdateReview(updatedReview))
    }

    // const [edit, setEdit] = useState(false);

    // const handleUpdateReview = (updatedReview) => {
    //     setEdit(false)
    //     onUpdateReview(updatedReview);
    // }
    return(
        <div className="bar-review-card">
            <div className="review-author">{review.user?.username}</div>
            <div className="review-rating">{review.star_rating}</div>
            <div className="review-body">{review.content}</div>     
            <button className="edit-button">Edit</button> 
            <form className="edt-form" onSubmit={handleReviewEdit}>
                <input 
                    type="text"
                    name="content"
                    value={reviewBody}
                    onChange={(e) => setReviewBody(e.target.value)}
                />
                <input type="submit" value="Save"/>
            </form>      
        </div>
    )
}