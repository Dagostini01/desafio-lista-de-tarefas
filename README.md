# 📌 Desafio 1: Lista de Tarefas com Login e Armazenamento Local

## 🎯 Objetivo
Criar um aplicativo de lista de tarefas com login via **Google Sign-In** e persistência de dados usando **AsyncStorage**.

## 🚀 Funcionalidades

### 🔐 Login
- Implementar login com Google usando `@react-native-google-signin/google-signin`.
- Exibir nome e foto do usuário após o login.
- Salvar o status de login (opcional).

### ✅ Gerenciamento de Tarefas
- Adicionar tarefas.
- Marcar tarefas como concluídas.
- Remover tarefas.
- Exibir data de criação da tarefa.

### 🔎 Filtro e Ordenação
- Filtrar tarefas por status (**todas, concluídas, pendentes**).
- Ordenar tarefas por data de criação (**mais recentes primeiro**).

### 💾 Armazenamento Local
- Usar **AsyncStorage** para salvar as tarefas.
- Carregar as tarefas ao iniciar o app.

### 🎨 Interface
- Design limpo e intuitivo.
- Usar componentes nativos do **React Native**.
- Boas práticas de **UX/UI**.

### 🛠 Código
- Código limpo, organizado e comentado.
- Utilizar **hooks do React** (`useState`, `useEffect`).
- Separar componentes em arquivos diferentes.
- Criar pelo menos **um teste unitário com Jest**.

---

## 📦 Como Instalar e Rodar o Projeto

### 1️⃣ **Clone o repositório:**
```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2️⃣ **Instale as dependências:**
```sh
npm install
```

### 3️⃣ **Configure o Google Sign-In:**
O app utiliza o **Google Sign-In** via **Google Cloud Platform (GCP)**. Para configurar:

1. **Android:**
   - No arquivo `android/app/google-services.json`, adicione o JSON de configuração do GCP.

2. **iOS:**
   - No arquivo `ios/GoogleService-Info.plist`, adicione o JSON de configuração do GCP.

### 4️⃣ **Rodar o App**
```sh
# Para rodar no Android
npm run android

# Para rodar no iOS (necessário MacOS e Xcode)
npm run ios

# Para rodar no navegador
npm run web
```

---

## 🧪 Como Rodar os Testes

Os testes são feitos com **Jest** e **Testing Library**.

### 1️⃣ **Configuração de Testes**
O Jest está configurado no arquivo `jest.setup.js`, garantindo que dependências como **Google Sign-In, AsyncStorage e Expo Fonts** sejam mockadas corretamente.

### 2️⃣ **Rodar os testes**
```sh
npx test
```

Caso precise limpar o cache antes:
```sh
npx test -- --clearCache
```

---

## 📜 Estrutura de Pastas
```
📂 seu-projeto
 ┣ 📂 src
 ┃ ┣ 📂 components   # Componentes reutilizáveis
 ┃ ┣ 📂 screens      # Telas do aplicativo
 ┃ ┣ 📂 services     # Serviços (ex: Google Sign-In, AsyncStorage)
 ┃ ┣ 📂 __tests__    # Testes automatizados com Jest
 ┃ ┗ 📜 App.tsx      # Arquivo principal
 ┣ 📜 package.json   # Dependências e scripts do projeto
 ┣ 📜 jest.setup.js  # Configuração de mocks para Jest
 ┗ 📜 README.md      # Documentação do projeto
```

---

## 🛠 Problemas Comuns e Soluções

### 🔴 **Erro com AsyncStorage no Jest:**
**Solução:** Mockar o AsyncStorage em `jest.setup.js`:
```js
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
```

### 🔴 **Erro com Google Sign-In no Jest:**
**Solução:** Mockar o Google Sign-In:
```js
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    signIn: jest.fn().mockResolvedValue({
      user: { email: "teste@email.com", name: "Usuário Teste" },
    }),
  },
}));
```

---

## 📌 Link vídeo do projeto rodando:
 

