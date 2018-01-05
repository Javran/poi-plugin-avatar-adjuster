poi plugin for adjusting marginMagic of ship avatars.

create a soft link from `data/` of this project to your `APPDATA/poi/avatar-adjuster`,
then open plugin to adjust ship avatars.

changes will be saved automatically to `data/p-state.json`.

load `p-state.json` as an Object and `shipAvatar` property should contain
all marginMagics.

or alternatively `window.dumpMarginMagics()` can be used to dump content of marginMagics as well.
