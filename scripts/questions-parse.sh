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
INPUT=questions.csv
OUTPUT=questions_cleaned.csv
LOG=questions_error_log.csv

OLDIFS=$IFS
IFS=','
[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read id product_id body date_written asker_name asker_email reported helpful

BODYLENGTH=${#body}
NAMELENGTH=${#asker_name}
EMAILLENGTH=${#asker_email}

do
  if [[ reported -eq 1 ]]
    then reported=true
  else
    reported=false
  fi

  if [[ -n id && -n product_id && -n body ]] &&
  [[ -n date_written && -n asker_name && -n asker_email ]] &&
  [[ BODYLENGTH -lt 1000 && NAMELENGTH -lt 60 && EMAILLENGTH -lt 60 ]]
  then
    echo "writing $id..."
    echo "$id, $product_id, $body, $date_written, $asker_name, $asker_email, $reported, $helpful" >> $OUTPUT
  else
    echo "\n\n\n Invalid entry: $id, $product_id, $body, $date, $asker_name, $asker_email, $reported, $helpful \n\n\n" >> $LOG
  fi
done < $INPUT
IFS=$OLDIFS

secs_to_human "$(($(date +%s) - ${start}))"
