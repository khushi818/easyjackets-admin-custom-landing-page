import Feature from '../models/features.js';
import formidable from 'formidable'; // For file uploads
import uploadToS3  from '../helpers/fileUpload.js'; // Assuming you have a utility function to upload to S3
import website  from '../models/websiteModal.js';
import Blog from '../models/blogs.js'
import slugify from 'slugify';
import { sendEmail } from '../helpers/email.js';

// Create or Update Feature
export const createOrUpdateFeatureController = async (req, res) => {
    const form = formidable({ multiples: true });
    
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error parsing the files.' });
        }

        const { review } = fields;
        let imageUrls = [];


        // Handle image uploads
        if (files.images) {
            const imageFiles = Array.isArray(files.images) ? files.images : [files.images];
            for (const file of imageFiles) {
                const url = await uploadToS3(file);
                imageUrls.push(`${process.env.AWS_FILE_PATH}${url}`);
            }
        }

        try {
            // Find the feature by name
            let feature = await Feature.find();
            
            if (feature.length !== 0) {
                // If the feature exists, update it
                feature[0].review = JSON.parse(review[0]); // Update the data
                if(imageUrls.length !== 0){
                feature[0].banner = imageUrls; // Update the images
                }
                await feature[0].save();
                return res.status(200).json({
                    success: true,
                    message: "Feature updated successfully",
                    feature
                });
            } else {
                // If it does not exist, create a new feature
                feature = await Feature.create({  review : JSON.parse(review[0]), banner : imageUrls });
                return res.status(201).json({
                    success: true,
                    message: "Feature created successfully",
                    feature
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error creating/updating feature.' });
        }
    });
};

// Get All Features
export const getFeaturesController = async (req, res) => {
    try {
        const features = await Feature.find();
        res.status(200).json({
            success: true,
            features
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching features.' });
    }
};

// Get a Feature by Name
export const getFeatureByNameController = async (req, res) => {
    const { name } = req.params;

    try {
        const feature = await Feature.findOne({ name });
        if (!feature) {
            return res.status(404).json({ success: false, message: 'Feature not found.' });
        }
        res.status(200).json({
            success: true,
            feature
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching feature.' });
    }
};



// GET Controller to retrieve contact details
export const getWebsiteDetails = async (req, res) => {
  try {
    const websites = await website.findOne();

    res.status(200).json({website : websites});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// UPDATE Controller to update contact details
export const updateWebsiteDetails = async (req, res) => {
  const { phoneNumber, email, address, address1 , socialLinks, isActive } = req.body;

  try {
    let websites = await website.findOne();

    if (!websites) {
      websites = new website({
        phoneNumber,
        email,
        address,
        address1,
        socialLinks,
        isActive,
      });
      await websites.save();
    } else {
      websites.phoneNumber = phoneNumber || websites.phoneNumber;
      websites.email = email || websites.email;
      websites.address = address || websites.address;
      websites.address1 = address1 || websites.address1;
      websites.socialLinks = socialLinks || websites.socialLinks;
      websites.isActive = isActive || websites.isActive;

      await websites.save();
    }

    res.status(200).json({ message: 'website updated successfully', website : websites });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


export const createBlogController = async (req, res) => {
    const form = formidable({ multiples: false }); // Single file
    form.parse(req, async (err, fields, files) => {
        if (err) {
        
            return res.status(500).send('Error parsing the files.');
        }

        try {
            const imageFile = files.image[0]; // Assuming "image" is the form field name
            let imageUrl = '';
            if (imageFile) {
                const uploadedUrl = await uploadToS3(imageFile); // Upload image to S3
                imageUrl = `${process.env.AWS_FILE_PATH}${uploadedUrl}`;
            }

            const data = {
                title: fields.title[0],
                content: fields.content[0],
                author: fields.author[0],
                image: imageUrl, // Store the S3 image URL
                slug: slugify(fields.title[0])
            };

            await Blog.create(data);

            return res.status(200).json({
                success: true,
                message: 'Blog created successfully'
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error uploading files to S3.');
        }
    });
};

// Get all blogs
export const getAllBlogsController = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching blogs.');
    }
};

// Get blog by ID
export const getBlogByIdController = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send('Blog not found.');
        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching blog.');
    }
};

// Update blog by ID
export const updateBlogController = async (req, res) => {
    const form = formidable({ multiples: false });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).send('Error parsing the files.');
        }

        try {
            let imageUrl;
            const blog = await Blog.findById(req.params.id);
            if (!blog) return res.status(404).send('Blog not found.');

            // Update image if provided
            if (files.image[0]) {
                const uploadedUrl = await uploadToS3(files.image[0]);
                imageUrl = `${process.env.AWS_FILE_PATH}${uploadedUrl}`;
            }

            const updatedData = {
                title: fields.title[0],
                content: fields.content[0],
                author: fields.author[0],
                image: imageUrl || blog.image, // Keep the old image if a new one is not provided
                slug: slugify(fields.title[0])
            };

            const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
            res.status(200).json(updatedBlog);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating blog.');
        }
    });
};

// Delete blog by ID
export const deleteBlogController = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).send('Blog not found.');
        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting blog.');
    }
};

export const SubmitContact = async (req, res) => {
    try {
       await sendEmail(`contact details by - ${req.body.firstName}`, "easyjackets@easyjackets.com" , req.body , '/views/contact.ejs')

       res.status(200).json({ success: true, message: 'contact submitted' });
    } catch (error) {
        console.error(error);
        res.status(500).send('error in emailing contact');
    }
};