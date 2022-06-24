# fs-root
Node fs interface scoped to a new root directory

## Install

`npm install -E fs-root`
or
`yarn add -E fs-root`

## Usage

All fs-root needs is a path to a directory to be the new root.

```javascript
import fsRoot from "fs-root";

const rootFs = fsRoot("/example/directory");
```

An optional filesystem interface can also be provided, currently only Node's "fs" module and the third-party "fs-extra" are supported. By default Node's "fs" is used.

```javascript
import fse from "fs-extra";

// Supports all functionality in fs-extra
fsRoot("/example/directory", fse);
```

