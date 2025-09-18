/**
 * Componente de Dashboard
 * 
 * Este componente representa a área autenticada do usuário.
 * Ele exibe informações do usuário e permite logout.
 */

import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Componente de Dashboard
 */
export const DashboardView: React.FC = () => {
  const { user, logout, isLoading } = useAuth();

  /**
   * Manipula o logout
   */
  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                FIAP Farms
              </h1>
              <p className="text-gray-600">Cooperativa de Fazendas</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bem-vindo, {user?.displayName}!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Informações da Conta
                  </h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Email:</span> {user?.email}</p>
                    <p><span className="font-medium">Status:</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${user?.isEmailVerified
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {user?.isEmailVerified ? 'Verificado' : 'Não verificado'}
                      </span>
                    </p>
                    <p><span className="font-medium">Membro desde:</span> {
                      user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'
                    }</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Próximos Passos
                  </h3>
                  <div className="space-y-2">
                    {!user?.isEmailVerified && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                        <p className="text-sm text-yellow-800">
                          Verifique seu email para ativar todas as funcionalidades.
                        </p>
                      </div>
                    )}
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                      <p className="text-sm text-blue-800">
                        Explore os dashboards de vendas e produção para ter uma visão estratégica.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Dashboard de Vendas
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Visualize seus produtos por maior lucro e acompanhe o desempenho.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                  Acessar Dashboard
                </button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Dashboard de Produção
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Acompanhe o que está aguardando, em produção e já colhido.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                  Acessar Dashboard
                </button>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Controle de Estoque
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Gerencie seu estoque e vendas com dados em tempo real.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                  Acessar Controle
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
