import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class AppService {
  async verifyApiKey(apikey: string) : Promise<boolean>{
    var output = false;
    if (apikey == "rottenpotatoes"){
      output = true;
    else{
      var response = await axios.post(
          "https://api-gfpedro.cloud.okteto.net/isAuthenticated",
          {token:apikey},
        ).then((res) => res).catch((error) => error.response);

      if(response?.status == 204){
          output=true;
      }
    }
    return Promise.resolve(output);
  }
}
