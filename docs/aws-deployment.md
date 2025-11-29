# AWS Deployment Guide

Deploy MERN Portfolio to Amazon Web Services.

## Architecture Options

### Option 1: EC2 + MongoDB Atlas
- EC2 for backend
- S3 + CloudFront for frontend
- MongoDB Atlas for database

### Option 2: Elastic Beanstalk
- Managed application deployment
- Auto-scaling
- Load balancing

### Option 3: ECS with Fargate
- Containerized deployment
- Serverless containers
- Auto-scaling

## Prerequisites

- AWS Account
- AWS CLI installed
- IAM user with appropriate permissions

## Deploy Backend to EC2

### 1. Launch EC2 Instance

```bash
# Create security group
aws ec2 create-security-group \
  --group-name mern-portfolio-sg \
  --description "Security group for MERN Portfolio"

# Allow HTTP, HTTPS, SSH
aws ec2 authorize-security-group-ingress \
  --group-name mern-portfolio-sg \
  --protocol tcp --port 22 --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-name mern-portfolio-sg \
  --protocol tcp --port 80 --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-name mern-portfolio-sg \
  --protocol tcp --port 443 --cidr 0.0.0.0/0
```

### 2. Connect and Setup

```bash
# SSH into instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/Mostafa-SAID7/Mern-Profile.git
cd Mern-Profile/backend

# Install dependencies
npm ci --production

# Configure environment
nano .env

# Start with PM2
pm2 start server.js --name portfolio-api
pm2 save
pm2 startup
```

## Deploy Frontend to S3 + CloudFront

### 1. Build Frontend

```bash
cd portfolio
npm run build
```

### 2. Create S3 Bucket

```bash
aws s3 mb s3://your-portfolio-bucket
aws s3 website s3://your-portfolio-bucket \
  --index-document index.html \
  --error-document index.html
```

### 3. Upload Files

```bash
aws s3 sync dist/ s3://your-portfolio-bucket
```

### 4. Create CloudFront Distribution

```bash
aws cloudfront create-distribution \
  --origin-domain-name your-portfolio-bucket.s3.amazonaws.com
```

## MongoDB Atlas Setup

1. Create cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist AWS IP ranges
3. Get connection string
4. Update backend .env

## Elastic Beanstalk Deployment

### 1. Install EB CLI

```bash
pip install awsebcli
```

### 2. Initialize Application

```bash
cd backend
eb init -p node.js-18 mern-portfolio-api
```

### 3. Create Environment

```bash
eb create production-env
```

### 4. Deploy

```bash
eb deploy
```

## ECS Deployment

### 1. Create ECR Repository

```bash
aws ecr create-repository --repository-name mern-portfolio-backend
```

### 2. Build and Push Docker Image

```bash
docker build -t mern-portfolio-backend .
docker tag mern-portfolio-backend:latest \
  your-account.dkr.ecr.region.amazonaws.com/mern-portfolio-backend:latest
docker push your-account.dkr.ecr.region.amazonaws.com/mern-portfolio-backend:latest
```

### 3. Create ECS Cluster

```bash
aws ecs create-cluster --cluster-name mern-portfolio-cluster
```

### 4. Create Task Definition

See AWS Console or use CLI with JSON definition.

## Cost Optimization

- Use t3.micro for development
- Enable auto-scaling
- Use S3 lifecycle policies
- CloudFront caching
- Reserved instances for production

## Monitoring

- CloudWatch for logs
- X-Ray for tracing
- CloudWatch Alarms
- AWS Cost Explorer
