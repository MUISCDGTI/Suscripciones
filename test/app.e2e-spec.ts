import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

//let { describe, it } = global;
import {describe, expect, it } from '@jest/globals'
describe('AppController (e2e)', () => {
  
 

  /*let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });*/

  it('suma', () => {
    const a = 5;
    const b = 3;
    const sum = a+b;
    expect(sum).toBe(8);
  });
  
});

  