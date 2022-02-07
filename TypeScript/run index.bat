
:: for x86
::set gitBash="%SYSTEMDRIVE%\Program Files (x86)\Git\git-bash.exe"

:: for x64
set gitBash="%PROGRAMFILES%\Git\git-bash.exe"

:: Go To dist directory
cd dist

:: Start Index
start cmd /k "node index"
::start "" %gitBash% -c "node dist/index"


:: will ask "Press any key to continue . . ."
::pause

:: will leave the window open
::cmd /k


