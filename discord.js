const url = process.env.DISCORD_WEBHOOK_URL;
const user = process.env.DISCORD_USER_ID;

async function alertUser(blob) {
  const formData = new FormData();
  formData.append('payload_json', JSON.stringify({ content: `<@${user}> Print fail detected.` }));
  formData.append('file', blob, 'print-fail.png');
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error('Discord response status ' + response.status);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const Discord = {
  alertUser
}