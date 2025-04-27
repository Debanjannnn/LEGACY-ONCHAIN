"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { ethers } from "ethers"
import { CONTRACT_ADDRESS } from "../utils"
import CONTRACT_ABI from "@/abi"

const SmartWillContext = createContext()

// Pharos Devnet Configuration
const PHAROS_DEVNET_CONFIG = {
  chainId: "0xc352", // 50002 in hex
  chainName: "Pharos Devnet",
  nativeCurrency: {
    name: "Pharos",
    symbol: "DPLS",
    decimals: 18,
  },
  rpcUrls: ["https://devnet.dplabs-internal.com/"],
  blockExplorerUrls: ["https://docs.pharosnetwork.xyz/"],
}

export function SmartWillProvider({ children }) {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chainId, setChainId] = useState(null)

  // Listen for chain changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (newChainId) => {
        setChainId(newChainId)
        // Refresh the page when chain changes to prevent any state inconsistencies
        window.location.reload()
      })
    }
  }, [])

  // Switch to Pharos Devnet
  async function switchToPharosDevnet() {
    if (!window.ethereum) return false

    try {
      // Try to switch to the Pharos Devnet
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: PHAROS_DEVNET_CONFIG.chainId }],
      })
      return true
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [PHAROS_DEVNET_CONFIG],
          })
          return true
        } catch (addError) {
          console.error("Error adding Pharos Devnet:", addError)
          setError("Failed to add Pharos Devnet to MetaMask. Please try again.")
          return false
        }
      }
      console.error("Error switching to Pharos Devnet:", switchError)
      setError("Failed to switch to Pharos Devnet. Please try again.")
      return false
    }
  }

  // Connect to MetaMask and retrieve account info
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        setLoading(true)
        setError(null)

        // First, try to switch to Pharos Devnet
        const switched = await switchToPharosDevnet()
        if (!switched) {
          throw new Error("Failed to switch to Pharos Devnet")
        }

        const providerInstance = new ethers.BrowserProvider(window.ethereum)

        // Get accounts and chain ID
        const [accounts, network] = await Promise.all([
          providerInstance.send("eth_requestAccounts", []),
          providerInstance.getNetwork(),
        ])

        // Verify we're on the correct network
        if (network.chainId !== BigInt(PHAROS_DEVNET_CONFIG.chainId)) {
          throw new Error("Please switch to Pharos Devnet")
        }

        const balance = await providerInstance.getBalance(accounts[0])

        setAccount(accounts[0])
        setBalance(ethers.formatEther(balance))
        setChainId(network.chainId.toString())
        setIsConnected(true)
      } catch (error) {
        console.error("Error connecting to wallet: ", error)
        setError(error.message || "Error connecting to wallet. Please try again.")
        setIsConnected(false)
      } finally {
        setLoading(false)
      }
    } else {
      setError("MetaMask is required to use this app.")
      window.open("https://metamask.io/download.html", "_blank")
    }
  }

  // Create normal will
  async function createNormalWill(beneficiary, description, amount, claimWaitTime, onHashGenerated) {
    try {
      setLoading(true)
      setError(null)

      if (!account) {
        throw new Error("Please connect your wallet first")
      }

      // Verify network before proceeding
      if (chainId !== PHAROS_DEVNET_CONFIG.chainId) {
        await switchToPharosDevnet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const value = ethers.parseEther(amount.toString())
      const tx = await contract.createNormalWill(beneficiary, description, claimWaitTime, { value })
      
      // Call the callback with the transaction hash
      if (onHashGenerated) {
        onHashGenerated(tx.hash)
      }

      await tx.wait()
      return true
    } catch (error) {
      console.error("Error creating normal will:", error)
      setError(error.message || "Error creating will. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }


  // Get normal will by owner address
  async function getNormalWill(ownerAddress) {
    try {
      setLoading(true)
      setError(null)

      if (!account) {
        throw new Error("Please connect your wallet first")
      }

      // Verify network before proceeding
      if (chainId !== PHAROS_DEVNET_CONFIG.chainId) {
        await switchToPharosDevnet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const will = await contract.normalWills(ownerAddress)
      return will
    } catch (error) {
      console.error("Error fetching normal will:", error)
      setError("Error fetching will details. Please try again.")
      return null
    } finally {
      setLoading(false)
    }
  }

  // Check if address has created a will
  async function hasCreatedWill() {
    try {
      if (!account) return false

      // Verify network before proceeding
      if (chainId !== PHAROS_DEVNET_CONFIG.chainId) {
        await switchToPharosDevnet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      console.log("HAS NORMAL WILL: ", await contract.hasNormalWill(account))
      return await contract.hasNormalWill(account)
    } catch (error) {
      console.error("Error checking will existence:", error)
      return false
    }
  }

  // Ping the contract to show activity
  async function ping() {
    try {
      setLoading(true)
      setError(null)

      if (!account) {
        throw new Error("Please connect your wallet first")
      }

      // Verify network before proceeding
      if (chainId !== PHAROS_DEVNET_CONFIG.chainId) {
        await switchToPharosDevnet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const tx = await contract.ping()
      await tx.wait()
      return true
    } catch (error) {
      console.error("Error pinging contract:", error)
      setError("Error updating activity status. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Deposit more to existing will
  async function depositNormalWill(amount) {
    try {
      setLoading(true)
      setError(null)

      if (!account) {
        throw new Error("Please connect your wallet first")
      }

      // Verify network before proceeding
      if (chainId !== PHAROS_DEVNET_CONFIG.chainId) {
        await switchToPharosDevnet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const amountInWei = ethers.parseEther(amount.toString())
      const tx = await contract.deposit({ value: amountInWei })
      await tx.wait()
      return true
    } catch (error) {
      console.error("Error depositing to will:", error)
      setError("Error making deposit. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Get wills where the connected account is a beneficiary
  async function getNormalWillsAsBeneficiary() {
    try {
      setLoading(true)
      setError(null)

      if (!account) {
        throw new Error("Please connect your wallet first")
      }

      // Verify network before proceeding
      if (chainId !== PHAROS_DEVNET_CONFIG.chainId) {
        await switchToPharosDevnet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const [owners, amounts] = await contract.getNormalWillAsBeneficiary(account)
      console.log("OWNERS: ", owners ," \n", "BENEFICARIES: ", amounts )
      return owners.map((owner, index) => ({
        owner,
        amount: ethers.formatEther(amounts[index]),
      }))
    } catch (error) {
      console.error("Error fetching beneficiary wills:", error)
      setError("Error fetching will details. Please try again.")
      return []
    } finally {
      setLoading(false)
    }
  }

  // Get milestone wills where the connected account is a beneficiary
  async function getMilestoneWillsAsBeneficiary() {
    try {
      setLoading(true)
      setError(null)

      if (!account) {
        throw new Error("Please connect your wallet first")
      }

      // Verify network before proceeding
      if (chainId !== PHAROS_DEVNET_CONFIG.chainId) {
        await switchToPharosDevnet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const [owners, willIndexes, releaseIndexes, releaseAmounts] =
        await contract.getMilestoneWillsAsBeneficiary(account)

      return owners.map((owner, index) => ({
        owner,
        willIndex: willIndexes[index],
        releaseIndex: releaseIndexes[index],
        amount: ethers.formatEther(releaseAmounts[index]),
      }))
    } catch (error) {
      console.error("Error fetching milestone wills:", error)
      setError("Error fetching milestone will details. Please try again.")
      return []
    } finally {
      setLoading(false)
    }
  }

  // Claim a normal will as a beneficiary
  async function claimNormalWill(ownerAddress) {
    try {
      setLoading(true)
      setError(null)

      if (!account) {
        throw new Error("Please connect your wallet first")
      }

      // Verify network before proceeding
      if (chainId !== PHAROS_DEVNET_CONFIG.chainId) {
        await switchToPharosDevnet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const tx = await contract.claimNormalWill(ownerAddress)
      await tx.wait()
      return true
    } catch (error) {
      console.error("Error claiming will:", error)
      setError(error.message || "Error claiming will. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Claim a milestone will as a beneficiary
  async function claimMilestoneWill(ownerAddress, willIndex, releaseIndex) {
    try {
      setLoading(true)
      setError(null)

      if (!account) {
        throw new Error("Please connect your wallet first")
      }

      // Verify network before proceeding
      if (chainId !== PHAROS_DEVNET_CONFIG.chainId) {
        await switchToPharosDevnet()
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      const tx = await contract.claimMilestoneWill(ownerAddress, willIndex, releaseIndex)
      await tx.wait()
      return true
    } catch (error) {
      console.error("Error claiming milestone will:", error)
      setError(error.message || "Error claiming milestone will. Please try again.")
      return false
    } finally {
      setLoading(false)
    }
  }

  const value = {
    account,
    balance,
    isConnected,
    loading,
    error,
    chainId,
    connectWallet,
    createNormalWill,
    getNormalWill,
    hasCreatedWill,
    ping,
    
    depositNormalWill,
    switchToPharosDevnet,
    getNormalWillsAsBeneficiary,
    getMilestoneWillsAsBeneficiary,
    claimNormalWill,
    claimMilestoneWill,
    setError
  }

  return <SmartWillContext.Provider value={value}>{children}</SmartWillContext.Provider>
}

export function useSmartWill() {
  const context = useContext(SmartWillContext)
  if (!context) {
    throw new Error("useSmartWill must be used within a SmartWillProvider")
  }
  return context
}