// import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { auth, db } from '../config/firebase.js';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
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
    <div>
        <h4>comments({commentsList?.length})</h4>
        <form onSubmit={handleSubmit(addComment)} onChange={handleInput} >
            <textarea id='comment-txt' value={wordEntered} placeholder='add your comment...' {...register('comment')} ></textarea>
            <button id='commentBtn' type='submit'>
                Comment
                <img src='/comment.svg' alt='comment'></img>
            </button>
            <p style={{color: "red"}}>{errors.comment?.message}</p>          
        </form>
        {commentsList?.map((comment) =>(<div className='comment-container' key={comment.id} >
            <img className='comment-dp' src={comment.userDp} alt='user'></img>
            <div>
                <p className='comment-username'>@{comment.username}</p>
                <p className='actual-comment'>{comment.comment}</p>
            </div>
            
            
        </div>
            
        ))}
    </div>
  )
}

export default Comment