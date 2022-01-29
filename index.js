#! /usr/bin/env node
import { exec } from 'child_process';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { exit } from 'process';

const argv = yargs(hideBin(process.argv)).argv
const port = argv._[0];
console.log(`killing process with port: '${port}' open`)

if (!port) {
    console.error('kill-port failed. port not passed as first argument');
    console.error("example: 'kill-port 9000'");
    exit(1);
}

exec(`sudo kill -9 $(sudo lsof -t -i:${port})`, (err, stdout, stderr) => {
    if (err || stderr) {
        console.error('something went wrong...');
        console.error(`err: ${err}`);
        console.error(`stderr: ${stderr}`);
        exit(1);
    }
    console.log(`process on port:${port} killed`);
})

console.log(argv);



