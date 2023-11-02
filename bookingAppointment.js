const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const submit = document.getElementById('submit');
const list = document.getElementById('ul');

submit.addEventListener('click',addAppointment);
list.addEventListener('click',editOrDeleteAppointment)

function addAppointment(e){
    e.preventDefault();

    axios.post("https://crudcrud.com/api/7b93292cc03e43a29340f3a397b4be25/bookingappointment",{
        "name":name.value,
        "email":email.value,
        "phone":phone.value
    }).then((post)=>{
        const id = post.data['_id'];
        saveAppointment(name.value,email.value,phone.value,id);
    })
    .then(()=>{
        name.value="";
        email.value="";
        phone.value="";
    })
    
}

function editOrDeleteAppointment(e){
    const currentAppointment = e.target.parentElement;
    const Id = currentAppointment.id;
    if(e.target.classList.contains('delete')){
        axios.delete(`https://crudcrud.com/api/7b93292cc03e43a29340f3a397b4be25/bookingappointment/${Id}`);
    }
    else if(e.target.classList.contains('edit')){
        list.removeChild(currentAppointment);
        axios.get(`https://crudcrud.com/api/7b93292cc03e43a29340f3a397b4be25/bookingappointment/${Id}`)
        .then((userData)=>{
            name.value = userData.data['name'];
            email.value = userData.data['email'];
            phone.value = userData.data['phone'];
        })
        .then(()=>{axios.delete(`https://crudcrud.com/api/7b93292cc03e43a29340f3a397b4be25/bookingappointment/${Id}`);})
    }
}

function saveAppointment(name,email,phone,userid){
    const appointment = document.createElement('li');
    const del = document.createElement('button');
    const edit = document.createElement('button');

    del.className="delete";
    edit.className='edit'

    del.innerText="x";
    edit.innerText="edit";

    appointment.innerText=`name : ${name} - email : ${email} - Phone No. : ${phone}`;
    appointment.id= userid;
    appointment.append(edit);
    appointment.append(del);
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

