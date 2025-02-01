import {existsSync, readFileSync, writeFileSync} from 'fs';
import {createInterface} from 'readline';

const dotenv = '.env';

const defaultValues = {
  CAMERA_URL: 'http://localhost:9000/current.jpg',
  MOONRAKER_URL: 'http://voron.local:7125/',
  GEMINI_API_KEY: 'your api key',
  ENABLE_DISCORD_INTEGRATION: true
};

const defaultDiscordValues = {
  DISCORD_WEBHOOK_URL: '',
  DISCORD_USER_ID: '999999999999999999'
}

const currentEnv = {};
if(existsSync(dotenv)){
  readFileSync(dotenv, 'utf-8').split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if(key && value){
      currentEnv[key] = value.trim();
    }
  });
}

const consoleInterface = createInterface({
  input: process.stdin,
  output: process.stdout
});

const promptUserForValue = (key, currentValue) => {
  return new Promise((resolve) => {
    consoleInterface.question(`${key} (${currentValue}): `, (answer) => {
      resolve(answer.trim() || currentValue);
    });
  });
};

async function setupEnv() {
  console.log('Setting up your environment variables...\n');
  
  const newEnv = {};
  for (const key of Object.keys(defaultValues)) {
    const currentValue = currentEnv[key] || defaultValues[key];
    newEnv[key] = await promptUserForValue(key, currentValue);
  }

  if(newEnv.ENABLE_DISCORD_INTEGRATION === 'true'){
    for (const key of Object.keys(defaultDiscordValues)) {
      const currentValue = currentEnv[key] || defaultDiscordValues[key];
      newEnv[key] = await promptUserForValue(key, currentValue);
    }
  }
  else{
    for (const key of Object.keys(defaultDiscordValues)) {
      newEnv[key] = currentEnv[key] || defaultDiscordValues[key];
    }
  }
  
  // Write new .env file
  const envContent = Object.entries(newEnv)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n') + '\n';
  
  writeFileSync(dotenv, envContent);
  console.log(`\n✅ ${dotenv} has been updated.\n`);
  
  consoleInterface.close();
}

// Run setup
setupEnv();
