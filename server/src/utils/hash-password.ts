import bcrypt from 'bcrypt';

const saltRounds = 12;

export const hashPassword = async (password: string) => {
  const hashedPassword = bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string) =>
  bcrypt.compare(password, hashedPassword);
