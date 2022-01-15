#! /bin/bash

for i in $( ls );
do
  INPUT=$i
  LOG=error_log.csv
  OLDIFS=$IFS
  IFS=','
  [ ! -f $INPUT ] && { echo "$INPUT file not found"; exit 99; }
  while read id answer_id url
  do
    if [[ -n id && -n answer_id && -n url ]];
    then
      echo "writing $id..."
      echo "$id, $answer_id, $url" >> "clean-$i"
    else
      echo "Invalid entry: $id , $answer_id, $url " >> $LOG
    fi
  done < $INPUT
  IFS=$OLDIFS
done
echo "done!"