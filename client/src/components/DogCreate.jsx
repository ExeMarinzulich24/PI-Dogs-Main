import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTemperaments, postDogs } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/DogCreate.css'
import robot from '../styles/robot.jpg'

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Debes asignar un nombre a la raza'
    }

    else if (!input.name.length > 50) {
        errors.name = 'El nombre no debe superar los 50 caracteres'
    }

    else if (!input.heightMin) {
        errors.heightMin = 'Ingresa una altura mínima'
    }

    else if (isNaN(parseInt(input.heightMin))) {
        errors.heightMin = 'Ingresa solo valores numéricos'
    }

    else if (input.heightMin <= 0) {
        errors.heightMin = 'El tamaño mínimo debe ser superior a 0'
    }

    else if (!input.heightMax) {
        errors.heightMax = 'Ingresa una altura máxima '
    }

    else if (isNaN(parseInt(input.heightMax))) {
        errors.heightMax = 'Ingresa solo valores numéricos'
    }

    else if (input.heightMax > 200) {
        errors.heightMax = 'El tamaño máximo no puede superar los 200cm'
    }

    else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
        errors.heightMin = 'La altura mínima no puede ser superior a la máxima '
    }

    else if (!input.weightMin) { errors.weightMin = 'Ingresa un peso mínimo  ' }

    else if (isNaN(parseInt(input.weightMin))) {
        errors.weightMin = 'Ingresa solo valores numéricos'
    }

    else if (input.weightMin <= 0) {
        errors.weightMin = 'El peso mínimo debe ser superior a 0'
    }

    else if (!input.weightMax) { errors.weightMax = 'Ingresa un peso máximo ' }

    else if (isNaN(parseInt(input.weightMax))) {
        errors.weightMax = 'Ingresa solo valores numéricos'
    }

    else if (input.weightMax > 200) {
        errors.heightMax = 'El peso máximo no puede superar los 200kg'
    }

    else if (parseInt(input.weightMin) >= parseInt(input.weightMax)) {
        errors.weightMin = 'El peso mínimo no puede ser superior al máximo'
    }

    else if (!input.life_span) {
        errors.life_span = 'Ingresa una esperanza de vida aproximada'
    }

    else if (input.life_span > 30) {
        errors.life_span = 'La esperanza de vida no puede superar los 30 años'
    }

    else if (input.life_span <= 0) {
        errors.life_span = 'La esperanza de vida no puede ser menor o igual a 0'
    }

    else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'Ingresa solo valores numéricos'
    }

    return errors
}


export default function DogCreate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTemperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        image: '',
        temperaments: [],

    });

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
        console.log(input)
    }

    function handleSelect(e) {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            })
            console.log(input)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!Object.getOwnPropertyNames(errors).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.life_span /*&& input.temperaments.length*/ /*&& input.origins.length*/) {

            if (!input.image) {
                input.image = robot
            }
            dispatch(postDogs(input))
            alert('Se creo una nueva raza')
            setInput({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                image: '',
                temperaments: [],
            })
            navigate('/home')
        } else {
            alert('No se creo el perro')
        }
    }

    function handleDeleteTemperament(e) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== e)
        })
    }

    return (
        <div className="divCreate">
            <Link to='/home'><button className="buttonHome"> Pagina Principal</button> </Link>
            <h1 className="title">Crea tu propia raza de perro</h1>
            <div className="super">
                <form onSubmit={e => handleSubmit(e)}>
                    <div>
                        <label><strong>Nombre de la Raza: </strong></label>
                        <input type="text" value={input.name} name='name' onChange={e => handleChange(e)} />
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label><strong>Altura minima: </strong></label>
                        <input type="text" value={input.heightMin} name='heightMin' onChange={e => handleChange(e)} />
                        <label><strong> cm.</strong></label>
                        {errors.heightMin && (
                            <p className="error">{errors.heightMin}</p>
                        )}
                    </div>

                    <div>
                        <label><strong>Altura maxima: </strong></label>
                        <input type="text" value={input.heightMax} name='heightMax' onChange={e => handleChange(e)} />
                        <label><strong> cm.</strong></label>
                        {errors.heightMax && (
                            <p className="error">{errors.heightMax}</p>
                        )}
                    </div>

                    <div>
                        <label><strong>Peso minimo: </strong></label>
                        <input type="text" value={input.weightMin} name='weightMin' onChange={e => handleChange(e)} />
                        <label><strong> Kg.</strong></label>
                        {errors.weightMin && (
                            <p className="error">{errors.weightMin}</p>
                        )}
                    </div>

                    <div>
                        <label><strong>Peso maximo: </strong></label>
                        <input type="text" value={input.weightMax} name='weightMax' onChange={e => handleChange(e)} />
                        <label><strong> Kg.</strong></label>
                        {errors.weightMax && (
                            <p className="error">{errors.weightMax}</p>
                        )}
                    </div>

                    <div>
                        <label><strong>Esperanza de Vida: </strong></label>
                        <input type="text" value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                        <label><strong> años</strong></label>
                        {errors.life_span && (
                            <p className="error">{errors.life_span}</p>
                        )}
                    </div>

                    <div>
                        <label><strong>Imagen: </strong></label>
                        <input type="text" value={input.image} name='image' onChange={e => handleChange(e)} />

                    </div>

                    <div>
                        <select onChange={e => handleSelect(e)}>
                            <option value='selected' hidden >Temperamentos</option>
                            {allTemperaments?.sort(function (a, b) {
                                if (a.name < b.name) return -1
                                if (a.name > b.name) return 1
                                return 0
                            }).map(temp => {
                                return (
                                    <option value={temp.name} key={temp.id}>{temp.name}</option>
                                )
                            })}
                        </select>
                        {input.temperaments.map(e => {
                            return (
                                <ul className="allSelecction" key={e}>
                                    <li>
                                        <p className="selecction"><strong>{e}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(e)} className='x'>X</button>
                                    </li>
                                </ul>
                            )
                        })}
                    </div>


                    <button type="submit" className="boop" ><strong>Crear</strong></button>

                </form>
            </div>
        </div>
    )
}