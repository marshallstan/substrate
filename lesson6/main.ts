import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'

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

const getConst = async (api: ApiPromise) => {
  const existentialDeposit = await api.consts.balances.existentialDeposit.toHuman()
  return existentialDeposit
}

const getFreeBalance = async (api: ApiPromise, address: string) => {
  const aliceAccount = await api.query.system.account(address) as any
  return aliceAccount['data']['free'].toHuman()
}

const printAliceBobBalance = async (api: ApiPromise) => {
  const keyring = new Keyring({ type: 'sr25519' })
  const alice = keyring.addFromUri('//Alice')
  const bob = keyring.addFromUri('//Bob')
  console.log('alice\'s balance is: ', await getFreeBalance(api, alice.address))
  console.log('bob\'s balance is: ', await getFreeBalance(api, bob.address))
}

const transferFromAliceToBob = async (api: ApiPromise, amount: number) => {
  const keyring = new Keyring({ type: 'sr25519' })
  const alice = keyring.addFromUri('//Alice')
  const bob = keyring.addFromUri('//Bob')
  await api.tx.balances.transfer(bob.address, amount)
    .signAndSend(alice, res => {
      console.log('Tx status: ', res.status)
    })
}

const subscribeAliceBalance = async (api: ApiPromise) => {
  const keyring = new Keyring({ type: 'sr25519' })
  const alice = keyring.addFromUri('//Alice')
  await api.query.system.account(alice.address, (aliceAcct: any) => {
    console.log('Subscribed to Alice account.')
    const aliceFreeSub = aliceAcct.data.free
    console.log('Alice Account (sub): ', aliceFreeSub.toHuman())
  })
}

const getMetadata = async (api: ApiPromise) => {
  const metadata = await api.rpc.state.getMetadata()
  console.log('print metadata: ', metadata)
  return metadata
}

const main = async () => {
  const api = await connectSubstrate()
  console.log('const value existentialDeposit is: ', await getConst(api))

  // await printAliceBobBalance(api)
  // await transferFromAliceToBob(api, 10 ** 12)
  // await sleep(6000)
  // await printAliceBobBalance(api)

  // await subscribeAliceBalance(api)
  // await sleep(600000)

  await getMetadata(api)

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
