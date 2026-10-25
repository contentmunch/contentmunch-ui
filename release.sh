#!/bin/bash

set -euo pipefail

# Step 1: Verify the build
echo "🛠️ Verifying build and running tests..."
npm run build --if-present
npm test --if-present

# Step 2: Bump npm patch version
echo "🔢 Bumping npm patch version..."
NEW_VERSION=$(npm version patch --no-git-tag-version)
echo "✅ New version generated: $NEW_VERSION"

# Step 3: Show what will be committed (Storybook is built and deployed by Cloudflare Pages on push), then prompt for the message.
# Everything is staged, new files included.
echo ""
echo "📋 These changes will be committed:"
git status --short
# a secret must never ride along with "add everything"; an example file (.env.example) is fine
if git status --short -uall | grep -Eq '(^|[ /])(\.env(\.[A-Za-z0-9_.-]+)?|deploy\.env|[^ /]*\.pem|id_rsa[^ /]*)$' \
    && git status --short -uall | grep -E '(^|[ /])(\.env(\.[A-Za-z0-9_.-]+)?|deploy\.env|[^ /]*\.pem|id_rsa[^ /]*)$' | grep -Evq '\.(example|sample)$'; then
    echo "🛑 A file that looks like a secret is among them (listed above). Add it to .gitignore or remove it, then run this again."
    exit 1
fi
read -rp "✍️ Enter your commit message: " USER_MSG
COMMIT_MSG="$USER_MSG ($NEW_VERSION)"

# Step 4: Commit everything together
echo "📦 Committing all changes with message: $COMMIT_MSG"
git add -A
git commit -m "$COMMIT_MSG"

# Step 5: Create git tag matching the version
git tag "$NEW_VERSION"

# Step 6: Push to GitHub
echo "📤 Pushing code and tags to origin main..."
git push origin main
git push origin "$NEW_VERSION"

# Step 7: Publish to npm registry
echo "🚀 Publishing to npm registry..."
npm publish --access public

echo "🎉 Release complete: $NEW_VERSION"
