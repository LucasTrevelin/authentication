/**
 * Caso de uso: Login
 * 
 * Os casos de uso contêm a lógica de negócio específica da aplicação.
 * Eles orquestram entidades e repositórios para realizar operações complexas.
 * 
 * Em programação funcional, os casos de uso são funções puras que
 * recebem dependências como parâmetros.
 */

import type { AuthRepository } from '../repositories/AuthRepository';
import type { LoginCredentials, AuthResult } from '../../shared/types/AuthTypes';
import type { User } from '../entities/User';

/**
 * Dependências do caso de uso
 */
export interface LoginUseCaseDependencies {
  authRepository: AuthRepository;
}

/**
 * Função pura para fazer login
 * 
 * @param dependencies - Dependências injetadas (injeção de dependência funcional)
 * @param credentials - Credenciais de login
 * @returns Promise com o resultado da operação
 */
export const executeLogin = async (
  dependencies: LoginUseCaseDependencies,
  credentials: LoginCredentials
): Promise<AuthResult<User>> => {
  try {
    // Validação de entrada
    const validationResult = validateLoginCredentials(credentials);
    if (!validationResult.isValid) {
      return {
        success: false,
        error: validationResult.error || 'Credenciais inválidas'
      };
    }

    // Executa o login através do repositório
    const result = await dependencies.authRepository.login(credentials);
    
    return result;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro interno do servidor'
    };
  }
};

/**
 * Função para validar credenciais de login
 * Regras de negócio encapsuladas em funções puras
 */
const validateLoginCredentials = (credentials: LoginCredentials): { isValid: boolean; error?: string } => {
  if (!credentials.email || !credentials.password) {
    return {
      isValid: false,
      error: 'Email e senha são obrigatórios'
    };
  }

  if (!isValidEmail(credentials.email)) {
    return {
      isValid: false,
      error: 'Email inválido'
    };
  }

  if (credentials.password.length < 6) {
    return {
      isValid: false,
      error: 'Senha deve ter pelo menos 6 caracteres'
    };
  }

  return { isValid: true };
};

/**
 * Função para validar formato de email
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
