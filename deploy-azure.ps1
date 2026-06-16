<#
.SYNOPSIS
  Build and deploy this Vite site to Azure Storage static website hosting.

.EXAMPLE
  ./deploy-azure.ps1 -StorageAccount jeetportfolio -ResourceGroup portfolio-rg

.NOTES
  Requires the Azure CLI (`az`) and an existing Storage account (StorageV2 / general-purpose v2).
  Run `az login` first.
#>
param(
  [Parameter(Mandatory = $true)] [string] $StorageAccount,
  [Parameter(Mandatory = $true)] [string] $ResourceGroup,
  [switch] $SkipBuild
)

$ErrorActionPreference = "Stop"

if (-not $SkipBuild) {
  Write-Host "==> Building production bundle..." -ForegroundColor Cyan
  npm run build
}

Write-Host "==> Enabling static website hosting (index + SPA fallback)..." -ForegroundColor Cyan
az storage blob service-properties update `
  --account-name $StorageAccount `
  --static-website `
  --index-document index.html `
  --404-document index.html `
  --auth-mode login | Out-Null

Write-Host "==> Uploading dist/ to the `$web container..." -ForegroundColor Cyan
az storage blob upload-batch `
  --account-name $StorageAccount `
  --auth-mode login `
  --destination '$web' `
  --source ./dist `
  --overwrite | Out-Null

$endpoint = az storage account show `
  --name $StorageAccount `
  --resource-group $ResourceGroup `
  --query "primaryEndpoints.web" `
  --output tsv

Write-Host "`n✅ Deployed. Your site is live at:" -ForegroundColor Green
Write-Host "   $endpoint" -ForegroundColor Green
