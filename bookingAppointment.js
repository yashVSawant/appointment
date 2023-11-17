const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const submit = document.getElementById('submit');
const list = document.getElementById('ul');

submit.addEventListener('click',addAppointmentOnServer);
list.addEventListener('click',editOrDeleteAppointment)

function addAppointmentOnServer(e){
    e.preventDefault();
    axios.post("https://crudcrud.com/api/1872b18e7abe481bb1d1a33099f86baa/bookingappointment",{
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
        axios.delete(`https://crudcrud.com/api/1872b18e7abe481bb1d1a33099f86baa/bookingappointment/${Id}`)
        list.removeChild(currentAppointment);

    }
    else if(e.target.classList.contains('edit')){
        list.removeChild(currentAppointment);
        axios.get(`https://crudcrud.com/api/1872b18e7abe481bb1d1a33099f86baa/bookingappointment/${Id}`)
        .then((userData)=>{
            name.value = userData.data['name'];
            email.value = userData.data['email'];
            phone.value = userData.data['phone'];
        })
        .then(()=>{axios.delete(`https://crudcrud.com/api/1872b18e7abe481bb1d1a33099f86baa/bookingappointment/${Id}`);})
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
     const getAppointments = axios.get("https://crudcrud.com/api/1872b18e7abe481bb1d1a33099f86baa/bookingappointment")
                                  .then(appointmentsData=>{
                                    appointmentsArray(appointmentsData.data);
                                  })     
})

