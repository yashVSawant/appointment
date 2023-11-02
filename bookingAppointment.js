const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const submit = document.getElementById('submit');
const list = document.getElementById('ul');

submit.addEventListener('click',addAppointment);

function addAppointment(e){
    e.preventDefault();
    
    name.value;
    email.value;
    phone.value;
    

    axios.post("https://crudcrud.com/api/7b93292cc03e43a29340f3a397b4be25/bookingappointment",{
        "name":name.value,
        "email":email.value,
        "phone":phone.value
    }).then((post)=>{
        const id = post.data['_id'];
        console.log(id);
        saveAppointment(name.value,email.value,phone.value,id);
    })
    .then(()=>{
        name.value="";
        email.value="";
        phone.value="";
    })
    
}

function saveAppointment(name,email,phone,userid){
    const appointment = document.createElement('li');
    appointment.innerText=`name : ${name} - email : ${email} - Phone No. : ${phone}`;
    appointment.id= userid;
    list.append(appointment);
}
function appointmentsArray(array){
    array.forEach(element => {
        saveAppointment(element['name'],element['email'],element['phone'],element['_id']);
        
    });

}

window.addEventListener('DOMContentLoaded',()=>{
     const getAppointments = axios.get("https://crudcrud.com/api/7b93292cc03e43a29340f3a397b4be25/bookingappointment")
                                  .then(appointmentsData=>{
                                    appointmentsArray(appointmentsData.data);
                                  })

     
})