import jwt from 'jsonwebtoken'

const createAccessToken = () => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
  const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION

  const accessToken = jwt.sign(
    {}, 
    accessTokenSecret, 
    {expiresIn: accessTokenExpiration}
  )

  return { accessToken, accessTokenExpiration }
}

const createRefreshToken = () => {
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
  const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION

  const refreshToken = jwt.sign(
    {},
    refreshTokenSecret,
    {expiresIn: refreshTokenExpiration}
  )

  return { refreshToken, refreshTokenExpiration }
}

const token = { createAccessToken, createRefreshToken }
export default token