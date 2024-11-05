#!pwsh

$currWorkDir = Get-Location
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $scriptDir -ErrorAction Stop
Set-Location ..

$items = @("prisma/migrations", "prisma/dev.db", "prisma/dev.db-journal")

foreach ($item in $items) {
    if (Test-Path $item) {
        Remove-Item -Recurse -Force -Verbose $item
    } else {
        Write-Warning "$item does not exist."
    }
}

npx prisma migrate dev --name init
node "scripts/database/feeders/users.cjs"
Write-Output "User inserted successfully"

Set-Location $currWorkDir
