// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract NexusTradeShield is SepoliaConfig {
    using FHE for *;
    
    struct TradePosition {
        euint32 positionId;
        euint32 amount;
        euint32 entryPrice;
        euint32 currentPrice;
        euint32 stopLoss;
        euint32 takeProfit;
        ebool isLong;
        ebool isActive;
        address trader;
        uint256 timestamp;
        string symbol;
    }
    
    struct LiquidityPool {
        euint32 poolId;
        euint32 totalLiquidity;
        euint32 availableLiquidity;
        euint32 utilizationRate;
        ebool isActive;
        address provider;
        uint256 timestamp;
        string poolName;
    }
    
    struct RiskAssessment {
        euint32 riskScore;
        euint32 volatility;
        euint32 correlation;
        ebool isHighRisk;
        address assessor;
        uint256 timestamp;
    }
    
    mapping(uint256 => TradePosition) public positions;
    mapping(uint256 => LiquidityPool) public pools;
    mapping(uint256 => RiskAssessment) public riskAssessments;
    mapping(address => euint32) public traderReputation;
    mapping(address => euint32) public liquidityProviderReputation;
    
    uint256 public positionCounter;
    uint256 public poolCounter;
    uint256 public riskCounter;
    
    address public owner;
    address public riskManager;
    
    event PositionOpened(uint256 indexed positionId, address indexed trader, string symbol);
    event PositionClosed(uint256 indexed positionId, address indexed trader, uint32 pnl);
    event LiquidityAdded(uint256 indexed poolId, address indexed provider, uint32 amount);
    event LiquidityRemoved(uint256 indexed poolId, address indexed provider, uint32 amount);
    event RiskAssessed(uint256 indexed riskId, address indexed assessor, uint32 riskScore);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _riskManager) {
        owner = msg.sender;
        riskManager = _riskManager;
    }
    
    function openPosition(
        string memory _symbol,
        externalEuint32 _amount,
        externalEuint32 _entryPrice,
        externalEuint32 _stopLoss,
        externalEuint32 _takeProfit,
        ebool _isLong,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_symbol).length > 0, "Symbol cannot be empty");
        
        uint256 positionId = positionCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalAmount = FHE.fromExternal(_amount, inputProof);
        euint32 internalEntryPrice = FHE.fromExternal(_entryPrice, inputProof);
        euint32 internalStopLoss = FHE.fromExternal(_stopLoss, inputProof);
        euint32 internalTakeProfit = FHE.fromExternal(_takeProfit, inputProof);
        
        positions[positionId] = TradePosition({
            positionId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            entryPrice: internalEntryPrice,
            currentPrice: FHE.asEuint32(0), // Will be updated by price feeds
            stopLoss: internalStopLoss,
            takeProfit: internalTakeProfit,
            isLong: _isLong,
            isActive: FHE.asEbool(true),
            trader: msg.sender,
            timestamp: block.timestamp,
            symbol: _symbol
        });
        
        emit PositionOpened(positionId, msg.sender, _symbol);
        return positionId;
    }
    
    function closePosition(
        uint256 positionId,
        externalEuint32 _currentPrice,
        bytes calldata inputProof
    ) public returns (uint32) {
        require(positions[positionId].trader == msg.sender, "Only position owner can close");
        require(positions[positionId].isActive, "Position is not active");
        
        euint32 internalCurrentPrice = FHE.fromExternal(_currentPrice, inputProof);
        positions[positionId].currentPrice = internalCurrentPrice;
        positions[positionId].isActive = FHE.asEbool(false);
        
        // Calculate PnL (simplified - in real implementation would use FHE operations)
        // This would be calculated off-chain due to FHE limitations
        uint32 pnl = 0; // FHE.decrypt(calculatedPnL) - will be decrypted off-chain
        
        emit PositionClosed(positionId, msg.sender, pnl);
        return pnl;
    }
    
    function addLiquidity(
        string memory _poolName,
        externalEuint32 _amount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_poolName).length > 0, "Pool name cannot be empty");
        
        uint256 poolId = poolCounter++;
        
        euint32 internalAmount = FHE.fromExternal(_amount, inputProof);
        
        pools[poolId] = LiquidityPool({
            poolId: FHE.asEuint32(0), // Will be set properly later
            totalLiquidity: internalAmount,
            availableLiquidity: internalAmount,
            utilizationRate: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            provider: msg.sender,
            timestamp: block.timestamp,
            poolName: _poolName
        });
        
        emit LiquidityAdded(poolId, msg.sender, 0); // Amount will be decrypted off-chain
        return poolId;
    }
    
    function removeLiquidity(
        uint256 poolId,
        externalEuint32 _amount,
        bytes calldata inputProof
    ) public {
        require(pools[poolId].provider == msg.sender, "Only pool provider can remove liquidity");
        require(pools[poolId].isActive, "Pool is not active");
        
        euint32 internalAmount = FHE.fromExternal(_amount, inputProof);
        
        // Update pool liquidity (simplified)
        pools[poolId].availableLiquidity = FHE.sub(pools[poolId].availableLiquidity, internalAmount);
        
        emit LiquidityRemoved(poolId, msg.sender, 0); // Amount will be decrypted off-chain
    }
    
    function assessRisk(
        uint256 positionId,
        euint32 _riskScore,
        euint32 _volatility,
        euint32 _correlation
    ) public returns (uint256) {
        require(msg.sender == riskManager, "Only risk manager can assess risk");
        require(positions[positionId].trader != address(0), "Position does not exist");
        
        uint256 riskId = riskCounter++;
        
        ebool isHighRisk = FHE.gt(_riskScore, FHE.asEuint32(70)); // Risk score > 70 is high risk
        
        riskAssessments[riskId] = RiskAssessment({
            riskScore: _riskScore,
            volatility: _volatility,
            correlation: _correlation,
            isHighRisk: isHighRisk,
            assessor: msg.sender,
            timestamp: block.timestamp
        });
        
        emit RiskAssessed(riskId, msg.sender, 0); // Risk score will be decrypted off-chain
        return riskId;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == riskManager, "Only risk manager can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is trader or liquidity provider based on context
        if (positions[positionCounter - 1].trader == user) {
            traderReputation[user] = reputation;
        } else {
            liquidityProviderReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getPositionInfo(uint256 positionId) public view returns (
        string memory symbol,
        uint8 amount,
        uint8 entryPrice,
        uint8 currentPrice,
        uint8 stopLoss,
        uint8 takeProfit,
        bool isLong,
        bool isActive,
        address trader,
        uint256 timestamp
    ) {
        TradePosition storage position = positions[positionId];
        return (
            position.symbol,
            0, // FHE.decrypt(position.amount) - will be decrypted off-chain
            0, // FHE.decrypt(position.entryPrice) - will be decrypted off-chain
            0, // FHE.decrypt(position.currentPrice) - will be decrypted off-chain
            0, // FHE.decrypt(position.stopLoss) - will be decrypted off-chain
            0, // FHE.decrypt(position.takeProfit) - will be decrypted off-chain
            false, // FHE.decrypt(position.isLong) - will be decrypted off-chain
            false, // FHE.decrypt(position.isActive) - will be decrypted off-chain
            position.trader,
            position.timestamp
        );
    }
    
    function getPoolInfo(uint256 poolId) public view returns (
        string memory poolName,
        uint8 totalLiquidity,
        uint8 availableLiquidity,
        uint8 utilizationRate,
        bool isActive,
        address provider,
        uint256 timestamp
    ) {
        LiquidityPool storage pool = pools[poolId];
        return (
            pool.poolName,
            0, // FHE.decrypt(pool.totalLiquidity) - will be decrypted off-chain
            0, // FHE.decrypt(pool.availableLiquidity) - will be decrypted off-chain
            0, // FHE.decrypt(pool.utilizationRate) - will be decrypted off-chain
            false, // FHE.decrypt(pool.isActive) - will be decrypted off-chain
            pool.provider,
            pool.timestamp
        );
    }
    
    function getRiskAssessmentInfo(uint256 riskId) public view returns (
        uint8 riskScore,
        uint8 volatility,
        uint8 correlation,
        bool isHighRisk,
        address assessor,
        uint256 timestamp
    ) {
        RiskAssessment storage risk = riskAssessments[riskId];
        return (
            0, // FHE.decrypt(risk.riskScore) - will be decrypted off-chain
            0, // FHE.decrypt(risk.volatility) - will be decrypted off-chain
            0, // FHE.decrypt(risk.correlation) - will be decrypted off-chain
            false, // FHE.decrypt(risk.isHighRisk) - will be decrypted off-chain
            risk.assessor,
            risk.timestamp
        );
    }
    
    function getTraderReputation(address trader) public view returns (uint8) {
        return 0; // FHE.decrypt(traderReputation[trader]) - will be decrypted off-chain
    }
    
    function getLiquidityProviderReputation(address provider) public view returns (uint8) {
        return 0; // FHE.decrypt(liquidityProviderReputation[provider]) - will be decrypted off-chain
    }
    
    function emergencyStop() public {
        require(msg.sender == owner, "Only owner can trigger emergency stop");
        // In emergency, all positions would be closed and liquidity returned
        // This is a simplified implementation
    }
}
