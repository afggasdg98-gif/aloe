export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram credentials not configured")
      return Response.json({ success: false, error: "Not configured" }, { status: 500 })
    }

    const message = `📱 <b>Новый пользователь ввел номер телефона:</b>\n\n${phone}`

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send Telegram message")
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Telegram notification error:", error)
    return Response.json({ success: false, error: "Failed to send notification" }, { status: 500 })
  }
}
