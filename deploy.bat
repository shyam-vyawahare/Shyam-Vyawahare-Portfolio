@echo off
echo ========================================
echo   Portfolio Deployment Script
echo ========================================
echo.

echo [1/4] Checking Git status...
git status
if errorlevel 1 (
    echo ERROR: Git not found or not initialized!
    pause
    exit /b 1
)
echo.

echo [2/4] Staging all changes...
git add -A
if errorlevel 1 (
    echo ERROR: Failed to stage changes!
    pause
    exit /b 1
)
echo ✓ All changes staged
echo.

echo [3/4] Enter commit message (or press Enter for default):
set /p COMMIT_MSG="Commit message: "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update portfolio files

git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo WARNING: No changes to commit or commit failed!
    echo.
    echo Do you want to continue with push anyway? (Y/N)
    set /p CONTINUE=
    if /i not "%CONTINUE%"=="Y" (
        echo Deployment cancelled.
        pause
        exit /b 1
    )
)
echo ✓ Changes committed
echo.

echo [4/4] Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ERROR: Failed to push to GitHub!
    echo.
    echo Possible issues:
    echo - Not authenticated with GitHub
    echo - Network connection problem
    echo - Remote repository access denied
    echo.
    pause
    exit /b 1
)
echo ✓ Successfully pushed to GitHub
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your changes have been pushed to:
echo https://github.com/shyam-vyawahare/Shyam-Vyawahare-Portfolio
echo.
echo If Vercel is connected, it will automatically deploy.
echo.

pause

