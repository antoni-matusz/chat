//Angular APP
include('app/jquery-script.js');
include('app/module.js');
include('app/homeCtrl.js');
include('app/chatCtrl.js');


function include(url){ 
  document.write('<script type="text/javascript" src="'+ url +'" ></script>'); 
}