import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import SwapInterface from "@/components/SwapInterface";
import WalletConnect from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";

const Swap = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-neon-cyan/20 glass-morphism sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Logo />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/swap" className="text-neon-cyan font-medium">
                Swap
              </Link>
              <Link to="/liquidity" className="text-foreground hover:text-neon-cyan transition-colors">
                Add Liquidity
              </Link>
              <Link to="/#analytics" className="text-foreground hover:text-neon-cyan transition-colors">
                Analytics
              </Link>
            </nav>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Encrypted Token Swap
            </h1>
            <p className="text-muted-foreground">
              Trade tokens with MEV protection and zero front-running
            </p>
          </div>

          {/* Swap Interface */}
          <div className="mb-8">
            <SwapInterface />
          </div>

          {/* Trading Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-morphism p-6 rounded-lg border border-neon-cyan/20">
              <h3 className="text-lg font-semibold mb-4 gradient-text">How It Works</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-neon-cyan">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Enter Trade Details</p>
                    <p>Specify the tokens and amounts you want to swap</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-neon-cyan">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Encrypted Submission</p>
                    <p>Your transaction is encrypted and protected from MEV</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-neon-cyan">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Fair Execution</p>
                    <p>Trade executes at the best available price</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-morphism p-6 rounded-lg border border-neon-purple/20">
              <h3 className="text-lg font-semibold mb-4 gradient-text">Security Features</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan"></div>
                  <span>MEV Protection Active</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-neon-purple"></div>
                  <span>Zero Front-Running</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-neon-pink"></div>
                  <span>Encrypted Until Confirmation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span>Optimal Price Discovery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-morphism p-6 rounded-lg border border-neon-cyan/20">
            <h3 className="text-lg font-semibold mb-4 gradient-text">Recent Protected Trades</h3>
            <div className="space-y-3">
              {[
                { pair: "ETH/USDC", amount: "2.34 ETH", value: "$5,847", time: "2m ago", savings: "$12.40" },
                { pair: "WBTC/ETH", amount: "0.15 WBTC", value: "$9,230", time: "5m ago", savings: "$23.80" },
                { pair: "USDC/DAI", amount: "1,000 USDC", value: "$999.20", time: "8m ago", savings: "$2.10" },
              ].map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center">
                      <span className="text-xs font-bold text-background">🔒</span>
                    </div>
                    <div>
                      <p className="font-medium">{trade.pair}</p>
                      <p className="text-sm text-muted-foreground">{trade.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{trade.value}</p>
                    <p className="text-xs text-success">Saved {trade.savings}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {trade.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Swap;