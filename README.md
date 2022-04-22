# Hey, what's up? 👋 

## Projeto de gerenciamento de usuários [incompleto]

Esse projeto foi desenvolvido com a finalidade de aplicar os conhecimentos em gerenciamento das permissões dos usuáios com base em suas roles, aplicar as atualizações do typeorm e treinar a implementação de testes unitário/integração/e2e


Para inicializar o projeto, vá na raiz e execute o comando no teminal:

```$ yarn ```

ou 

```$ npm i ```

Para configurar o typeorm, entre na pasta ```src/config``` e crie o aquivo dataSourceConfig.ts, esse arquivo deve conter as informações para a conexão com o banco.
Obs: Esse projeto ainda não utiliza docker, então será necessário subir um container ou criar um banco local.


## Observações sobre as novas feature do typeorm:

* Arquivos de configuração de conexão foram 
descontinuados, como por exemplo o ormconfig, agora devemos exportar uma variável contendo uma instância da classe DataSource do typeorm, que contem todas as infos da conexão, nesse projeto o arquivo ficar em:  
``` src/shared/infra/typeorm/appDataSource.ts```
* Para gerarmos as migrations agora é necessáio informar o path onde deseja armazenar a migration e tb o path de onde se encontra o arquivo com a classe DataSource, ex:
```npm run typeorm migration:generate src/shared/infra/typeorm/migrations/[NOME_DA_MIGRATION] -d src/shared/infra/typeorm/appDataSource.ts``` (Sim o script ficou enorme para a estrutura desse projeto eu concordo 😞)
* Nessa nova versão, a flag "-n" usada para nomear a migration gerada/criada não é mais aceita portanto devemos passar o nome direto no path como mencionado logo a cima.
* Para utilizar o repositório, devemos chamar o método getRepository() da nossa instância do DataSource, basta importar o arquivo appDataSouce.ts e utilizar o método ``` appDataSource.getRepository([ENTITY])```