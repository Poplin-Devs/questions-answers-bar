#! /bin/bash



function parse() {

  OLDIFS=$IFS
  IFS=','
  [ ! -f $1 ] && { echo "$1 file not found in $( pwd )"; exit 99; }
  while read id answer_id url
    do
      if [[ -n id && -n answer_id && -n url && id -gt 0 ]];
      then
        mongo --eval "db.photos.insertOne({_id: $id, answer_id: $answer_id, url: $url})"
        # echo "$id, $answer_id, $url" >> "parsed-$1"
      else
        echo "Invalid entry: $id , $answer_id, $url "
      fi
    done < $1
    IFS=$OLDIFS
}


SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
LOG="$SCRIPT_DIR/log.txt"
start_time=`date +%s`

cd ../data/photos;

for file in *
  do
   echo "we're in.. $(pwd)"
   echo "working on : $file"
   parse $file
  done

echo " It took: $(expr `date +%s` - $start_time)ms to run parse-photo-dir.sh" >> $LOG

