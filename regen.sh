#!/bin/bash

# This script rebuilds the generated code for the protocol buffers.
# Dependencies:
#  - protoc
#  - goprotobuf (see https://github.com/golang/protobuf for instructions)
#  - go
#  - git

set -e

PKG=github.com/RobotStudio/choreo/msg
PROTO_REPO=https://github.com/RobotStudio/choreo-msg
SVC_REPO=https://github.com/RobotStudio/choreo-svc

function warn() { echo "$@" >&2; }
function error() { warn "$@"; exit 1; }

# Sanity check that the right tools are accessible.
for tool in go git protoc protoc-gen-go; do
  q="$(which $tool)" || error "didn't find $tool"
  warn "$tool: $q"
done

root=$(go list -f '{{.Root}}' $PKG/... | head -n1)
if [ -z "$root" ]; then
  error "cannot find root of $PKG"
fi

remove_dirs=
trap 'rm -rf $remove_dirs' EXIT

if [ -z "$CHOREOMSG" ]; then
  proto_repo_dir=$(mktemp -d -t regen-cds-proto.XXXXXX)
  git clone -q "$PROTO_REPO" "$proto_repo_dir" &
  remove_dirs="$proto_repo_dir"
  # The protoc include directory is actually the "src" directory of the repo.
  protodir="$proto_repo_dir/src"
else
  protodir="$CHOREOMSG/src"
fi

if [ -z "$CHOREOSVC" ]; then
  apidir=$(mktemp -d -t regen-cds-svc.XXXXXX)
  git clone -q "$SVC_REPO" "$apidir" &
  remove_dirs="$remove_dirs $apidir"
else
  apidir="$CHOREOSVC"
fi

wait

# Nuke everything, we'll generate them back
rm -rf choreo-{svc,msg}

go run regen.go -go_out "$root/src" -pkg_prefix "$PKG" "$apidir" "$protodir"

# Sanity check the build.
warn "Checking that the libraries build..."
go build -v ./...

warn "All done!"
