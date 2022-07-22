#!/usr/bin/env node
import fs from "node:fs"
import fse from "fs-extra"

import path from "node:path"
import minimist from "minimist"
import prompts from "prompts"
import { green, red } from "kolorist"

import degit from "degit"

console.log("Hi from create-react-game")
var argv = minimist(process.argv.slice(2))

async function install() {
	const { targetDir } = await prompts({
		type: "text",
		name: "targetDir",
		message: "Waagh?",
		initial: argv._[0]
	})

	console.log(green(`Copying files, woohoo!`))

	const emitter = degit("hmans/create-react-game/template-react-game", {
		cache: false,
		force: false,
		verbose: false
	})

	emitter.on("info", (info) => {
		// console.log(info.message)
	})

	await emitter.clone(targetDir)

	console.log(green`Done!`)
}

await install()
