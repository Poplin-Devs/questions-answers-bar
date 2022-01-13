#!/bin/bash

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
    echo "writing... $id"
    echo "$id, $question_id, $body, $date, $answerer_name, $answerer_email, $reported, $helpful" >> $OUTPUT
  else
    echo "Invalid entry: $id, $question_id, $body, $date, $answerer_name, $answerer_email, $reported, $helpful" >> $LOG
  fi

done < $INPUT
IFS=$OLDIFS

echo "done!"
