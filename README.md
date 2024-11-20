
# Front-end do TCC





## Stack utilizada

**Front-end:** Angular


## Como rodar o projeto

Pré-requisitos:
Node 16.x

Para verificar a versão digite no prompt de comando:
```bash
node -v
```
Caso não tenha o node instalado:

[Node v16 LTS](https://nodejs.org/dist/v16.16.0/node-v16.16.0-x64.msi)

Após instalar o Node, digite no prompt de comando
```bash
npm install -g @angular/cli@16.2.14
```


1. Clone o repositório
```bash
git clone https://github.com/AplicacaoTCC/AplicacaoPrincipal.git
```

2. Entre no diretório do projeto
```bash
cd AplicacaoPrincipal
```
3. Instale as dependências
```bash
npm install
```

4. Abra o projeto no VSCode e mude o arquivo environments.ts para apontar para o back-end que vai estar rodando na porta 5000. Caminho do arquivo é src/environments/environments.ts
```bash
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

5. Após configurar o ambiente, você pode executar o projeto localmente digitando este comando no console:
```bash
npm start
```



**Lembre-se de estar rodando o back-end para que a aplicação funcione de forma correta**
