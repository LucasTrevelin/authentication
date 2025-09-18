/**
 * Exporta todos os casos de uso
 * 
 * Este arquivo centraliza a exportação dos casos de uso,
 * facilitando a importação e o uso em outras partes da aplicação.
 */

export { executeLogin, type LoginUseCaseDependencies } from './LoginUseCase';
export { executeRegister, type RegisterUseCaseDependencies } from './RegisterUseCase';
export { executeLogout, type LogoutUseCaseDependencies } from './LogoutUseCase';

/**
 * Tipo que agrupa todas as dependências dos casos de uso
 */
export interface UseCaseDependencies {
  authRepository: import('../repositories/AuthRepository').AuthRepository;
}
