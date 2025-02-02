import {Camera} from './camera.js'
import {Gemini} from './gemini.js'
import {Moonraker} from './moonraker.js'
import {Discord} from './discord.js'

async function checkPrinter(){
  try {
    console.log('Taking snapshot...');
    const snapshot = await Camera.getCurrentSnapshot();
    const failureChance = await Gemini.getAIResponse(snapshot.base64);
    console.log('Failure likelihood: ' + failureChance.trim() + '%');
    if(failureChance >= 90){
      console.log('Failure detected. Rebooting printer...');
      if(process.env.ENABLE_DISCORD_INTEGRATION === 'true'){
        Discord.alertUser(snapshot.blob);
      }
      await Moonraker.rebootPrinter();
      console.log('Printer restarted. Shutting down detector.')
    }
    else{
      setTimeout(checkPrinter, 1000*60*5);
    }
  } catch (error) {
    console.error(error);
    setTimeout(checkPrinter, 1000*60*5);
  }
}

console.log('Taking a snapshot every 5 minutes. The printer will reboot if failure detection likelihood is over 90%.');
checkPrinter();
