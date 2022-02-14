import { ethers, getNamedAccounts, deployments } from "hardhat";

async function main() {
    const { execute } = deployments;

    const namedAccounts = await getNamedAccounts();
    const { deployer } = namedAccounts;

    const to = '0xB5A2d7Bb89DE4bD62fB90E5d2f88438b8dB2C194';
    const block = await ethers.provider.getBlockNumber()
    console.log(`Mint begin block: ${block}`)

    const executeResult = await execute('Minter', {
        from: deployer,
        log: true,
    }, 'mint', to, 150);

    console.log(`Minter mint ${to} using ${executeResult.gasUsed} gas at ${executeResult.transactionHash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });