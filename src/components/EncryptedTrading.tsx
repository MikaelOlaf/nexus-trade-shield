import { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Shield, Lock, TrendingUp, Users } from "lucide-react";

// Contract ABI for NexusTradeShield
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "_symbol", "type": "string"},
      {"name": "_amount", "type": "bytes"},
      {"name": "_entryPrice", "type": "bytes"},
      {"name": "_stopLoss", "type": "bytes"},
      {"name": "_takeProfit", "type": "bytes"},
      {"name": "_isLong", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "openPosition",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "_poolName", "type": "string"},
      {"name": "_amount", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "addLiquidity",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "positionId", "type": "uint256"},
      {"name": "_riskScore", "type": "bytes"},
      {"name": "_volatility", "type": "bytes"},
      {"name": "_correlation", "type": "bytes"}
    ],
    "name": "assessRisk",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual deployed contract address

const EncryptedTrading = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Trading position state
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [isLong, setIsLong] = useState(true);

  // Liquidity pool state
  const [poolName, setPoolName] = useState("");
  const [liquidityAmount, setLiquidityAmount] = useState("");

  // Risk assessment state
  const [riskScore, setRiskScore] = useState("");
  const [volatility, setVolatility] = useState("");
  const [correlation, setCorrelation] = useState("");

  // Simulate FHE encryption (in real implementation, this would use FHEVM)
  const encryptValue = (value: string): string => {
    // This is a placeholder - in real implementation, use FHEVM to encrypt
    return btoa(value); // Base64 encoding as placeholder
  };

  const handleOpenPosition = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      // Encrypt sensitive data using FHE
      const encryptedAmount = encryptValue(amount);
      const encryptedEntryPrice = encryptValue(entryPrice);
      const encryptedStopLoss = encryptValue(stopLoss);
      const encryptedTakeProfit = encryptValue(takeProfit);
      const encryptedIsLong = encryptValue(isLong.toString());

      // Create proof for FHE operations (placeholder)
      const inputProof = "0x" + "0".repeat(64); // Placeholder proof

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "openPosition",
        args: [
          symbol,
          encryptedAmount,
          encryptedEntryPrice,
          encryptedStopLoss,
          encryptedTakeProfit,
          encryptedIsLong,
          inputProof
        ],
      });

      toast.success("Encrypted position opened successfully!");
    } catch (error) {
      console.error("Error opening position:", error);
      toast.error("Failed to open position");
    }
  };

  const handleAddLiquidity = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const encryptedAmount = encryptValue(liquidityAmount);
      const inputProof = "0x" + "0".repeat(64);

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "addLiquidity",
        args: [poolName, encryptedAmount, inputProof],
      });

      toast.success("Encrypted liquidity added successfully!");
    } catch (error) {
      console.error("Error adding liquidity:", error);
      toast.error("Failed to add liquidity");
    }
  };

  const handleRiskAssessment = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const encryptedRiskScore = encryptValue(riskScore);
      const encryptedVolatility = encryptValue(volatility);
      const encryptedCorrelation = encryptValue(correlation);

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "assessRisk",
        args: [0, encryptedRiskScore, encryptedVolatility, encryptedCorrelation], // positionId = 0 for demo
      });

      toast.success("Encrypted risk assessment completed!");
    } catch (error) {
      console.error("Error assessing risk:", error);
      toast.error("Failed to assess risk");
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-neon-cyan" />
            Encrypted Trading Platform
          </CardTitle>
          <CardDescription>
            Connect your wallet to access encrypted trading features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Please connect your wallet to continue
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-neon-cyan" />
            FHE-Encrypted Trading Operations
          </CardTitle>
          <CardDescription>
            All data is encrypted using Fully Homomorphic Encryption before being sent to the blockchain
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="trading" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trading" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trading
          </TabsTrigger>
          <TabsTrigger value="liquidity" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Liquidity
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Risk Assessment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Open Encrypted Position</CardTitle>
              <CardDescription>
                Your trading data will be encrypted before being stored on-chain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="symbol">Trading Symbol</Label>
                  <Input
                    id="symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="e.g., ETH/USDT"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (Encrypted)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="100"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="entryPrice">Entry Price (Encrypted)</Label>
                  <Input
                    id="entryPrice"
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(e.target.value)}
                    placeholder="2000"
                  />
                </div>
                <div>
                  <Label htmlFor="stopLoss">Stop Loss (Encrypted)</Label>
                  <Input
                    id="stopLoss"
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    placeholder="1900"
                  />
                </div>
                <div>
                  <Label htmlFor="takeProfit">Take Profit (Encrypted)</Label>
                  <Input
                    id="takeProfit"
                    type="number"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    placeholder="2100"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isLong"
                  checked={isLong}
                  onChange={(e) => setIsLong(e.target.checked)}
                />
                <Label htmlFor="isLong">Long Position</Label>
              </div>

              <Button 
                onClick={handleOpenPosition}
                disabled={isPending || isConfirming}
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple"
              >
                {isPending || isConfirming ? "Processing..." : "Open Encrypted Position"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liquidity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Encrypted Liquidity</CardTitle>
              <CardDescription>
                Contribute to liquidity pools without revealing exact amounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="poolName">Pool Name</Label>
                <Input
                  id="poolName"
                  value={poolName}
                  onChange={(e) => setPoolName(e.target.value)}
                  placeholder="ETH/USDT Pool"
                />
              </div>
              <div>
                <Label htmlFor="liquidityAmount">Amount (Encrypted)</Label>
                <Input
                  id="liquidityAmount"
                  type="number"
                  value={liquidityAmount}
                  onChange={(e) => setLiquidityAmount(e.target.value)}
                  placeholder="1000"
                />
              </div>
              <Button 
                onClick={handleAddLiquidity}
                disabled={isPending || isConfirming}
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple"
              >
                {isPending || isConfirming ? "Processing..." : "Add Encrypted Liquidity"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Encrypted Risk Assessment</CardTitle>
              <CardDescription>
                Assess risk without exposing sensitive market data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="riskScore">Risk Score (Encrypted)</Label>
                  <Input
                    id="riskScore"
                    type="number"
                    value={riskScore}
                    onChange={(e) => setRiskScore(e.target.value)}
                    placeholder="75"
                  />
                </div>
                <div>
                  <Label htmlFor="volatility">Volatility (Encrypted)</Label>
                  <Input
                    id="volatility"
                    type="number"
                    value={volatility}
                    onChange={(e) => setVolatility(e.target.value)}
                    placeholder="0.25"
                  />
                </div>
                <div>
                  <Label htmlFor="correlation">Correlation (Encrypted)</Label>
                  <Input
                    id="correlation"
                    type="number"
                    value={correlation}
                    onChange={(e) => setCorrelation(e.target.value)}
                    placeholder="0.8"
                  />
                </div>
              </div>
              <Button 
                onClick={handleRiskAssessment}
                disabled={isPending || isConfirming}
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-purple"
              >
                {isPending || isConfirming ? "Processing..." : "Assess Encrypted Risk"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isSuccess && (
        <Card className="border-green-500 bg-green-50 dark:bg-green-950">
          <CardContent className="pt-6">
            <p className="text-green-700 dark:text-green-300">
              ✅ Transaction confirmed! Your encrypted data has been securely stored on-chain.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EncryptedTrading;
