/**
 * Componente principal da aplicação
 * 
 * Este componente configura o roteamento e integra todas as camadas
 * da Clean Architecture com o Redux e React Router.
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAuth } from './hooks/useAuth';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { DashboardView } from './views/DashboardView';
import { ProtectedRoute } from './components/ProtectedRoute';

/**
 * Componente interno que usa hooks (deve estar dentro do Provider)
 */
const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializa o estado de autenticação quando o app carrega
  useEffect(() => {
    // Aqui você pode adicionar lógica para verificar se há um usuário logado
    // Por exemplo, verificar localStorage ou fazer uma chamada para a API
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Inicializando aplicação...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Rota de login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginView
                onSuccess={() => window.location.href = '/dashboard'}
                onSwitchToRegister={() => window.location.href = '/register'}
              />
            )
          }
        />

        {/* Rota de registro */}
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <RegisterView
                onSuccess={() => window.location.href = '/dashboard'}
                onSwitchToLogin={() => window.location.href = '/login'}
              />
            )
          }
        />

        {/* Rota protegida do dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardView />
            </ProtectedRoute>
          }
        />

        {/* Rota raiz - redireciona baseado no estado de autenticação */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Rota 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                <p className="text-gray-600 mb-4">Página não encontrada</p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                >
                  Voltar ao início
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

/**
 * Componente principal da aplicação
 */
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  );
};

export default App;
