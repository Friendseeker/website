#!/bin/bash

set -o errexit  # abort on nonzero exitstatus
set -o nounset  # abort on unbound variable
set -o pipefail # don't hide errors within pipes

locale=""

show_help() {
    echo "Usage: $0 <locale>"
}

if [[ $# -eq 0 ]]; then
    show_help
    exit 1
fi

while [[ $# -gt 0 ]]; do
    case "$1" in
        *)
            locale="$1"
            shift
            ;;
    esac
done

MDBOOK_OUTPUT='{"xgettext": { "depth": 3 }}' mdbook build -d po

find po -type f -name "*.pot" | while read -r potfile; do
    pofile="${potfile%.pot}.$locale.po"
    msginit --locale=$locale --input="$potfile" --no-translator --output="$pofile"
done
