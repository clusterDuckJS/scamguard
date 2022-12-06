
import { useParams } from 'react-router-dom'
import {auth, db } from '../config/firebase.js';
import { getDoc, doc, collection, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Comment from '../Components/Comment.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/post.css'






function Post() {

    const {id} = useParams()
    
    const[posts, setPosts] = useState({})

    
    
    const docRef = doc(db, 'results', `${id}`)

    const docSnap = async() => {
        const data = await getDoc(docRef)
        setPosts(data.data(), data.id)
    }

    useEffect(() => {
        docSnap();
    },[id]) 

    const [user] = useAuthState(auth);
    const [likes, setLikes] = useState(null)

    const likesRef = collection(db, 'likes');
    const likesDoc = query(likesRef, where('postId', '==', id))

    const getLikes = async() => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId})))
        //console.log(data.docs.map((doc) => ({userId: doc.data().userId})))

    };

    const addLike = async() => {
        await addDoc (likesRef, {userId: user?.uid, postId: id})
        removeUnlike();
        getLikes();
    };

    const removeLike = async() => {
        const likeToDeleteQuery = query(
            likesRef,
            where('postId', '==', id),
            where('userId', '==', user?.uid)
        );
        const likeToDeleteData = await getDocs(likeToDeleteQuery);
        const likeToDelete = doc(db,'likes', likeToDeleteData.docs[0].id);
        await deleteDoc(likeToDelete);
        getLikes();
        
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, []);

///DISLIKE

    const [unlikes, setUnlikes]= useState(null)

    const unlikeRef = collection(db,'unlikes');
    const unlikesDoc = query(unlikeRef, where('postId', '==', id)) 

    const getUnlikes = async() => {
        const data = await getDocs(unlikesDoc);
        setUnlikes(data.docs.map((doc) => ({userId: doc.data().userId})))
        console.log(data.docs.map((doc) => ({userId: doc.data().userId})))

    };

    const addUnlike = async() => {
        await addDoc (unlikeRef, {userId: user?.uid, postId: id})
        removeLike();
        getUnlikes();
    };

    const removeUnlike = async() => {
        const unlikeToDeleteQuery = query(
            unlikeRef,
            where('postId', '==', id),
            where('userId', '==', user?.uid)
        );
        const unlikeToDeleteData = await getDocs(unlikeToDeleteQuery);
        const unlikeToDelete = doc(db,'unlikes', unlikeToDeleteData.docs[0].id);
        await deleteDoc(unlikeToDelete);
        getUnlikes();
        
    }

    const hasUserUnliked = unlikes?.find((unlike) => unlike.userId === user?.uid)
   

    useEffect(() => {
        getUnlikes();
    }, []);


  return (
    <div className='post'>
        <div className='seller-info' >

            <h1>Seller Details</h1>
            <p className='post-paras' ><strong>Name: </strong>{posts.name}</p>
            
            <div className='status-container'>
                <p className='post-paras' ><strong>Status: </strong>{posts.status}</p>
                    {posts.status === 'Scammer' 
                    ? (<img className='status-icon' src='/scammer.svg' alt='scammer' ></img>) 
                    : posts.status === 'Verified Seller' 
                    ? (<img className='status-icon' src='/verified.svg' alt='verified'></img>) 
                    : (<img className='status-icon' src='/reputed.svg' alt='reputed'></img>)}
                
            </div>

                <div className='poll-div'>
                    <div className='pollBtn-div'>
                        <p className='agree-score'>agree</p>
                        <button className='poll-btn' id='agreeBtn' onClick={addLike} disabled={hasUserLiked}></button>
                        {likes && <p className='agree-score'>{likes?.length}</p>}
                    </div>

                    <div className='pollBtn-div'>
                        <p className='disagree-score'>disagree</p>
                        <button className='poll-btn' id='disagreeBtn' onClick={addUnlike} disabled={hasUserUnliked}></button>
                        {unlikes && <p className='disagree-score'>{unlikes?.length}</p>}
                    </div>

                </div>
            
            

            <p className='post-paras' ><strong>Name of Business: </strong>{posts.busName}</p>
            <p className='post-paras' ><strong>Other known names: </strong>{posts.otherNames}</p>
            <p className='post-paras' ><strong>Contact Info: </strong>{posts.mob}</p>
            <p className='post-paras' ><strong>Location: </strong>{posts.address}</p>
            <p className='post-paras' >{posts.description}</p>
            <p className='post-ref'>Ref: {id}</p>
            <Comment />
        </div>

        
        
        
        
    </div>
  )
}

export default Post