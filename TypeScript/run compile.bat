
:: for x86
::set gitBash="%SYSTEMDRIVE%\Program Files (x86)\Git\git-bash.exe"

:: for x64
set gitBash="%PROGRAMFILES%\Git\git-bash.exe"

:: Start TypeScript Compile
start cmd /k "npx tsc --watch"
::start "" %gitBash% -c "npx tsc --watch"


:: will ask "Press any key to continue . . ."
::pause

:: will leave the window open
::cmd /k


