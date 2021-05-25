---
date: "2021-05-25"
title: "fatal error: 'vips/vips8' file not found"
category: "other"
tag: "fatal error: 'vips/vips8' file not found"
type: "问题解决"
author: "slsay"
---

## 问题
安装gatsby-plugin-sharp时，发生的错误

```shell script
> sharp@0.28.3 install /Users/test/node_modules/sharp
> (node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)

sharp: Using cached /Users/test/.npm/_libvips/libvips-8.10.6-darwin-x64.tar.br
prebuild-install WARN install Request timed out
  CC(target) Release/obj.target/nothing/../node-addon-api/nothing.o
  LIBTOOL-STATIC Release/nothing.a
warning: /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/libtool: archive library: Release/nothing.a the table of contents is empty (no object file members in the library define global symbols)
  TOUCH Release/obj.target/libvips-cpp.stamp
  CXX(target) Release/obj.target/sharp/src/common.o
../src/common.cc:24:10: fatal error: 'vips/vips8' file not found
#include <vips/vips8>
         ^~~~~~~~~~~~
1 error generated.
make: *** [Release/obj.target/sharp/src/common.o] Error 1
gyp ERR! build error 
gyp ERR! stack Error: `make` failed with exit code: 2
gyp ERR! stack     at ChildProcess.onExit (/Users/test/.nvm/versions/node/v12.16.1/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:194:23)
gyp ERR! stack     at ChildProcess.emit (events.js:311:20)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
gyp ERR! System Darwin 19.6.0
gyp ERR! command "/Users/test/.nvm/versions/node/v12.16.1/bin/node" "/Users/test/.nvm/versions/node/v12.16.1/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "rebuild"
gyp ERR! cwd /Users/test/node_modules/sharp
gyp ERR! node -v v12.16.1
gyp ERR! node-gyp -v v5.0.5
gyp ERR! not ok 
npm WARN gatsby-remark-highlight-code@2.2.0 requires a peer of gatsby@^2.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN rc-picker@2.5.10 requires a peer of dayjs@^1.8.30 but none is installed. You must install peer dependencies yourself.
npm WARN express-graphql@0.9.0 requires a peer of graphql@^14.4.1 but none is installed. You must install peer dependencies yourself.
npm WARN tsutils@3.21.0 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.
npm WARN ts-node@9.1.1 requires a peer of typescript@>=2.7 but none is installed. You must install peer dependencies yourself.

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! sharp@0.28.3 install: `(node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the sharp@0.28.3 install script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/test/.npm/_logs/2021-05-25T05_06_47_140Z-debug.log
```

## 解决办法

请升级系统库后，再重新安装
```shell script
brew install vips
```
