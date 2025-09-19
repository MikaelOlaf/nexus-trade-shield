import { useState } from "react";
import { ArrowDownUp, Settings, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const SwapInterface = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  return (
    <Card className="w-full max-w-md mx-auto glass-morphism glow-effect">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold gradient-text">Encrypted Swap</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-neon-cyan">
              <Zap className="h-3 w-3" />
              <span>MEV Protected</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* From Token */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">From</span>
            <span className="text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="text-right text-2xl font-mono bg-secondary/50 border-neon-cyan/30 focus:border-neon-cyan"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <span className="font-medium">ETH</span>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full border border-neon-cyan/30 hover:border-neon-cyan"
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">To</span>
            <span className="text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="text-right text-2xl font-mono bg-secondary/50 border-neon-purple/30 focus:border-neon-purple"
              readOnly
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <span className="font-medium">USDC</span>
            </div>
          </div>
        </div>

        {/* Swap Info */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Price Impact</span>
            <span className="text-success">~0.01%</span>
          </div>
          <div className="flex justify-between">
            <span>Network Fee</span>
            <span>~$2.50</span>
          </div>
          <div className="flex justify-between">
            <span>MEV Protection</span>
            <span className="text-neon-cyan flex items-center">
              <Zap className="h-3 w-3 mr-1" />
              Active
            </span>
          </div>
        </div>

        {/* Swap Button */}
        <Button 
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 transition-opacity"
          disabled={!fromAmount}
        >
          {fromAmount ? "Swap Tokens" : "Enter Amount"}
        </Button>

        {/* Encryption Notice */}
        <div className="text-xs text-center text-muted-foreground bg-secondary/30 rounded-lg p-3">
          🔒 Your transaction is encrypted until confirmation, protecting against MEV extraction
        </div>
      </div>
    </Card>
  );
};

export default SwapInterface;