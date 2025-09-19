import { useState } from "react";
import { Wallet, ChevronDown, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected, metaMask, walletConnect } from "wagmi/connectors";

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const connectWallet = async (connector: any) => {
    try {
      await connect({ connector });
      toast.success("Wallet connected successfully!");
    } catch (error) {
      toast.error("Failed to connect wallet");
      console.error("Connection error:", error);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    toast.info("Wallet disconnected");
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard");
    }
  };

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const openExplorer = () => {
    if (address) {
      window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 transition-opacity glow-effect">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 glass-morphism">
          <DropdownMenuItem onClick={() => connectWallet(metaMask())} className="cursor-pointer">
            <Wallet className="mr-2 h-4 w-4" />
            MetaMask
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => connectWallet(injected())} className="cursor-pointer">
            <Wallet className="mr-2 h-4 w-4" />
            Injected Wallet
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => connectWallet(walletConnect({
            projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "2ec9743d0d0cd7fb94dee1a7e6d33475"
          }))} className="cursor-pointer">
            <Wallet className="mr-2 h-4 w-4" />
            WalletConnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="border-neon-cyan/30 hover:border-neon-cyan bg-secondary/50"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="font-mono">{shortenAddress(address!)}</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 glass-morphism">
        <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
          <Copy className="mr-2 h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openExplorer} className="cursor-pointer">
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer text-destructive">
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletConnect;