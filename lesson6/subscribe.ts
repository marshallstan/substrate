import { ApiPromise, WsProvider } from '@polkadot/api'

const WEB_SOCKET = 'wss://maskangel.eu.org'

const sleep = (t: number) => new Promise(resolve => setTimeout(resolve, t))

const connectSubstrate = async () => {
  const wsProvider = new WsProvider(WEB_SOCKET)
  const api = await ApiPromise.create({
    provider: wsProvider,
    types: {}
  })
  await api.isReady
  console.log('connection to substrate is ok.')
  return api
}

const subscribe = async (api: ApiPromise) => {
  console.log('Subscribe start!')
  api.query.system.events((events: any) => {
    console.log(`Received ${events.length} events:`)

    events.forEach((record: any) => {
      const { event, phase } = record
      const types = event.typeDef

      const args = event.data.map((data: any, index: number) => `${types[index].type}: ${data.toString()}`)

      console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`)
      console.log(`\t\t${args.join(', ')}`)
    })
  })
}

const main = async () => {
  const api = await connectSubstrate()
  await subscribe(api)
  await sleep(6000000)

  console.log('exit here!!!')
}

main()
  .then(() => {
    console.log('successfully exited')
    process.exit(0)
  })
  .catch((err) => {
    console.log('error: ', err)
    process.exit(1)
  })
