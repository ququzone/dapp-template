import { ethers, getNamedAccounts, deployments } from "hardhat";

async function main() {
    const { execute } = deployments;

    const namedAccounts = await getNamedAccounts();
    const { deployer } = namedAccounts;

    const recipient = '0xB5A2d7Bb89DE4bD62fB90E5d2f88438b8dB2C194';
    const block = await ethers.provider.getBlockNumber()
    console.log(`Transfer begin block: ${block}`)

    const executeResult = await execute('ExampleToken', {
        from: deployer,
        log: true,
    }, 'transfer', recipient, 100);

    console.log(`ExampleToken transfer ${recipient} using ${executeResult.gasUsed} gas at ${executeResult.transactionHash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });