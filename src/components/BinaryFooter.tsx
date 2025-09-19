import { useEffect, useState } from "react";

const BinaryFooter = () => {
  const [binaryStrings, setBinaryStrings] = useState<string[]>([]);

  useEffect(() => {
    // Generate random binary strings for the rain effect
    const generateBinary = () => {
      const binary = [];
      for (let i = 0; i < 50; i++) {
        let str = "";
        for (let j = 0; j < 20; j++) {
          str += Math.random() > 0.5 ? "1" : "0";
        }
        binary.push(str);
      }
      setBinaryStrings(binary);
    };

    generateBinary();
    const interval = setInterval(generateBinary, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-gradient-to-t from-background to-transparent border-t border-neon-cyan/20">
      {/* Binary Rain Background */}
      <div className="absolute inset-0 opacity-10">
        {binaryStrings.map((binary, index) => (
          <div
            key={index}
            className="absolute text-neon-cyan text-xs font-mono binary-rain"
            style={{
              left: `${(index * 2) % 100}%`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {binary}
          </div>
        ))}
      </div>

      {/* Glowing Liquidity Pool Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Central pool */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 animate-pulse-glow"></div>
          
          {/* Ripple effects */}
          <div className="absolute inset-0 rounded-full border border-neon-cyan/30 animate-ping"></div>
          <div className="absolute inset-4 rounded-full border border-neon-purple/30 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-8 rounded-full border border-neon-pink/30 animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold gradient-text">CyberDEX</h3>
            <p className="text-sm text-muted-foreground">
              The first MEV-protected decentralized exchange using encryption technology
              to secure your trades from value extraction.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>MEV Protection</li>
              <li>Encrypted Transactions</li>
              <li>Zero Slippage</li>
              <li>Instant Settlements</li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Security Audit</li>
              <li>Whitepaper</li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Discord</li>
              <li>Twitter</li>
              <li>GitHub</li>
              <li>Forum</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neon-cyan/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CyberDEX. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-neon-cyan flex items-center">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse mr-2"></div>
              Network: Ethereum Mainnet
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BinaryFooter;