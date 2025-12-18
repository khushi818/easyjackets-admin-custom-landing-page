import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import fileInstance from '../constant/filesInstance';
import instance from '../constant/instance';

function FeatureForm() {
  const [reviews, setReviews] = useState([{ comment: "", author: "" }]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getFeature();
  }, []);

  const getFeature = async () => {
    try {
      const response = await instance.get("/features");
      const feature = response.data.features[0];

      if(feature) {
      setReviews(feature.review || [{ comment: "", author: "" }]);
      setExistingImageUrls(feature.banner || []);
      }
    } catch (error) {
      console.error("Error fetching feature:", error);
      setMessage("Error loading feature data.");
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    setImagePreviews(selectedFiles.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImageUrls(existingImageUrls.filter((_, i) => i !== index));
  };

  const handleReviewChange = (index, field, value) => {
    const updatedReviews = [...reviews];
    updatedReviews[index][field] = value;
    setReviews(updatedReviews);
  };

  const addReview = () => {
    setReviews([...reviews, { comment: "", author: "" }]);
  };

  const removeReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("review", JSON.stringify(reviews));
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await fileInstance.post("/features", formData);
      setIsLoading(false);
    } catch (error) {
      setMessage("Error creating/updating feature.");
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {isLoading ? "Updating Feature..." : "Create or Update Feature"}
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Review Fields */}
          {reviews.map((review, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <TextField
                label="Comment"
                variant="outlined"
                fullWidth
                margin="normal"
                value={review.comment}
                onChange={(e) =>
                  handleReviewChange(index, "comment", e.target.value)
                }
                required
              />
              <TextField
                label="Author"
                variant="outlined"
                fullWidth
                margin="normal"
                value={review.author}
                onChange={(e) =>
                  handleReviewChange(index, "author", e.target.value)
                }
                required
              />
              <IconButton color="error" onClick={() => removeReview(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={addReview}
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Add Review
          </Button>

          {/* Existing Image Previews */}
          {existingImageUrls.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Existing Images:</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {existingImageUrls.map((src, index) => (
                  <Grid item xs={4} key={index}>
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={src}
                        alt={`existing-preview-${index}`}
                        style={{ width: "100%", height: "100px", objectFit: "cover" }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        sx={{ position: "absolute", top: 4, right: 4 }}
                        onClick={() => removeExistingImage(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* New Image Upload */}
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Upload banner
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {/* New Image Previews */}
          {imagePreviews.length > 0 && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {imagePreviews.map((src, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={src}
                      alt={`new-preview-${index}`}
                      style={{ width: "100%", height: "100px", objectFit: "cover" }}
                    />
                    <IconButton
                      size="small"
                      color="error"
                      sx={{ position: "absolute", top: 4, right: 4 }}
                      onClick={() => removeImage(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </form>
        {message && (
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default FeatureForm;
