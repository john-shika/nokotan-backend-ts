#!pwsh

$currWorkDir = Get-Location
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir -ErrorAction Stop
Set-Location ..

$apiReferenceUrl = "https://cdn.jsdelivr.net/npm/@scalar/api-reference"
$apiReferenceFilePath = "public/js/scalar.api-reference.js"

$directory = [System.IO.Path]::GetDirectoryName($apiReferenceFilePath)
if (-not (Test-Path -Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force
}

Invoke-WebRequest -Uri $apiReferenceUrl -OutFile $apiReferenceFilePath

Set-Location $currWorkDir
