import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Categories } from 'src/enums/categories';
import { SuscriptionsService } from 'src/suscriptions/suscriptions.service';
import CreateNotificationDto from './dto/createNotification.dto';
import axios from 'axios';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly suscriptionsService: SuscriptionsService,
  ) {}

  async notify(notification: CreateNotificationDto): Promise<boolean> {
    var response;
    var title = '';
    var message = '';
    var topics=[]; 
    
    if ( notification.category == Categories.Pelicula){
      response = await this.getFilm(notification.referenceId);
      console.log(response);
      topics = response.data.genre;
      title = response.data.title;
    }else{
      response = await this.getNew(notification.referenceId);
      console.log(response);
      topics = response.data.tags;
      title = response.data.title;
    }
    var messagesSent = true;
    for ( var topic of topics){
      if ( notification.category == Categories.Pelicula){
        message = "Hola! Se ha subido una nueva película con tílulo \""+title+"\", que pertenece al género "
        + topic + " a el que estás suscrito/a.";
      }else{
        message = "Hola! Se ha subido una nueva noticia con tílulo \""+title+"\", que tiene la etiqueta "
        + topic + " a la que estás suscrito/a.";
      }
      const subscribers = await this.suscriptionsService.findAll('', topic, notification.category);
      for ( var subscriber of subscribers){
        if (! await this.send({ email: subscriber.mail, subject: "Rottenpotatoes " + subscriber.subject, name: "", customMessage: message})){
          messagesSent = false;
        }
      }
    }
    
    return Promise.resolve(messagesSent);
  }

  async getFilm(filmId) {
    axios.get(
      "https://api-drorganvidez.cloud.okteto.net/api/v1/films/"+filmId,
      {params:{apikey:"06271241-163c-4b95-bcb3-880be1e0be95"}},
      //+"/?apikey=06271241-163c-4b95-bcb3-880be1e0be95",
    ).then((res) => res).catch((error) => error.response);
  }

  async getNew(newId) {
    return axios.get(
      "https://api-fis-josenggn.cloud.okteto.net/api/v1/news/"+newId,
      {params:{apikey:"1ad4ca7f-f0bd-4f36-947b-2effe8a07720"}},
    ).then((res) => res).catch((error) => error.response);
  }

  async send({ email: to, subject, name, customMessage }): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        context: {
          name,
          customMessage,
        },
        text: customMessage,
      });
      return Promise.resolve(true);
    } catch (error) {
      console.error(`Error sending email to ${to}. `, error);
      return Promise.reject(false);
    }
  }
  
}
