import Image from "next/image"

interface AIVectorImageProps {
  seed: string
  size?: number
  className?: string
}

export function AIVectorImage({ seed, size = 40, className }: AIVectorImageProps) {
  const imageUrl = `https://api.dicebear.com/6.x/identicon/svg?seed=${seed}`

  return (
    <div className={`overflow-hidden rounded-full ${className}`} style={{ width: size, height: size }}>
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt="AI-generated vector image"
        width={size}
        height={size}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

