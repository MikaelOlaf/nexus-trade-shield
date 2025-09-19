import { TrendingUp, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";

const pools = [
  {
    pair: "ETH/USDC",
    tvl: "$1.2M",
    apy: "12.5%",
    volume: "$456K",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    pair: "BTC/ETH", 
    tvl: "$890K",
    apy: "8.7%",
    volume: "$234K",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    pair: "USDC/DAI",
    tvl: "$2.1M", 
    apy: "4.2%",
    volume: "$789K",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    pair: "WETH/USDT",
    tvl: "$567K",
    apy: "15.3%", 
    volume: "$123K",
    gradient: "from-purple-500 to-pink-500",
  },
];

const LiquidityPools = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold gradient-text mb-4">Glowing Liquidity Pools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn yield while providing MEV-protected liquidity to our encrypted trading pools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pools.map((pool, index) => (
            <Card 
              key={pool.pair} 
              className="glass-morphism hover:glow-effect transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 space-y-4">
                {/* Pool Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${pool.gradient} animate-pulse-glow`}></div>
                    <span className="font-bold text-foreground">{pool.pair}</span>
                  </div>
                  <Droplets className="h-5 w-5 text-neon-cyan" />
                </div>

                {/* Pool Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">TVL</span>
                    <span className="font-semibold">{pool.tvl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">APY</span>
                    <span className="font-semibold text-success flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {pool.apy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">24h Volume</span>
                    <span className="font-semibold">{pool.volume}</span>
                  </div>
                </div>

                {/* Pool Action */}
                <div className="pt-4 border-t border-neon-cyan/20">
                  <button className="w-full py-2 text-sm font-medium text-neon-cyan hover:text-neon-purple transition-colors">
                    Add Liquidity
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiquidityPools;