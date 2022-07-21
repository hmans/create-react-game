#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import minimist from "minimist"

console.log("Hi from create-react-game")

const templateDir = "./template-react-game"

const files = fs.readdirSync(templateDir)
for (const file of files.filter((f) => f !== "package.json")) {
	// write(file)
	console.log(file)
}
