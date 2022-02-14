import { ethers } from "hardhat"
import { expect } from "chai"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

import { ExampleToken } from "../types/ExampleToken"
import { Minter } from "../types/Minter"

describe("ExampleToken", function () {
  let token: ExampleToken
  let owner: SignerWithAddress

  before(async function () {
    ;[owner] = await ethers.getSigners()

    const facory = await ethers.getContractFactory("ExampleToken")
    token = (await facory.connect(owner).deploy()) as ExampleToken
  })

  it("check basic info", async function () {
    expect("Example Token").to.equal(await token.name())
    expect("EXM").to.equal(await token.symbol())
    expect("10000000000000000000000").to.equal((await token.totalSupply()).toString())
  })

  it("check mint", async function () {
    const facory = await ethers.getContractFactory("Minter")
    const minter = (await facory.connect(owner).deploy(token.address)) as Minter

    await token.transfer(minter.address, 10000000)
    expect("10000000").to.equal((await token.balanceOf(minter.address)).toString())
    await minter.mint("0x0000000000000000000000000000000000000001", 100)
    expect("100").to.equal((await token.balanceOf("0x0000000000000000000000000000000000000001")).toString())
  })
})
