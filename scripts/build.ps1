#!pwsh

$currWorkDir = Get-Location
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir -ErrorAction Stop
Set-Location ..

$classTransformerStoragePath = "node_modules/class-transformer/storage.js"
$classTransformerStorageContent = "module.exports = require('./cjs/storage');"

if (!(Test-Path $classTransformerStoragePath) -or (Test-Path $classTransformerStoragePath -PathType Container)) {
    $directory = Split-Path $classTransformerStoragePath
    if (!(Test-Path $directory)) {
        New-Item -ItemType Directory -Path $directory -Force
    }
    Set-Content -Path $classTransformerStoragePath -Value $classTransformerStorageContent
}

bun run nest build
esbuild --bundle --minify --sourcemap=external --platform=node --target=es2020 --outdir=bin .\dist\main.js

Set-Location $currWorkDir
