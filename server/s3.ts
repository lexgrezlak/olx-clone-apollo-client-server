import { IUploader, UploadedFileResponse } from './common/types';
import AWS from 'aws-sdk';
import stream from 'stream';

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  destinationBucketName: string;
  region?: string;
};

export class AWSS3Uploader implements IUploader {
  private s3: AWS.S3;
  public config: S3UploadConfig;

  constructor(config: S3UploadConfig) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || 'eu-central-1',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  private createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string,
  ): string {
    return fileName;
  }

  private createUploadStream(key: string): S3UploadStream {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.config.destinationBucketName,
          Key: key,
          Body: pass,
        })
        .promise(),
    };
  }

  // @ts-ignore
  async singleFileUploadResolver(
    parent: any,
    { file }: { file: Promise<File> },
  ): Promise<UploadedFileResponse> {
    // @ts-ignore
    const { stream, filename, mimetype, encoding } = await file;

    // Create the destination file path
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding,
    );

    // Create an upload stream that goes to S3
    const uploadStream = this.createUploadStream(filePath);

    // Pipe the file data into the upload stream
    // @ts-ignore
    stream.pipe(uploadStream.writeStream);

    // Start the stream
    const result = await uploadStream.promise;

    // Get the link representing the uploaded file
    const link = result.Location;

    console.log(link);

    // (optional) save it to our database

    return { filename, mimetype, encoding, url: result.Location };
  }
}
