import { Request, Response } from 'express';
import fetch from 'node-fetch';

export class GetGithubUsers {
  async handle(req: Request, res: Response) {
    try {
      const { username } = req.params;

      const response = await fetch(`https://api.github.com/users/${username}`);
      const userData = await response.json();

      return res.json(userData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao se conectar com a API do Github' });
    }
  }
}
