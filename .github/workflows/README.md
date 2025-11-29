# GitHub Actions Workflows

This directory contains all automated workflows for the MERN Portfolio project.

## 📋 Workflows Overview

### Core Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI Pipeline** | Push, PR | Run tests, linting, and builds |
| **CD Pipeline** | Push to main, Release | Deploy to production |
| **Auto Fix** | Push, PR | Automatically fix code formatting |
| **Code Review** | PR | Automated code review and feedback |

### Security & Quality

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CodeQL** | Push, PR, Schedule | Security vulnerability scanning |
| **Codacy** | Push, PR, Schedule | Code quality analysis |
| **Dependency Review** | PR | Review dependency changes |

### Automation

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **Auto Labeler** | PR, Issues | Automatically label PRs and issues |
| **Welcome** | First issue/PR | Welcome new contributors |
| **Stale** | Schedule (daily) | Mark and close stale issues/PRs |
| **Docker Build** | Push, Tags | Build and push Docker images |

## 🚀 Workflow Details

### CI Pipeline (`ci.yml`)

Runs on every push and pull request to `main` and `develop` branches.

**Jobs:**
- **backend-test**: Tests backend on Node 18.x and 20.x
- **dashboard-build**: Builds dashboard and uploads artifacts
- **portfolio-build**: Builds portfolio and uploads artifacts
- **quality-check**: Runs documentation tools and reports

**Features:**
- Matrix testing across Node versions
- Test coverage upload to Codecov
- Artifact uploads for builds
- PR comments with status

### CD Pipeline (`cd.yml`)

Deploys to production on push to `main` or manual trigger.

**Jobs:**
- Install dependencies
- Run tests
- Build applications
- Deploy to production
- Create deployment status

**Environment:**
- Name: `production`
- Requires approval (configure in GitHub settings)

### Auto Fix (`auto-fix.yml`)

Automatically fixes code formatting and linting issues.

**Actions:**
- Runs Prettier on all files
- Fixes ESLint issues
- Commits and pushes changes

**Triggers:**
- Push to main/develop
- Pull requests
- Manual dispatch

### Code Review (`code-review.yml`)

Provides automated code review on pull requests.

**Checks:**
- ESLint violations
- Code formatting
- Security vulnerabilities
- Secret detection

**Output:**
- Comments on PR with findings
- Suggestions for improvements

### Auto Labeler (`labeler.yml`)

Automatically labels PRs and issues based on:
- Changed files (backend, frontend, docs, etc.)
- PR size (XS, S, M, L, XL)
- New issues get `triage` label

**Configuration:** `.github/labeler.yml`

### Welcome (`welcome.yml`)

Welcomes first-time contributors with:
- Helpful information
- Links to documentation
- Checklist for contributions

### Stale (`stale.yml`)

Manages stale issues and PRs:
- Issues: Stale after 30 days, closed after 7 more days
- PRs: Stale after 14 days, closed after 7 more days
- Exempt labels: `pinned`, `security`, `bug`

## 🔧 Configuration

### Secrets Required

Add these secrets in repository settings:

```
GITHUB_TOKEN          # Automatically provided
VERCEL_TOKEN          # For Vercel deployment (optional)
CODACY_PROJECT_TOKEN  # For Codacy analysis (optional)
CODECOV_TOKEN         # For code coverage (optional)
```

### Environment Setup

Configure production environment:
1. Go to Settings → Environments
2. Create `production` environment
3. Add protection rules (optional)
4. Add environment secrets

## 📊 Status Badges

Add these to your README:

```markdown
[![CI Pipeline](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/ci.yml/badge.svg)](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/ci.yml)
[![CD Pipeline](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/cd.yml/badge.svg)](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/cd.yml)
[![CodeQL](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/codeql.yml/badge.svg)](https://github.com/Mostafa-SAID7/Mern-Profile/actions/workflows/codeql.yml)
```

## 🛠️ Customization

### Modify Workflows

1. Edit workflow files in `.github/workflows/`
2. Test locally with [act](https://github.com/nektos/act)
3. Commit and push changes
4. Monitor workflow runs in Actions tab

### Add New Workflows

1. Create new `.yml` file in `.github/workflows/`
2. Define triggers and jobs
3. Test and deploy

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)

## 🤝 Contributing

When adding or modifying workflows:
- Test thoroughly
- Document changes
- Update this README
- Follow best practices
