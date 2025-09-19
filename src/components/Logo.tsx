import { Lock } from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* Glowing circle container */}
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple p-0.5 animate-pulse-glow">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            {/* Two arrows with lock */}
            <div className="relative flex items-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="h-4 w-4 text-neon-cyan" />
              </div>
              {/* Arrow pointing right */}
              <svg className="w-3 h-3 text-neon-purple" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {/* Arrow pointing left */}
              <svg className="w-3 h-3 text-neon-pink ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 4.293a1 1 0 010 1.414L5.414 10l4.293 4.293a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-xl animate-pulse-glow"></div>
      </div>
      <span className="text-xl font-bold gradient-text">CyberDEX</span>
    </div>
  );
};

export default Logo;