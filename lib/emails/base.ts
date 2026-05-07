export const SUPPORT_EMAIL = "voxensupport.au@gmail.com";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://voxen.co";

export function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Voxen</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #d4d4d4; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #0d0d0d; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 40px; }
    .logo { font-size: 22px; font-weight: 700; color: #ffffff; text-decoration: none; display: block; margin-bottom: 32px; }
    .logo span { color: #3B82F6; }
    h1 { font-size: 24px; font-weight: 700; color: #ffffff; margin-bottom: 12px; line-height: 1.3; }
    p { font-size: 15px; line-height: 1.7; color: #a1a1aa; margin-bottom: 16px; }
    .btn { display: inline-block; background: #3B82F6; color: #ffffff !important; font-weight: 600; font-size: 15px; padding: 13px 28px; border-radius: 10px; text-decoration: none; margin: 8px 0; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.06); margin: 28px 0; }
    .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #52525b; line-height: 1.6; }
    .footer a { color: #52525b; }
    .post-box { background: #111111; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; margin: 20px 0; }
    .code-box { background: #111111; border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 24px; text-align: center; margin: 20px 0; }
    .otp { font-size: 40px; font-weight: 700; letter-spacing: 8px; color: #3B82F6; font-family: monospace; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <a href="${BASE_URL}" class="logo"><img src="https://voxen.co/logo.png" alt="Voxen" height="32" style="height:32px;width:auto;" /></a>
      ${content}
    </div>
    <div class="footer">
      <p>Questions? Reply to this email or contact <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>
      <p style="margin-top:6px;">Manage your subscription at <a href="${BASE_URL}/account">${BASE_URL.replace("https://", "")}/account</a></p>
      <p style="margin-top:12px; color:#52525b;">© 2026 Voxen. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
