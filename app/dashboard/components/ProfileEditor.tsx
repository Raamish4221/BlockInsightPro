"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { updateProfile } from "@/app/actions/user"
import { toast } from "sonner"
import type { User } from "@/types/auth"
import { AIVectorImage } from "@/components/AIVectorImage"

interface ProfileEditorProps {
  user: User
  onUpdate: () => void
}

export function ProfileEditor({ user, onUpdate }: ProfileEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(user.image || "")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    formData.append("image", selectedImage)
    const response = await updateProfile(formData)

    setIsLoading(false)
    if (response.success) {
      toast.success(response.message)
      setIsOpen(false)
      onUpdate()
    } else {
      toast.error(response.message)
    }
  }

  const generateNewImage = () => {
    const newSeed = Math.random().toString(36).substring(7)
    setSelectedImage(`https://api.dicebear.com/6.x/identicon/svg?seed=${newSeed}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center space-x-4">
              <AIVectorImage seed={selectedImage} size={64} />
              <Button type="button" onClick={generateNewImage}>
                Generate New Image
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={user.name} placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={user.bio}
              placeholder="Tell us about yourself"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              name="twitter"
              defaultValue={user.socialLinks?.twitter}
              placeholder="Your Twitter handle"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

