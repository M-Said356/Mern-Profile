# Kubernetes Guide

Complete guide for deploying the MERN Portfolio on Kubernetes.

## Prerequisites

- Kubernetes cluster (minikube, GKE, EKS, AKS)
- kubectl installed and configured
- Docker images built and pushed to registry

## Architecture

```
┌─────────────────────────────────────────┐
│         Ingress Controller              │
└─────────────────────────────────────────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐
│Backend │ │Dashboard│ │Portfolio│
│Service │ │Service │ │Service │
└────────┘ └────────┘ └────────┘
    │         │         │
┌────────┐ ┌────────┐ ┌────────┐
│Backend │ │Dashboard│ │Portfolio│
│  Pod   │ │  Pod   │ │  Pod   │
└────────┘ └────────┘ └────────┘
```

## Deployment Files

Located in `.devops/kubernetes/`:
- `backend-deployment.yml` - Backend API deployment
- `frontend-deployment.yml` - Dashboard & Portfolio deployments

## Step-by-Step Deployment

### 1. Create Namespace

```bash
kubectl create namespace mern-portfolio
kubectl config set-context --current --namespace=mern-portfolio
```

### 2. Create Secrets

```bash
kubectl create secret generic app-secrets \
  --from-literal=mongo-uri='mongodb://mongo:27017/portfolio' \
  --from-literal=jwt-secret='your_jwt_secret_here'
```

### 3. Deploy MongoDB

```bash
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
spec:
  serviceName: mongodb
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:7
        ports:
        - containerPort: 27017
        volumeMounts:
        - name: mongo-data
          mountPath: /data/db
  volumeClaimTemplates:
  - metadata:
      name: mongo-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb
spec:
  selector:
    app: mongodb
  ports:
  - port: 27017
EOF
```

### 4. Deploy Backend

```bash
kubectl apply -f .devops/kubernetes/backend-deployment.yml
```

### 5. Deploy Frontend

```bash
kubectl apply -f .devops/kubernetes/frontend-deployment.yml
```

### 6. Verify Deployment

```bash
kubectl get pods
kubectl get services
kubectl get deployments
```

## Scaling

```bash
# Scale backend
kubectl scale deployment backend --replicas=3

# Scale frontend
kubectl scale deployment portfolio --replicas=2
kubectl scale deployment dashboard --replicas=2
```

## Monitoring

```bash
# Watch pods
kubectl get pods -w

# View logs
kubectl logs -f deployment/backend

# Describe pod
kubectl describe pod <pod-name>
```

## Updating Deployments

```bash
# Update image
kubectl set image deployment/backend backend=new-image:tag

# Rollout status
kubectl rollout status deployment/backend

# Rollback
kubectl rollout undo deployment/backend
```

## Clean Up

```bash
kubectl delete -f .devops/kubernetes/
kubectl delete secret app-secrets
kubectl delete namespace mern-portfolio
```
