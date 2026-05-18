import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(
  base64Image: string,
  folder = "thumbai",
  publicId?: string
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(base64Image, {
    folder,
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
    transformation: [{ quality: "auto:best" }],
  })
  return { url: result.secure_url, publicId: result.public_id }
}

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId)
}

export async function removeBackground(imageUrl: string): Promise<string> {
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder: "thumbai/bg-removed",
    background_removal: "cloudinary_ai",
    resource_type: "image",
  })
  return result.secure_url
}

export { cloudinary }
