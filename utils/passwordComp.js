const bcrypt = require('bcryptjs')

const matchPWd =async  ( password,validpassword)=>{
      const macthed =await bcrypt.compareSync(password, validpassword)
      return macthed
}

module.exports = matchPWd;