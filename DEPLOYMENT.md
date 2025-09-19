# Vercel Deployment Guide for Nexus Trade Shield

## Prerequisites

1. GitHub account with access to the repository
2. Vercel account (free tier available)
3. Environment variables ready

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import the repository: `MikaelOlaf/nexus-trade-shield`

### Step 2: Configure Project Settings

1. **Framework Preset**: Select "Vite"
2. **Root Directory**: Leave as default (./)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel dashboard, go to Settings > Environment Variables and add:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_INFURA_API_KEY=your_infura_api_key
```

**Important**: Replace the placeholder values with your actual API keys and project IDs.

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. Go to Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate will be automatically provisioned

## Post-Deployment Configuration

### 1. Verify Environment Variables

Check that all environment variables are properly set:
- Chain ID: 11155111 (Sepolia testnet)
- RPC URL: Infura endpoint
- WalletConnect Project ID: For wallet connections

### 2. Test Wallet Connection

1. Open the deployed application
2. Click "Connect Wallet"
3. Test with MetaMask, WalletConnect, or other supported wallets
4. Verify connection works on Sepolia testnet

### 3. Test FHE Contract Integration

1. Ensure you have Sepolia ETH for gas fees
2. Test creating encrypted trading positions
3. Verify liquidity pool interactions
4. Check risk assessment functionality

## Troubleshooting

### Build Failures

If the build fails, check:
1. All dependencies are properly installed
2. Environment variables are correctly set
3. No TypeScript errors in the codebase

### Wallet Connection Issues

1. Verify WalletConnect Project ID is correct
2. Check RPC URL is accessible
3. Ensure MetaMask is connected to Sepolia testnet

### FHE Contract Issues

1. Verify contract is deployed on Sepolia
2. Check FHEVM is properly configured
3. Ensure encrypted data operations are working

## Monitoring

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. Monitor performance metrics
3. Track user interactions

### Error Tracking

1. Set up error tracking (Sentry recommended)
2. Monitor console errors
3. Track failed transactions

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to repository
2. **HTTPS**: Vercel automatically provides SSL certificates
3. **CORS**: Configure CORS settings for API calls
4. **Rate Limiting**: Implement rate limiting for API endpoints

## Performance Optimization

1. **Build Optimization**: Vite automatically optimizes builds
2. **CDN**: Vercel provides global CDN
3. **Caching**: Configure appropriate cache headers
4. **Image Optimization**: Use Vercel's image optimization features

## Maintenance

### Regular Updates

1. Keep dependencies updated
2. Monitor for security vulnerabilities
3. Update FHE contract as needed
4. Test wallet compatibility regularly

### Backup Strategy

1. Repository is backed up on GitHub
2. Environment variables are stored in Vercel
3. Consider database backups if using external storage

## Support

For issues with:
- **Vercel**: Check Vercel documentation
- **Wallet Integration**: Refer to Wagmi/RainbowKit docs
- **FHE Contract**: Check Zama FHEVM documentation
- **General Issues**: Create GitHub issue in repository

## Cost Considerations

- **Vercel Free Tier**: 100GB bandwidth, 100GB-hours execution time
- **Upgrade Options**: Pro plan for higher limits
- **Custom Domain**: Free with Vercel
- **SSL Certificate**: Included free

## Success Metrics

After deployment, verify:
- ✅ Application loads without errors
- ✅ Wallet connection works
- ✅ FHE contract interactions function
- ✅ Responsive design works on mobile
- ✅ Performance is acceptable
- ✅ SSL certificate is active
- ✅ Custom domain (if used) is working
