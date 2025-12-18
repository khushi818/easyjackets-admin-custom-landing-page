import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";
import formidable from "formidable";
import uploadToS3 from "../helpers/fileUpload.js";

export const createCategoryController = async (req, res) => {
  try {
    const body = { ...req.body };
    if (!body.name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await CategoryModel.findOne(body);
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const category = await new CategoryModel({
      ...body,
      slug: slugify(body.name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send('Error parsing the files.');
      }
  
      try {
        // Handle front image
        const frontImageFile = files.image[0];
        const url = await uploadToS3(frontImageFile)
        const frontImageUrl = `${process.env.AWS_FILE_PATH}${url}`;
        const { id } = req.params
        const data ={
            name : fields.name[0],
            image : frontImageUrl
        }
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { ...data, slug: slugify(data.name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
})
};

// get all cat
export const categoryControlller = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};
