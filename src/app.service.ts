import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class AppService {
  async verifyApiKey(apikey: string) : Promise<boolean>{
    var output = false;
    var response = axios.post(
        "https://api-gfpedro.cloud.okteto.net/isAuthenticated",
        {token:apikey},
      ).then((res) => res).catch((error) => error.response);
    
      console.log(response);
    if(response){
        output=true;
    }

    return output;

  }
}
