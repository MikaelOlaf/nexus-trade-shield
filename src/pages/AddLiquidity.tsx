import { useState } from "react";
import { ArrowLeft, Plus, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import WalletConnect from "@/components/WalletConnect";
import LiquidityPools from "@/components/LiquidityPools";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AddLiquidity = () => {
  const [token0Amount, setToken0Amount] = useState("");
  const [token1Amount, setToken1Amount] = useState("");

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
              <Link to="/swap" className="text-foreground hover:text-neon-cyan transition-colors">
                Swap
              </Link>
              <Link to="/liquidity" className="text-neon-cyan font-medium">
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
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Add Liquidity
            </h1>
            <p className="text-muted-foreground">
              Provide liquidity and earn fees from encrypted swaps
            </p>
          </div>

          <Tabs defaultValue="add" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="add">Add Liquidity</TabsTrigger>
              <TabsTrigger value="pools">My Positions</TabsTrigger>
            </TabsList>

            <TabsContent value="add" className="space-y-8">
              {/* Add Liquidity Interface */}
              <div className="max-w-md mx-auto">
                <Card className="glass-morphism glow-effect">
                  <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold gradient-text">Add Liquidity</h2>
                      <div className="flex items-center space-x-1 text-xs text-neon-cyan">
                        <Zap className="h-3 w-3" />
                        <span>Earn Fees</span>
                      </div>
                    </div>

                    {/* Token 0 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Token A</span>
                        <span className="text-muted-foreground">Balance: 0.00</span>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={token0Amount}
                          onChange={(e) => setToken0Amount(e.target.value)}
                          className="text-right text-xl font-mono bg-secondary/50 border-neon-cyan/30 focus:border-neon-cyan"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                          <span className="font-medium">ETH</span>
                        </div>
                      </div>
                    </div>

                    {/* Plus Icon */}
                    <div className="flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-secondary border border-neon-cyan/30 flex items-center justify-center">
                        <Plus className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Token 1 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Token B</span>
                        <span className="text-muted-foreground">Balance: 0.00</span>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={token1Amount}
                          onChange={(e) => setToken1Amount(e.target.value)}
                          className="text-right text-xl font-mono bg-secondary/50 border-neon-purple/30 focus:border-neon-purple"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-purple-600"></div>
                          <span className="font-medium">USDC</span>
                        </div>
                      </div>
                    </div>

                    {/* Pool Info */}
                    <div className="space-y-3 p-4 bg-secondary/30 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pool Share</span>
                        <span>0.00%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current APR</span>
                        <span className="text-success flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          24.5%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">LP Tokens</span>
                        <span>0.000</span>
                      </div>
                    </div>

                    {/* Add Liquidity Button */}
                    <Button 
                      className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 transition-opacity"
                      disabled={!token0Amount || !token1Amount}
                    >
                      {token0Amount && token1Amount ? "Add Liquidity" : "Enter Amounts"}
                    </Button>

                    {/* Info */}
                    <div className="text-xs text-center text-muted-foreground bg-secondary/30 rounded-lg p-3">
                      💡 By adding liquidity, you'll earn 0.3% of all trades on this pair proportional to your share of the pool
                    </div>
                  </div>
                </Card>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-morphism p-6 rounded-lg border border-neon-cyan/20 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center mx-auto mb-4 glow-effect">
                    <Zap className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">Earn Trading Fees</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn 0.3% fee on all swaps proportional to your pool share
                  </p>
                </div>

                <div className="glass-morphism p-6 rounded-lg border border-neon-purple/20 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center mx-auto mb-4 glow-effect">
                    <TrendingUp className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">High APR</h3>
                  <p className="text-sm text-muted-foreground">
                    Benefit from high trading volume and MEV protection premiums
                  </p>
                </div>

                <div className="glass-morphism p-6 rounded-lg border border-neon-pink/20 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center mx-auto mb-4 glow-effect">
                    <Plus className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 gradient-text">No Impermanent Loss Risk</h3>
                  <p className="text-sm text-muted-foreground">
                    Our encrypted AMM design minimizes impermanent loss exposure
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pools">
              <LiquidityPools />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AddLiquidity;