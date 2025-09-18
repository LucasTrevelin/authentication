/**
 * Componente de Registro
 * 
 * Este componente implementa a interface de registro seguindo os princípios
 * da Clean Architecture. Ele usa o hook useAuth para interagir com o estado.
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import type { RegisterCredentials } from '../../shared/types/AuthTypes';

/**
 * Props do componente Register
 */
interface RegisterViewProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

/**
 * Componente de Registro
 */
export const RegisterView: React.FC<RegisterViewProps> = ({
  onSuccess,
  onSwitchToLogin
}) => {
  // Estado local do formulário
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    email: '',
    password: '',
    displayName: ''
  });

  // Hook de autenticação
  const { register, isLoading, error, clearError, isAuthenticated } = useAuth();

  // Limpa erro quando o componente monta
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Redireciona quando autenticado
  useEffect(() => {
    if (isAuthenticated && onSuccess) {
      onSuccess();
    }
  }, [isAuthenticated, onSuccess]);

  /**
   * Manipula mudanças nos inputs
   */
  const handleInputChange = (field: keyof RegisterCredentials) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({
      ...prev,
      [field]: event.target.value
    }));

    // Limpa erro quando usuário digita
    if (error) {
      clearError();
    }
  };

  /**
   * Manipula o envio do formulário
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validação básica
    if (!credentials.email || !credentials.password || !credentials.displayName) {
      return;
    }

    register(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            FIAP Farms - Cooperativa de Fazendas
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="displayName" className="sr-only">
                Nome completo
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nome completo"
                value={credentials.displayName}
                onChange={handleInputChange('displayName')}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={credentials.email}
                onChange={handleInputChange('email')}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={credentials.password}
                onChange={handleInputChange('password')}
              />
            </div>
          </div>

          {/* Dicas de senha forte */}
          <div className="text-xs text-gray-500">
            <p>A senha deve conter:</p>
            <ul className="list-disc list-inside ml-2">
              <li>Pelo menos 6 caracteres</li>
              <li>Uma letra maiúscula</li>
              <li>Uma letra minúscula</li>
              <li>Um número</li>
            </ul>
          </div>

          {/* Exibe erro se houver */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">
                {error}
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Já tem uma conta? Entre aqui
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
