@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Portfolio Deployment Script
echo ========================================
echo.

echo [1/5] Checking Git repository...
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ERROR: This is not a Git repository!
    pause
    exit /b 1
)
echo ✓ Git repository detected
echo.

echo [2/5] Staging all changes...
git add -A
if errorlevel 1 (
    echo ERROR: Failed to stage changes!
    pause
    exit /b 1
)
echo ✓ All changes staged
echo.

echo [3/5] Enter commit message (or press Enter for default):
set /p COMMIT_MSG="Commit message: "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update portfolio files

git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo ℹ No new changes to commit.
    echo Skipping commit step.
) else (
    echo ✓ Commit created successfully
)
echo.

echo [4/5] Pulling latest changes from GitHub...
git pull origin %BRANCH% --rebase
if errorlevel 1 (
    echo ERROR: Pull failed due to conflicts.
    echo Please resolve conflicts, then re-run the script.
    pause
    exit /b 1
)
echo ✓ Repository up to date
echo.

echo [5/5] Pushing to GitHub...
git push origin %BRANCH%
if errorlevel 1 (
    echo ERROR: Push failed!
    pause
    exit /b 1
)
echo ✓ Successfully pushed to GitHub


echo ✓ Current branch: %BRANCH%
echo.

echo Pushing to GitHub...
git push origin %BRANCH%
if errorlevel 1 (
    echo ERROR: Push failed!
    echo.
    echo Possible fixes:
    echo - Run: git config --global --unset http.sslcainfo
    echo - Or re-login: git config --global --unset credential.helper
    echo - Or check GitHub token authentication
    pause
    exit /b 1
)

echo ✓ Successfully pushed to GitHub
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Repo: https://github.com/shyam-vyawahare/Shyam-Vyawahare-Portfolio
echo.

pause
