const loadAllPhones= async(status,brandName)=>{
    
    document.getElementById('spinner').style.display='none';
    // search api
 const responce=await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName?brandName:"iphone"}`);
 const data=await  responce.json();
 if(status){
    displayAllPhone(data.data)
 }else{
    displayAllPhone(data.data.slice(0,6))
 }

}
// phone api call kora hoisay
const displayAllPhone=(phones)=>{
    document.getElementById('phones-container').innerHTML="";
    const phoneContainer=document.getElementById('phones-container');
    
  phones.forEach(phone => {
    const {brand,image,slug}=phone;
    const div=document.createElement('div');
    div.innerHTML=
    `
    <div class="card  mt-3 m-2 card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src=${image}
      alt="Shoes" />
    
  </figure>
  <div class="card-body">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions justify-end">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
    `;
    phoneContainer.appendChild(div)
  });
}
//  api call end 
// show all button
const handleShowAll=()=>{
    loadAllPhones(true)
}
const handleSearch=()=>{
    document.getElementById('spinner').style.display="block";
    const searchText=document.getElementById('search-box').value
    setTimeout (function (){
        loadAllPhones(false,searchText)
    },1000)
}
// spinner button end
// details
const  phoneDetails=async(slugs)=>{
const responce= await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
const data= await responce.json();
console.log(data.data)
const {brand,image,slug}=data.data;
const modelContainer=document.getElementById("model-container");
modelContainer.innerHTML=
`
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">${brand}</h3>
      <p class="py-4">${image}</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
`
my_modal_1.showModal()
}
loadAllPhones();