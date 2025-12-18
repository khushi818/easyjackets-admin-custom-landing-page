import orderModel from "../models/orderModel.js";

export const getOrder = async (req, res ) =>{
  try{
    const getOrders = await orderModel.findOne({ _id : req.params.id})
    .populate( 
      {
         path : 'cartData.id',
         model : 'Products'
      }). populate(   {
            path :'cartData.designId',
            model : 'design',
            // select :{
            //     _id : 1,
            //     custom_image :  1, 
            //     custom_price : 1 ,
            //     globals : 1,
            //     sizes : 1
            // }
          }
        )

      res.status(200).json({
         success : true,
         message : 'order detail by id',
         data : getOrders
      })
   }
    catch(error)  {
        res.status(500).send({
          success: false,
          message: "failed to get order detail by id",
          error,
        });  
       }
}

export const getOrderlist = async (req, res) => {
  try {
    const { name, date, address, phone, status , page = 1, limit = 10} = req.query;

    // Build the query object based on filters
    const query = {};

    // Filter by buyer's name or name in shipping details (case-insensitive)
    if (name) {
      query['$or'] = [
        { 'buyer.name': { $regex: name, $options: 'i' } },
        { 'shipping_details.name': { $regex: name, $options: 'i' } },
      ];
    }

    // Filter by order date (assuming format as YYYY-MM-DD)
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.createdAt = { $gte: startDate, $lt: endDate };
    }

    // Filter by address in shipping or billing details (case-insensitive)
    if (address) {
      query['$or'] = [
        { 'shipping_details.address.line1': { $regex: address, $options: 'i' } },
        { 'billing_Details.address.line1': { $regex: address, $options: 'i' } },
      ];
    }

    // Filter by phone in shipping or billing details (case-insensitive)
    if (phone) {
      query['$or'] = [
        { 'shipping_details.phone': { $regex: new RegExp(phone, 'i') } },
        { 'billing_Details.phone': { $regex: new RegExp(phone, 'i') } },
      ];
    }

    // Filter by status (exact match)
    if (status) {
      query.status = status;
    }

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;
    // Fetch orders based on query with populated cart data and buyer info
    const getOrders = await orderModel.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt : -1  })
      .populate({
        path: 'cartData.id',
        model: 'Products',
      })
      .populate({
        path: 'buyer',
        model: 'User',
        select: 'name',
      });

    // Fetch status enum values from schema
    const statusEnum = await orderModel.schema.path('status').enumValues;
    const totalOrder = await orderModel.countDocuments(query);
   
    res.status(200).json({
      success: true,
      message: 'Order list',
      data: getOrders,
      statusEnum,
      totalOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get order list',
      error,
    });
  }
};


export const updateOrder = async(req,res) =>{
     try{
         const { status } = req.body
         
         await orderModel.findOneAndUpdate({ _id : req.params.id } , { status })

         res.status(200).json({
            success : true,
            message : 'update order details'
         })
         
     }catch(error)  {
        res.status(500).send({
          success: false,
          message: "failed to update order detail by id",
          error,
        });  
       }
}
