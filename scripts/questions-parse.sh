#!/bin/bash

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
    echo "$id, $product_id, $body, $date_written, $asker_name, $asker_email, $reported, $helpful" >> $OUTPUT
  else
    echo "\n\n\n Invalid entry: $id, $product_id, $body, $date, $asker_name, $asker_email, $reported, $helpful \n\n\n" >> $LOG
  fi

done < $INPUT
IFS=$OLDIFS