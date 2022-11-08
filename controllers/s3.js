import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

const REGION = process.env.AWS_BUCKET_REGION || "eu-central-1";

const s3Client = new S3Client({ region: REGION });

const qrUpload = async (bucketParams) => {
  /*
    const bucketParams = {
        Bucket: "BUCKET_NAME",
        Key: "OBJECT_NAME",
        Body: "BODY" / content of the new object
    }
    */
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

const qrGet = async (bucketParams) => {
  /*
    const bucketParams = {
        Bucket: "BUCKET_NAME",
        Key: "OBJECT_NAME",
    }
    */
  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    return await data.Body.transformToString();
  } catch (err) {
    console.log("Error", err);
  }
};

const qrDelete = async (bucketParams) => {
  /*
    const bucketParams = {
        Bucket: "BUCKET_NAME",
        Key: "OBJECT_NAME",
    }
    */
  try {
    const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    console.log("Success. Object deleted.", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export { qrGet, qrUpload, qrDelete };
