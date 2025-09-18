# Como Usar o Sistema de Autenticação

Este guia mostra como usar o sistema de autenticação implementado com Clean Architecture.

## 🚀 Iniciando o Projeto

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# Build para produção
pnpm run build
```

## 🔧 Configuração do Firebase

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Digite o nome: `fiap-farms-auth`
4. Habilite/desabilite Google Analytics conforme necessário
5. Clique em "Criar projeto"

### 2. Configurar Autenticação

1. No console do Firebase, vá em **Authentication**
2. Clique em **Get started**
3. Vá na aba **Sign-in method**
4. Habilite **Email/Password**
5. Clique em **Save**

### 3. Obter Configurações

1. Vá em **Configurações do projeto** (ícone de engrenagem)
2. Role para baixo até **Seus aplicativos**
3. Clique em **Adicionar aplicativo** e escolha **Web**
4. Digite um nome para o app (ex: "FIAP Farms Auth")
5. Copie as configurações que aparecem

### 4. Atualizar Configuração

1. Copie o arquivo `firebase.example.ts` para `src/data/services/firebaseConfig.ts`
2. Substitua os valores pelas configurações do seu projeto:

```typescript
const firebaseConfig = {
  apiKey: "sua-api-key-aqui",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};
```

## 🎯 Como Usar o Sistema

### Estrutura da Aplicação

```
src/
├── domain/                 # Regras de negócio
│   ├── entities/          # User, AuthState
│   ├── repositories/      # Interfaces
│   └── usecases/         # Login, Register, Logout
├── data/                  # Implementações
│   ├── repositories/     # FirebaseAuthRepository
│   └── services/         # firebaseConfig
├── presentation/          # Interface do usuário
│   ├── views/           # Login, Register, Dashboard
│   ├── components/      # ProtectedRoute
│   ├── hooks/          # useAuth
│   └── store/          # Redux store
└── shared/              # Tipos compartilhados
```

### Usando o Hook useAuth

```typescript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    register, 
    logout 
  } = useAuth();

  const handleLogin = () => {
    login({ email: 'user@example.com', password: 'password123' });
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Bem-vindo, {user?.displayName}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Protegendo Rotas

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardView />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

## 🔄 Fluxo de Autenticação

### 1. Login
```
Usuário preenche formulário → Validação → Firebase Auth → Redux Store → Redirecionamento
```

### 2. Registro
```
Usuário preenche formulário → Validação → Firebase Auth → Redux Store → Redirecionamento
```

### 3. Logout
```
Usuário clica logout → Firebase Auth → Redux Store → Redirecionamento para login
```

## 🧪 Testando o Sistema

### 1. Teste de Registro

1. Acesse `/register`
2. Preencha o formulário com:
   - Nome: "João Silva"
   - Email: "joao@example.com"
   - Senha: "MinhaSenh@123"
3. Clique em "Criar conta"
4. Verifique se foi redirecionado para o dashboard

### 2. Teste de Login

1. Acesse `/login`
2. Use as credenciais criadas no registro
3. Clique em "Entrar"
4. Verifique se foi redirecionado para o dashboard

### 3. Teste de Logout

1. No dashboard, clique em "Sair"
2. Verifique se foi redirecionado para o login

## 🎨 Personalização

### Alterando Estilos

O projeto usa Tailwind CSS. Para personalizar:

1. Edite `tailwind.config.js` para adicionar cores/estilos customizados
2. Modifique os componentes em `src/presentation/views/`
3. Use classes do Tailwind para estilização

### Adicionando Novos Campos

Para adicionar novos campos ao registro:

1. Atualize `RegisterCredentials` em `src/shared/types/AuthTypes.ts`
2. Modifique `RegisterView.tsx` para incluir o novo campo
3. Atualize a validação em `RegisterUseCase.ts`

### Integrando com Outros Microfrontends

```typescript
// Exemplo de comunicação entre microfrontends
const authData = {
  user: user,
  token: await user.getIdToken(),
  isAuthenticated: isAuthenticated
};

// Enviar para outros microfrontends
window.postMessage(authData, '*');
```

## 🚨 Troubleshooting

### Erro: "Firebase not configured"

- Verifique se o arquivo `firebaseConfig.ts` está configurado corretamente
- Confirme se as chaves do Firebase estão corretas

### Erro: "User not authenticated"

- Verifique se o usuário está logado no Firebase
- Confirme se o Redux store está sincronizado

### Erro: "Network request failed"

- Verifique sua conexão com a internet
- Confirme se o projeto Firebase está ativo

## 📚 Próximos Passos

1. **Testes**: Adicionar testes unitários e de integração
2. **CI/CD**: Configurar pipeline de deploy
3. **Monitoramento**: Adicionar logs e métricas
4. **Segurança**: Implementar rate limiting e validações adicionais
5. **Performance**: Otimizar bundle size e carregamento

## 🤝 Contribuindo

1. Siga os princípios da Clean Architecture
2. Use programação funcional
3. Mantenha a tipagem TypeScript
4. Teste suas alterações
5. Documente o código
