#!pwsh

$currWorkDir = Get-Location
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir -ErrorAction Stop
Set-Location ..

pwsh .\scripts\build.ps1
bun build --compile --bytecode --minify --outfile=.\bin\app.exe .\bin\main.js

$sourceClientPath = ".\node_modules\.prisma\client\query_engine-windows.dll.node"
$destinationClientPath = ".\bin\node_modules\.prisma\client\"
$sourcePrismaPath = ".\prisma\"
$destinationPrismaPath = ".\bin\prisma\"
$sourceAssetsPath = ".\public\"
$destinationAssetsPath = ".\bin\public\"

if (-Not (Test-Path $sourceClientPath -PathType Leaf)) {
    Write-Host "Source client file not found: $sourceClientPath" -ForegroundColor Red
    exit 1
}

if (-Not (Test-Path $sourcePrismaPath -PathType Container)) {
    Write-Host "Source Prisma directory not found: $sourcePrismaPath" -ForegroundColor Red
    exit 1
}

if (-Not (Test-Path $destinationClientPath -PathType Container)) {
    New-Item -ItemType Directory -Path $destinationClientPath -Force | Out-Null
}

Copy-Item -Path $sourceClientPath -Destination $destinationClientPath -Recurse -Force
Copy-Item -Path $sourcePrismaPath -Destination $destinationPrismaPath -Recurse -Force
Copy-Item -Path $sourceAssetsPath -Destination $destinationAssetsPath -Recurse -Force

Write-Host "Files and directories have been copied successfully." -ForegroundColor Green

Set-Location $currWorkDir
