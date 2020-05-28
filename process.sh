#!/bin/bash
#
# A script to generate thumbnails and large files from the originals
#
# Can be run against all files in this way:
# IFS=$'\n'; time parallel ./process.sh {} ::: $(find . -type f -iname "*jpg") 
#

readonly OUTPUT_DIR="~/photos"

echo processing "$1"
readonly newName=$( echo $1 | sed 's/^.*\///g' )

convert "$1" -thumbnail 180^x180^ -gravity center -extent 180x180 -quality 70 -auto-orient -strip "$OUTPUT_DIR/thumbs/$newName"
convert "$1" -resize 1200x1200 -quality 75 -auto-orient -strip "$OUTPUT_DIR/large/$newName"


