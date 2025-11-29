# Testing Guide

Comprehensive testing strategies for the MERN Portfolio application.

## Testing Pyramid

```
       /\
      /  \     E2E Tests (Few)
     /____\
    /      \   Integration Tests (Some)
   /________\
  /          \ Unit Tests (Many)
 /____________\
```

## Unit Testing

### Backend Unit Tests

```javascript
// Example: User Controller Test
describe('UserController', () => {
  test('should create user', async () => {
    const userData = { email: 'test@example.com' };
    const user = await UserController.create(userData);
    expect(user.email).toBe(userData.email);
  });
});
```

### Frontend Unit Tests

```javascript
// Example: Component Test
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## Integration Testing

Test API endpoints and database interactions:

```javascript
describe('API Integration', () => {
  test('POST /api/users creates user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com' });
    
    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test@example.com');
  });
});
```

## E2E Testing

Test complete user flows:

```javascript
// Using Playwright or Cypress
test('user can login', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Running Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Test Coverage

Aim for:
- Unit tests: 80%+ coverage
- Integration tests: Key flows
- E2E tests: Critical paths

## Best Practices

- Write tests first (TDD)
- Test behavior, not implementation
- Keep tests simple and readable
- Use descriptive test names
- Mock external dependencies
- Clean up after tests
