/**
 * Interface do repositório de autenticação
 * 
 * Em Clean Architecture, os repositórios são interfaces que definem
 * como o domínio acessa dados externos, sem depender de implementações específicas.
 * 
 * Isso permite trocar Firebase por outro provedor sem afetar o domínio.
 */

import type { User } from '../entities/User';
import type { LoginCredentials, RegisterCredentials, AuthResult, AuthStateChangeCallback } from '../../shared/types/AuthTypes';

export interface AuthRepository {

  login(credentials: LoginCredentials): Promise<AuthResult<User>>;

  register(credentials: RegisterCredentials): Promise<AuthResult<User>>;
 
  logout(): Promise<AuthResult<void>>;
  
  getCurrentUser(): Promise<User | null>;
  
  sendEmailVerification(): Promise<AuthResult<void>>;
  
  resetPassword(email: string): Promise<AuthResult<void>>;
  
  updateProfile(updates: Partial<Pick<User, 'displayName' | 'photoURL'>>): Promise<AuthResult<User>>;
  
  onAuthStateChange(callback: AuthStateChangeCallback): () => void;
}
