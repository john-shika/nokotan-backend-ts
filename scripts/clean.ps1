#!pwsh

$currWorkDir = Get-Location
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir -ErrorAction Stop
Set-Location ..

$sourceRootDir = "src"
if (Test-Path $sourceRootDir) {
    $files = Get-ChildItem -Path $sourceRootDir -Recurse -Filter "*.ts~"

    foreach ($file in $files) {
        if ($file.FullName -ne "") {
            Write-Output "Path: $($file.FullName)"
            Remove-Item -Path $file.FullName -Force
        }
    }

} else {
    Write-Host "The src directory does not exist."
}

Remove-Item -Recurse -Force .\bin\node_modules, .\bin\prisma, .\bin\public, .\bin\app.exe, .\bin\main.js, .\bin\main.js.map

Set-Location $currWorkDir
