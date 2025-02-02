const url = process.env.CAMERA_URL;

async function getCurrentSnapshot(){
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Camera response status ' + response.status);
    }
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return {base64: Buffer.from(arrayBuffer).toString('base64'), blob};
  } catch (error) {
    return console.error(error);
  }
}

export const Camera = {
  getCurrentSnapshot
}