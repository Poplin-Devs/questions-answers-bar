#! /bin/bash

start_time=`date +%s`
OLDIFS=$IFS
IFS=','
[ ! -f $1 ] && { echo "$1 file not found in $( pwd )"; exit 99; }
echo "Start: $start_time" >> $TIMELOG
while read id answer_id url
do
  if [[ -n id && -n answer_id && -n url && id -gt 0 ]];
  then
    echo "writing $id..."
    echo "db.photos.insertOne({_id: $id, answer_id: $answer_id, $ url: $url})"
    #$echo "$id, $answer_id, $url" >> "parsed-$1"
  else
    echo "Invalid entry: $id , $answer_id, $url "
  fi
done < $1
IFS=$OLDIFS
echo " It took: $(expr `date +%s` - $start_time) to run"
