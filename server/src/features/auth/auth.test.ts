/* eslint-env jest */
import '../../config/dotenv';
import { Buffer } from 'node:buffer';
import request from 'supertest';
import app from '../../app';
import config from '../../config/config';
import { prismaMock } from '../../singleton';
import * as authServices from './auth.services';

describe('auth', () => {
  describe('POST /auth/local/register', () => {
    describe('given that the body is invalid', () => {
      it('should return status 400', async () => {
        await request(app).post('/api/v1/auth/local/register').expect(400);
      });
    });

    describe('given that the body is valid and registering the user succeeds', () => {
      it('should return status 204 and Set-Cookie to be defined', async () => {
        const userId = 1;
        prismaMock.$transaction.mockResolvedValueOnce(userId);

        const response = await request(app)
          .post('/api/v1/auth/local/register')
          .send({ email: 'test@test.com', username: 'test', name: 'test', password: '123456', confirmPassword: '123456' });

        expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toBe(204);
        expect(response.get('Set-Cookie')).toBeDefined();
      });
    });
  });

  describe('POST /auth/local/link', () => {
    describe('given that authentication fails', () => {
      it('should return status 401', async () => {
        await request(app).post('/api/v1/auth/local/link').expect(401);
      });
    });

    describe('given that authentication succeeds but body is invalid', () => {
      it('should return status 400', async () => {
        const userId = 1;
        const accessToken = authServices.generateAccessToken(userId);
        const accessTokenBase64 = Buffer.from(JSON.stringify(accessToken)).toString('base64');
        const cookie = `${config.SESSION_COOKIE_NAME}=${accessTokenBase64}`;

        prismaMock.user.findUnique.mockResolvedValueOnce({ userId } as any);
        const { statusCode } = await request(app)
          .post('/api/v1/auth/local/link')
          .set('Cookie', [cookie]);

        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
        expect(statusCode).toBe(400);
      });
    });

    describe('given that authentication succeeds, body is valid, and authorization succeeds', () => {
      it('should return a status 204', async () => {
        const userId = 1;
        const accessToken = authServices.generateAccessToken(userId);
        const cookie = `${config.SESSION_COOKIE_NAME}=${accessToken}`;

        prismaMock.user.findUnique.mockResolvedValueOnce({ userId } as any);
        prismaMock.localAccount.findUnique.mockResolvedValueOnce(null);
        prismaMock.$transaction.mockResolvedValueOnce({ user: { userId } } as any);

        const { statusCode } = await request(app)
          .post('/api/v1/auth/local/link')
          .set('Cookie', [cookie])
          .send({ email: 'test@test.com', username: 'test', name: 'test', password: '123456', confirmPassword: '123456' });

        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.localAccount.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);
        expect(statusCode).toBe(204);
      });
    });
  });

  describe('POST /auth/local/login', () => {
    describe('given that the body is invalid', () => {
      it('should return status 400', async () => {
        await request(app).post('/api/v1/auth/local/login').expect(400);
      });
    });

    describe('given that the body is valid but login fails', () => {
      it('should return status 401', async () => {
        prismaMock.localAccount.findUnique.mockResolvedValueOnce(null);

        await request(app)
          .post('/api/v1/auth/local/login')
          .send({ username: 'test', password: '123456' })
          .expect(401);
      });
    });

    describe('give that the body is valid and login succeeds', () => {
      it('should return status 200 and Set-Cookie to be defined', async () => {
        const body = { username: 'test', password: '123456' };
        const user = { userId: 1 };
        const account = { accountId: 1 };

        const localLoginServiceMock = jest
          .spyOn(authServices, 'localLogin')
          .mockResolvedValueOnce({ user, account } as any);

        const response = await request(app)
          .post('/api/v1/auth/local/login')
          .send(body);

        expect(localLoginServiceMock).toHaveBeenCalledWith(body);
        expect(localLoginServiceMock).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toBe(204);
        expect(response.get('Set-Cookie')).toBeDefined();
      });
    });
  });

  describe('POST /auth/profile', () => {
    describe('given that authentication fails', () => {
      it('should return status 401', async () => {
        await request(app).get('/api/v1/auth/profile').expect(401);
      });
    });

    describe('given that authentication succeeds', () => {
      it('should return status 200 and body with profile information', async () => {
        const user = { userId: 1 };
        const accessToken = authServices.generateAccessToken(user.userId);
        const cookie = `${config.SESSION_COOKIE_NAME}=${accessToken}`;

        prismaMock.user.findUnique.mockResolvedValueOnce(user as any);

        const { body, statusCode } = await request(app)
          .get('/api/v1/auth/profile')
          .set('Cookie', [cookie]);

        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
        expect(statusCode).toBe(200);
        expect(body).toEqual(user);
      });
    });
  });

  describe('POST /auth/accounts', () => {
    describe('given that authentication fails', () => {
      it('should return status 401', async () => {
        await request(app).get('/api/v1/auth/accounts').expect(401);
      });
    });

    describe('given that authentication succeeds', () => {
      it('should return status 200 and body with profile information', async () => {
        const accounts = { localAccount: null, oAuthAccounts: [] as any };
        const user = { userId: 1 };
        const accessToken = authServices.generateAccessToken(user.userId);
        const cookie = `${config.SESSION_COOKIE_NAME}=${accessToken}`;

        prismaMock.user.findUnique.mockResolvedValueOnce(user as any);
        prismaMock.localAccount.findUnique.mockResolvedValueOnce(accounts.localAccount);
        prismaMock.oAuthAccount.findMany.mockResolvedValueOnce(accounts.oAuthAccounts);

        const { body, statusCode } = await request(app)
          .get('/api/v1/auth/accounts')
          .set('Cookie', [cookie]);

        expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.localAccount.findUnique).toHaveBeenCalledTimes(1);
        expect(prismaMock.oAuthAccount.findMany).toHaveBeenCalledTimes(1);
        expect(statusCode).toBe(200);
        expect(body).toEqual(accounts);
      });
    });
  });

  describe('POST /auth/logout', () => {
    it('should remove access cookie and return status 204', async () => {
      const response = await request(app).post('/api/v1/auth/logout');

      expect(response.statusCode).toBe(204);
      expect(response.get('Set-Cookie')[0]).toMatch(/^session=;.*/);
    });
  });
});
