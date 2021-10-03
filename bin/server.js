const app = require('../app')
const db = require('../models/db')

const PORT = process.env.PORT || 5000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch(e => {
  console.log(`Error: ${e.message}`)
})
