#!/usr/bin/env node

import degit from "degit"
import { cyan, green, red, yellow } from "kolorist"
import minimist from "minimist"
import prompts from "prompts"

async function main() {
	console.log("Welcome to Create-React-Game!")
	var argv = minimist(process.argv.slice(2))

	try {
		const { targetDir } = await prompts({
			type: "text",
			name: "targetDir",
			message: "Please choose a target directory:",
			initial: argv._[0]
		})

		console.log(yellow(`Cloning template into ${cyan(targetDir)}...`))

		const emitter = degit("hmans/create-react-game/template-react-game", {
			cache: false,
			force: false,
			verbose: false
		})

		// emitter.on("info", (info) => {
		// 	console.log(info.message)
		// })

		await emitter.clone(targetDir)

		console.log(green("Done!"))
	} catch (error) {
		console.error(red(`Aborting with error: ${error.message}`))
	}
}

await main()
