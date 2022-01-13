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
INPUT=answers.csv
OUTPUT=answers_cleaned.csv
LOG=answers_error_log.csv
OLDIFS=$IFS
IFS=','

[ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
while read id question_id body date answerer_name answerer_email reported helpful

BODYLENGTH=${#body}
NAMELENGTH=${#answerer_name}
EMAILLENGTH=${#answerer_email}
do

  if [[ reported -eq 1 ]]
    then reported=true
  else
    reported=false
  fi

  if [[ -n id && -n question_id ]] &&
  [[ -n answerer_name && -n answerer_email && -n reported ]] &&
  [[ BODYLENGTH -lt 1000 && NAMELENGTH -lt 60 && EMAILLENGTH -lt 60 ]]
  then
    echo "writing $id..."
    echo "$id, $question_id, $body, $date, $answerer_name, $answerer_email, $reported, $helpful" >> $OUTPUT
  else
    echo "Invalid entry: $id, $question_id, $body, $date, $answerer_name, $answerer_email, $reported, $helpful" >> $LOG
  fi

done < $INPUT
IFS=$OLDIFS

secs_to_human "$(($(date +%s) - ${start}))"
