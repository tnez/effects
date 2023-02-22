import { expectType } from 'tsd'
import * as Logs from '.'

expectType<Promise<void>>(Logs.emit('🔥 As it was, so it was 🔥'))
