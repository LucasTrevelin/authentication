/**
 * Implementação concreta do repositório de autenticação usando Firebase
 * 
 * Esta classe implementa a interface AuthRepository usando Firebase Authentication.
 * Ela converte os dados do Firebase para nossas entidades do domínio.
 */

import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { User } from '../../domain/entities/User';
import type { LoginCredentials, RegisterCredentials, AuthResult, AuthStateChangeCallback } from '../../shared/types/AuthTypes';

/**
 * Implementação concreta do repositório de autenticação
 */
export class FirebaseAuthRepository implements AuthRepository {
  
  /**
   * Faz login do usuário
   */
  async login(credentials: LoginCredentials): Promise<AuthResult<User>> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      
      const user = this.mapFirebaseUserToUser(userCredential.user);
      return { success: true, data: user };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code)
      };
    }
  }

  /**
   * Registra um novo usuário
   */
  async register(credentials: RegisterCredentials): Promise<AuthResult<User>> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      // Atualiza o displayName do usuário
      await updateProfile(userCredential.user, {
        displayName: credentials.displayName
      });

      const user = this.mapFirebaseUserToUser(userCredential.user);
      return { success: true, data: user };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code)
      };
    }
  }

  /**
   * Faz logout do usuário
   */
  async logout(): Promise<AuthResult<void>> {
    try {
      await signOut(auth);
      return { success: true, data: undefined };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code)
      };
    }
  }

  /**
   * Obtém o usuário atual
   */
  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = auth.currentUser;
    return firebaseUser ? this.mapFirebaseUserToUser(firebaseUser) : null;
  }

  /**
   * Envia email de verificação
   */
  async sendEmailVerification(): Promise<AuthResult<void>> {
    try {
      const user = auth.currentUser;
      if (!user) {
        return { success: false, error: 'Usuário não autenticado' };
      }

      await sendEmailVerification(user);
      return { success: true, data: undefined };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code)
      };
    }
  }

  /**
   * Redefine a senha
   */
  async resetPassword(email: string): Promise<AuthResult<void>> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, data: undefined };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code)
      };
    }
  }

  /**
   * Atualiza o perfil do usuário
   */
  async updateProfile(updates: Partial<Pick<User, 'displayName' | 'photoURL'>>): Promise<AuthResult<User>> {
    try {
      const user = auth.currentUser;
      if (!user) {
        return { success: false, error: 'Usuário não autenticado' };
      }

      await updateProfile(user, {
        displayName: updates.displayName,
        photoURL: updates.photoURL
      });

      const updatedUser = this.mapFirebaseUserToUser(user);
      return { success: true, data: updatedUser };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code)
      };
    }
  }

  /**
   * Observa mudanças no estado de autenticação
   */
  onAuthStateChange(callback: AuthStateChangeCallback): () => void {
    return onAuthStateChanged(auth, (firebaseUser) => {
      const user = firebaseUser ? this.mapFirebaseUserToUser(firebaseUser) : null;
      callback(user);
    });
  }

  /**
   * Converte usuário do Firebase para nossa entidade User
   */
  private mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || undefined,
      isEmailVerified: firebaseUser.emailVerified,
      createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
      lastLoginAt: firebaseUser.metadata.lastSignInTime 
        ? new Date(firebaseUser.metadata.lastSignInTime) 
        : undefined
    };
  }

  /**
   * Mapeia erros do Firebase para mensagens amigáveis
   */
  private mapFirebaseError(errorCode: string): string {
    const errorMap: Record<string, string> = {
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/email-already-in-use': 'Este email já está em uso',
      'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
      'auth/invalid-email': 'Email inválido',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
      'auth/user-disabled': 'Esta conta foi desabilitada',
      'auth/requires-recent-login': 'Esta operação requer login recente'
    };

    return errorMap[errorCode] || 'Erro de autenticação';
  }
}
