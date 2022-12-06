import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import '../styles/forms.css'


function Admin() {

    
    const [user] = useAuthState(auth)

    const schema =yup.object().shape({
        name: yup.string(),
        busName: yup.string(),
        otherNames: yup.string(),
        mob: yup.string(),
        upi: yup.string(),
        status: yup.string(),
        accNum:yup.string(),
        address:yup.string(),
        description: yup.string(),
        postUrl: yup.string(),
    });

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });

    const postRef = collection(db, 'results')

    const onCreatePostAdmin = async (data) => {
        await addDoc(postRef,{
            ...data,
            username: user?.displayName,
            userId: user?.uid,

        });
        window.location.reload();
    }

  return (
    <div>
        <form onSubmit={handleSubmit(onCreatePostAdmin)}>

            <div className='form-container-report'>

                <div className='form-container-report-div1'>
                    <div className='form-name-div'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' className='text-form' placeholder='Name' id='name' {...register('name')}></input>
                    </div>
                    <div className='form-name-div'>
                        <label htmlFor='busName'>Name of Business</label>
                        <input type='text' className='text-form' placeholder='Business Name' id='busName' defaultValue='Unavailable' {...register('busName')}></input>
                    </div>
                </div>

                <div className='form-container-report-div1'>
                    <div className='form-name-div'>
                        <label htmlFor='mob'>Mobile number</label>
                        <input type='text' className='text-form' placeholder='Mobile Number' id='mob' {...register('mob')}></input>
                    </div>
                    <div className='form-name-div'>
                        <label htmlFor='accNum'>A/c number</label>
                        <input type='text' className='text-form' placeholder='bank account number' defaultValue='Unavailable' id='accNum' {...register('accNum')}></input>
                    </div>
                    <div className='form-name-div'>
                        <label htmlFor='upi'>UPI</label>
                        <input type='text' className='text-form' placeholder='UPI id or Number' defaultValue='Unavailable' id='upi' {...register('upi')}></input>                     
                    </div>
                    <div className='form-name-div'>
                        <label htmlFor='otherNames'>Other names</label>             
                        <input type='text' className='text-form' placeholder='Other Known Names' defaultValue='Unavailable' id='otherNames'  {...register('otherNames')}></input>
                    </div>
                    <div className='form-name-div'>
                        <label htmlFor='address'>Address</label>
                        <input type='text' className='text-form' placeholder='Address' defaultValue='Unavailable' id='address' {...register('address')}></input>                     
                    </div>
                    <div className='form-name-div'>
                        <label htmlFor='otherNames'>Post Url</label>             
                        <input type='text' className='text-form' placeholder='Fb post url' defaultValue='Unavailable' id='otherNames'  {...register('postUrl')}></input>
                    </div>
                </div>
                
                <div className='form-container-report-div1'>
                    <div className='form-name-radio'>
                        <input type='radio' value='Scammer' id='scammer' {...register('status')}></input>
                        <label htmlFor="scammer">Scammer</label>
                    </div>

                    <div className='form-name-radio'>
                        <input type='radio' value='Verified Seller' id='verified' {...register('status')}></input>
                        <label htmlFor="verified">Verified Seller</label>
                    </div>

                    <div className='form-name-radio'>
                        <input type='radio' value='Top Rated Seller' id='reputed' {...register('status')}></input>
                        <label htmlFor="reputed">Top Rated Seller</label>
                    </div>
                    <div className='form-name-div'>
                        <label htmlFor='description'>Brief description*</label>
                        <textarea className="description-textarea" placeholder='brief description of what happened' id='description' {...register('description')}></textarea>
                    </div>
                </div>
                    
                <div className='buttons-div'>
                    <button className='submit-btn' type='submit'>Submit</button>
                </div>
            </div>

        </form>
    </div>
  )
}

export default Admin