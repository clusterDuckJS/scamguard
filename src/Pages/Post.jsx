
import { useParams } from 'react-router-dom'
import {auth, db } from '../config/firebase.js';
import { getDoc, doc, collection, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Comment from '../Components/Comment.jsx';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/post.css'
import { useNavigate } from 'react-router-dom';
import {AiFillAlert} from 'react-icons/ai'
import {MdVerifiedUser} from 'react-icons/md'
import {RiUserStarLine} from 'react-icons/ri'
import {AiOutlineDislike, AiOutlineLike} from 'react-icons/ai'


function Post() {

    const {id} = useParams()
    
    const[posts, setPosts] = useState({})
    const navigate = useNavigate()

    
    
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
    <div className='container post-container'>
        <h1>Seller Details</h1>
        <div className='post-grid-container'>
            <div className="post-grid-1">
                <h3 className='post-paras' ><strong>Name: </strong>{posts.name}</h3>   
                <div className='status-container'>
                    <h4><strong>Status: </strong>{posts.status}</h4>
                        {posts.status === 'Scammer' 
                        ? (<AiFillAlert className='status-icon-scammer' />) 
                        : posts.status === 'Verified Seller' 
                        ? (<MdVerifiedUser className='status-icon-verified' />) 
                        : (<RiUserStarLine className='status-icon-top' />)}
                    
                </div>

                    <div className='poll-div'>
                        <div className='pollBtn-div'>
                            <h4 className='agree-score'>Agree</h4>
                            <button className='poll-btn' id='agreeBtn' onClick={user ? addLike : navigate('/login')} disabled={hasUserLiked}><AiOutlineLike className='btn-icon like-icon' /></button>
                            {likes && <h4 className='agree-score'>{likes?.length}</h4>}
                        </div>

                        <div className='pollBtn-div'>
                            <h4 className='disagree-score'>Disagree</h4>
                            <button className='poll-btn' id='disagreeBtn' onClick={user ? addUnlike : navigate('/login')} disabled={hasUserUnliked}><AiOutlineDislike className='btn-icon dislike-icon' /></button>
                            {unlikes && <h4 className='disagree-score'>{unlikes?.length}</h4>}
                        </div>

                    </div>
                
                

                <h4 className='post-paras' ><strong>Other known names: </strong>{posts.otherNames}</h4>
                <h4 className='post-paras' ><strong>Name of Business: </strong>{posts.busName}</h4>
                <h4 className='post-paras' ><strong>Contact Info: </strong>+91 {posts.mob}</h4>
                <h4 className='post-paras' ><strong>Location: </strong>{posts.address}</h4>
                <h5 className='post-paras' >{posts.description}</h5>
                <small className='post-ref'>Ref: {id}</small>
                <Comment />
            </div>

            
            
            
            
        </div>
    </div>
  )
}

export default Post