
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getDocs, collection } from 'firebase/firestore';
import {AiFillAlert} from 'react-icons/ai'
import {MdVerifiedUser} from 'react-icons/md'
import {FaMedal} from 'react-icons/fa'
import { db } from '../config/firebase.js';
import { Link } from 'react-router-dom';
import '../styles/searchbar.css'



function Searchbar() {

    
    const [filteredData, setFilteredData] = useState([])
    //state to help with the clearInput()///
    const [wordEntered, setWordEntered] = useState("")
    const [postsList, setPostsList] = useState(null)

    const postsRef = collection(db, 'results')

    const getPosts = async() => {
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
        // console.log(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
    };

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = postsList.filter((value) => {
            return value.mob.toLowerCase().includes(searchWord.toLowerCase()) || value.name.toLowerCase().includes(searchWord.toLowerCase())
        });
        if(searchWord === ''){
            setFilteredData([])

        }else {
            
            setFilteredData(newFilter);
        }
    }

    useEffect(() => {
        getPosts()
    }, []);

    const clearInput = () => {
        setWordEntered("")
        setFilteredData([]);
        
    }

  return (
    <div className='container-search'>
        <img className='hero-img' src='/images/hero.svg' alt='logo'></img>
        <div className='searchInputs'>
            <input id='mainSearchBar' onChange={handleFilter} type='text' placeholder='Enter seller payment number or phone number'></input>
            {filteredData.length === 0 ? (<SearchIcon className='input-btn'/>) : (<CloseIcon className='input-btn' value={wordEntered} onClick={clearInput} />)}
        </div>
        
{/* //show the 'dataResult' div only when filtered data array is not equal to zero  */}
        {filteredData.length !==0 && (<div className='dataResult'>
{/* //div that displays data result// */}
            {filteredData.slice(0, 10).map((value) => {
                    return(
                        <Link to={`post/${value.id}`} key={value.id}>
                            <div className='dataItem' >
                                <h5><strong>{value.name}</strong></h5>
                                <h5>{value.mob}</h5>
                                <div className='seller-status-div' >
                                    
                                    {(value.status === 'Scammer') 
                                    ? (<AiFillAlert className='status-icon-scammer' />) 
                                    : (value.status === 'Verified Seller') 
                                    ? (<MdVerifiedUser className='status-icon-verified' />) 
                                    : (<FaMedal className='status-icon-top'/>)}
                                    <h5>{value.status}</h5>
                                </div>
                                <Link className='results-link' to={`post/${value.id}`}>Details</Link>
                            </div>
                        </Link>)
            })}
            </div>)
        }
    </div>
  )
}

export default Searchbar