const http = require('http');

const services = [
  { name: 'Backend', url: 'http://localhost:4000/health' },
  { name: 'Dashboard', url: 'http://localhost:3001' },
  { name: 'Portfolio', url: 'http://localhost:3000' }
];

async function checkService(service) {
  return new Promise((resolve) => {
    const url = new URL(service.url);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      resolve({
        name: service.name,
        status: res.statusCode === 200 ? '✅ UP' : '❌ DOWN',
        code: res.statusCode
      });
    });

    req.on('error', () => {
      resolve({
        name: service.name,
        status: '❌ DOWN',
        code: 'ERROR'
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        name: service.name,
        status: '❌ TIMEOUT',
        code: 'TIMEOUT'
      });
    });

    req.end();
  });
}

async function checkAllServices() {
  console.log('🏥 Health Check Starting...\n');
  
  const results = await Promise.all(services.map(checkService));
  
  results.forEach(result => {
    console.log(`${result.name}: ${result.status} (${result.code})`);
  });
  
  const allHealthy = results.every(r => r.status.includes('UP'));
  console.log(`\n${allHealthy ? '✅ All services healthy' : '⚠️  Some services are down'}`);
  
  process.exit(allHealthy ? 0 : 1);
}

checkAllServices();
