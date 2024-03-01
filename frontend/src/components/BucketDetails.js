import formatDistanceToNow  from 'date-fns/formatDistanceToNow'
import { useBucketsContext } from '../hooks/useBucketsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../hooks/useAuthContext'


const BucketDetails = ({ bucket }) => {

    const { dispatch } = useBucketsContext()
    const { user } = useAuthContext()

  const handleClick = async() => {
    if(!user) {
      return
    }
    const response = await fetch('/buckets/' + bucket._id, {
      method: 'DELETE',
      headers: {
        'Authorization':`Bearer ${user.token}`
      }
     })
      const json = await response.json()
      if(response.ok) {
        console.log(json)
        dispatch({type: 'DELETE_BUCKET', payload: json})
    }
  }
  return (

    <div className="bucket-details-container">
        <h3>{bucket.title}</h3>
        <h5><strong>Timeframe: </strong>{bucket.timeline}</h5>
        <h6><strong>Details: </strong>{bucket.description}</h6>
        <p>{formatDistanceToNow(new Date(bucket.createdAt),{ addSuffix: true })}</p>
        {/* <p>{bucket.createdAt}</p> */}
        <FontAwesomeIcon 
          icon={faTrash}
          onClick={handleClick}
          className='delete-icon'
          />
    </div>
  ); 
}

export default BucketDetails
