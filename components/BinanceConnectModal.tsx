"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { connectBinanceAccount } from "@/app/actions/binance"
import { toast } from "sonner"

interface BinanceConnectModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BinanceConnectModal({ isOpen, onClose }: BinanceConnectModalProps) {
  const [apiKey, setApiKey] = useState("")
  const [apiSecret, setApiSecret] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      const response = await connectBinanceAccount(apiKey, apiSecret)
      if (response.success) {
        toast.success(response.message)
        onClose()
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error("Failed to connect to Binance")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E2026] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-52.785 -88 457.47 528" className="w-6 h-6 mr-2">
              <path
                d="M79.5 176l-39.7 39.7L0 176l39.7-39.7zM176 79.5l68.1 68.1 39.7-39.7L176 0 68.1 107.9l39.7 39.7zm136.2 56.8L272.5 176l39.7 39.7 39.7-39.7zM176 272.5l-68.1-68.1-39.7 39.7L176 352l107.8-107.9-39.7-39.7zm0-56.8l39.7-39.7-39.7-39.7-39.8 39.7z"
                fill="#f0b90b"
              />
            </svg>
            Connect to Binance
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter your Binance API credentials to connect your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-key" className="text-right">
              API Key
            </Label>
            <Input
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="col-span-3 bg-[#2B2F36] border-gray-700"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-secret" className="text-right">
              API Secret
            </Label>
            <Input
              id="api-secret"
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              className="col-span-3 bg-[#2B2F36] border-gray-700"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleConnect}
            disabled={isLoading}
            className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-[#1E2026]"
          >
            {isLoading ? "Connecting..." : "Connect"}
          </Button>
        </DialogFooter>
        <div className="mt-4 text-sm text-gray-400">
          <h4 className="font-semibold mb-2">Step-by-Step Instructions</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Login to your Binance account</li>
            <li>Go to API Management</li>
            <li>Create a new API key</li>
            <li>Set appropriate permissions</li>
            <li>Copy the API key and secret</li>
            <li>Paste them here to connect</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  )
}

