import React from 'react'
import { FaBoxOpen, FaClipboard, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link,NavLink, useNavigate} from 'react-router-dom'
import { logout } from '../../redux/slices/AuthSlice'
import { clearCart } from '../../redux/slices/CartSlice'
const AdminSidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const  handleLogout =()=>{
        dispatch(logout());
        dispatch(clearCart());
        navigate("/");
    }
  return (
    <div className='p-6  text-center'>
        <div className='mb-6'>
          <Link to='/admin' className='text-2xl font-semibold'>MyStore</Link>

        </div>
      <h2 className='text-xl font-medium mb-6 text-center'>Admin Dahboard</h2>
    
      <nav className='flex flex-col space-y-2'>
       <NavLink
        to='/admin/user'
        className={({isActive})=> isActive ? "hover:bg-violet-600 py-3 px-4 rounded flex items-center space-x-2":"hover:bg-violet-500  py-3 px-4 rounded flex items-center space-x-2 "}
        >
            <FaUser size={24}/>
             <span className='text-xl'>User</span>
       </NavLink>

       <NavLink
        to='/admin/ProductMangment'
        className={({isActive})=> isActive ? "hover:bg-violet-600 py-3 px-4 rounded flex items-center space-x-2":"hover:bg-violet-500  py-3 px-4 rounded flex items-center space-x-2 "}
        >
            <FaBoxOpen size={24}/>
             <span className='text-xl'>Product</span>
       </NavLink>

       <NavLink
        to='/admin/orders'
        className={({isActive})=> isActive ? "hover:bg-violet-600 py-3 px-4 rounded flex items-center space-x-2":"hover:bg-violet-500  py-3 px-4 rounded flex items-center space-x-2 "}
        >
            <FaClipboard size={24}/>
             <span className='text-xl'>Order</span>
       </NavLink>

       <NavLink
        to='/'
        className={({isActive})=> isActive ? "hover:bg-violet-600 py-3 px-4 rounded flex items-center space-x-2":"hover:bg-violet-500  py-3 px-4 rounded flex items-center space-x-2 "}
        >
            <FaStore size={24}/>
             <span className='text-xl'>Shop</span>
       </NavLink>

      </nav>
    
       <div className='mt-6'>
        <button 
          className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 flex items-center justify-center space-x-2 rounded'
          onClick={handleLogout}
        >
             <FaSignOutAlt/>
             <span>Logout</span>
        </button>
       </div>
    
    </div>
  )
}

export default AdminSidebar