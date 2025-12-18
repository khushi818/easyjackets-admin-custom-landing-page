import React, { useState, useEffect } from 'react';
import { TextField, Switch, Button, Typography, Grid, Box } from '@mui/material';
import axios from 'axios'; // Assuming you're using axios for API calls
import instance from '../constant/instance';

const WebsiteDetails = () => {
  const [contactDetails, setContactDetails] = useState({
    phoneNumber: '',
    email: '',
    address: '',
    address1 : ''
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });

  const [isActive, setIsActive] = useState({
    facebook: true,
    twitter: true,
    instagram: true,
    linkedin: true
  });

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchContactDetails = async () => {
      try {
        const response = await instance.get('/features/website/details'); // Adjust the URL to your backend endpoint
        const data = response.data.website;

        // const data = {
        //   "phoneNumber": "1234567890",
        //   "email": "info@example.com",
        //   "address": "123 Main St, City",
        //   "socialLinks": {
        //     "facebook": "https://facebook.com/example",
        //     "twitter": "https://twitter.com/example",
        //     "instagram": "https://instagram.com/example",
        //     "linkedin": "https://linkedin.com/in/example"
        //   },
        //   "isActive": {
        //     "facebook": true,
        //     "twitter": true,
        //     "instagram": false,
        //     "linkedin": true
        //   }
        // }
        
        setContactDetails({
          phoneNumber: data.phoneNumber || '',
          email: data.email || '',
          address: data.address || '',
          address1: data.address1 || ''
        });

        setSocialLinks({
          facebook: data.socialLinks?.facebook || '',
          twitter: data.socialLinks?.twitter || '',
          instagram: data.socialLinks?.instagram || '',
          linkedin: data.socialLinks?.linkedin || ''
        });

        setIsActive({
          facebook: data.isActive?.facebook ?? true,
          twitter: data.isActive?.twitter ?? true,
          instagram: data.isActive?.instagram ?? true,
          linkedin: data.isActive?.linkedin ?? true
        });
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchContactDetails();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value
    }));
  };

  const handleActiveChange = (e) => {
    const { name, checked } = e.target;
    setIsActive((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        ...contactDetails,
        socialLinks,
        isActive
      };

      // API call to update the contact details
      await instance.put('/features/website/details', updatedData); // Adjust the URL and method as needed
      alert('Contact details updated successfully');
    } catch (error) {
      console.error('Error updating contact details:', error);
      alert('Error updating contact details');
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact & Social Links Management
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={contactDetails.phoneNumber}
            onChange={handleContactChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={contactDetails.email}
            onChange={handleContactChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={contactDetails.address}
            onChange={handleContactChange}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address2"
            name="address1"
            value={contactDetails.address1}
            onChange={handleContactChange}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Social Links
      </Typography>

      <Grid container spacing={2}>
        {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
          <React.Fragment key={platform}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                name={platform}
                value={socialLinks[platform]}
                onChange={handleSocialLinkChange}
                disabled={!isActive[platform]}
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <Typography variant="body1" align="center" gutterBottom>
                Active
              </Typography>
              <Switch
                checked={isActive[platform]}
                onChange={handleActiveChange}
                name={platform}
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>

      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default WebsiteDetails;
