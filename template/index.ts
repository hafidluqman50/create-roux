import 'dotenv/config'
import moduleAlias from 'module-alias'

moduleAlias.addAliases({
  '@Controllers': `${__dirname}/app/Http/Controllers`,
  '@Repositories': `${__dirname}/app/Http/Repositories`,
  '@Services': `${__dirname}/app/Http/Services`,
  '@Middlewares': `${__dirname}/app/Http/Middlewares`,
  '@Requests': `${__dirname}/app/Http/Requests`,
  '@DTOs': `${__dirname}/app/DTOs`,
  '@Interfaces': `${__dirname}/app/Interfaces`,
  '@Models': `${__dirname}/app/Models`,
  '@Exceptions': `${__dirname}/app/Exceptions`,
  '@routes': `${__dirname}/routes`,
  '@config': `${__dirname}/config`
})

import '@routes/app'

console.log('Roux API server started')
