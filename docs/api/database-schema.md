# Database Schema

MongoDB schema documentation for the MERN Portfolio application.

## Collections

### Users

Stores user/admin information.

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique),
  phone: String (required),
  aboutMe: String (required),
  password: String (required, hashed),
  avatar: {
    public_id: String,
    url: String
  },
  resume: {
    public_id: String,
    url: String
  },
  portfolioURL: String,
  githubURL: String,
  linkedInURL: String,
  instagramURL: String,
  twitterURL: String,
  facebookURL: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Projects

Stores portfolio projects.

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  gitRepoLink: String,
  projectLink: String,
  technologies: String (required),
  stack: String (required),
  deployed: String (required),
  projectBanner: {
    public_id: String (required),
    url: String (required)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Skills

Stores technical skills.

```javascript
{
  _id: ObjectId,
  title: String (required),
  proficiency: Number (required),
  svg: {
    public_id: String (required),
    url: String (required)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Timeline

Stores education and work experience.

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  timeline: {
    from: String (required),
    to: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Software Applications

Stores software/tools proficiency.

```javascript
{
  _id: ObjectId,
  name: String (required),
  svg: {
    public_id: String (required),
    url: String (required)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Messages

Stores contact form messages.

```javascript
{
  _id: ObjectId,
  senderName: String (required),
  subject: String (required),
  message: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes

Recommended indexes for performance:

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })

// Projects
db.projects.createIndex({ createdAt: -1 })
db.projects.createIndex({ stack: 1 })

// Skills
db.skills.createIndex({ title: 1 })

// Messages
db.messages.createIndex({ createdAt: -1 })
```

## Relationships

This application uses a simple schema without complex relationships:
- One admin user manages all content
- Collections are independent
- No foreign key constraints

## Data Validation

Mongoose schemas include validation:
- Required fields
- String length limits
- Email format validation
- URL format validation
- Number ranges

## Backup Strategy

Regular backups recommended:

```bash
# Backup
node tools/db-backup.js

# Restore
node tools/db-restore.js
```

## Migration Scripts

For schema changes, create migration scripts in `backend/migrations/`.
