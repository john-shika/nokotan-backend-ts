#!pwsh

$currentWorkDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $currentWorkDir -ErrorAction Stop
Set-Location ..

$sourceRootDir = "src"
if (Test-Path $sourceRootDir) {
    $files = Get-ChildItem -Path $srcPath -Recurse -Filter "*.ts~"
    
    foreach ($file in $files) {
        if ($file.FullName -ne "") {
            Write-Output "Path: $($file.FullName)"
            Remove-Item -Path $file.FullName -Force
        }
    }

} else {
    Write-Host "The src directory does not exist."
}

Set-Location $currentWorkDir
Set-Location ..
