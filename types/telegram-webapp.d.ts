interface TelegramWebApp {
  openTelegramLink: (url: string) => void
  // Add other Telegram WebApp methods as needed
}

interface Window {
  Telegram?: {
    WebApp: TelegramWebApp
  }
}

