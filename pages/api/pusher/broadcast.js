// pages/api/pusher/broadcast.js

import Pusher from 'pusher'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
  })

  const { event, data } = req.body

  try {
    await pusher.trigger('presence-vitals', event, data)
    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Pusher broadcast error:', err)
    res.status(500).json({ error: 'Broadcast error' })
  }
}