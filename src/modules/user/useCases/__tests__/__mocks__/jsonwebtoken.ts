const jsonwebtoken: any = jest.createMockFromModule("jsonwebtoken");

function sign(
  payload: string | Buffer | object,
  secretOrPrivateKey: string,
  options?: object
) {
  return "token";
}

jsonwebtoken.sign = sign;

module.exports = jsonwebtoken;
