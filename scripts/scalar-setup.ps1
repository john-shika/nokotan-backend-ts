#!pwsh

$currentWorkDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $currentWorkDir -ErrorAction Stop
Set-Location ..

$url = "https://cdn.jsdelivr.net/npm/@scalar/api-reference"
$outputFilePath = "public/js/scalar.api-reference.js"

$directory = [System.IO.Path]::GetDirectoryName($outputFilePath)
if (-not (Test-Path -Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force
}

Invoke-WebRequest -Uri $url -OutFile $outputFilePath
