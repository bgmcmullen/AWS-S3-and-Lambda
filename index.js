import {S3Client, GetObjectCommand, PutObjectCommand} from '@aws-sdk/client-s3';


export const handler = async (event) => {
  // TODO implement

  
  
  const s3Client = new S3Client({ region:'us-east-1'});
  
  const bucketName = 'brendanimagesbucket';
  
  const key = 'images.json';

  
  let content = null;
  
  const imageInfo = event.Records[0].s3.object;
  
  const imageNameAndType = imageInfo.key.split('/')[1].split('.')
  const imageName = imageNameAndType[0];
  const imageType = imageNameAndType[imageNameAndType.length-1];
  const imageSize = imageInfo.size;
  
  const imageData = {"name":imageName, "type":imageType, "size":imageSize};
  

  try {
  const getCommand = new GetObjectCommand({Bucket: bucketName, Key: key});
  content = await s3Client.send(getCommand);
  
  content = await content.Body.transformToString();
  
  
  content= JSON.parse(content);
  content.push(imageData)
  
  let contentString = JSON.stringify(content);
  
  const putCommand = new PutObjectCommand({Bucket: bucketName, Key: key, ContentType: 'application/json', Body: contentString})
  
  content = await s3Client.send(putCommand);

    
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify('Error updating object.')
    }
  }
  

  
    const response = {
    statusCode: 200,
    body: JSON.stringify('image.json updated'),
  };
  
  console.log(imageInfo);
  return response;
};
