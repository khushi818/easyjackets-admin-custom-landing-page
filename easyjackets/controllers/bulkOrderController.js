import formidable from "formidable";
import BulkOrder from "../models/bulkorder.js";
import uploadToS3 from "../helpers/fileUpload.js";

export const createBulkOrder = async (req,res) =>{
        const form = formidable({});
        form.parse(req, async (err, fields, files) => {
          if (err) {
            return res.status(500).send('Error parsing the files.');
          }
        
        try{
            const additionalImageFiles = [...files.images] || [];
            const additionalImageUrls = [];
      
          
            for (const file of additionalImageFiles) {
              const url = await uploadToS3(file)
              additionalImageUrls.push(process.env.AWS_FILE_PATH + url);
            }

            const data = {
                name: fields.name[0],
                email: fields.email[0],
                phone: fields.phone[0],
                country: fields.country[0],
                selectedProduct: fields.selectedProduct[0],
                zipoutLining: fields.zipoutLining[0] === "true",  // Convert to boolean
                flapClosure: fields.flapClosure[0] === "true",   // Convert to boolean
                selectedClosure: fields.selectedClosure[0],
                selectedLining : fields.selectedLining[0],
                message: fields.message[0],
                quantity: fields.quantity[0],
                designLocations: JSON.parse(fields.designLocations[0]),  // Parsed design locations
                images: [... additionalImageUrls], // Handle image files separately
              };

            await BulkOrder.create(data)
            return res.status(200).json({
                success : true,
                message : "bulk order created successfully"
             });
        }
    catch(error) {
        res.status(500).send({
          success: false,
          message: "Error in creating bulk order",
          error: error.message,
        });
    }
})
}

export const getAllbulkOrderController = async (req, res) => {
    try {
      const { page , limit  } = req.query
  
      let filter = {};
  
    //   if (category) {
    //     filter.status = status;
    //   }

      const bulkorders = await BulkOrder.find(filter).skip(page ? (page - 1) * limit : 1).limit( limit ? limit : 8).sort({ createdAt : -1});
      const totalOrders = await BulkOrder.countDocuments(filter);
      res.status(200).send({
        success: true,
        totalPages: Math.ceil(totalOrders / limit),
        bulkorders,
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting bulk order",
        error: error.message,
      });
    }
  };

  export const getSingleOrderController = async (req, res) => {
    try {
      const bulkorder = await BulkOrder
        .findOne({ _id: req.params.id })
  
      res.status(200).send({
        success: true,
        message: "Single Order Fetched",
        bulkorder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single product",
        error,
      });
    }
  };