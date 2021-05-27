const register = (req, res) => {
  const { email, username, password } = req.body

  res.json({ email, username, password })
}

const authController = { register }

export default authController