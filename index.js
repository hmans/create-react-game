#!/usr/bin/env node
import fs from "node:fs"
import fse from "fs-extra"

import path from "node:path"
import { fileURLToPath } from "node:url"
import minimist from "minimist"
import prompts from "prompts"
import { green, red } from "kolorist"

function copyFolderSync(from, to) {
	/* Abort if target directory already exists. */
	if (fs.existsSync(to)) {
		console.error(red("Target directory already exists, aborting"))
		return
	}

	/* Create target directory */
	fse.mkdirpSync(to)

	/* Recursively copy all template files */
	fs.readdirSync(from).forEach((element) => {
		console.log(`💾 ${element}`)

		if (fs.lstatSync(path.join(from, element)).isFile()) {
			fs.copyFileSync(path.join(from, element), path.join(to, element))
		} else {
			copyFolderSync(path.join(from, element), path.join(to, element))
		}
	})
}

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

	console.log(green(`Copying files, woohoo!`))
	copyFolderSync(templateDir, targetDir)
}

await install()
