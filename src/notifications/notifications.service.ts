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
    var topics;
    if ( notification.category == Categories.Pelicula){
      response = await this.getFilm(notification.referenceId)
      topics = response.data.genre;
      title = response.data.title;
    }else{
      var response = await this.getNew(notification.referenceId);
      topics = response.data.genre;
      title = response.data.title;
      message = "Hola! Se ha subido una nueva noticia con tílulo \""+title+"\", que tiene la etiqueta "
      + topics + " a la que estás suscrito/a.";
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
    ).then((res) => res).catch((error) => error.response);
  }

  async getNew(newId) {
    return axios.get(
      "https://api-fis-josenggn.cloud.okteto.net/api/v1/news/"+newId,
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
