module.exports = async ({ ethers, getNamedAccounts, deployments }) => {
    const { deploy, execute } = deployments;

    const { log } = deployments;
    const namedAccounts = await getNamedAccounts();
    const { deployer } = namedAccounts;

    const token = (await deployments.get("ExampleToken")).address;

    const deployResult = await deploy('Minter', {
        from: deployer,
        args: [token],
        log: true,
        deterministicDeployment: false,
    });
    if (deployResult.newlyDeployed) {
        log(
            `contract Minter deployed at ${deployResult.address} using ${deployResult.receipt.gasUsed} gas`
        );
    }

    const transferResult = await execute('ExampleToken', {
        from: deployer,
        log: true,
    }, 'transfer', deployResult.address, '100000000000000000000');
    console.log(`ExampleToken transfer minter using ${transferResult.gasUsed} gas at ${transferResult.transactionHash}`);
};
module.exports.tags = ['Minter'];
module.exports.dependencies = ['ExampleToken'];

