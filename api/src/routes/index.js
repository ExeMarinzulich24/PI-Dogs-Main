const { Router } = require('express');
const axios = require('axios');
// const { YOUR_API_KEY } = process.env;
const { Race, Temperament } = require('../db')
// require('dotenv').config();

const { getAllDogs } = require('../information/getAllDogs');

const router = Router()

router.get('/dogs', async (req, res, next) => {
    try {
        const name = req.query.name
        let allDogs = await getAllDogs();
        if (name) {
            let dogName = await allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ?
                res.status(200).send(dogName) :
                res.send([{
                    name: 'Perdon, la raza no esta en nuestra base de datos.', id: '', temperaments: 'Puede crearla en nuestro "Creador de Perros"', image: 'https://e7.pngegg.com/pngimages/741/723/png-clipart-adult-white-and-brown-jack-russell-terrier-using-magnifying-glass-search-and-rescue-dog-puppy-dog-training-pet-pets-animals-dog-like-mammal.png'
                }]);
        } else {
            res.status(200).send(allDogs)
        }
    } catch (err) {
        next(err);
    }
})

router.get('/dogs/:raceId', async (req, res, next) => {
    const { raceId } = req.params;
    const allRaces = await getAllDogs();
    if (raceId) {
        let race = await allRaces.filter(e => e.id == raceId);
        race.length ?
            res.status(200).json(race) :
            res.status(404).json(`Perdon, el ID '${raceId}' No aparece`)
    }
})

router.get('/temperament', async (req, res, next) => {
    let infoApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${live_evG8k4jPt2zeEsECXDC0PFXAk0ZJl54YQo04QR8azF4dolZPSjwHzuTY9ZWY9Dvx}`)
    try {
        let allTemperament = infoApi.data.map(allDogs => allDogs.temperament ? allDogs.temperament : 'no temperament').join(',').split(',')
        let filterTemperament = allTemperament.filter(temper => temper !== 'no temperament')
        let eTemper = [... new Set(filterTemperament)]
        eTemper.forEach(temper => {
            Temperament.findOrCreate({
                where: { name: temper }
            })
        })
        let temperDB = await Temperament.findAll()
        res.status(200).send(temperDB)
    } catch (error) {
        res.status(404).send(error)

    }
})

router.post('/dogs', async (req, res) => {
    let {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        image,
        temperaments,
    } = req.body
    let raceCreated = await Race.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span: life_span + ' años',
        image,
    })
    let temperamentDB = await Temperament.findAll({
        where: {
            name: temperaments
        }
    })

    raceCreated.addTemperament(temperamentDB)
    res.status(200).send('Raza creada')
})

router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    try {
        if (id) {
            await Race.destroy({
                where: { id: id },
            });
            res.send({ msg: "Dog deleted" });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;