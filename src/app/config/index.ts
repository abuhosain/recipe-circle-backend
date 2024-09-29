import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRETE,
  jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRETE,
  jwt_refrsh_expire_in: process.env.JWT_REFRESh_EXPIRE_IN,
}
