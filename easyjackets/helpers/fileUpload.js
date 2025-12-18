import AWS  from 'aws-sdk';
import fs from "fs"



/**
 * Uploads a file to S3
 * @param {Object} file - File object from Formidable
 * @returns {Promise<string>} - URL of the uploaded file
 */
const uploadToS3 = async (file, old_file, buffer) => {
    return new Promise((resolve, reject) => {
       try{
        resolve(ToS3(file, buffer));
        if(old_file!=null)
        {
          resolve(deleteFile(`${old_file}`));   
        }
  
      } catch (error) {
        // Handle validation errors
        reject(error);



      }
  });
};




const ToS3 = async (file, buffer) => {
  let S3Config = {
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  };

  const s3 = new AWS.S3({
    region: S3Config.AWS_S3_REGION,
    accessKeyId: S3Config.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: S3Config.AWS_S3_SECRET_ACCESS_KEY,
  });

  const fileName = `${Date.now()}-${file.originalFilename}`;
  const bucketName=S3Config.AWS_S3_BUCKET_NAME;
  const folderKey = '';
  
  // Read the file
  const fileContent = buffer ? buffer : fs.readFileSync(file.filepath) ;

  // Upload the file to S3
  const params = {
    Bucket: bucketName,
    Key: folderKey + fileName,
    Body: fileContent
  };

  await s3.upload(params).promise()
  
  return fileName

};


export const bufferToS3 = async (file , old_file) =>{
  let S3Config = {
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  };

  const s3 = new AWS.S3({
    region: S3Config.AWS_S3_REGION,
    accessKeyId: S3Config.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: S3Config.AWS_S3_SECRET_ACCESS_KEY,
  });

  const bucketName=S3Config.AWS_S3_BUCKET_NAME;

  const fileName =  `${Date.now()}-product`
  return new Promise((resolve, reject) => {
    var buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64')
    var data = {
      Body: buf,
      Bucket: bucketName,
      Key: fileName,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg'
    };
    s3.putObject(data, function(err, data){
        if (err) { 
          reject(err)
        } else {
          if(old_file!=null)
            {
              deleteFile(`${old_file}`);   
            }
          resolve(fileName)
        }
    });
  })
}

const deleteFile = async (key) => {
  let S3Config = {
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  };

  const s3 = new AWS.S3({
    region: S3Config.AWS_S3_REGION,
    accessKeyId: S3Config.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: S3Config.AWS_S3_SECRET_ACCESS_KEY,
  });
  const params = {
    Bucket: S3Config.AWS_S3_BUCKET_NAME,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  
  } catch (error) {
    console.error(`Error deleting old file: ${error.message}`);
  }
}
export default uploadToS3;
