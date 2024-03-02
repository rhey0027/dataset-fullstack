import { useEffect } from 'react'
import { useBucketsContext } from '../hooks/useBucketsContext'
import { useAuthContext } from '../hooks/useAuthContext';

import Navbar from '../components/Navbar'
import BucketDetails from '../components/BucketDetails';
import BucketForm from '../components/BucketForm';
import Footer from '../components/Footer';

const Home = () => {

    const { buckets, dispatch } = useBucketsContext();
    const { user } = useAuthContext();

    useEffect(() => {
      const fetchBuckets = async() => {
        const response = await fetch('https://dataset-fullstack.vercel.app/buckets', {
          headers: { 
            'Authorization': `Bearer ${user.token}`
          }
        })
         const json = await response.json();
         
         if(response.ok) {
           dispatch({type: 'SET_BUCKETS', payload: json});
         }
      }
      if(user) {
        fetchBuckets()
      }
    },[dispatch, user])
    
  return (
  <div className='parentContainer'>
  <Navbar/>
    <div className='home mb-10 md:flex'>
        <BucketForm />
      <div className="buckets w-screen sm:px-2 md:px-4">
        {buckets && buckets.map((bucket) => (
          <BucketDetails key={bucket._id} bucket={bucket} />
        ))}
      </div>
    </div>
  <Footer />
  </div>
  )
}

export default Home
