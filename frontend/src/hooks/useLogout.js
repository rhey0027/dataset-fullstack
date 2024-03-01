import { useAuthContext } from './useAuthContext'
import { useBucketsContext } from './useBucketsContext';


export const useLogout = () => {

  const {dispatch} = useAuthContext();
  const {dispatch: bucketsDispatch} = useBucketsContext();

  
  const logout = async() => {
    localStorage.removeItem('user');
    dispatch({type:'LOGOUT'})
    bucketsDispatch({type:'SET_BUCKETS', payload: null})
  }
  return { logout }
}