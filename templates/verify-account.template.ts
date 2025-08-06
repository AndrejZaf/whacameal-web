export const generateAccountVerificationMail = (
  tokenId: string,
  host: string
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification - WAM</title>
</head>
<body>
    <div style="text-align: center; font-family: Arial, sans-serif;">
        <img src="${host}/whc_logo_black.svg" alt="Whac a meal">
        <h1 style="font-size: 22px;">Verify your email address</h1>
        <p style="font-size: 14px;">You are receiving this email because you need to verify in order to log in.
        <br />
        Click the button below to verify your account.</p>
        <a style="margin-top: 10px; background-color: #fba350; text-transform: uppercase; color: white; font-weight: bold; text-decoration: none; padding: 8px 40px; border-radius: 6px; font-size: 14px;" href="${host}/verify/${tokenId}">Verify</a>
        <p style="font-size: 12px; margin-top: 20px;">The link will expire in 24 hours.</p>
    </div>
</body>
</html>
`;
};
