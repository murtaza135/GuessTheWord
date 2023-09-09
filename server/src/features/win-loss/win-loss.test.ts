/* eslint-env jest */
// TODO change dotenv so that it loads different env files for prod, dev and test
import '../../config/dotenv';
import request from 'supertest';
import app from '../../app';
import * as authServices from '../auth/auth.services';
import config from '../../config/config';
import { prismaMock } from '../../singleton';

describe('win-loss', () => {
  describe('GET /winLoss', () => {
    describe('given that authentication fails', () => {
      it('should return status 401', async () => {
        await request(app).get('/api/v1/winLoss').expect(401);
      });
    });

    describe('given that authentication succeeds', () => {
      it('should return status 200 and body with wins and losses', async () => {
        const winsLosses = { wins: 0, losses: 0 };
        const userId = 1;

        prismaMock.user.findUnique
          .mockResolvedValueOnce({ userId } as any)
          .mockResolvedValueOnce(winsLosses as any);

        const accessToken = authServices.generateAccessToken(userId);
        const cookie = `${config.SESSION_COOKIE_NAME}=${accessToken}`;
        const { body, statusCode } = await request(app)
          .get('/api/v1/winLoss')
          .set('Cookie', [cookie]);

        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(2);
        expect(statusCode).toBe(200);
        expect(body).toEqual(winsLosses);
      });
    });
  });

  describe('POST /wins/increment', () => {
    describe('given that the body is invalid', () => {
      it('should return status 400', async () => {
        await request(app)
          .post('/api/v1/wins/increment')
          .send({ wins: -5 })
          .expect(400);
      });
    });

    describe('given that the body is valid but authentication fails', () => {
      it('should return status 401', async () => {
        await request(app)
          .post('/api/v1/wins/increment')
          .send({ wins: 3 })
          .expect(401);
      });
    });

    describe('given that the body is valid and authentication succeeds', () => {
      it('should return status 200 and body with new wins and losses', async () => {
        const userId = 1;
        const incrementWins = 3;
        const winsLosses = { wins: incrementWins, losses: 0 };
        const accessToken = authServices.generateAccessToken(userId);
        const cookie = `${config.SESSION_COOKIE_NAME}=${accessToken}`;

        prismaMock.user.findUnique.mockResolvedValueOnce({ userId } as any);
        prismaMock.user.update.mockResolvedValueOnce(winsLosses as any);

        const { body, statusCode } = await request(app)
          .post('/api/v1/wins/increment')
          .send({ wins: incrementWins })
          .set('Cookie', [cookie]);

        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.user.update).toHaveBeenCalledTimes(1);
        expect(statusCode).toBe(200);
        expect(body).toEqual(winsLosses);
      });
    });
  });

  describe('POST /losses/increment', () => {
    describe('given that the body is invalid', () => {
      it('should return status 400', async () => {
        await request(app)
          .post('/api/v1/losses/increment')
          .send({ losses: -5 })
          .expect(400);
      });
    });

    describe('given that the body is valid but authentication fails', () => {
      it('should return status 401', async () => {
        await request(app)
          .post('/api/v1/losses/increment')
          .send({ losses: 3 })
          .expect(401);
      });
    });

    describe('given that the body is valid and authentication succeeds', () => {
      it('should return status 200 and body with new wins and losses', async () => {
        const userId = 1;
        const incrementLosses = 3;
        const winsLosses = { wins: 0, losses: incrementLosses };
        const accessToken = authServices.generateAccessToken(userId);
        const cookie = `${config.SESSION_COOKIE_NAME}=${accessToken}`;

        prismaMock.user.findUnique.mockResolvedValueOnce({ userId } as any);
        prismaMock.user.update.mockResolvedValueOnce(winsLosses as any);

        const { body, statusCode } = await request(app)
          .post('/api/v1/losses/increment')
          .send({ losses: incrementLosses })
          .set('Cookie', [cookie]);

        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.user.update).toHaveBeenCalledTimes(1);
        expect(statusCode).toBe(200);
        expect(body).toEqual(winsLosses);
      });
    });
  });
});
