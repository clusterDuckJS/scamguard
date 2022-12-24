// import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { auth, db } from '../config/firebase.js';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import {AiOutlineComment} from 'react-icons/ai'
import '../styles/comment.css'

function Comment() {
    
    const {id} = useParams()
    ///COMMENT SECTION/////
    //to refer to comments collection in db
    const commentsRef = collection(db, 'comments')

    //to display only comments relevent to the post aka with same postId and {id}
    const commentsDoc = query(commentsRef, where('postId', '==', id))

    ///state to get comments list
    const [commentsList, setCommentsList] = useState(null)

    //state to empty the text field once 'add comment' button is pressed//
    const [wordEntered, setWordEntered] = useState("")

    //function to empty text field once 'add comment' button is pressed//
    const handleInput = (e) => {
        const commentText = e.target.value;
        setWordEntered(commentText);
    }

    const getComments = async() => {
        const data = await getDocs(commentsDoc);
        setCommentsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        //console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        
    }

    useEffect(() => {
        getComments();
    }, [])
    



    //comment <input/> code
    const schema =yup.object().shape({
        comment: yup.string().required('You must add a Comment'),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });
    //1.0 ADD COMMENT
    //add comment and send userId and postId along with it
    const [user] = useAuthState(auth)//hook that helps get user data
    const addComment = async (data) => {
        setWordEntered(data)
        await addDoc(commentsRef, {
            ...data, 
            userId: user?.uid, 
            postId: id,
            username: user?.displayName,
            userDp: user?.photoURL,
        });
        setWordEntered("")
        getComments();// getComments function is called to RENDER the ADDED comment in UI
        
    };
  return (
    <div className='comment-container'>
        
        <form className='comment-input-div' onSubmit={handleSubmit(addComment)} onChange={handleInput} >
            <textarea id='comment-txt' value={wordEntered} placeholder='Add your comment...' {...register('comment')} ></textarea>
            <button id='commentBtn' type='submit'>
                <h5>Add Comment</h5>
                <AiOutlineComment />
            </button>
            <p style={{color: "red"}}>{errors.comment?.message}</p>          
        </form>
        <h4>Comments({commentsList?.length})</h4>
        {commentsList?.map((comment) =>(
            <div className='comment-item' key={comment.id} >
                <img className='comment-dp' src={comment.userDp} alt='user'></img>
                <div>
                    <h4 className='comment-username'>@{comment.username}</h4>
                    <h5 className='actual-comment'>{comment.comment}</h5>
                </div> 
            </div>
            
        ))}
    </div>
  )
}

export default Comment