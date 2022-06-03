const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("🚀 Starting test...");
  let provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Myepicproject;
  const baseAccount = anchor.web3.Keypair.generate();
  const tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log("📝 Your transaction signature ", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count ", account.totalGifs.toString());

  await program.rpc.addGif("https://media0.giphy.com/media/uM0QzrHWSDr4KwbC3v/giphy.gif?cid=ecf05e47iq9kf2a5k3cbd8t2repzizmvexftjo95mzhsphfy&rid=giphy.gif&ct=g", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count ", account.totalGifs.toString());

  console.log("👀 GIF List", account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
