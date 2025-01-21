export const generateForgotPasswordMailTemplate = (tokenId: string, host: string) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset password - WAM</title>
</head>
<body>
    <div style="text-align: center; font-family: Arial, sans-serif;">
        <img src="${host}/whc_logo_black.svg" alt="Whac a meal">
        <h1 style="font-size: 22px;">Reset password instructions</h1>
        <p style="font-size: 14px;">You are receiving this email because we received a request for resetting the password of your Whac a meal account.
        <br />
        Click the button below to reset your password.</p>
        <a style="margin-top: 10px; background-color: #fba350; text-transform: uppercase; color: white; font-weight: bold; text-decoration: none; padding: 8px 40px; border-radius: 6px; font-size: 14px;" href="${host}/forgot-password/${tokenId}">Reset password</a>
        <p style="font-size: 12px; margin-top: 20px;">If you did not submit this request, please ignore it.</p>
    </div>
</body>
</html>
`;
};