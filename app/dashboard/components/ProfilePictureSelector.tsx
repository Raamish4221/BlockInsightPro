"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Check } from "lucide-react"

interface ProfilePicture {
  url: string
  alt: string
}

const profilePictures: ProfilePicture[] = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20(1)-NTjdzJe7SfZPzZ7VsrG7ifcNGZCsli.jpeg",
    alt: "Cool hipster character",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images2-8yhOkdMR05OB4GTqM8huKhQDFZqN25.png",
    alt: "Friendly female character",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20(4)-IxJCTIx5d4nuHmtGsnh6GiMUn6R8IB.jpeg",
    alt: "Young boy with glasses",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-qhLsHeoHH8yHhFWsuLkF08AaERdiDG.jpeg",
    alt: "3D character with headphones",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20(2)-1wZFfzdFabP3LTA2nVLi6FRN04JV6Z.jpeg",
    alt: "Minimalist character",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images1-T7hHcE0O8ZEqyhK8S8l0QAmiR1mk9X.png",
    alt: "Female avatar in grey",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images3-LlbnE5ewGqn8TjtlabzRJE7s7i6hyd.png",
    alt: "Female avatar in green",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20(3)-BEW4g98SorRDCzV6PZDQkfDE7fX1WY.jpeg",
    alt: "3D male character",
  },
]

interface ProfilePictureSelectorProps {
  currentImage: string
  onSelect: (url: string) => void
}

export function ProfilePictureSelector({ currentImage, onSelect }: ProfilePictureSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(currentImage)
  const [tempSelection, setTempSelection] = useState(currentImage)

  const handleSave = () => {
    onSelect(tempSelection)
    setSelectedImage(tempSelection)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setTempSelection(selectedImage)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Change Profile Picture
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose Profile Picture</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {profilePictures.map((picture, index) => (
            <div
              key={index}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 ${
                tempSelection === picture.url ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setTempSelection(picture.url)}
            >
              <Image src={picture.url || "/placeholder.svg"} alt={picture.alt} fill className="object-cover" />
              {tempSelection === picture.url && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

