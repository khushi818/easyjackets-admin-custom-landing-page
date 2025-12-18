import React, { useState , useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,

  TextField,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  DialogTitle
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import fileInstance from "../constant/filesInstance";
import instance from "../constant/instance";
import Editor from "react-simple-wysiwyg"
import { CUSTOM_URL } from "../constant/url";
import DifferenceIcon from '@mui/icons-material/Difference';
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import { Route } from "react-router-dom";


function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(false);
  const [materials , setMaterials] = useState([])
  const [colors , setColors] = useState([])
  const [categories , setCategories] = useState([])
  const [sizes , setSizes] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newProduct, setNewProduct] = useState({
    sku:"",
    name: "",
    standardPrice: 0,
    discountPrice: 0,
    color: "",
    category: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    shortdescription : "",
    imageAlt: "",
    frontImage: null,
    otherImages: [], // Added field for multiple images
    sizes: [],
    material : {
      body : '',
      sleeves : ''
    }
  });
  const [previewImage, setPreviewImage] = useState(null); // State for front image preview
  const [otherImagesPreview, setOtherImagesPreview] = useState([]); // State for multiple images preview
  const [isLoading , setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState({ category: "", color: "", sku: "" });

  
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setNewProduct({
      name: "",
      standardPrice: 0,
      discountPrice: 0,
      color: "",
      category: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      shortdescription : "",
      imageAlt: "",
      frontImage: null,
      otherImages: [],
      sizes: [],
      material : {
        body : '',
        sleeves : ''
      }
    });
    setPreviewImage(null); // Reset front image preview on close
    setOtherImagesPreview([]); // Reset other images preview on close
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({ ...prev, frontImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };

  const handleOtherImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...newProduct.otherImages, ...files];
    setNewProduct((prev) => ({ ...prev, otherImages: newImages }));

    const newPreviews = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((imageUrls) => {
      setOtherImagesPreview((prev) => [...prev, ...imageUrls]);
    });
  };

  const handleRemoveOtherImage = (index) => {
    const updatedImages = newProduct.otherImages.filter((_, i) => i !== index);
    const updatedPreviews = otherImagesPreview.filter((_, i) => i !== index);
    setNewProduct((prev) => ({ ...prev, otherImages: updatedImages }));
    setOtherImagesPreview(updatedPreviews);
  };

  const handleAddSize = () => {
    setNewProduct((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", price: "" }]
    }));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = newProduct?.sizes.map((size, i) =>
      i === index ? { ...size, [field]: value } : size
    );
    setNewProduct((prev) => ({ ...prev, sizes: updatedSizes }));
  };

  const handleMaterialBody = (value) =>{
    setNewProduct((prev) => ({...prev ,  material : {...prev.material , "body" : value }}))
}

const handleMaterialSleeves = (value) =>{
setNewProduct((prev) => ({...prev ,  material : {...prev.material , "sleeves" : value }}))
}



  const handleSaveProduct = async (e) => {
    e.preventDefault(); 
    setIsLoading(true)
    // Basic validation
    if (!newProduct?.name || !newProduct?.category || !newProduct?.color) {
      alert("Please fill category , name, color");

    }

    const formData = new FormData();
    formData.append('name', newProduct?.name);
    formData.append('description', newProduct?.description);
    formData.append('metaTitle', newProduct?.metaTitle );
    formData.append('metaDescription', newProduct?.metaDescription);
    formData.append('shortdescription', newProduct?.shortdescription);
    formData.append('standardPrice', newProduct?.standardPrice ? newProduct?.standardPrice : 0);
    formData.append('discountPrice', newProduct?.discountPrice ? newProduct?.discountPrice : 0);
    formData.append('color', newProduct?.color ? newProduct?.color : null);
    formData.append('imageAlt', newProduct?.imageAlt);
    formData.append('category', newProduct?.category);
    formData.append("material", JSON.stringify(newProduct?.material));
    formData.append("sizes", JSON.stringify(newProduct?.sizes));

    if (newProduct.frontImage) {
      formData.append('frontImage', newProduct?.frontImage);
    }

    for (const image of newProduct?.otherImages) {
      formData.append('otherImages', image);
    }

    try {
      if (editingProduct && formData) {
        // Update existing product
        await fileInstance.put(`/product/update-product/${editingProduct?._id}`, formData);
      } else {
        // Create new product
        await fileInstance.post('/product/create-product', formData);
      }
      handleClose();
      getProducts();
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error("Error saving product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      color: product?.color?._id,
      category: product?.category?._id
    });
    setPreviewImage(product?.frontImage);
    setOtherImagesPreview(product?.otherImages);
    handleClickOpen();
    getProducts();
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fileInstance.delete(`/product/delete-product/${id}`); 
      setProducts((prev) => prev.filter((product) => product?._id !== id));
      toast.success('product is deleted ')
      getProducts()
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.success('something went wrong')
    }
  };

  const handleDuplicateProduct = async(id) =>{
    try {
      await instance.post(`/product/duplicate-product/${id}`); 
      toast.success('product is duplicated')
      setCurrentPage(1)
      getProducts()
    } catch (error) {
      console.error("Error duplicating product:", error);
    }
  }

  const getProducts = async () => {
    try {
      const { data } = await instance.get(`/product/get-product?category=${searchTerm.category}&color=${searchTerm.color}&sku=${searchTerm.sku}&page=${currentPage}&limit=5`);
      setProducts(data.products);
      setTotalPages(data?.totalPages);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProperties = async () => {
    try {
      const { data } = await instance.get('/custom/get-properties');
      setCategories(data.allCategory);
      setColors(data.colors);
      setMaterials(data.materials);
      setSizes(data.sizes);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  useEffect(() =>{
    getProducts()
  },[])

  useEffect(() =>{
   getProducts()
}, [currentPage])


const handleSearch = async() =>{
  try {
    const { data } = await instance.get(`/product/get-product?category=${searchTerm.category}&color=${searchTerm.color}&sku=${searchTerm.sku}&page=${1}&limit=5`);
    setProducts(data.products);
    setTotalPages(data?.totalPages);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

  return (
    isLoading ? 
      <div style ={{ textAlign : 'center'}}> 
      <CircularProgress/>
      </div> : 
    <div>
      <h2>Products</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginBottom: "20px" }}
      >
        Create Product
      </Button>
       <div style={{ padding : '10px'}}>Total Products : {totalPages * products?.length}</div>

       <div>
       <Grid container gap={3} style={{ marginBlock: "30px"}}>
        <Grid xs={3}>
       <FormControl fullWidth>
                <InputLabel>Color</InputLabel>
                <Select
                  name="color"
                  value={searchTerm?.color}
                  onChange={handleSearchChange}
                  defaultValue={""}
                >
                   <MenuItem key={1} value={""}>No Color</MenuItem>
                  {colors.map((color, key) => (
                    <MenuItem key={key} value={color?._id}>
                        <span
      style={{
        backgroundColor: color?.code,
        width: 16,
        height: 16,
        borderRadius: '50%',
        marginRight: 8,
        display: 'inline-block',
      }}
    ></span>
                      {color?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
              <Grid xs={3}>
       <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={searchTerm?.category}
                  onChange={handleSearchChange}
                  defaultValue={""}
                >
                   <MenuItem  key={1} value={""}>No Category</MenuItem>
                  {categories.map((category, key) => (
                      
                    <MenuItem key={key} value={category?._id}>
                      {category?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Grid>
            <Grid xs={3}>
        <TextField
          fullWidth
          type="text"
          name="sku"
          placeholder="Search by SKU"
          value={searchTerm.sku}
          onChange={handleSearchChange}
        />
        </Grid>
        <Button onClick={handleSearch}>Search</Button>
        </Grid>
      </div>
      {/* Product Table */}
      <TableContainer component={Paper} >
        <Table >
          <TableHead >
            <TableRow>
              <TableCell width="150px">name</TableCell>
              <TableCell width="150px">Standard Price</TableCell>
              <TableCell width="150px">Discount %</TableCell>
              <TableCell >Color</TableCell>
              <TableCell width="20px">Category</TableCell>
              <TableCell width="20px">SKU</TableCell>
              <TableCell>Image Alt</TableCell>
              <TableCell width="150px">Sizes</TableCell>
              <TableCell>Front Image</TableCell>
              <TableCell>Design</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product?._id}>
                <TableCell>{product?.name}</TableCell>
                <TableCell>{product?.standardPrice}</TableCell>
                <TableCell>{product?.discountPrice}</TableCell>
                <TableCell>{product?.color?.name}</TableCell>
                
                <TableCell>{product?.category?.name}</TableCell>
                <TableCell>{product?.sku}</TableCell>
                <TableCell>{product?.imageAlt}</TableCell>
                <TableCell>
                  {product?.sizes.slice(0,1).map((size) => (
                    <div key={size?.size}>
                      {size?.size}: ${size?.price}
                    </div>
                  ))}
                  ...
                </TableCell>
                <TableCell>
                  {product?.frontImage && (
                    <img
                      src={product?.frontImage}
                      alt={product?.imageAlt}
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {!product?.designId ? (
                     <Button
                     variant="contained"
                     color="primary" onClick={(e) =>{
                      e.preventDefault()
                       window.location.href = `${CUSTOM_URL}/?id=${product?.category?.code}&product=${product?._id}`}
                     }>Design</Button>) : (
                     <Button
                     variant="contained"
                     color="primary" onClick={(e) =>{
                      e.preventDefault()
                       window.location.href = `${CUSTOM_URL}/?id=${product?.category?.code}&designedit=${product?.designId}`}
                     }>Edit Design</Button>)}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditProduct(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(product?._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleDuplicateProduct(product?._id)}>
                  <DifferenceIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination" style ={{ display : 'flex' , justifyContent : 'space-between' , alignItems : 'center'  , marginTop : '20px'}}>
            <Button
              variant="contained"
               color="primary"
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <Button
                variant="contained"
                color="primary"
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            </div>

      {/* Create/Edit Product Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingProduct ? "Edit Product" : "Create Product"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop : "30px"}}>
            <Grid item xs={12} sm={6} >
              <TextField
                label="name"
                fullWidth
                name="name"
                value={newProduct?.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Standard Price"
                fullWidth
                type ="Number"
                name="standardPrice"
                value={newProduct?.standardPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discount Price (%)"
                fullWidth
                type="Number"
                name="discountPrice"
                value={newProduct?.discountPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel>Color</InputLabel>
                <Select
                  name="color"
                  value={newProduct?.color}
                  onChange={handleChange}
                  defaultValue={""}
                >
                  {colors.map((color, key) => (
                    <MenuItem key={key} value={color?._id}>
                        <span
      style={{
        backgroundColor: color?.code,
        width: 16,
        height: 16,
        borderRadius: '50%',
        marginRight: 8,
        display: 'inline-block',
      }}
    ></span>
                      {color?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Grid container spacing={2} style={{ marginTop : "5px"}}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Body material</InputLabel>
                    <Select
                      value={newProduct?.material?.body}
                      onChange={(e) =>
                        handleMaterialBody(e.target.value)
                      }
                    >
                      {materials.map((material , index) => (
                        <MenuItem key={index} value={material?.name}>
                          {material.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Sleeves Material</InputLabel>
                    <Select
                      value={newProduct?.material?.sleeves}
                      onChange={(e) =>
                        handleMaterialSleeves(e.target.value)
                      }
                    >
                       {materials.map((material , index) => (
                        <MenuItem key={index} value={material?.name}>
                          {material?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newProduct?.category}
                  onChange={handleChange}
                  defaultValue={""}
                >
                  {categories.map((category, key) => (
                    <MenuItem key={key} value={category?._id}>
                      {category?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Image Alt Text"
                fullWidth
                name="imageAlt"
                value={newProduct?.imageAlt}
                onChange={handleChange}
              />
            </Grid>
            <Grid item style ={{ width : "100%" }}>
              <label>Meta Title</label>
              <TextField
                label="metaTitle"
                fullWidth
                name="metaTitle"
                value={newProduct?.metaTitle}
                onChange={handleChange}
              />
              </Grid>
            <Grid item style ={{ width : "100%" }}>
              <label>Meta Description</label>
              <Editor
                label="metaDescription"
                name="metaDescription"
                value={newProduct?.metaDescription}
                onChange={handleChange}
              />
              </Grid>
            <Grid item style ={{ width : "100%" }}>
              <label>Short Description</label>
              <Editor
                label="shortdescription"
                name="shortdescription"
                value={newProduct?.shortdescription}
                onChange={handleChange}
              />
            </Grid> 
            <Grid item style ={{ width : "100%" }}>
            <label>Long Description</label>
              <Editor
                label="Description"
                name="description"
                value={newProduct?.description}
                onChange={handleChange}
              />
            </Grid>
        
          </Grid>

          {/* Front Image Section */}
          <div style={{ marginTop: "20px" }}>
            <h4>Front Image</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleFrontImageChange}
              style={{ marginBottom: "10px" }}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Front Preview"
                style={{ width: "100px", height: "100px", marginBottom: "20px" }}
              />
            )}
          </div>

          {/* Other Images Section */}
          <div style={{ marginTop: "20px" }}>
            <h4>Other Images</h4>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleOtherImagesChange}
              style={{ marginBottom: "10px" }}
            />
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {otherImagesPreview.map((image, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <img
                    src={image}
                    alt={`Other ${index}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <IconButton
                    onClick={() => handleRemoveOtherImage(index)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "red"
                    }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes Section */}
          <div style={{ marginTop: "20px" }}>
            <h4>Sizes & Prices</h4>
            {newProduct?.sizes.map((sizeObj, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Size</InputLabel>
                    <Select
                      value={sizeObj?.size}
                      onChange={(e) =>
                        handleSizeChange(index, "size", e.target.value)
                      }
                    >
                      {sizes.map((size, key) => (
                        <MenuItem key={key} value={size?.size}>
                          {size?.size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="price"
                    fullWidth
                    value={sizeObj?.price}
                    onChange={(e) =>
                      handleSizeChange(index, "price", e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            ))}
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: "10px" }}
              onClick={handleAddSize}
            >
              Add Size
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
}

export default Products;
