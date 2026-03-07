# Helper script: initialize (if needed), commit and push homework2 changes to remote
# USAGE: open PowerShell, cd to this folder, then run:
#   .\run_local_and_push.ps1

param(
    [string]$RemoteUrl = 'https://github.com/tonyyoung-create/114-2-HW1-GridWorld.git',
    [string]$Branch = 'main'
)

Write-Host "Running in: $(Get-Location)"

# Check if current folder (or parent) is part of a git repo
function Find-GitRoot {
    $p = (Get-Location).Path
    while ($p -ne [System.IO.Path]::GetPathRoot($p)) {
        if (Test-Path (Join-Path $p '.git')) { return $p }
        $p = Split-Path $p -Parent
    }
    return $null
}

$gitRoot = Find-GitRoot
if (-not $gitRoot) {
    Write-Host "No .git found in current folder or parents. Initializing a new git repository here." -ForegroundColor Yellow
    git init
    git remote add origin $RemoteUrl
} else {
    Write-Host "Found existing git repository at: $gitRoot" -ForegroundColor Green
    Push-Location $gitRoot
    try {
        $existing = git remote get-url origin 2>$null
        if (-not $existing) {
            Write-Host "No origin remote configured, adding: $RemoteUrl"
            git remote add origin $RemoteUrl
        } else {
            Write-Host "Existing origin: $existing"
        }
    } catch {
        Write-Host "Cannot read origin remote: $_" -ForegroundColor Yellow
    }
}

# Stage and commit changes under homework2
Write-Host "Staging files..."
git add -A homework2/README.md homework2/與AIagent的對話紀錄.txt

try {
    git commit -m "chore(homework2): update README and AI conversation log"
} catch {
    Write-Host "Commit may have failed (no changes to commit or other issue): $_" -ForegroundColor Yellow
}

Write-Host "Attempting to push to $RemoteUrl (branch: $Branch)"
Write-Host "Note: this step will require network access and authentication (GitHub credentials or PAT)."
Write-Host "If push fails, copy the error message and share it here for further help."

try {
    git push origin $Branch --set-upstream
} catch {
    Write-Host "Push failed: $_" -ForegroundColor Red
    Write-Host "Common fixes: authenticate with GitHub (git config credential.helper), use a Personal Access Token (PAT), or set up SSH keys."
}

Write-Host "Done. If push succeeded you'll see the updated repo on GitHub. If not, please copy the terminal output and send it to me for help."