# tutorial-docker-programadorabordo
[Tutorial de Docker](https://www.youtube.com/watch?v=Kzcz-EVKBEQ) do canal Programador a Bordo 
Meu primeiro contato com Docker na prática. Foi meio difícil fazer funcionar em 
22 minutos por causa de vários motivos, como a diferença entre os nossos sistemas operacionais
e a data de gravação do vídeo.

## Comandos e parâmetros aprendidos
* `docker build [opções] PATH || URL`: serve para criar uma imagem de uma aplicação usando um arquivo Dockerfile
  - Opções
    - `-t`, `--tag`: o nome da imagem, pode ser passado também uma tag com `:` depois do nome
    - `-f`, `--file`: o arquivo Dockerfile que será utilizado pelo comando para montar a imagem.
  - Parâmetros
    - `PATH || URL`: o caminho do contexto a ser usado pela imagem. Pode ser um caminho de uma pasta do sistema operacional ou uma URL do Github
* `docker run [opções] IMAGEM [COMANDO]`: cria um container a partir de uma imagem e executa um comando opicional
  - Opções
    - `-d`: de *detach*, faz com o terminal do host não fique vinculado ao terminal do container e imprime o ID do container
    - `--rm`: automaticamente exclui o container quando ele for desligado
    - `--name`: o nome do container
    - `-v`: o diretório do host a ser compartilhado com o container
    - `--link`: crua um vínculo entre com um container ligado para poder acessar informações dele na rede interna do Docker. 
    Adiciona o nome do container alvo ao `/etc/hosts` do container desse comando
    - `-p`: encaminha uma porta do host para uma porta do container, permitindo acessar serviços de rede através do endereço de IP do host
    - `-t`: atribui um pseudo-TTY do terminal ao container, permitindo enviar comandos quando for executar algum shell (/bin/sh, por exemplo)
    - `-i`: mantem a saida do container atrelada ao terminal
  - Parâmetros
    - `IMAGEM`: a imagem base para a criação do container
    - `COMANDO`: o comando a ser executado no container (ex.: `mysql -uuser -psenha`)
* `docker exec [opções] CONTAINER COMANDO`: executa um comando num container já ligado
  - Opções
    - `-i`, `-t`: igual acima
  - Parâmetros
    - `IMAGEM`, `COMANDO`: igual acima
    
##Problemas que eu passei
Pequenos problemas que eu tive que enfrentar que não aconteceram no vídeo

### Erro na criação de volume para o container do banco
O parâmetro `-v` não estava criando automaticamente a pasta para o volume quando eu
executava o comando, porém no vídeo funcionava normalmente e na própria
documentação do Docker ([aqui](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only)) está escrito isso
#### Solução
A solução foi criar a pasta do volume manualmente. Possivelmente esse é um problema do sistema operacional (Windows)

### Erro de conexão da API com o banco MySQL
Esse erro provavelmente foi ocasionado por causa de alguma diferença de versão do banco utilizado no vídeo na data em que foi gravado.
A api do mysqljs não conseguia fazer a conexão ao serviço.
#### Solução
Alterar a versão do banco de dados no Dockerfile para uma versão mais confiável (a 5.7) e criar a imagem com esse banco.

### Erro de criação do volume do banco depois da criação do container da API
Logo após ter resolvido o problema da versão do banco de dados, quando eu fui recriar o container,
o Docker apontava um erro na hora de criar o volume. Esse erro aconteceu porque no vídeo ele criou a pasta do volume do banco
dentro da pasta do volume da API. Mas como ele cria o banco primeiro, não acontecia nada. Quando eu tive que criar o container do banco
depois do container da API, acontecia esse conflito.
#### Solução
~~Subir o banco antes da API~~ Alterar a pasta do volume do banco para a raiz do projeto, para evitar qualquer outro conflito

### Problema com charset no banco
No vídeo, o Ayrton insere no banco apenas caracteres ASCII básicos, mas no meu projeto eu coloquei uma palavra com ç (cê-cedilha).
Porém o banco que vem na imagem usa charset latin1 em praticamente todas as operações, o que fez com que a API trouxesse alguns caracteres
bugados por estar usando utf8.
#### Solução
Isso nem foi um problema do Docker em si, tá mais pra um problema da aplicação. As soluções possíveis eram fazer a API utilizar latin1
na hora de fazer a conexão com o banco, ou fazer o banco inserir os dados como utf8 passando o comando `--default-character-set=utf8mb4` na hora
de passar o script.sql. Eu usei a segunda opção.

PS: To criando esse readme sem poder usar o preview, então vou ter que commitar sem ver como vai ficar
