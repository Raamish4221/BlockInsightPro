import { Button } from "@/components/ui/button"

interface BinanceConnectButtonProps {
  onClick: () => void
}

export function BinanceConnectButton({ onClick }: BinanceConnectButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-[#222] hover:bg-[#222]/90 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-52.785 -88 457.47 528"
        className="w-6 h-6 mr-2"
      >
        <path
          d="M79.5 176l-39.7 39.7L0 176l39.7-39.7zM176 79.5l68.1 68.1 39.7-39.7L176 0 68.1 107.9l39.7 39.7zm136.2 56.8L272.5 176l39.7 39.7 39.7-39.7zM176 272.5l-68.1-68.1-39.7 39.7L176 352l107.8-107.9-39.7-39.7zm0-56.8l39.7-39.7-39.7-39.7-39.8 39.7z"
          fill="#f0b90b"
        />
      </svg>
      Connect
    </Button>
  )
}

