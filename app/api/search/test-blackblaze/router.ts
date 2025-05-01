import { NextResponse } from 'next/server';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

// Chỉ sử dụng route này cho mục đích kiểm tra
export async function GET() {
  try {
    // Tạo S3 client với cấu hình Backblaze
    const s3Client = new S3Client({
      region: 'us-east-1', // B2 yêu cầu region, nhưng bỏ qua nó
      endpoint: process.env.B2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.B2_APPLICATION_KEY_ID || '',
        secretAccessKey: process.env.B2_APPLICATION_KEY || '',
      },
      forcePathStyle: true
    });
    
    // Kiểm tra kết nối bằng cách liệt kê buckets
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);
    
    // Xóa thông tin nhạy cảm
    const safeBuckets = response.Buckets?.map(bucket => ({
      Name: bucket.Name,
      CreationDate: bucket.CreationDate
    }));
    
    // Trả về thông tin cấu hình (đã loại bỏ thông tin nhạy cảm)
    return NextResponse.json({
      success: true,
      message: 'Kết nối tới Backblaze B2 thành công',
      endpoint: process.env.B2_ENDPOINT,
      bucketName: process.env.B2_BUCKET_NAME,
      buckets: safeBuckets,
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    console.error('Lỗi kết nối Backblaze B2:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Không thể kết nối tới Backblaze B2',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}