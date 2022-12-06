
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getDocs, collection } from 'firebase/firestore';
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
    <div className='search'>
        <img className='hero-img' src='hero.svg' alt='logo'></img>
        <div className='searchInputs'>
            <input id='mainSearchBar' onChange={handleFilter} type='text' placeholder='Enter seller payment number or phone number'></input>
            {filteredData.length === 0 ? (<SearchIcon id='searchBtn'/>) : (<CloseIcon id='closeBtn' value={wordEntered} onClick={clearInput} />)}
        </div>
        
{/* //show the 'dataResult' div only when filtered data array is not equal to zero  */}
        {filteredData.length !==0 && (<div className='dataResult'>
{/* //div that displays data result// */}
            {filteredData.slice(0, 15).map((value) => {
                    return(
                        <Link to={`post/${value.id}`} key={value.id}>
                            <div className='dataItem' >
                                <p><strong>{value.name}</strong></p>
                                <p>{value.mob}</p>
                                <div className='seller-status-div' >
                                    <p>{value.status}</p>
                                    {(value.status === 'Scammer') 
                                    ? (<img className='result-status-icon' src='/scammer.svg' alt='scammer' ></img>) 
                                    : (value.status === 'Verified Seller') 
                                    ? (<img className='result-status-icon' src='/verified.svg' alt='verified'></img>) 
                                    : (<img className='result-status-icon' src='/reputed.svg' alt='reputed'></img>)}
                                </div>
                                {/* <Link to={`post/${value.id}`}>View More</Link>  */}
                            </div>
                        </Link>)
            })}
            </div>)
        }
    </div>
  )
}

export default Searchbar