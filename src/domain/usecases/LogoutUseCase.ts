/**
 * Caso de uso: Logout
 * 
 * Este caso de uso contém a lógica para fazer logout do usuário.
 */

import type { AuthRepository } from '../repositories/AuthRepository';
import type { AuthResult } from '../../shared/types/AuthTypes';

/**
 * Dependências do caso de uso
 */
export interface LogoutUseCaseDependencies {
  authRepository: AuthRepository;
}

/**
 * Função pura para fazer logout
 */
export const executeLogout = async (
  dependencies: LogoutUseCaseDependencies
): Promise<AuthResult<void>> => {
  try {
    const result = await dependencies.authRepository.logout();
    return result;
  } catch (error) {
    return {
      success: false,
      error: 'Erro ao fazer logout'
    };
  }
};
