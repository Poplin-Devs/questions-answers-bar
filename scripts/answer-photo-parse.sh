#!/bin/bash

secs_to_human() {
    if [[ -z ${1} || ${1} -lt 60 ]] ;
    then
        min=0 ; secs="${1}"
    else
        time_mins=$(echo "scale=2; ${1}/60" | bc)
        min=$(echo ${time_mins} | cut -d'.' -f1)
        secs="0.$(echo ${time_mins} | cut -d'.' -f2)"
        secs=$(echo ${secs}*60|bc|awk '{print int($1+0.5)}')
    fi
    echo "Time Elapsed : ${min} minutes and ${secs} seconds."
}

START=$(date +%s)
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

secs_to_human "$(($(date +%s) - ${start}))"
