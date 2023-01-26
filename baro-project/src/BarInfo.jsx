import { CoPresentSharp } from "@mui/icons-material";
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

    const handleUpdateReview = (updatedReview) => {
        const updatedReviews = reviewArray.map((review) => {
            if (review.id === updatedReview.id) {
                return updatedReview;
        } else {
            return review;
          }
        });
        setReviewArray(updatedReviews)
    //     console.log("Edit Complete:", updatedReview)
     }
    
    
    
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




function BarReviewCard({review, onUpdateReview}){
    const [contentBody, setContentBody] = useState(review.content)
    const [starBody, setStarBody] = useState(review.star_rating)
    const  [toggleEdit, setToggleEdit]  = useState(false);

    const handleEditToggle = () => {
        setToggleEdit(!toggleEdit)
    }
    
    const handleReviewEdit = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:9292/reviews/${review.id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: contentBody,
                star_rating: starBody
            })
        })
        .then((r) => r.json())
        .then((updatedReview) => onUpdateReview(updatedReview))
    }
    
        return(
        <div className="bar-review-card">
            <div className="review-author">{review.user?.username}</div>
            <div className="review-rating">{review.star_rating}</div>
            <div className="review-body">{review.content}</div>     
            <button className="edit-button" onClick={handleEditToggle}>Edit</button> 
            {toggleEdit ? <form className="edt-form" onSubmit={handleReviewEdit}>
                <input 
                    type="text"
                    name="content"
                    value={contentBody}
                    onChange={(e) => setContentBody(e.target.value)}
                    />
                <input  
                    type="text"
                    name="star_rating"
                    value={starBody}
                    onChange={(e) => setStarBody(e.target.value)}
                    />
                <input type="submit" value="Save"/>
            </form> : null}    
            {console.log(review.user?.username)}
        </div>
    )
}