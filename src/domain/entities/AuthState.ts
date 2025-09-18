/**
 * Entidade AuthState - Representa o estado de autenticação
 * 
 * Esta entidade encapsula todas as informações sobre o estado atual
 * da autenticação no sistema.
 */
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthState {
  readonly status: AuthStatus;
  readonly user: User | null;
  readonly error: string | null;
  readonly isLoading: boolean;
}

/**
 * Entidade User importada
 */
import type { User } from './User';

/**
 * Estado inicial de autenticação
 */
export const initialAuthState: AuthState = {
  status: 'idle',
  user: null,
  error: null,
  isLoading: false,
};

/**
 * Função para criar estado de loading
 */
export const createLoadingState = (): AuthState => ({
  ...initialAuthState,
  status: 'loading',
  isLoading: true,
});

/**
 * Função para criar estado autenticado
 */
export const createAuthenticatedState = (user: User): AuthState => ({
  status: 'authenticated',
  user,
  error: null,
  isLoading: false,
});

/**
 * Função para criar estado não autenticado
 */
export const createUnauthenticatedState = (): AuthState => ({
  status: 'unauthenticated',
  user: null,
  error: null,
  isLoading: false,
});

/**
 * Função para criar estado de erro
 */
export const createErrorState = (error: string): AuthState => ({
  status: 'error',
  user: null,
  error,
  isLoading: false,
});

/**
 * Função para verificar se está autenticado
 */
export const isAuthenticated = (state: AuthState): boolean => 
  state.status === 'authenticated' && state.user !== null;

/**
 * Função para verificar se está carregando
 */
export const isLoading = (state: AuthState): boolean => 
  state.isLoading || state.status === 'loading';

/**
 * Função para obter mensagem de erro amigável
 */
export const getErrorMessage = (state: AuthState): string | null => {
  if (!state.error) return null;
  
  // Mapeamento de erros do Firebase para mensagens amigáveis
  const errorMessages: Record<string, string> = {
    'auth/user-not-found': 'Usuário não encontrado',
    'auth/wrong-password': 'Senha incorreta',
    'auth/email-already-in-use': 'Este email já está em uso',
    'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
    'auth/invalid-email': 'Email inválido',
    'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
  };
  
  return errorMessages[state.error] || 'Ocorreu um erro inesperado';
};
