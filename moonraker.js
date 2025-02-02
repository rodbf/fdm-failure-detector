const url = process.env.MOONRAKER_URL;

async function emergencyStop(){
  try {
    const response = await fetch(url + '/printer/emergency_stop', {method: 'POST'});
    if (!response.ok) {
      throw new Error('Moonraker response status ' + response.status);
    }
    return response;
  } catch (error) {
    return console.error(error);
  }
}

async function firmwareRestart(){
  try {
    const response = await fetch(url + '/printer/firmware_restart', {method: 'POST'});
    if (!response.ok) {
      throw new Error('Moonraker response status ' + response.status);
    }
    return response;
  } catch (error) {
    return console.error(error);
  }
}

async function rebootPrinter(){
  await emergencyStop();
  return await firmwareRestart();
}

export const Moonraker = {
  rebootPrinter
}