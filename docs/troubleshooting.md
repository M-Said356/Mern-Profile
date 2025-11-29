# Troubleshooting Guide

Common issues and their solutions.

## Installation Issues

### npm install fails

**Problem:** Dependencies fail to install

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### MongoDB connection error

**Problem:** Cannot connect to MongoDB

**Solutions:**
1. Ensure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Linux/Mac
   sudo systemctl start mongod
   ```

2. Check connection string in `.env`
3. Verify MongoDB port (default: 27017)

## Development Issues

### Port already in use

**Problem:** `Error: listen EADDRINUSE: address already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:4000 | xargs kill -9
```

### CORS errors

**Problem:** Cross-origin request blocked

**Solution:**
- Check CORS configuration in backend
- Ensure frontend URL is whitelisted
- Verify API endpoint URLs

### JWT token issues

**Problem:** Authentication fails

**Solutions:**
1. Check JWT_SECRET in `.env`
2. Clear browser cookies
3. Verify token expiration settings
4. Check middleware configuration

## Build Issues

### Build fails

**Problem:** `npm run build` fails

**Solutions:**
1. Check for TypeScript/ESLint errors
2. Verify all dependencies are installed
3. Clear build cache:
   ```bash
   rm -rf dist
   npm run build
   ```

### Environment variables not working

**Problem:** Variables undefined in production

**Solution:**
- Ensure `.env` file exists
- Check variable names (no typos)
- Restart development server
- For Vite, prefix with `VITE_`

## Docker Issues

### Container won't start

**Problem:** Docker container exits immediately

**Solutions:**
```bash
# Check logs
docker logs <container-name>

# Check container status
docker ps -a

# Rebuild
docker-compose up -d --build
```

### Cannot connect to MongoDB in Docker

**Problem:** Backend can't reach MongoDB

**Solution:**
- Use service name in connection string: `mongodb://mongodb:27017`
- Ensure containers are on same network
- Check docker-compose.yml configuration

## Deployment Issues

### 502 Bad Gateway

**Problem:** Nginx returns 502 error

**Solutions:**
1. Check if backend is running
2. Verify proxy_pass configuration
3. Check firewall rules
4. Review nginx error logs

### Static files not loading

**Problem:** CSS/JS files return 404

**Solutions:**
1. Verify build output directory
2. Check nginx root path
3. Ensure files are copied correctly
4. Check file permissions

## Database Issues

### Data not persisting

**Problem:** Data lost after restart

**Solutions:**
1. Check MongoDB volume configuration
2. Verify data directory permissions
3. Ensure proper shutdown of MongoDB

### Slow queries

**Problem:** Database queries are slow

**Solutions:**
1. Add indexes to frequently queried fields
2. Use MongoDB explain() to analyze queries
3. Optimize query patterns
4. Consider pagination

## Getting Help

If you can't resolve an issue:

1. Check existing GitHub issues
2. Create a new issue with:
   - Error messages
   - Steps to reproduce
   - Environment details
   - Logs
3. Join community discussions
