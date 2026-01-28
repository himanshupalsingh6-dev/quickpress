const list=document.getElementById("list");

const data={
  iron:["Shirt","Pant"],
  wash:["Normal Wash","Premium Wash"],
  steam:["Steam Press"],
  dry:["Dry Clean"]
};

function load(cat){
  list.innerHTML="";
  data[cat].forEach(p=>{
    list.innerHTML+=`<div class="item">${p}</div>`;
  });
}

load("iron");