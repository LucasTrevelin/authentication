/**
 * Entidade User - Representa um usuário no sistema
 * 
 * Em Clean Architecture, as entidades contêm as regras de negócio fundamentais
 * e são independentes de frameworks ou tecnologias externas.
 */
export interface User {
  readonly id: string;
  readonly email: string;
  readonly displayName: string;
  readonly photoURL?: string;
  readonly isEmailVerified: boolean;
  readonly createdAt: Date;
  readonly lastLoginAt?: Date;
}

/**
 * Função para criar um novo usuário
 * Usamos programação funcional - funções puras que não modificam estado
 */
export const createUser = (
  id: string,
  email: string,
  displayName: string,
  photoURL?: string,
  isEmailVerified: boolean = false
): User => ({
  id,
  email,
  displayName,
  photoURL,
  isEmailVerified,
  createdAt: new Date(),
});

/**
 * Função para atualizar dados do usuário
 * Retorna uma nova instância sem modificar a original (imutabilidade)
 */
export const updateUser = (
  user: User,
  updates: Partial<Pick<User, 'displayName' | 'photoURL' | 'isEmailVerified' | 'lastLoginAt'>>
): User => ({
  ...user,
  ...updates,
});

/**
 * Função para verificar se o usuário está ativo
 * Regra de negócio encapsulada na entidade
 */
export const isUserActive = (user: User): boolean => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  return user.lastLoginAt ? user.lastLoginAt > thirtyDaysAgo : false;
};

/**
 * Função para obter informações públicas do usuário
 * Segurança: não expõe dados sensíveis
 */
export const getPublicUserInfo = (user: User) => ({
  id: user.id,
  displayName: user.displayName,
  photoURL: user.photoURL,
  isEmailVerified: user.isEmailVerified,
});
