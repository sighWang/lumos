# @sighwang/config-manager

## Example

```ts
import { initializeConfig, predefined } from '@sighwang/config';
import { generateAddress } from '@sighwang/helper'

initializeConfig(predefined.AGGRON);
generateAddress({...}) // ckt1...


initializeConfig(predefined.LINA);
generateAddress({...}) // ckb1...
```
