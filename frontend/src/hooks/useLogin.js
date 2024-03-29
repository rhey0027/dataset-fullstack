import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsLoading(true)

    const response = await fetch('https://dataset-fullstack.vercel.app/users/login/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
      if(!response.ok) {
        setIsLoading(false)
        setError(json.error)
      }
      if(response.ok) {
        localStorage.setItem('user', JSON.stringify(json))
        dispatch({type: 'LOGIN', payload: json}) //update auth context state with user data from response
        setIsLoading(false)
      }
  }
  return { login, isLoading, error }
}