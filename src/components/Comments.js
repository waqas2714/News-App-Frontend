import React, { useEffect, useState } from "react";
import './Comments.css';
import axios from "axios";
import { backendUrl } from "../utils/URLs";
import {toast} from 'react-toastify';
import { toastOptions } from "../pages/Signup";

const Comments = ({title, getComments, comments}) => {
    const [comment, setComment] = useState("");
    const userId = localStorage.getItem('userId');
    const [commentsChanged, setCommentsChanged] = useState(false);

    const addComment = async (e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post(`${backendUrl}/api/comment/addComment`, {comment, title, userId});
            if (data.comment) {
                toast.success("Comment Added!",toastOptions)
                setCommentsChanged((prev)=>!prev);
                setComment("")
            }else{
                toast.error("Comment could not be added, pease try later.", toastOptions);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        getComments();
    },[commentsChanged])

return (
    <div className="comments">
        <h4 style={{ fontSize: "1.2rem" }}>Comments</h4>
        <div className="comment-form">
            <form onSubmit={addComment}>
                <input type="text" placeholder="Add Comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
                <button className="add-comment-btn" type="submit">Comment</button>
            </form>
        </div>
        <hr style={{ borderColor: "black" }} />
        <div className="comment-container">
            {comments.length > 0 ? (
                comments.map((item, index) => (
                    <div key={index}>
                        <div className="name" style={{ fontWeight: "600" }}>
                            {item.name}:
                        </div>
                        <div className="comment">
                            {item.comment}
                        </div>
                        <hr style={{ borderColor: "rgb(197, 179, 74)" }} />
                    </div>
                ))
            ) : (
                <div className="comment">No comments made.</div>
            )}
        </div>
    </div>
);
};

export default Comments;



//   return (
//     <>
//     <div className="comments">
//       <h4 style={{ fontSize: "1.2rem" }}>Comments</h4>
//       <div className="comment-form">
//         <form onSubmit={addComment}>
//       <input type="text" placeholder="Add Comment..." value={comment} onChange={(e)=>setComment(e.target.value)}/>
//       <button className="add-comment-btn" type="submit">Comment</button>
//       </form>
//       </div>
//       <hr style={{ borderColor: "black" }} />
//       <div className="comment-container">
//         {
//             comments.length > 0 ?(
//                 {
//                     comments.map((item, index)=>{
//                         return(
// <>
//                 <div className="name" style={{ fontWeight: "600" }}>
//           Waqas:
//         </div>
//         <div className="comment">
//           Dignissimos non aut quam minima, impedit maxime laudantium accusamus!
//           Ipsa eligendi itaque quae dolorum doloribus aut minima consequuntur
//           blanditiis, debitis totam amet facere sunt numquam a!
//         </div>
//         <hr style={{ borderColor: "rgb(197, 179, 74)" }} />
//         </>
//                         )
//                     })
//                 }
//                 ):
//             <div className="comment">No comments made.</div>
//         }
        


//       </div>
//     </div>
//     </>
//   );
