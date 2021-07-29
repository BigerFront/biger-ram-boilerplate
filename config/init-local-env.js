#!/usr/bin/env node

const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')

const dayjs = require('dayjs')

const {
  ERROR_TEXT_COLORHEX,
  SUCCESS_TEXT_COLORHEX,
} = require('../ci/colors-cnsts')

const FILE_OUTPUT_OPTS = {
  encoding: 'utf8',
}

const ENV_NAMES = ['.env.development', '.env.production']

main()
  .then((res) => {
    if (typeof res === 'object' && res.length) {
      let msg = `\x1B[33m✨✨✨ congratulate! ✨✨✨\x1B[0m\n`
      res.map(
        (s) =>
          '\n' +
          chalk.hex(SUCCESS_TEXT_COLORHEX)('✔ ⇨ ⇨ ') +
          '\t' +
          chalk.hex(SUCCESS_TEXT_COLORHEX)(s)
      )

      for (let i in res) {
        msg += res[i]
      }

      msg += '\n🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉\n'

      console.log('\x1B[32m%s\x1B[0m', msg)
    } else {
      console.log('\x1B[36m%s\x1B[0m', 'no env file generate.')
    }
  })
  .catch((err) => {
    console.log(
      '\x1B[31m%s\x1B[0m',

      chalk.hex(ERROR_TEXT_COLORHEX).bold(' ERROR:❌ \n')
    ) + chalk.hex(ERROR_TEXT_COLORHEX)(err.message)
  })

async function main() {
  return new Promise((resolve, reject) => {
    try {
      const success = writeEnvFiles(ENV_NAMES)

      return resolve(success)
    } catch (err) {
      return reject(err)
    }
  })
}

function writeEnvFiles(filenams = []) {
  let msg = []
  const C_CURR_TS = dayjs().format('YY-MM-DD HH:mm dddd')
  const comments =
    `# Quick Project Local env variables\n` + `# create at : ${C_CURR_TS} \n`
  for (let j in filenams) {
    const envfile = path.resolve(__dirname, filenams[j])

    if (!fs.existsSync(envfile)) {
      const tpl = comments + `\nAPP_TITLE=Quick RAM Boilerplate\n`
      fs.outputFileSync(envfile, tpl, FILE_OUTPUT_OPTS)

      msg.push(envfile)
    } else {
      // skip
    }
  }

  return msg
}
