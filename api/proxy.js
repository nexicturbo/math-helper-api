export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(200).send('Proxy ready. Use: /api/proxy?url=https://example.com');
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const contentType = response.headers.get('content-type') || 'text/html';
    const body = await response.arrayBuffer();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', contentType);

    return res.status(response.status).send(Buffer.from(body));
  } catch (error) {
    return res.status(500).send('Error: ' + error.message);
  }
}
