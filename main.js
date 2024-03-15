let title=document.getElementById("tit")
let price=document.getElementById("price")
let taxes=document.getElementById("taxes")
let discount=document.getElementById("discount")
let ads=document.getElementById("ads")
let total=document.getElementById("total")
let count=document.getElementById("count")
let cat=document.getElementById("categoury")
let create=document.getElementById("create")

let mode="create"
let tmp;
function gettotal()
{
    if(price.value!="")
    {

        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
total.innerHTML=result
total.style.background="red"
    }
    else
    {
        total.innerHTML=''

        total.style.background="blue"

    }

}

let bigdate=[]

if(localStorage.getItem("product")!=null)
{
 bigdate=JSON.parse(localStorage.getItem("product"))
}
else
{

     bigdate=[]
}




const submit=()=>{
    gettotal();
    let prodata={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        ads:ads.value,
        count:count.value,
        cat:cat.value,
        total:total.innerHTML,
    }
    if(price.value!==""&&ads.value!==""&&title.value!==""&&taxes.value!=""&&count.value!==""&&cat.value!==""&&discount.value!=="")
    {

            if(mode==="create")
            {
                if(prodata.count>1)
                {
                    for(let i=0;i<=prodata.count;i++)
                    {
                        bigdate.push(prodata)
    
                    }
                   
                }
                else
                {
                    bigdate.push(prodata)
    
                }

            }
            else if(mode==="update")
            {
                bigdate[tmp]=prodata
                create.innerText="create"
                mode="create"
                gettotal()
            }
            
       localStorage.setItem("product", JSON.stringify(bigdate))
    cleardata()
    showdata()
    }
}

    cleardata=function(){
title.value='',
price.value='',
taxes.value='',
discount.value='',
ads.value='',
count.value='',
total.innerHTML='',
cat.value=''
    }

    function showdata()
    {
        let table=''

        for(let i=0;i<bigdate.length;i++)
        {
            table+=`
            <tr>
            <td>${i}</td>
            <td>${bigdate[i].title}</td>
            <td>${bigdate[i].price}</td>
            <td>${bigdate[i].taxes}</td>
            <td>${bigdate[i].ads}</td>
            <td>${bigdate[i].discount}</td>
            <td>${bigdate[i].total}</td>
            <td>${bigdate[i].cat}</td>
            <td><button onclick="updatepro(${i})"  class="button"> update</button></td>
            <td><button onclick="deleteone(${i})" class="button"> delete</button></td>
            </tr>
`
        }
        document.getElementById("tbody").innerHTML=table 
        deleteall();
       }
       showdata();




       function deleteone(i)
       {
         bigdate.splice(i,1)
           localStorage.product=JSON.stringify(bigdate)
           showdata();
           deleteall();
       }



       function deleteall()
       {
           let deleteall=document.getElementById("deleteall");
        if(bigdate.length>0)
        {
            deleteall.innerText="Delete All"
            deleteall.classList.add("btn")
        }
        else
        {
            deleteall.innerText=""
            deleteall.classList.remove("btn")
        }
        
       }

       deleteall();


       function deletealldata()
       {
        localStorage.clear();
        bigdate.splice(0)
        showdata();
       }


       function updatepro(i)
       {

        title.value=bigdate[i].title
        price.value=bigdate[i].price
        ads.value=bigdate[i].ads
        taxes.value=bigdate[i].taxes
        discount.value=bigdate[i].discount
        cat.value=bigdate[i].cat
        count.style.display="none"
        create.innerText="update"
        mode="update"
        tmp=i
        gettotal()
       }

       let searchmood="title"
       let searchinput=document.getElementById("search")
      function onsearchsubmit(id)
      {
        if(id==="search by title")
        {
            searchmood="title"
        }
        else
        {
            searchmood="cat"

        }
        searchinput.focus()
        searchinput.placeholder=`search by ${id}`
        searchinput.value=''
      }

      function searchword(value)
      {
          let table=``
        for(let i=0;i<=bigdate.length;i++)
        {

            if(searchmood==="title")
            {
  if( bigdate[i].title.includes(value))
  {
    table+=`
            <tr>
            <td>${i}</td>
            <td>${bigdate[i].title}</td>
            <td>${bigdate[i].price}</td>
            <td>${bigdate[i].taxes}</td>
            <td>${bigdate[i].ads}</td>
            <td>${bigdate[i].discount}</td>
            <td>${bigdate[i].total}</td>
            <td>${bigdate[i].cat}</td>
            <td><button onclick="updatepro(${i})"  class="button"> update</button></td>
            <td><button onclick="deleteone(${i})" class="button"> delete</button></td>
            </tr>
`
  }
            }
            else
            {
                if( bigdate[i].cat.includes(value))
                {
                  table+=`
                          <tr>
                          <td>${i}</td>
                          <td>${bigdate[i].title}</td>
                          <td>${bigdate[i].price}</td>
                          <td>${bigdate[i].taxes}</td>
                          <td>${bigdate[i].ads}</td>
                          <td>${bigdate[i].discount}</td>
                          <td>${bigdate[i].total}</td>
                          <td>${bigdate[i].cat}</td>
                          <td><button onclick="updatepro(${i})"  class="button"> update</button></td>
                          <td><button onclick="deleteone(${i})" class="button"> delete</button></td>
                          </tr>
              `
                }
            }
            document.getElementById("tbody").innerHTML=table 

        }
      }