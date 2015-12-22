
# <img alt="It should be at core" src="https://cdn.rawgit.com/BCJTI/it-should-be-at-core-vscode/master/doc/idea-icon.svg" width=30 height=30> It should be at core

Gotchas, Insights and helpful features. Remember files, back actions (after go to definition for example), etc...

## Features

### Remember list of openned files

* This feature is automatically triggered.
* It can be disabled setting `bcjti.itShould.enableFileReopener` to false.
* When you close the current file, the default behaviour of VSCode is to close de editor and show a black window.
This is specially painful when you use F12 (go to definition) repeatedly and whant to go back to the last file.
With this feature enabled, just close the actual file and the last one will be oppened.

![File Reopener example](doc/file-reopener-example.gif)