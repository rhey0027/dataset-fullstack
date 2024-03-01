import { useState } from 'react'
import { useBucketsContext } from '../hooks/useBucketsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const BucketForm = () => {

  const { dispatch } = useBucketsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [timeline, setTimeline] = useState('')
  const [description, setDescription] = useState('')

  const [ error, setError ] = useState(null)
  const [ emptyFields, setEmptyFields ] = useState([])
  const [ isLoading, setIsLoading ] = useState(null)
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    if(!user) {
      setError('You must be logged in')
      return
    }
    const bucket = { title, timeline, description }
    
    const response = await fetch('https://dataset-fullstack.vercel.app/buckets', {
      method: 'POST',
      body: JSON.stringify(bucket),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })
    const json = await response.json()
      if(!response.ok) {
        setIsLoading(false)
        setError(json.error)
        setEmptyFields(json.emptyFields)
        // setTimeout(() => {
        //   window.location.reload()
        // },5000)
      }
      if(response.ok) {
        setTitle('')
        setTimeline('')
        setDescription('')
        setError(null)
        setIsLoading(false)
        setEmptyFields([])
        console.log('new bucket added', json)
        dispatch({type: 'ADD_BUCKET', payload: json})
      }
  } 
  return (
    <div className="bucket-form">
      <form className='bucket-form-container'onSubmit={handleSubmit} >
          <h1>Add New Project</h1>
      <div className='bucket-form-input'>
        <label>Project Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={ emptyFields.includes('title') ? 'error':''}
            />
        <label>Timeline</label>
          <input 
            type="text"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className={ emptyFields.includes('timeline') ? 'error'  : ''}
            />
        <label>Description</label>
          <textarea 
            type="text"
            cols={27}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={ emptyFields.includes('description') ? 'error'  : ''}
            />
        </div>
          <button disabled={isLoading}>Add Record</button>
          {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}

export default BucketForm
