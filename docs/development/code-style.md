# Code Style Guide

Coding standards and style guidelines for the MERN Portfolio project.

## JavaScript/Node.js

### General Rules

- Use ES6+ features
- Use `const` by default, `let` when reassignment needed
- Avoid `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation

### Naming Conventions

```javascript
// Variables and functions: camelCase
const userName = 'John';
function getUserData() {}

// Classes: PascalCase
class UserController {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';

// Private methods: _prefixed
class User {
  _validateEmail() {}
}
```

### File Structure

```javascript
// 1. Imports
const express = require('express');
const { User } = require('./models');

// 2. Constants
const PORT = 3000;

// 3. Functions/Classes
class UserService {
  // ...
}

// 4. Exports
module.exports = { UserService };
```

## React/JSX

### Component Structure

```jsx
// Imports
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Component
export function UserProfile({ userId }) {
  // Hooks
  const [user, setUser] = useState(null);
  
  // Effects
  useEffect(() => {
    fetchUser();
  }, [userId]);
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Props

```jsx
// Destructure props
function Button({ onClick, children, variant = 'primary' }) {
  return <button onClick={onClick}>{children}</button>;
}

// PropTypes or TypeScript
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
};
```

## Formatting

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### ESLint Rules

- No unused variables
- No console.log in production
- Consistent return statements
- Proper error handling

## Comments

### JSDoc

```javascript
/**
 * Fetches user data from the API
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} User data
 * @throws {Error} If user not found
 */
async function fetchUser(userId) {
  // Implementation
}
```

### Inline Comments

```javascript
// Good: Explain WHY, not WHAT
// Using setTimeout to debounce API calls
setTimeout(fetchData, 300);

// Bad: Obvious comment
// Set x to 5
const x = 5;
```

## Best Practices

- Keep functions small (< 50 lines)
- Single responsibility principle
- DRY (Don't Repeat Yourself)
- Meaningful variable names
- Handle errors properly
- Write tests
