async function main() {
    // Get the contract to deploy
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Load the contract artifact (ABI + Bytecode)
    const Contract = await ethers.getContractFactory("WillManager");
  
    // Deploy the contract
    const contract = await Contract.deploy("0x959907B2e100AEEba4A5b2971d987b4364F4C744", 2);
    console.log("Contract deployed to address:", contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  