import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { GetGithubUsers } from '../controllers/services/users/GetGithubUsers';

jest.mock('node-fetch');

describe('GetGithubUsers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve retornar os dados do usuário do GitHub', async () => {
    const getGithubUsers = new GetGithubUsers();
    const req = {
      params: {
        username: 'Gustavoxky'
      }
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    } as unknown as Response;

    const mockUserData = { name: 'Gustavoxky' };
    const mockResponse = {
      json: jest.fn().mockResolvedValue(mockUserData)
    };

    (fetch as unknown as jest.Mock).mockResolvedValue(mockResponse);

    await getGithubUsers.handle(req, res);

    expect(fetch).toBeCalledWith('https://api.github.com/users/Gustavoxky');
    expect(res.json).toBeCalledWith(mockUserData);
  });

  it('Deve retornar status 500 quando ocorrer um erro', async () => {
    const getGithubUsers = new GetGithubUsers();
    const req = {
      params: {
        username: 'gustavoxky'
      }
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const mockError = new Error('An error occurred');
    (fetch as unknown as jest.Mock).mockRejectedValue(mockError);

    const consoleErrorSpy = jest.spyOn(console, 'error');

    await getGithubUsers.handle(req, res);

    expect(fetch).toBeCalledWith('https://api.github.com/users/gustavoxky');
    expect(consoleErrorSpy).toBeCalledWith(mockError);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: 'Erro ao se conectar com a API do Github' });
  });
});
