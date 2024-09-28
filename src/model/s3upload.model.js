const AWS = require("aws-sdk");
const fs = require('fs')

/**
 * This class modify admin
 */
class Model {
    static s3config = { 
        BUCKET_NAME: "tm-uat-resources/exports",
        AWS_S3_SECRET_KEY: "6Mmj14XmMG61z3kq1aHT+MjUq2M/ut9cudo9czrk",
        AWS_S3_KEY_ID: "AKIA5E3LQTZG2747RD7Y",
    }

    static uploadFile = async (filename, file ) => {
        const s3 = new AWS.S3({accessKeyId: this.s3config.AWS_S3_KEY_ID, secretAccessKey: this.s3config.AWS_S3_SECRET_KEY});
        const params = {
            Bucket: this.s3config.BUCKET_NAME,
            Key: filename,
            Body: fs.createReadStream('export/'+filename),
            ContentType: "text/html",
        }
        // upload - file to s3 bucket
        const data = s3.upload(params).promise();
        return data;
    }

    static uploadImage = async (filename, file , bucket ) => {
        const s3 = new AWS.S3({accessKeyId: this.s3config.AWS_S3_KEY_ID, secretAccessKey: this.s3config.AWS_S3_SECRET_KEY});
        const params = {
            Bucket: bucket,
            Key: filename,
            Body: file
        }
        // upload - file to s3 bucket
        const data = s3.upload(params).promise();
        return data;
    }

}
module.exports = Model;