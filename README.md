# AWS-S3-and-Lambda

## Link to Code:
[Code](index.js)


## Link to image.json:
[image.json](https://brendanimagesbucket.s3.amazonaws.com/images.json)

## Challenge issues I encountered during deployment

There were two issues I faced. I struggled to get the readable version of the object body until I found the transformToString() function. Then I got an access denied error until I figured out how to add a role to the Lambda function.
