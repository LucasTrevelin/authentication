/**
 * Configuração do Firebase
 * 
 * Esta camada de dados implementa a integração com Firebase Authentication.
 * Ela é responsável por converter os dados do Firebase para nossas entidades.
 */

import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

/**
 * Configuração do Firebase
 * 
 * IMPORTANTE: Em produção, estas chaves devem estar em variáveis de ambiente
 * Para desenvolvimento, use valores válidos do Firebase Console
 */
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "fiap-farms-auth.firebaseapp.com",
  projectId: "fiap-farms-auth",
  storageBucket: "fiap-farms-auth.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

/**
 * Inicializa o Firebase
 */
const app = initializeApp(firebaseConfig);

/**
 * Inicializa o Auth do Firebase
 */
export const auth: Auth = getAuth(app);

/**
 * Exporta a instância do app para uso em outros serviços
 */
export { app };
