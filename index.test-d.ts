import { expectType } from 'tsd'
import Effects from '.'

expectType<string>(Effects.helloWorld('Larry'))
