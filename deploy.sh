#!/bin/bash

# Exit immediately if a command fails, if an unset variable is used, or if a piped command fails
set -euo pipefail

# Step 1: Verify the build
echo "🛠️ Verifying build and running tests..."
npm run build --if-present
npm test --if-present

# Step 2: Bump patch version
# Note: npm version patch automatically creates a git commit and git tag by default.
# We use --no-git-tag-version to handle the commit manually at the end of the script.
echo "🔢 Bumping npm patch version..."
NEW_VERSION=$(npm version patch --no-git-tag-version)
echo "✅ New version generated: $NEW_VERSION"

# Step 3: Prompt for commit message
echo ""
read -rp "✍️ Enter your commit message: " COMMIT_MSG

# Step 4: Stage package.json and commit
echo "📦 Committing changes..."
git add package.json package-lock.json
git commit -m "$COMMIT_MSG ($NEW_VERSION)"

# Step 5: Optional - Create git tag matching the version
git tag "$NEW_VERSION"

# Step 6: Push to GitHub
echo "📤 Pushing code and tags to origin main..."
git push origin main
git push origin "$NEW_VERSION"

# Step 7: Publish to npm registry
echo "🚀 Publishing to npm registry..."
npm publish --access public

echo "🎉 Release complete: $NEW_VERSION"
