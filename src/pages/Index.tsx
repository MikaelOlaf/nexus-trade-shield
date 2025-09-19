import { Shield, Zap, Lock, TrendingUp } from "lucide-react";
import Logo from "@/components/Logo";
import SwapInterface from "@/components/SwapInterface";
import WalletConnect from "@/components/WalletConnect";
import LiquidityPools from "@/components/LiquidityPools";
import EncryptedTrading from "@/components/EncryptedTrading";
import BinaryFooter from "@/components/BinaryFooter";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dex.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-neon-cyan/20 glass-morphism sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/swap" className="text-foreground hover:text-neon-cyan transition-colors">
                Swap
              </a>
              <a href="/liquidity" className="text-foreground hover:text-neon-cyan transition-colors">
                Add Liquidity
              </a>
              <a href="#analytics" className="text-foreground hover:text-neon-cyan transition-colors">
                Analytics
              </a>
            </nav>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background" />
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold animate-fade-in">
              <span className="gradient-text">FHE-Encrypted</span>
              <br />
              <span className="text-glow">Trading Platform</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The first decentralized trading platform with Fully Homomorphic Encryption that protects your 
              trading data and strategies while enabling secure on-chain operations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 transition-opacity glow-effect px-8"
                asChild
              >
                <a href="/swap">Start Trading</a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-neon-cyan/30 hover:border-neon-cyan"
                asChild
              >
                <a href="/liquidity">Add Liquidity</a>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple flex items-center justify-center glow-effect">
                  <Shield className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-semibold">FHE Encryption</h3>
                <p className="text-muted-foreground text-center">
                  All trading data is encrypted using Fully Homomorphic Encryption
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center glow-effect">
                  <Zap className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-semibold">Private Trading</h3>
                <p className="text-muted-foreground text-center">
                  Trade without revealing your positions, amounts, or strategies
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan flex items-center justify-center glow-effect">
                  <Lock className="h-8 w-8 text-background" />
                </div>
                <h3 className="text-xl font-semibold">Encrypted Analytics</h3>
                <p className="text-muted-foreground text-center">
                  Get risk assessments and insights without exposing your data
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold gradient-text">$12.5M</div>
              <div className="text-muted-foreground">Total Volume</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold gradient-text">4.2K</div>
              <div className="text-muted-foreground">Encrypted Trades</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold gradient-text">$3.7M</div>
              <div className="text-muted-foreground">Total Liquidity</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold gradient-text">100%</div>
              <div className="text-muted-foreground">Data Privacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Encrypted Trading Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              FHE-Encrypted Trading Operations
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of private trading with Fully Homomorphic Encryption. 
              All your trading data remains encrypted while enabling secure on-chain operations.
            </p>
          </div>
          <EncryptedTrading />
        </div>
      </section>

      {/* Footer */}
      <BinaryFooter />
    </div>
  );
};

export default Index;

