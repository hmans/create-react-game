#!/usr/bin/env node

import degit from "degit"
import { green, yellow } from "kolorist"
import minimist from "minimist"
import prompts from "prompts"

console.log("Welcome to Create-React-Game!")
var argv = minimist(process.argv.slice(2))

async function install() {
	const { targetDir } = await prompts({
		type: "text",
		name: "targetDir",
		message: "Please choose a target directory:",
		initial: argv._[0]
	})

	console.log(yellow`Cloning template into target directory...`)

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
