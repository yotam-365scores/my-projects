:: https://stackoverflow.com/questions/9392874/bat-file-open-new-cmd-window-and-execute-a-command-in-there
:: https://stackoverflow.com/questions/17302977/how-to-launch-git-bash-from-windows-command-line
@REM ~\Server\Web\CMS\CMSCore
:: for x86
::set gitBash="%SYSTEMDRIVE%\Program Files (x86)\Git\git-bash.exe"

:: for x64
set gitBash="%PROGRAMFILES%\Git\git-bash.exe"

:: Start dotnet
start cmd /k "dotnet watch run"
::start "" %gitBash% -c "dotnet watch run"

:: will ask "Press any key to continue . . ."
::pause

:: will leave the window open
::cmd /k
