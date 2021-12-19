:: https://stackoverflow.com/questions/9392874/bat-file-open-new-cmd-window-and-execute-a-command-in-there
:: https://stackoverflow.com/questions/17302977/how-to-launch-git-bash-from-windows-command-line
@REM ~\Server\Web\CMS\CMSCore
:: for x86
::set gitBash="%SYSTEMDRIVE%\Program Files (x86)\Git\git-bash.exe"

:: for x64
set gitBash="%PROGRAMFILES%\Git\git-bash.exe"

:: Start Gulp
::start cmd /k "gulp"
start "" %gitBash% -c "gulp"

:: Go To ClientApp directory, and start it
cd ClientApp

::start cmd /k "npm start"
start "" %gitBash% -c "npm start"

:: will ask "Press any key to continue . . ."
::pause

:: will leave the window open
::cmd /k
