const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const userrotes = require('./routes/Userroutes');
const productroute = require('./routes/Productroutes')
const connectDB = require("./config/db");
const Cart = require("./routes/Cartroute");
const checkout = require("./routes/Checkoutroute");
const Checkout = require("./models/Checkout");
const OrderRoute = require("./routes/Orderroute")
const Uploadrote = require('./routes/UploadRoute')
const SubscribeRoute  = require('./routes/SubcribeRoute');
const Adimroute =require('./routes/AdminRoute');
const Adminprd = require('./routes/AdminProduct');
const Adminords = require('./routes/AdminOrdersRoute');
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

//Conntecting Mongodb

connectDB();
const PORT = process.env.PORT || 5000

app.get("/" , (req , res) =>{
    res.send("Welcome to Mystore api");

});

//api routes
app.use("/api/users",userrotes);
app.use("/api/products",productroute);
app.use("/api/cart",Cart);
app.use("/api/checkout",checkout);
app.use("/api/orders",OrderRoute);
app.use("/api/upload",Uploadrote);
app.use("/api/subscrie",SubscribeRoute);

//Admin api route
app.use("/api/Admin/users",Adimroute);
app.use("/api/Admin/products",Adminprd);
app.use("/api/Admin/orders",Adminords);

//images route
// Serve static files
//app.use('/api/uploads', express.static(path.join(__dirname, 'backend/data')));

app.listen(PORT , ()=>{
    console.log(`Server is running on on http://localhost:${PORT} `)
})