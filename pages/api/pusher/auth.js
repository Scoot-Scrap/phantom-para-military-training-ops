// pages/api/pusher/auth.js

import Pusher from 'pusher'

export default function handler(req, res) {
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

  const { socket_id, channel_name, user_id } = req.body

  try {
    const auth = pusher.authorizeChannel(socket_id, channel_name, {
      user_id: user_id,
      user_info: { name: `User ${user_id}` },
    })
    res.status(200).send(auth)
  } catch (err) {
    console.error('Pusher auth error:', err)
    res.status(500).json({ error: 'Auth error' })
  }
}