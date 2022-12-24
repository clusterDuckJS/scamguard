import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import '../styles/forms.css'


function CreatePost() {

    const navigate = useNavigate()
    const [user] = useAuthState(auth)

    const schema =yup.object().shape({
        name: yup.string().required('You must add a name'),
        businessName: yup.string(),
        mobileNum: yup.string().required('You must add a mobile number'),
        upiNum: yup.string(),
        accNum:yup.string(),
        description: yup.string().required('You must add a description'),
        userNum: yup.string().required('You must add your number'),
        userEmail:yup.string(),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const postRef = collection(db, 'userSubmissions')

    const returnHome = () => {
        navigate('/')
    }

    const onCreatePost = async (data) => {
        await addDoc(postRef,{
            ...data,
            username: user?.displayName,
            userId: user?.uid,

        });
        navigate('/submission')
    }

  return (
    <div className='container form-container' >
        <h2>Report Seller</h2>
        <form onSubmit={handleSubmit(onCreatePost)}>
            <div className='form-container-report'>

                <div className='form-container-report-div1'>
                    <div className='form-name-div'>
                        <label htmlFor='name'>Name*</label>
                        <input className='text-form' placeholder='Name of Seller' id='name' {...register('name')}></input>
                        <p className='error-text'>{errors.name?.message}</p>
                    </div>
                    <div className='form-name-div' >
                        <label htmlFor='busName'>Name of Business (Optional)</label>
                        <input className='text-form' placeholder='Name of business' id='busName' {...register('businessName')}></input>
                    </div>
                </div>

                <div className='form-container-report-div1'>
                    <div>
                        <div className='form-name-div'>
                            <label htmlFor='mob'>Seller Mobile Number*</label>
                            <input type='number' className='text-form' placeholder='Mobile Number' id='mob' {...register('mobileNum')}></input>
                            <p className='error-text' >{errors.mobileNum?.message}</p>
                        </div>

                        <div className='form-name-div'>
                            <label htmlFor='accNum'>Seller bank a/c number (Optional)</label>
                            <input className='text-form' placeholder='bank account number' id='accNum' {...register('accNum')}></input>
                        </div>
                    </div>

                    <div className='form-name-div'>
                        <label htmlFor='upi'>Seller UPI id/number (Optional)</label>
                        <input type='number' className='text-form' placeholder='UPI id or Number' id='upi' {...register('upiNum')}></input>
                    </div>
                </div>

                <div className='form-container-report-div1'>
                    <div className='form-name-div'>
                        <label htmlFor='description'>Brief description*</label>
                        <textarea className='description-textarea' placeholder='brief description of what happened' id='description' {...register('description')}></textarea>
                        <p className='error-text' >{errors.description?.message}</p>
                    </div>
                </div>

                <div className='form-container-report-div1'>

                    <div className='form-name-div'>
                        <label htmlFor='userNum'>Your WhatsApp number**</label>
                        <input type='number' className='text-form' placeholder='WhatsApp number / email id' id='userNum' {...register('userNum')}></input>
                        <p className='error-text' >{errors.userNum?.message}</p>
                    </div>

                    <div className='form-name-div'>
                        <label htmlFor='userEmail'>Your email id (Optional)</label>
                        <input type='email' className='text-form' placeholder='WhatsApp number / email id' id='userEmail' {...register('userEmail')}></input>
                    </div>
                </div>
                <p className='info-text'>**We never share your personal info with the person you are reporting or any other third parties. The data is collected solely for the purpose of clarifying any details during the review if required.</p>

                <div className='buttons-div' >
                    <button className='cancel-btn' onClick={returnHome}> Cancel</button>
                    <button className='submit-btn' type='submit'>Report</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default CreatePost