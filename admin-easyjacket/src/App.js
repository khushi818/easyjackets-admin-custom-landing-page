import { useEffect, useState } from 'react';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Auth from "./Pages/Auth"
import { useAuth } from './Context/authContext'
import DashboardAdmin from './Pages/DashboardAdmin';
import Products from './Components/products';
import Orders from './Components/order'
import Collars from './Components/collars';
import Sleeves from './Components/sleeves';
import Closures from './Components/closure';
import Pockets from './Components/pockets';
import Linings from './Components/lining';
import DesignType from './Components/designType';
import Material from './Components/materials';
import Size from './Components/size';
import Categories from './Components/category';
import FeatureForm from './Components/features';
import OrderDetails from './Components/orderDetails';
import BulkOrder from './Components/bulkOrder';
import OrderBulkTable from './Components/bulkOrderTable';
import WebsiteDetails from './Components/websitedetail';
import BlogManager from './Components/blogs';
import UserTable from './Components/user';
import MetadataManager from './Components/metadata';
import Colors from './Components/color';

export default function App() {
   const [data,setData] = useState("")
      
   const {isAuthenticated} = useAuth()

   useEffect(() =>{
    setData(JSON.parse(sessionStorage.getItem("auth"))?.token)
   },[isAuthenticated])
   
  return (
     <Router>
        <Routes>
          { data ?   
          <Route path='/' element={<DashboardAdmin/>} >
               <Route path="/features" element={<FeatureForm/>} />
               <Route path="/blogs" element={<BlogManager/>} />
               <Route path="/category" element={<Categories/>} />
               <Route path="/users" element={<UserTable/>} />
               <Route path="/bulkorder/:id" element={<BulkOrder/>} />
               <Route path="/website" element={<WebsiteDetails/>}/>
               <Route path="/bulkorder" element={<OrderBulkTable/>} />
               <Route path="/metadata" element={<MetadataManager/>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/orders" element={<Orders/>} />
              <Route path="/colors" element={<Colors />} /> 
              <Route path="/collar" element={<Collars/>}   />     
              <Route path="/sleeves" element={<Sleeves/>} />
              <Route path="/closure" element ={<Closures/>}/>
               <Route path= "/pockets" element= {<Pockets/>} />
                <Route path="/linings" element={<Linings/>} />
                <Route path="/orders/:id" element={<OrderDetails/>}/>
                <Route path="/design" element= {<DesignType/>}/>
                <Route path="/material" element={<Material/>} />
                <Route path="/size" element={<Size/>} />
              </Route> : <Route path="/" element={<Auth/>}/> }
        </Routes>
     </Router>  
  );
}
