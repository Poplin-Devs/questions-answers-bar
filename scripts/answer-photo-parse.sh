#!/bin/bash

INPUT=answers_photos.csv
OUTPUT=answers_photos_cleaned.csv
LOG=error_log.csv
OLDIFS=$IFS
IFS=','
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read id answer_id url
do
  if [[ -n id && -n answer_id && -n url ]];
  then
    echo "writing $id..."
    echo "$id, $answer_id, $url" >> $OUTPUT
  else
    echo "Invalid entry: $id , $answer_id, $url " >> $LOG
  fi
done < $INPUT
echo "done!"
IFS=$OLDIFS