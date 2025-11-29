# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please send an email to security@example.com or create a private security advisory on GitHub.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to Include

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Depends on severity

## Security Best Practices

### For Developers

1. **Never commit sensitive data** (.env files, API keys, passwords)
2. **Use environment variables** for all secrets
3. **Keep dependencies updated** (`npm audit fix`)
4. **Validate all user inputs**
5. **Use HTTPS** in production
6. **Implement rate limiting**
7. **Use security headers** (Helmet.js)
8. **Regular security audits**

### For Deployment

1. **Use strong JWT secrets** (32+ characters)
2. **Enable CORS** with specific origins
3. **Use HTTPS/SSL certificates**
4. **Implement firewall rules**
5. **Regular backups**
6. **Monitor logs** for suspicious activity
7. **Keep systems updated**
8. **Use secure MongoDB connections**

## Known Security Considerations

- JWT tokens stored in HTTP-only cookies
- Password hashing with bcrypt
- Input validation on all endpoints
- File upload restrictions
- CORS configuration required

## Security Tools

Run security checks:

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

## Disclosure Policy

- Security issues will be disclosed after a fix is available
- Credit will be given to reporters (if desired)
- CVE IDs will be requested for significant vulnerabilities
