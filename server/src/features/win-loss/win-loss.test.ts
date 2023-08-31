/* eslint-env jest */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
// TODO change dotenv so that it loads different env files for prod, dev and test
import '../../config/dotenv';
// import { jest } from '@jest/globals';
import app from '../../app';
import * as winLossServices from './win-loss.services';
import * as authServices from '../auth/auth.services';
import config from '../../config/config';
import { prismaMock } from '../../singleton';

describe('win-loss', () => {
  describe('ROUTE: GET /winLoss', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401', async () => {
        await request(app).get('/api/v1/winLoss').expect(401);
      });
    });

    describe('given the user is logged in', () => {
      // it('should return a status 200 and the wins and losses', async () => {
      //   const userId = 1;
      //   const accessToken = authServices.generateAccessToken(userId);
      //   const cookie = `${config.ACCESS_TOKEN_COOKIE_NAME}=${accessToken}`;

      //   const getUserServiceMock = jest
      //     .spyOn(authServices, 'getUser')
      //     // eslint-disable-next-line max-len
      //     .mockReturnValueOnce(Promise.resolve({ userId: 1, email: null, image: null, name: null }));
      //   const getWinsLossServiceMock = jest
      //     .spyOn(winLossServices, 'getWinLoss')
      //     .mockReturnValueOnce(Promise.resolve({ wins: 0, losses: 0 }));

      //   const { body, statusCode } = await request(app)
      //     .get('/api/v1/winLoss')
      //     .set('Cookie', [cookie]);

      //   expect(getUserServiceMock).toHaveBeenCalledWith(userId);
      //   expect(getWinsLossServiceMock).toHaveBeenCalledWith(userId);
      //   expect(statusCode).toBe(200);
      //   expect(body).toEqual({ wins: 0, losses: 0 });
      //   getWinsLossServiceMock.mockRestore();
      // });

      it('should return a status 200 and the wins and losses', async () => {
        const winsLosses = { wins: 0, losses: 0 };
        const userId = 1;

        prismaMock.user.findUnique
          .mockResolvedValueOnce({ userId } as any)
          .mockResolvedValueOnce(winsLosses as any);

        const accessToken = authServices.generateAccessToken(userId);
        const cookie = `${config.ACCESS_TOKEN_COOKIE_NAME}=${accessToken}`;
        const { body, statusCode } = await request(app)
          .get('/api/v1/winLoss')
          .set('Cookie', [cookie]);

        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(2);
        expect(statusCode).toBe(200);
        expect(body).toEqual(winsLosses);
      });
    });
  });
});
