#!/bin/bash

# Copies hooks to .git/hooks
#
# Should be run from root directory of project
# using 'sh hooks/setup_hooks.sh'

echo "Moving commit-msg script and making executable"

# Copy commit-msg, backup if already exists, set executable
cp -b hooks/commit-msg .git/hooks/commit-msg && \
chmod u+x .git/hooks/commit-msg

