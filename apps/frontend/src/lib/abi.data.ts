export const usdcContractAddress = '0x24b3d12eb92304571e95A42B03d058d1e911aEAd';
export const proxyByteCode =
  '608060405234801561000f575f80fd5b5060405161070e38038061070e83398181016040528101906100319190610471565b878787878787878760405160240161004f9796959493929190610540565b6040516020818303038152906040527f8d7737ce000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506100dc82826100eb60201b60201c565b5050505050505050505061062e565b6100fa8261016f60201b60201c565b8173ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a25f8151111561015c57610156828261023e60201b60201c565b5061016b565b61016a6102c460201b60201c565b5b5050565b5f8173ffffffffffffffffffffffffffffffffffffffff163b036101ca57806040517f4c9c8ce30000000000000000000000000000000000000000000000000000000081526004016101c191906105ad565b60405180910390fd5b806101fc7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5f1b61030060201b60201c565b5f015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60605f808473ffffffffffffffffffffffffffffffffffffffff16846040516102679190610618565b5f60405180830381855af49150503d805f811461029f576040519150601f19603f3d011682016040523d82523d5f602084013e6102a4565b606091505b50915091506102ba85838361030960201b60201c565b9250505092915050565b5f3411156102fe576040517fb398979f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b565b5f819050919050565b6060826103245761031f8261039c60201b60201c565b610394565b5f825114801561034a57505f8473ffffffffffffffffffffffffffffffffffffffff163b145b1561038c57836040517f9996b31500000000000000000000000000000000000000000000000000000000815260040161038391906105ad565b60405180910390fd5b819050610395565b5b9392505050565b5f815111156103ae5780518082602001fd5b6040517fd6bda27500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61040d826103e4565b9050919050565b61041d81610403565b8114610427575f80fd5b50565b5f8151905061043881610414565b92915050565b5f819050919050565b6104508161043e565b811461045a575f80fd5b50565b5f8151905061046b81610447565b92915050565b5f805f805f805f80610100898b03121561048e5761048d6103e0565b5b5f61049b8b828c0161042a565b98505060206104ac8b828c0161045d565b97505060406104bd8b828c0161045d565b96505060606104ce8b828c0161042a565b95505060806104df8b828c0161042a565b94505060a06104f08b828c0161045d565b93505060c06105018b828c0161045d565b92505060e06105128b828c0161045d565b9150509295985092959890939650565b61052b8161043e565b82525050565b61053a81610403565b82525050565b5f60e0820190506105535f83018a610522565b6105606020830189610522565b61056d6040830188610531565b61057a6060830187610531565b6105876080830186610522565b61059460a0830185610522565b6105a160c0830184610522565b98975050505050505050565b5f6020820190506105c05f830184610531565b92915050565b5f81519050919050565b5f81905092915050565b8281835e5f83830152505050565b5f6105f2826105c6565b6105fc81856105d0565b935061060c8185602086016105da565b80840191505092915050565b5f61062382846105e8565b915081905092915050565b60d48061063a5f395ff3fe6080604052600a600c565b005b60186014601a565b6026565b565b5f60216044565b905090565b365f80375f80365f845af43d5f803e805f81146040573d5ff35b3d5ffd5b5f606e7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5f1b6095565b5f015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b5f81905091905056fea2646970667358221220dac96412e47d426cd38f046f79dfcd508a3443a40a47ad4d5985968991abbfed64736f6c634300081a0033';
export const v2 = '0x23cac987f16e25ad57de078d875ea09300126b72';

export const timeVaultV1Abi = [
  {
    inputs: [],
    name: 'activeFunds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'activeYeildedFunds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimBack',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimingPeriod',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'depositExternalFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNftCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_nftAmount', type: 'uint256' }],
    name: 'joinVault',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'joiningPeriod',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'nftClaimed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftLimitPerAddress',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nftPrice',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenDecimals',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalFunds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
    name: 'vaults',
    outputs: [
      { internalType: 'uint256', name: 'tokenAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'nftAmount', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }],
    name: 'withdrawAllFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawInvestment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'yieldGenerated',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'yieldGeneratedPercentage',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'yieldedFunds',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const tokenAbi = [
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const NFTabi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const proxyAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_logic',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_nftPrice',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_nftLimitPerAddress',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'initialOwner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_nftLimit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_joiningPeriod',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_claimingPeriod',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
];
