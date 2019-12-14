function storage(type,target,time,name){
  this.type=type;
  this.target=target.toString();
  this.time=time;
  this.name=name;
}

function random( s){
return Math.floor(Math.random()*s);
}
function generation(target){
 
    for(var i=0;i<26;i++)freq[i]=0;
    var x=document.getElementById("r").value;
    var par=document.getElementById("parent"); 
    var pic=document.getElementById("im");
   par.innerHTML="";
   pic.src="";
  pic.style="width: ;height: ;border: ";
   if(x>26||x<1||isNaN(x)){
     par.innerHTML="Entert correct Value ";
     return;
   }
   for(var i=0;i<x;i++){
     var rad=random(26);
     while(freq[rad]){
         rad=random(26);
   }
     freq[rad]=1;
     var node=document.createElement("button");
     node.setAttribute("class","bu");
     var text=document.createTextNode(list[rad]);
     node.appendChild(text);
     par.appendChild(node);
     node.addEventListener("click",function(e){
      pic.setAttribute("src",("Animals/"+this.textContent+".jpg"));
      var btns=new storage(e.type,e.target,new Date(),e.target.textContent);
      if(localStorage[btns.name]){
        var button1=JSON.parse(localStorage.getItem(btns.name));
      button1.push({"Type":btns.type,"Target":btns.target,"Time":btns.time,"Name":btns.name});
      localStorage.setItem(btns.name,JSON.stringify(button1));
      }
      else{
        var json=[{"Type":btns.type,"Target":btns.target,"Time":btns.time,"Name":btns.name}];
      localStorage.setItem(btns.name,JSON.stringify(json));
      }
    });
 }
 var generate1=new storage(target.type,target.target,new Date(),"generate");
 if(localStorage[generate1.name]){
  var gens=JSON.parse(localStorage.getItem(generate1.name));
  gens.push({"Type":generate1.type,"Target":generate1.target,"Time":generate1.time,"Name":generate1.name});
  localStorage.setItem(generate1.name,JSON.stringify(gens));
 }
 else{
   var jason=[{"Type":generate1.type,"Target":generate1.target,"Time":generate1.time,"Name":generate1.name}]
 localStorage.setItem(generate1.name,JSON.stringify(jason)); 
 }
}
var list=new Array();
var freq=new Array();
for(var i=0;i<=25;i++)list.push(String.fromCharCode(65+i));
for(var i=0;i<26;i++)freq.push(0);
var gen=document.getElementById("g");
gen.addEventListener("click",function(e){
  generation(e);
});
window.addEventListener("load",function(e){
  var load1=new storage(e.type,e.target,new Date(),"load");
  if(localStorage[load1.name]){
    var loads=JSON.parse(localStorage.getItem(load1.name));
    loads.push({"Type":load1.type,"Target":load1.target,"Time":load1.time,"Name":load1.name});
    localStorage.setItem(load1.name,JSON.stringify(loads));
   }
   else{
     var jason=[{"Type":load1.type,"Target":load1.target,"Time":load1.time,"Name":load1.name}]
   localStorage.setItem(load1.name,JSON.stringify(jason)); 
   }
});
window.addEventListener("unload",function(e){
  var unload1=new storage(e.type,e.target,new Date(),"unload");
  if(localStorage[unload1.name]){
    var unloads=JSON.parse(localStorage.getItem(unload1.name));
    unloads.push({"Type":unload1.type,"Target":unload1.target,"Time":unload1.time,"Name":unload1.name});
    localStorage.setItem(unload1.name,JSON.stringify(unloads));
   }
   else{
     var jason=[{"Type":unload1.type,"Target":unload1.target,"Time":unload1.time,"Name":unload1.name}]
   localStorage.setItem(unload1.name,JSON.stringify(jason)); 
   }
});
$("button").on('click',function(e){
  e.preventDefault();  
  $.ajax({
          "type":"get",
          "url":"data.php",
          "data":{"h":""},
          "success":function(r){
             var c=JSON.parse(r);
             var s=" <table><tr><td>Name</td><td>Type</td><td>Target</td><td>Time</td></tr>";
             $.each(c,function(x){
             s+="<tr><td>"+c[x]['Name']+"</td><td>"+c[x]['Type']+"</td><td>"+c[x]['Target']+"</td><td>"+c[x]['Time']+"</td></tr>";
             });
             $("#show").html(s+"</table>");
            
          }
      });
});
setInterval(function(){
  for( x in localStorage){
    if(x!="key"&&x!="setItem"&&x!="clear"&&x!="removeItem"&&x!="getItem"&&x!="length"){
         $.ajax({
             "type":"post",
             "url":"data.php",
             "data":{"jason":localStorage[x]},
             "success":function(r){     
              console.log(r);
             }
         });
    }
  }
  localStorage.clear();  
    },5000); 


