#!/usr/bin/env node

import degit from "degit"
import { execa, execaCommandSync } from "execa"
import { cyan, green, red, yellow } from "kolorist"
import minimist from "minimist"
import prompts from "prompts"
import detectPackageManager from "which-pm-runs"

async function main() {
	/* Say hi */
	console.log("Welcome to Create-React-Game!")
	var argv = minimist(process.argv.slice(2))

	/* Prepare some things */
	const packageManager = detectPackageManager()?.name || "npm"
	console.log(`Detected package manager: ${packageManager}`)

	try {
		/* Determine target directory */
		const { cwd } = await prompts({
			type: "text",
			name: "cwd",
			message: "Please choose a target directory:",
			initial: argv._[0]
		})

		/* Clone project */
		console.log(yellow(`Cloning template into ${cyan(cwd)}...`))
		const emitter = degit("hmans/create-react-game/template-react-game", {
			cache: false,
			force: false,
			verbose: false
		})

		// emitter.on("info", (info) => {
		// 	console.log(info.message)
		// })

		await emitter.clone(cwd)

		/* Initialize a git repository */
		console.log(yellow("Initializing git repository..."))
		execaCommandSync(`git init`, { cwd })
		execaCommandSync(`git add .`, { cwd })
		execaCommandSync(`git commit -am "Let's\\ go\\ 🚀"`, { cwd })

		/* Install dependencies */
		console.log(yellow("Installing dependencies..."))
		execaCommandSync(`${packageManager} install`, { cwd })

		/* Done! */
		console.log(green("Done!"))
	} catch (error) {
		console.error(red(`Aborting with error: ${error.message}`))
	}
}

await main()
