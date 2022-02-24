# @ximingwang/config-manager

## Example

```ts
import { initializeConfig, predefined } from '@ximingwang/config';
import { generateAddress } from '@ximingwang/helper'

initializeConfig(predefined.AGGRON);
generateAddress({...}) // ckt1...


initializeConfig(predefined.LINA);
generateAddress({...}) // ckb1...
```
