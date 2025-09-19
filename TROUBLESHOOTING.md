# Troubleshooting Guide for Nexus Trade Shield

## Common Build Issues and Solutions

### 1. Lovable Dependencies Error

**Error**: `Cannot find package 'lovable-tagger'`

**Solution**: 
- ✅ Fixed: Removed all lovable-tagger references from vite.config.ts
- ✅ Fixed: Updated index.html to remove lovable meta tags
- ✅ Fixed: Removed lovable-tagger from package.json

### 2. Package Version Conflicts

**Error**: `URI malformed` or package fetch errors

**Solutions**:
- Updated sonner to version ^1.4.0 for better compatibility
- Use npm ci instead of npm install for production builds
- Clear npm cache: `npm cache clean --force`

### 3. Environment Variables Missing

**Error**: Wallet connection fails or RPC errors

**Required Environment Variables**:
```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

### 4. Vercel Build Configuration

**Build Settings**:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm ci`

### 5. TypeScript Errors

**Common Issues**:
- Missing type definitions for Web3 libraries
- Import path issues with @ alias

**Solutions**:
- Ensure all @types packages are installed
- Check tsconfig.json paths configuration
- Verify import statements match file structure

### 6. Wallet Connection Issues

**MetaMask Connection**:
- Ensure MetaMask is installed and unlocked
- Check that Sepolia testnet is selected
- Verify RPC URL is accessible

**WalletConnect Issues**:
- Verify PROJECT_ID is correct
- Check network connectivity
- Ensure proper CORS settings

### 7. FHE Contract Integration

**Common Issues**:
- Contract not deployed on Sepolia
- FHEVM not properly configured
- Encrypted data operations failing

**Solutions**:
- Deploy contract to Sepolia testnet
- Verify FHEVM is running
- Check encrypted data format

### 8. Performance Issues

**Build Optimization**:
- Enable Vite build optimizations
- Use dynamic imports for large libraries
- Optimize bundle size with tree shaking

**Runtime Performance**:
- Implement lazy loading for components
- Use React.memo for expensive components
- Optimize re-renders with useCallback/useMemo

### 9. Network Issues

**RPC Connection Problems**:
- Test RPC URL accessibility
- Use fallback RPC providers
- Implement retry logic for failed requests

**API Rate Limiting**:
- Implement request throttling
- Use multiple RPC endpoints
- Cache frequently accessed data

### 10. Security Considerations

**Environment Variables**:
- Never commit .env files
- Use Vercel environment variables
- Rotate API keys regularly

**HTTPS Requirements**:
- Ensure all external requests use HTTPS
- Configure CORS properly
- Validate all user inputs

## Debugging Steps

### 1. Check Build Logs
```bash
npm run build
```

### 2. Test Locally
```bash
npm run dev
```

### 3. Verify Dependencies
```bash
npm ls
```

### 4. Check Environment Variables
```bash
echo $VITE_CHAIN_ID
echo $VITE_RPC_URL
```

### 5. Test Wallet Connection
- Open browser console
- Check for Web3 provider errors
- Verify network connection

## Vercel-Specific Issues

### Build Failures
1. Check Vercel build logs
2. Verify environment variables are set
3. Ensure all dependencies are in package.json
4. Check for TypeScript errors

### Deployment Issues
1. Verify domain configuration
2. Check SSL certificate status
3. Test custom domain DNS settings
4. Monitor deployment logs

### Performance Issues
1. Enable Vercel Analytics
2. Check bundle size
3. Optimize images and assets
4. Use Vercel's edge functions if needed

## Getting Help

### GitHub Issues
- Create detailed issue with error logs
- Include environment information
- Provide steps to reproduce

### Community Support
- Discord: Nexus Trade Shield community
- Twitter: @nexustradeshield
- Documentation: Check README.md

### Professional Support
- Contact development team
- Schedule consultation call
- Request custom implementation

## Prevention

### Regular Maintenance
- Keep dependencies updated
- Monitor security vulnerabilities
- Test wallet compatibility regularly
- Update FHE contract as needed

### Monitoring
- Set up error tracking
- Monitor performance metrics
- Track user interactions
- Monitor API usage

### Backup Strategy
- Repository backups on GitHub
- Environment variable backups
- Database backups if applicable
- Configuration file backups
