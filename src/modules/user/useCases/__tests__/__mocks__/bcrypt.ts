const bcrypt: any = jest.createMockFromModule("bcrypt");

async function compare(password: string, userPassword: string) {
  return password === userPassword;
}

async function hash(password: string | Buffer, saltOrRounds: string | number) {
  return "hashedpassword";
}

bcrypt.compare = compare;
bcrypt.hash = hash;

module.exports = bcrypt;
