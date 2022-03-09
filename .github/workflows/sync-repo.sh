#!/bin/sh

# Copied from wei/git-sync
# https://github.com/wei/git-sync
# Modifications
# - Removed '--update-head-ok' on git fetch
# - Removed unused logic

set -e

if [[ -n "$DESTINATION_SSH_PRIVATE_KEY" ]]; then
  mkdir -p /root/.ssh
  echo "$DESTINATION_SSH_PRIVATE_KEY" | sed 's/\\n/\n/g' >/root/.ssh/dst_rsa
  chmod 600 /root/.ssh/dst_rsa
fi

mkdir -p ~/.ssh
cp /root/.ssh/* ~/.ssh/ 2>/dev/null || true

SOURCE_REPO=https://github.com/minoscompare/minos.git
SOURCE_BRANCH="refs/remotes/source/*"
DESTINATION_REPO=git@github.com:minoscompare-deployments/minos.git
DESTINATION_BRANCH="refs/heads/*"

echo "SOURCE=$SOURCE_REPO:$SOURCE_BRANCH"
echo "DESTINATION=$DESTINATION_REPO:$DESTINATION_BRANCH"

git clone "$SOURCE_REPO" /root/source --origin source && cd /root/source

git remote add destination "$DESTINATION_REPO"

# Pull all branches references down locally so subsequent commands can see them
git fetch source '+refs/heads/*:refs/heads/*'

# Print out all branches
git --no-pager branch -a -vv

if [[ -n "$DESTINATION_SSH_PRIVATE_KEY" ]]; then
  # Push using destination ssh key if provided
  git config --local core.sshCommand "/usr/bin/ssh -i ~/.ssh/dst_rsa"
fi

git push destination "${SOURCE_BRANCH}:${DESTINATION_BRANCH}" -f
