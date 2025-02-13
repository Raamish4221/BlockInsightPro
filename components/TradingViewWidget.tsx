"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback, memo } from "react"

interface TradingViewWidgetProps {
  symbol: string
  theme?: "light" | "dark"
  interval?: string
  timezone?: string
  style?: string
  locale?: string
  toolbar_bg?: string
  enable_publishing?: boolean
  allow_symbol_change?: boolean
  save_image?: boolean
  container_id?: string
}

declare global {
  interface Window {
    TradingView: any
  }
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = memo(
  ({
    symbol,
    theme = "dark",
    interval = "D",
    timezone = "Etc/UTC",
    style = "1",
    locale = "en",
    toolbar_bg = "#f1f3f6",
    enable_publishing = false,
    allow_symbol_change = true,
    save_image = true,
    container_id = `tradingview_${Math.random().toString(36).substring(7)}`,
  }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)

    const loadTradingViewScript = useCallback(() => {
      if (!isScriptLoaded) {
        const script = document.createElement("script")
        script.src = "https://s3.tradingview.com/tv.js"
        script.async = true
        script.onload = () => setIsScriptLoaded(true)
        document.head.appendChild(script)

        return () => {
          document.head.removeChild(script)
        }
      }
    }, [isScriptLoaded])

    useEffect(() => {
      loadTradingViewScript()
    }, [loadTradingViewScript])

    useEffect(() => {
      if (isScriptLoaded && containerRef.current) {
        const widgetOptions = {
          autosize: true,
          symbol: symbol,
          interval: interval,
          timezone: timezone,
          theme: theme,
          style: style,
          locale: locale,
          toolbar_bg: toolbar_bg,
          enable_publishing: enable_publishing,
          allow_symbol_change: allow_symbol_change,
          save_image: save_image,
          container_id: container_id,
          hide_side_toolbar: false,
          studies: ["MASimple@tv-basicstudies", "RSI@tv-basicstudies", "MACD@tv-basicstudies"],
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
          withdateranges: true,
          hide_volume: false,
        }

        const widget = new window.TradingView.widget(widgetOptions)

        return () => {
          if (widget && widget.remove) {
            widget.remove()
          }
        }
      }
    }, [
      isScriptLoaded,
      symbol,
      theme,
      interval,
      timezone,
      style,
      locale,
      toolbar_bg,
      enable_publishing,
      allow_symbol_change,
      save_image,
      container_id,
    ])

    return <div id={container_id} ref={containerRef} style={{ width: "100%", height: "600px" }} />
  },
)

TradingViewWidget.displayName = "TradingViewWidget"

export default TradingViewWidget

