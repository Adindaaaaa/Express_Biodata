const express = require('express');
//apk menampung semua expressnya
const app = express();
//port apknya
const port = 9000;

const {logger} = require('./middleware/log.middleware')

//middleware untuk penerima json dari express
app.use(express.json());
app.use(logger);

app.listen(port, 'localhost', () =>{
    console.log(`server berjalan di port ${port}`)
});

app.get('/hello', (request, response) => {
    return response.send('hallo dari expressjs')
});

//representasi dari database
//dikasih let karena variabel yang bisa diubah
let biodata = [
    {id: 1, nama: 'adinda'},
    {id: 2, umur: 16},
    {id: 3, Alamat: 'setu, kabupaten bekasi'},
    {id: 4, instagram: '@adinda.nsw'},
    {id: 5, nomor_telepon: '081511329300'},

];


//klo ngambil semua data
app.get('/biodata', (request,response) => {
    response.status(200).json(biodata); // 201 berarti diterima
})
// kita membuat variabel untuk menampung semua users atau cuma 1 id aja
app.get('/biodata/:id', (request,response) => {
    const identity = biodata.find(data=> 
    //kalo mau ngambil data 1, itu gk usah pake s
    //.find adalah fungsi array dari java script, untuk mencari data secara spesifik. 
    //Data itu fungsinya untuk memanggil si data ussernya 
    // si data itu isinya seluruh data usser
    data.id === parseInt(request.params.id));
    //=== adalah untuk pengecekan data
    // parseInt untuk mengecek angka
    //.params untuk mengambil parameter
    //int itu huruf
    // string itu angka pake kutip, klo number gk


    if(identity) {
        response.json(identity);
    } else{
        response.status(400).json({
            pesan: "data identity tidak ditemukan"
        });
    }

});

app.post('/biodata', (request, response) => {
    const newidentity = {
        //data yang akan kita push ke newidentity
        id: biodata.length + 1,
        ...request.body,
    };
    biodata.push(newidentity);

    response.status(200).json(newidentity);
});

//put= update users
//jika ada, kasih request dataya
app.put('/biodata/:id', (request, response) => {
    const identity = biodata.find(data=> 
        data.id === parseInt(request.params.id));
        if (identity) {
            identity.nama = request.body.nama;
            identity.umur = request.body.umur;

            response.json(identity); 
        } else{
            response.status(404).json({
                pesan: "user tidak ditemukan"
            })
        }
});