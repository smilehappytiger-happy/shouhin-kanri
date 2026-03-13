export default async function handler(req, res) {
  // ★★★ ここに最新のGASのURL(デプロイID)を貼り付けてください ★★★
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxu8v67-MsFxWGalvMTCM-a378EYZ3RVV0JiFJTVzQKZCS1yKik72E2iKn6NeW7pmSbxg/exec";

  try {
    // Vercelの裏側サーバーからGASへ通信（ブラウザのCORS制限を受けない最強の通信！）
    const response = await fetch(GAS_URL, {
      method: 'POST',
      body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
    });
    
    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch(e) {
      res.status(500).json({ success: false, message: "GASからの応答エラー: " + text });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Vercelサーバー通信エラー: " + error.message });
  }
}
