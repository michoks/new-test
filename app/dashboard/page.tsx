"use client";
import { Button } from '@/components/ui/button';
import { CldImage, CldUploadWidget } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
    return (
        <div className=' pt-20 space-y-5'>
            <CldUploadWidget uploadPreset="<Your Upload Preset>">
                {({ open }) => {
                    return (
                        <Button onClick={() => open()}>
                            Upload an Image
                        </Button>
                    );
                }}
            </CldUploadWidget>

            <CldImage
                src="cgacp1z5qec9sjlhu2dt" // Use this sample image or upload your own via the Media Library
                width="500" // Transform the image: auto-crop to square aspect_ratio
                height="500"
                alt="a simple image"
                crop={{
                    type: 'auto',
                    source: true
                }}
            />
        </div>

    );
}