#!/bin/bash

set -euo pipefail

# Step 1: Verify the build
echo "🛠️ Verifying build and running tests..."
npm run build --if-present
npm test --if-present

# Step 2: Stage all your source code changes first
echo "➕ Staging all current changes..."
git add .

# Step 3: Bump npm patch version
# This modifies package.json and automatically stages it
echo "🔢 Bumping npm patch version..."
NEW_VERSION=$(npm version patch --no-git-tag-version)
echo "✅ New version generated: $NEW_VERSION"

# Step 4: Prompt for commit message
echo ""
read -rp "✍️ Enter your commit message: " USER_MSG
COMMIT_MSG="$USER_MSG ($NEW_VERSION)"

# Step 5: Commit everything
echo "📦 Committing all changes with message: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# Step 6: Create git tag matching the version
git tag "$NEW_VERSION"

# Step 7: Push to GitHub
echo "📤 Pushing code and tags to origin main..."
git push origin main
git push origin "$NEW_VERSION"

# Step 8: Publish to npm registry
echo "🚀 Publishing to npm registry..."
npm publish --access public

echo "🎉 Release complete: $NEW_VERSION"
