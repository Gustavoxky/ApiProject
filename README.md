# testL5Network
O projeto é uma API em TypeScript com sete endpoints para criar, editar, listar e deletar usuários, pesquisar usuários do GitHub e fazer upload e download de arquivos de imagem e áudio. Ele utiliza Node.js, Express, Prisma, SQLite, Jest, Bcrypt e Multer para fornecer funcionalidades completas de gerenciamento de usuários e manipulação de arquivos.

# Funcionalidades
Criar, editar, listar e deletar usuário </br>
Pesquisar usuários do GitHub </br>
Fazer upload de arquivos de imagem e audio </br>
Fazer download de arquivos de imagem e áudio </br>

# Tecnologias Utilizadas
TypeScript </br>
SQLite </br>
Prisma </br>
Express </br>
Jest </br>
Node.js </br>
Bcrypt </br>
Multer </br>

# Pré-requisitos
Node.js
yarn

# Configuração do Banco de Dados
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

DATABASE_URL="file:./users.db"

# Execute as migrations para criar as tabelas do banco de dados:

bash </br>
yarn prisma migrate dev

# Executando o Projeto

bash </br>
yarn dev </br>
O servidor estará em execução em http://localhost:4003.

# Executando os Testes
bash
npm test

# Documentação dos Endpoints
 ## No insomnia: </br>
 ### Criar usuario:  </br>
- Metodo: POST
- http://localhost:4003/create-user
- Corpo da solicitação (JSON) </br>
  ```
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "login": "JohnDoe",
    "password": "password123"
  }
  ``` 
  </br> </br>
 ### Editar usuario: 
 - Metodo PUT 
 - http://localhost:4003/user/:id
 - Parâmetros de URL:
   - 'id' (string): ID do usuário a ser editado </br> </br>
 
 ### Deletar usuario: 
 - metodo DELETE
 - http://localhost:4003/delete-user/:id
 - Parametro de URL: 
   - 'id' (string): ID do usuário a ser deletado </br> </br>
 
 ### Listar usuarios:
 - Metodo GET
 - http://localhost:4003/users </br> </br>
 
 ### Buscar usuarios do github:
 - Metodo GET 
 - http://localhost:4003/github-user/:
 - Parametro de URL: 
   - 'username' (string): Nome de usuário do GitHub a ser pesquisado </br> </br>
   
 ### Upload de arquivos:
 - Metodo POST 
 - http://localhost:4003/uploads
 - Corpo da solicitação (formulário multipart):
   - Chave: files 
   - Valor: arquivo a ser enviado </br> </br>
   
 ### Download de arquivos: 
 - Metodo GET
 - http://localhost:4003/download/:id
 - Parametro da URL:
   - 'id' (string): ID do arquivo
   
      

# Contato
Gustavo Correia - gustavusxky@gmail.com

Link do Projeto: https://github.com/SEU_USUARIO/nome-do-projeto
