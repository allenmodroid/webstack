

function getDistanceWithLatLong(callback) {
  // do your getDistanceWithLatLong work
  console.log('getDistanceWithLatLong is done');
  callback();
}
function updateDB(callback) {
  // do your updateDB work
  console.log('updateDB is done');
  callback()
}

function printList(callback) {
  // do your printList work
  console.log('printList is done');
  callback();
}

function runSearchInOrder(callback) {
    getDistanceWithLatLong(function() {
        updateDB(function() {
            printList(callback);
        });
    });
}

runSearchInOrder(function(){console.log('finished')});