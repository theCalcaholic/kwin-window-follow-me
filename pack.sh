#!/usr/bin/bash

set -ex

cd "$(dirname "$0")"

project=window-follow-me
version="$(jq -r '.KPlugin.Version' < metadata.json)"

tmpdir="$(mktemp -d)"
trap "rm -rf '${tmpdir}'" EXIT

rm -f "${project}_${version}.kwinscript"

cp -ra "." "${tmpdir}/${project}"
WD="$PWD"
(
  cd "${tmpdir}"
  rm -rf "${project}/pack.sh" "${project}/.git"
  zip -r "$WD/${project}_${version}.kwinscript" "${project}"
)


