#!/usr/bin/env node
import fs from "node:fs"
import fse from "fs-extra"

import path from "node:path"
import { fileURLToPath } from "node:url"
import minimist from "minimist"
import prompts from "prompts"
import { red } from "kolorist"

console.log("Hi from create-react-game")
var argv = minimist(process.argv.slice(2))

async function install() {
	const templateDir = "./template-react-game"

	const { targetDir } = await prompts({
		type: "text",
		name: "targetDir",
		message: "Waagh?",
		initial: argv._[0]
	})

	console.log(red(`Copying files, woohoo!`))
	fse.copySync(templateDir, targetDir, {})
}

await install()
