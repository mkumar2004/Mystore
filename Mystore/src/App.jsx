import { BrowserRouter, Route, Routes} from 'react-router-dom'
import UserLayout from "./component/Layout/UserLayout";
import Home from './pages/Home';
import {Toaster} from  'sonner'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPack from './pages/CollectionPack';
import ProductDetails from './component/Product/Productdetails';
import Checkout from './component/Cart/Checkout';
import OrderConfirm from './pages/OrderConfirm';
import MyOrderPage from './pages/Myorderpage';
import AdminLayout from './component/Admin/AdminLayout';
import Adminpage from './pages/Adminpage';
import Usermangement from './component/Admin/Usermangement';
import ProductMangement from './component/Admin/ProductMangement';
import EditProducts from './component/Admin/EditProducts';
import OrderMangement from './component/Admin/OrderMangement';
import {Provider} from 'react-redux';
import store from './redux/Store';
import OrderDetail from './pages/OrderDetail';
import ProtectRoute from './component/Common/ProtectRoute';
function App() {
  return (
    <Provider store={store}> 
    <BrowserRouter>
     <Toaster position='top-right' />
     <Routes>
       
       {/* user */}
       <Route path="/" element={<UserLayout/>} >
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='Profile' element={<Profile/>}/>
          <Route path='collections/:collection' element={<CollectionPack/>}/>
          <Route path='product/:id' element={<ProductDetails/>}/>
          <Route path='checkout' element={<Checkout/>}/>
          <Route path='orderconfirm' element={<OrderConfirm/>}/>
          <Route path='orders/:id' element={<OrderDetail/>}/>
          <Route path='my-order' element={<MyOrderPage/>} />
       </Route>
        {/* Admin  */}
        <Route path='/admin' element={
          <ProtectRoute role="admin">
           <AdminLayout/>
          </ProtectRoute>
             }> 
        <Route index element ={<Adminpage/>}/>
        <Route path='User' element={<Usermangement/>} />
        <Route path='ProductMangment' element={<ProductMangement/>} />
        <Route path='ProductMangment/:id/edit' element={<EditProducts/>} />
        <Route path='orders' element={<OrderMangement/>} />
        </Route>
     </Routes>
     
    
    </BrowserRouter>
    </Provider>  
  );
}

export default App;
