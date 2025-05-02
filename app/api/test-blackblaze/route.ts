import { NextResponse } from "next/server";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export async function GET() {
  try {
    // Cấu hình S3 client
    const s3Client = new S3Client({
      region: "us-east-1",
      endpoint: process.env.B2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.B2_APPLICATION_KEY_ID || "",
        secretAccessKey: process.env.B2_APPLICATION_KEY || "",
      },
      forcePathStyle: true,
    });
    
    // Test kết nối bằng cách liệt kê buckets
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);
    
    // Trả về thông tin kết nối
    return NextResponse.json({
      success: true,
      message: "Kết nối Backblaze B2 thành công",
      buckets: response.Buckets?.map(b => ({
        name: b.Name,
        creationDate: b.CreationDate
      })),
      endpoint: process.env.B2_ENDPOINT,
      bucketName: process.env.B2_BUCKET_NAME,
    });
  } catch (error) {
    console.error("Lỗi kết nối Backblaze B2:", error);
    
    // Trả về thông tin lỗi
    return NextResponse.json({
      success: false,
      message: "Không thể kết nối đến Backblaze B2",
      error: error instanceof Error ? error.message : String(error),
      endpoint: process.env.B2_ENDPOINT,
      bucketName: process.env.B2_BUCKET_NAME,
      keyId: process.env.B2_APPLICATION_KEY_ID ? 
        `${process.env.B2_APPLICATION_KEY_ID?.substring(0, 5)}...` : 
        "undefined"
    }, { status: 500 });
  }
}