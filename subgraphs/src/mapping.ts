import { BigInt } from "@graphprotocol/graph-ts"
import {
  ExampleToken,
  Transfer,
  TransferCall
} from "../generated/ExampleToken/ExampleToken"
import { TransferEvent, TransferTransaction } from "../generated/schema"

export function handleTransferEvent(event: Transfer): void {
  let entity = TransferEvent.load(event.transaction.hash.toHex())

  if (entity == null) {
    entity = new TransferEvent(event.transaction.hash.toHex())

    entity.from = event.params.from
    entity.to = event.params.to
    entity.amount = event.params.value
    entity.save()
  }
}

export function handleTransferCall(call: TransferCall): void {
  let entity = TransferTransaction.load(call.transaction.hash.toHex())

  if (entity == null) {
    entity = new TransferTransaction(call.transaction.hash.toHex())

    entity.block = call.block.number
    entity.sender = call.from
    entity.save()
  }
}
